import { parseLeadSubmission } from "@/lib/crm/core";
import { readJson } from "@/lib/crm/http";
import { assertCrmOrigin, crmFailure, crmJson, getCrmStore, requestRateKey } from "@/lib/crm/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    assertCrmOrigin(request);
    const store = getCrmStore();
    store.consumeLimits([{ key: "public:all", maximum: 200, windowSeconds: 3600 }, { key: `public:network:${requestRateKey(request)}`, maximum: process.env.CRM_TRUST_PROXY_HEADERS === "true" ? 12 : 30, windowSeconds: 3600 }]);
    const submission = parseLeadSubmission(await readJson(request));
    if (submission.website.trim()) return crmJson({ received: true }, 202);
    const replay = store.getLeadReplay(submission);
    if (replay) return crmJson(replay);
    store.consumeLimits([{ key: `public:email:${submission.email.toLowerCase()}`, maximum: 3, windowSeconds: 3600 }]);
    const result = store.createLead(submission);
    return crmJson(result, result.replayed ? 200 : 201);
  } catch (error) { return crmFailure(error); }
}
