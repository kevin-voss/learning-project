window.AIP = window.AIP || {};

(function () {
  var SERVICE_CATALOG = [
    { id: "bedrock", label: "Amazon Bedrock", aliases: ["amazon bedrock", "bedrock"] },
    { id: "sagemaker", label: "Amazon SageMaker", aliases: ["amazon sagemaker", "sagemaker"] },
    { id: "s3", label: "Amazon S3", aliases: ["amazon s3", "s3 bucket", "s3"] },
    { id: "lambda", label: "AWS Lambda", aliases: ["aws lambda", "lambda function", "lambda"] },
    { id: "opensearch", label: "Amazon OpenSearch", aliases: ["amazon opensearch", "opensearch"] },
    { id: "kinesis", label: "Amazon Kinesis", aliases: ["amazon kinesis", "kinesis"] },
    { id: "eventbridge", label: "Amazon EventBridge", aliases: ["amazon eventbridge", "eventbridge"] },
    { id: "step-functions", label: "AWS Step Functions", aliases: ["step functions", "stepfunctions"] },
    { id: "api-gateway", label: "Amazon API Gateway", aliases: ["api gateway", "apigateway"] },
    { id: "cloudwatch", label: "Amazon CloudWatch", aliases: ["amazon cloudwatch", "cloudwatch"] },
    { id: "cloudtrail", label: "AWS CloudTrail", aliases: ["aws cloudtrail", "cloudtrail"] },
    { id: "iam", label: "AWS IAM", aliases: ["aws iam", "iam role", "iam policy", "identity-based policy"] },
    { id: "kms", label: "AWS KMS", aliases: ["aws kms", "kms key", "customer managed key"] },
    { id: "vpc", label: "Amazon VPC / PrivateLink", aliases: ["amazon vpc", "vpc endpoint", "privatelink", "private subnet"] },
    { id: "waf", label: "AWS WAF", aliases: ["aws waf", "web application firewall"] },
    { id: "appconfig", label: "AWS AppConfig", aliases: ["aws appconfig", "appconfig"] },
    { id: "dynamodb", label: "Amazon DynamoDB", aliases: ["amazon dynamodb", "dynamodb"] },
    { id: "ec2", label: "Amazon EC2", aliases: ["amazon ec2", "ec2 instance", "ec2"] },
    { id: "ecs", label: "Amazon ECS / Fargate", aliases: ["amazon ecs", "ecs task", "fargate"] },
    { id: "eks", label: "Amazon EKS", aliases: ["amazon eks", "eks cluster"] },
    { id: "translate", label: "Amazon Translate", aliases: ["amazon translate", "translate"] },
    { id: "transcribe", label: "Amazon Transcribe", aliases: ["amazon transcribe", "transcribe"] },
    { id: "textract", label: "Amazon Textract", aliases: ["amazon textract", "textract"] },
    { id: "comprehend", label: "Amazon Comprehend", aliases: ["amazon comprehend", "comprehend"] },
    { id: "glue", label: "AWS Glue", aliases: ["aws glue", "glue job"] },
    { id: "secrets-manager", label: "AWS Secrets Manager", aliases: ["secrets manager"] },
    { id: "cognito", label: "Amazon Cognito", aliases: ["amazon cognito", "cognito"] },
    { id: "sns", label: "Amazon SNS", aliases: ["amazon sns", "sns topic"] },
    { id: "sqs", label: "Amazon SQS", aliases: ["amazon sqs", "sqs queue"] },
    { id: "route53", label: "Amazon Route 53", aliases: ["route 53", "route53"] },
    { id: "athena", label: "Amazon Athena", aliases: ["amazon athena", "athena"] },
    { id: "rds", label: "Amazon RDS / Aurora", aliases: ["amazon rds", "aurora"] },
    { id: "elasticache", label: "Amazon ElastiCache", aliases: ["elasticache"] },
    { id: "ecr", label: "Amazon ECR", aliases: ["amazon ecr", "ecr repository"] },
    { id: "codepipeline", label: "AWS CodePipeline", aliases: ["codepipeline", "code pipeline"] },
    { id: "codebuild", label: "AWS CodeBuild", aliases: ["codebuild", "code build"] },
    { id: "codedeploy", label: "AWS CodeDeploy", aliases: ["codedeploy", "code deploy"] },
    { id: "xray", label: "AWS X-Ray", aliases: ["aws x-ray", "x-ray"] },
    { id: "rekognition", label: "Amazon Rekognition", aliases: ["amazon rekognition", "rekognition"] },
    { id: "macie", label: "Amazon Macie", aliases: ["amazon macie", "macie"] },
    { id: "organizations", label: "AWS Organizations", aliases: ["aws organizations", "organizations"] },
    { id: "service-quotas", label: "AWS Service Quotas", aliases: ["service quotas", "servicequota"] }
  ];

  function containsService(text, alias) {
    var escaped = String(alias).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("(^|[^a-z0-9])" + escaped + "([^a-z0-9]|$)", "i").test(text);
  }

  function questionTextForServices(q) {
    var text = [q && q.stem, q && q.subdomain].filter(Boolean).join(" ");
    var correct = {};
    var answers = Array.isArray(q && q.correct) ? q.correct : [q && q.correct];
    answers.forEach(function (id) { if (id != null) correct[String(id).toUpperCase()] = true; });
    (q && q.choices || []).forEach(function (choice) {
      var id = String(choice && (choice.id || choice.letter) || "").toUpperCase();
      if (correct[id]) text += " " + (choice.text || "");
    });
    return text;
  }

  function questionServices(q) {
    if (!q) return [];
    if (Array.isArray(q.services)) return q.services.map(function (id) { return String(id); });
    if (q.service) return [String(q.service)];
    var text = questionTextForServices(q);
    return SERVICE_CATALOG.filter(function (service) {
      return service.aliases.some(function (alias) { return containsService(text, alias); });
    }).map(function (service) { return service.id; });
  }

  AIP.SERVICE_CATALOG = SERVICE_CATALOG;
  AIP.questionServices = questionServices;
  AIP.serviceMeta = function (id) {
    for (var i = 0; i < SERVICE_CATALOG.length; i++) {
      if (SERVICE_CATALOG[i].id === String(id)) return SERVICE_CATALOG[i];
    }
    return null;
  };

  function subdomainSortKey(subdomain) {
    var m = String(subdomain || "").match(/^(\d+)\.(\d+)/);
    if (!m) return [999, 999, String(subdomain || "")];
    return [Number(m[1]), Number(m[2]), String(subdomain || "")];
  }

  function questionDomain(q) {
    if (q == null) return 999;
    if (q.domain != null && q.domain !== "") return Number(q.domain);
    var m = String(q.subdomain || "").match(/^(\d+)\./);
    return m ? Number(m[1]) : 999;
  }

  function compareQuestions(a, b) {
    var da = questionDomain(a);
    var db = questionDomain(b);
    if (da !== db) return da - db;
    var ak = subdomainSortKey(a.subdomain);
    var bk = subdomainSortKey(b.subdomain);
    if (ak[0] !== bk[0]) return ak[0] - bk[0];
    if (ak[1] !== bk[1]) return ak[1] - bk[1];
    if (ak[2] !== bk[2]) return ak[2].localeCompare(bk[2]);
    return String(a.id || a.stem || "").localeCompare(String(b.id || b.stem || ""));
  }

  function shuffle(arr) {
    var out = arr.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = out[i];
      out[i] = out[j];
      out[j] = t;
    }
    return out;
  }

  function questionState(q, stat) {
    stat = stat || AIP.storage.questionStats(q.id);
    var correct = Number(stat.correct) || 0;
    var wrong = Number(stat.wrong) || 0;
    var attempts = correct + wrong;
    if (!attempts) return "unseen";
    if (wrong > correct || stat.last === "wrong") return "wrong";
    return "correct";
  }

  function priorityQuestions(questions) {
    var stats = AIP.storage.quiz().questions;
    return (questions || []).map(function (q) {
      var stat = stats[q.id] || {};
      var correct = Number(stat.correct) || 0;
      var wrong = Number(stat.wrong) || 0;
      var attempts = correct + wrong;
      var lastAttempt = (stat.attempts || []).length ? stat.attempts[stat.attempts.length - 1] : null;
      var lastAt = lastAttempt && Number(lastAttempt.at) || 0;
      var bucket;
      // New questions always win. Once everything has been seen, missed items
      // come first, with recent misses surfaced again before weak older items.
      if (!attempts) bucket = 0;
      else if (stat.last === "wrong") bucket = 1;
      else if (wrong > correct) bucket = 2;
      else if (wrong > 0) bucket = 3;
      else bucket = 4;
      return {
        q: q,
        bucket: bucket,
        wrong: wrong,
        accuracy: attempts ? correct / attempts : 0,
        lastAt: lastAt,
        tie: Math.random()
      };
    }).sort(function (a, b) {
      if (a.bucket !== b.bucket) return a.bucket - b.bucket;
      if (a.bucket === 0) return a.tie - b.tie;
      if (a.bucket === 1) return b.lastAt - a.lastAt || b.wrong - a.wrong || a.tie - b.tie;
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      if (a.wrong !== b.wrong) return b.wrong - a.wrong;
      return a.lastAt - b.lastAt || a.tie - b.tie;
    }).map(function (item) { return item.q; });
  }

  function matchesFilter(q, filter, stats) {
    if (!filter || filter === "all") return true;
    if (typeof filter === "string") {
      if (filter === "all") return true;
      return AIP.chapterTags(q).indexOf(AIP.padChapterId(filter)) !== -1;
    }
    if (filter.source && String(q.source || "") !== String(filter.source)) return false;
    if (filter.domain != null && questionDomain(q) !== Number(filter.domain)) return false;
    if (filter.subdomain && String(q.subdomain || "") !== String(filter.subdomain)) return false;
    if (filter.id && String(q.id || "") !== String(filter.id)) return false;
    if (filter.service && questionServices(q).indexOf(String(filter.service)) === -1) return false;
    if (filter.status && filter.status !== "all" && questionState(q, stats && stats[q.id]) !== filter.status) return false;
    return true;
  }

  AIP.questionDomain = questionDomain;
  AIP.questionState = questionState;

  AIP.sortQuestions = function (questions) {
    return (questions || []).slice().sort(compareQuestions);
  };

  AIP.questionsBySource = function (source) {
    return AIP.sortQuestions((AIP.questions || []).filter(function (q) {
      return String(q.source || "") === String(source);
    }));
  };

  AIP.filterQuestions = function (filter) {
    var stats = filter && typeof filter === "object" && filter.status ? AIP.storage.quiz().questions : null;
    return AIP.sortQuestions((AIP.questions || []).filter(function (q) {
      return matchesFilter(q, filter, stats);
    }));
  };

  AIP.groupByDomain = function (questions) {
    var groups = {};
    (questions || []).forEach(function (q) {
      var d = questionDomain(q);
      if (!groups[d]) groups[d] = [];
      groups[d].push(q);
    });
    Object.keys(groups).forEach(function (k) {
      groups[k].sort(compareQuestions);
    });
    return groups;
  };

  AIP.groupBySubdomain = function (questions) {
    var groups = {};
    (questions || []).forEach(function (q) {
      var key = String(q.subdomain || "Unknown");
      if (!groups[key]) groups[key] = [];
      groups[key].push(q);
    });
    Object.keys(groups).forEach(function (k) {
      groups[k].sort(compareQuestions);
    });
    return groups;
  };

  AIP.domainCounts = function (questions) {
    var counts = {};
    (AIP.DOMAINS || []).forEach(function (d) { counts[d.id] = 0; });
    (questions || AIP.questions || []).forEach(function (q) {
      var d = questionDomain(q);
      counts[d] = (counts[d] || 0) + 1;
    });
    return counts;
  };

  AIP.bankSummary = function () {
    var all = AIP.questions || [];
    var bySource = {};
    all.forEach(function (q) {
      var s = String(q.source || "unknown");
      bySource[s] = (bySource[s] || 0) + 1;
    });
    return {
      total: all.length,
      bySource: bySource,
      certsafari: bySource.certsafari || 0,
      practice: bySource.practice || 0,
      examtopics: bySource.examtopics || 0,
      domainCounts: AIP.domainCounts(all)
    };
  };

  AIP.questionPerformance = function (questions) {
    var stats = AIP.storage.quiz().questions;
    var result = { correct: 0, wrong: 0, attemptedQuestions: 0, unseenQuestions: 0 };
    (questions || AIP.questions || []).forEach(function (q) {
      var row = stats[q.id] || {};
      var correct = Number(row.correct) || 0;
      var wrong = Number(row.wrong) || 0;
      result.correct += correct;
      result.wrong += wrong;
      if (correct + wrong) result.attemptedQuestions += 1;
      else result.unseenQuestions += 1;
    });
    result.answers = result.correct + result.wrong;
    result.accuracy = result.answers ? Math.round((result.correct / result.answers) * 100) : 0;
    return result;
  };

  AIP.renderPerformanceChart = function (performance) {
    var p = performance || { correct: 0, wrong: 0, answers: 0, accuracy: 0 };
    var correctWidth = p.answers ? Math.round((p.correct / p.answers) * 100) : 0;
    var wrongWidth = p.answers ? 100 - correctWidth : 0;
    return '<div class="performance-chart" role="img" aria-label="' + p.correct + ' correct and ' + p.wrong + ' wrong answers, ' + p.accuracy + '% accuracy"><div class="performance-chart-head"><span><i class="dot correct"></i>' + p.correct + ' correct</span><strong>' + (p.answers ? p.accuracy + '% accuracy' : 'No answers yet') + '</strong><span><i class="dot wrong"></i>' + p.wrong + ' wrong</span></div><div class="performance-bar"><i class="correct" style="width:' + correctWidth + '%"></i><i class="wrong" style="width:' + wrongWidth + '%"></i></div></div>';
  };

  AIP.parseExamMode = function (hash) {
    var h = String(hash || location.hash || "");
    var q = h.indexOf("?");
    if (q === -1) return { mode: "all" };
    var params = new URLSearchParams(h.slice(q + 1));
    var mode = params.get("mode") || "all";
    var domain = params.get("domain");
    var source = params.get("source");
    var service = params.get("service");
    var status = params.get("status");
    var strategy = params.get("strategy");
    var count = Number(params.get("count"));
    var out = { mode: mode };
    if (domain != null && domain !== "") out.domain = Number(domain);
    if (source) out.source = source;
    if (service) out.service = service;
    if (status) out.status = status;
    if (strategy) out.strategy = strategy;
    if (count > 0) out.count = count;
    return out;
  };

  AIP.questionsForExam = function (modeSpec) {
    var spec = modeSpec || { mode: "all" };
    var pool;
    if (spec.id) pool = AIP.filterQuestions({ id: spec.id });
    else if (spec.mode === "certsafari") pool = AIP.questionsBySource("certsafari");
    else if (spec.mode === "random65") pool = shuffle(AIP.sortQuestions(AIP.questions || [])).slice(0, 65);
    else if (spec.domain != null || spec.source || spec.service || spec.status) pool = AIP.filterQuestions({ domain: spec.domain, source: spec.source, service: spec.service, status: spec.status });
    else pool = AIP.sortQuestions(AIP.questions || []);
    if (spec.strategy === "adaptive") pool = priorityQuestions(pool);
    else if (spec.mode !== "random65" && !spec.id) pool = shuffle(pool);
    var count = Number(spec.count);
    if (count > 0 && !spec.id) pool = pool.slice(0, Math.min(Math.floor(count), pool.length));
    return pool;
  };

  AIP.filterQuery = function (filter) {
    var parts = [];
    ["domain", "service", "source", "status"].forEach(function (key) {
      if (filter && filter[key] != null && filter[key] !== "" && filter[key] !== "all") {
        parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(filter[key]));
      }
    });
    return parts.length ? "?" + parts.join("&") : "";
  };

  AIP.serviceCounts = function (questions) {
    var counts = {};
    (questions || AIP.questions || []).forEach(function (q) {
      questionServices(q).forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });
    });
    return counts;
  };
  AIP.subdomainSortKey = subdomainSortKey;
})();
