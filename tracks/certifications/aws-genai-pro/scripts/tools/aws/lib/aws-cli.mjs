import { spawnSync } from "node:child_process";

export function aws(args, opts = {}) {
  if (!opts.allow) {
    const error = new Error("AWS calls stay blocked until this action is approved.");
    error.code = "APPROVAL_REQUIRED";
    throw error;
  }
  return spawnSync("aws", args, { encoding: "utf8" });
}

export function approvedName(name) {
  const typed = process.env.LP_LAB_APPROVE || "";
  return Boolean(name) && name.startsWith("lp-lab-") && typed === name;
}
