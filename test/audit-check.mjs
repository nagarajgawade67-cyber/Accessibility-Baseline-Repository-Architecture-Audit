import fs from "node:fs";

const csv = fs.readFileSync(new URL("../docs/audit/accessibility-audit.csv", import.meta.url), "utf8");
const required = ["issue_id","page_or_component","wcag_reference","evidence","severity","user_impact","recommended_fix","owner","status"];
const header = csv.split(/\r?\n/, 1)[0].split(",");
for (const field of required) {
  if (!header.includes(field)) throw new Error(`Missing worksheet field: ${field}`);
}
console.log("Audit worksheet structure: OK");
