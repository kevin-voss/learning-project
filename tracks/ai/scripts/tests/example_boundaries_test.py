"""Offline behavior checks for the authored guardrail and egress snippets."""
from html.parser import HTMLParser
import re
from pathlib import Path
import unittest
from types import SimpleNamespace

ROOT = Path(__file__).resolve().parents[4]


class CodeBlocks(HTMLParser):
    def __init__(self, filename=None, language=None):
        super().__init__()
        self.filename = filename
        self.language = language
        self.current = None
        self.target = None
        self.blocks = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "pre" and ((self.filename and attrs.get("data-file") == self.filename)
                              or (self.language and attrs.get("data-lang") == self.language)):
            self.current = []

    def handle_endtag(self, tag):
        if tag == "pre" and self.current is not None:
            self.target = "".join(self.current)
            self.blocks.append(self.target)
            self.current = None

    def handle_data(self, data):
        if self.current is not None:
            self.current.append(data)


def snippet(path, filename):
    parser = CodeBlocks(filename)
    parser.feed((ROOT / path).read_text())
    return parser.target


class Denied(Exception): pass
class NeedsApproval(Exception): pass
class Blocked(Exception): pass


class ExampleBoundaryTests(unittest.TestCase):
    def test_all_authored_python_examples_compile(self):
        for path in (ROOT / "tracks/ai/content").rglob("*.html"):
            parser = CodeBlocks(language="python")
            parser.feed(path.read_text())
            for index, block in enumerate(parser.blocks):
                with self.subTest(path=path.relative_to(ROOT), block=index):
                    compile(block, f"{path.name}:{index}", "exec")

    def test_guardrail_enforces_scope_and_consumes_bound_approvals(self):
        class Claims:
            subject, tenant_id, read_only = "user-1", "tenant-a", False
            tool_permissions = {"write_record"}
        class Tool:
            writes, name = True, "write_record"
            def validate(self, args): return SimpleNamespace(tenant_id=args["tenant_id"])
            def run(self, args, scope): return ("dispatched", args.tenant_id)
        class ApprovalStore:
            records = {"valid": {"subject": "user-1", "tenant": "tenant-a", "tool": "write_record",
                                 "args_digest": "digest", "expires": True},
                       "mismatched": {"subject": "user-1", "tenant": "tenant-b", "tool": "write_record",
                                      "args_digest": "digest", "expires": True},
                       "expired": {"subject": "user-1", "tenant": "tenant-a", "tool": "write_record",
                                   "args_digest": "digest", "expires": False}}
            def consume_once(self, approval_id, *, subject, tenant, tool, args_digest, expires_after_now):
                item = self.records.get(approval_id)
                if not item or approval_id in getattr(self, "used", set()): return None
                if (item["subject"], item["tenant"], item["tool"], item["args_digest"], item["expires"]) != (subject, tenant, tool, args_digest, True):
                    return None
                self.used = getattr(self, "used", set()) | {approval_id}
                return {"id": approval_id}
        class Audit:
            def redacted(self, *args): pass
        claims = Claims()
        store = ApprovalStore()
        env = {"FIXED_TOOL_REGISTRY": {"write_record": Tool()},
               "trusted_identity_provider": type("IdP", (), {"claims": lambda *_: claims})(),
               "approval_store": store, "audit": Audit(),
               "canonical_digest": lambda *args: "digest", "Denied": Denied,
               "NeedsApproval": NeedsApproval}
        exec(compile(snippet("tracks/ai/content/07-security/guardrails.html", "scoped_tool_policy.py"), "guardrail", "exec"), env)
        authorize = env["authorize_call"]
        args = {"tenant_id": "tenant-a"}
        with self.assertRaises(NeedsApproval):
            authorize("principal", "write_record", {**args, "approved_by": "attacker"})
        with self.assertRaises(Denied):
            authorize("principal", "write_record", {"tenant_id": "tenant-b"}, approval_id="valid")
        for invalid_id in ("mismatched", "expired"):
            with self.subTest(approval=invalid_id), self.assertRaises(NeedsApproval):
                authorize("principal", "write_record", args, approval_id=invalid_id)
        claims.read_only = True
        with self.assertRaises(Denied):
            authorize("principal", "write_record", args, approval_id="valid")
        claims.read_only = False
        claims.tool_permissions = set()
        with self.assertRaises(Denied):
            authorize("principal", "write_record", args, approval_id="valid")
        claims.tool_permissions = {"write_record"}
        self.assertEqual(authorize("principal", "write_record", args, approval_id="valid"), ("dispatched", "tenant-a"))
        with self.assertRaises(NeedsApproval):
            authorize("principal", "write_record", args, approval_id="valid")

    def test_egress_policy_checks_host_scheme_credentials_port_and_secret_heuristic(self):
        env = {"Blocked": Blocked}
        exec(compile(snippet("tracks/ai/content/07-security/injection.html", "egress_check.py"), "egress", "exec"), env)
        check = env["egress_check"]
        self.assertEqual(check({"url": "https://api.mycompany.int/v1"})["url"], "https://api.mycompany.int/v1")
        for value in ("https://api.mycompany.int.evil.test/", "https://user@api.mycompany.int/",
                      "https://api.mycompany.int:8443/", "http://api.mycompany.int/", "Bearer tokenvalue123"):
            with self.subTest(value=value), self.assertRaises(Blocked):
                check({"url": value} if value.startswith("http") else {"note": value})


if __name__ == "__main__":
    unittest.main()
