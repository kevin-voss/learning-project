import { readFileSync } from "node:fs";

function resources(template) {
  return template.Resources || {};
}

export function loadTemplate(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function templateFindings(template) {
  const findings = [];
  for (const [id, resource] of Object.entries(resources(template))) {
    const type = resource.Type || "";
    const props = resource.Properties || {};
    if (type === "AWS::KMS::Key") findings.push(id + " uses a customer-managed key");
    if (props.VpcConfig) findings.push(id + " puts a function inside a VPC");
    if (type === "AWS::S3::Bucket") {
      const rules = props.LifecycleConfiguration && props.LifecycleConfiguration.Rules;
      if (!rules || !rules.length) findings.push(id + " bucket has no lifecycle rule");
    }
    if (type === "AWS::RDS::DBCluster") {
      if (props.DeletionProtection) findings.push(id + " has deletion protection");
      if (resource.DeletionPolicy === "Snapshot") findings.push(id + " snapshots on delete");
    }
    if (type === "AWS::Bedrock::DataSource" && resource.DeletionPolicy !== "Retain") {
      findings.push(id + " data source does not use RETAIN");
    }
    const text = JSON.stringify(resource);
    if (text.includes("FORCE_DELETE_STACK")) findings.push(id + " mentions FORCE_DELETE_STACK");
  }
  const body = JSON.stringify(template);
  if (body.includes("AWS::Bedrock::DataSource") && !body.includes("DependsOn")) {
    findings.push("A knowledge base data source needs DependsOn");
  }
  return findings;
}
