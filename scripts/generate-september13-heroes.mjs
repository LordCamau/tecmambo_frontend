import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const outputDirectory = new URL("../apps/web/public/articles/september13/", import.meta.url);

const stories = [
  { file: "anthropic-kenya-ai-influence-operation.webp", eyebrow: "AI AND ETHICS", title: "One operator. Fifty posts at a time.", detail: "How Claude was misused to simulate Kenyan grassroots support", colors: ["#f46b45", "#111827"], motif: "network" },
  { file: "absa-bank-kenya-yusuf-omari.webp", eyebrow: "KENYA BANKING", title: "From finance chief to chief executive", detail: "Inside Yusuf Omari's appointment at Absa Bank Kenya", colors: ["#e11d48", "#4c0519"], motif: "bars" },
  { file: "kenya-fortinet-cybersecurity.webp", eyebrow: "CYBERSECURITY", title: "Kenya's cyber talks are adding up", detail: "Fortinet is one part of a wider national security push", colors: ["#0ea5e9", "#082f49"], motif: "shield" },
  { file: "kenya-digital-learning-smartboards.webp", eyebrow: "DIGITAL LEARNING", title: "10,382 schools, one phased rollout", detail: "What Kenya's smartboard programme has actually delivered", colors: ["#22c55e", "#052e16"], motif: "screen" },
  { file: "gemini-desktop-windows.webp", eyebrow: "AI SOFTWARE", title: "Gemini comes to Windows", detail: "A native app for Windows 10 and Windows 11", colors: ["#6366f1", "#172554"], motif: "window" },
  { file: "nubia-navix-ultra-doubao.webp", eyebrow: "AGENTIC PHONE", title: "The AI agent meets the app gatekeeper", detail: "NaviX Ultra arrives after its prototype hit access blocks", colors: ["#f97316", "#431407"], motif: "phone" },
  { file: "beyondmimic-humanoid-robot.webp", eyebrow: "ROBOTICS RESEARCH", title: "From motion capture to a spin kick", detail: "What BeyondMimic really teaches a humanoid robot", colors: ["#a855f7", "#2e1065"], motif: "robot" },
  { file: "hierascaffold-4d-lidar.webp", eyebrow: "AUTONOMOUS SYSTEMS", title: "Building a city in four dimensions", detail: "HieraScaffold separates the static world from what moves", colors: ["#14b8a6", "#042f2e"], motif: "lidar" },
  { file: "android-password-manager-transfer.webp", eyebrow: "ANDROID SECURITY", title: "Passwords move without the risky file", detail: "Credential transfers now work directly between supported apps", colors: ["#84cc16", "#1a2e05"], motif: "key" }
];

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function motif(name) {
  const common = 'fill="none" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"';
  if (name === "network") return `<g ${common} opacity=".84"><circle cx="820" cy="178" r="42"/><circle cx="700" cy="334" r="34"/><circle cx="916" cy="356" r="30"/><path d="M790 212 724 307M849 215l54 112M735 340l149 13"/></g>`;
  if (name === "bars") return `<g fill="white" opacity=".84"><rect x="685" y="300" width="56" height="100" rx="8"/><rect x="770" y="236" width="56" height="164" rx="8"/><rect x="855" y="156" width="56" height="244" rx="8"/></g>`;
  if (name === "shield") return `<path d="M800 118 934 170v88c0 90-51 145-134 172-83-27-134-82-134-172v-88z" ${common} opacity=".86"/><path d="m742 269 40 40 81-88" ${common}/>`;
  if (name === "screen") return `<g ${common} opacity=".88"><rect x="657" y="135" width="285" height="210" rx="18"/><path d="M745 405h110M800 346v59M705 194h189M705 239h104"/></g>`;
  if (name === "window") return `<g ${common} opacity=".88"><rect x="665" y="132" width="278" height="278" rx="22"/><path d="M804 138v266M671 271h266"/></g>`;
  if (name === "phone") return `<g ${common} opacity=".88"><rect x="715" y="78" width="174" height="364" rx="30"/><path d="M770 115h64M775 397h54"/><circle cx="802" cy="255" r="57"/></g>`;
  if (name === "robot") return `<g ${common} opacity=".88"><circle cx="801" cy="118" r="48"/><path d="M801 168v123M801 204l-90 58M801 205l91 56M801 291l-62 119M801 291l88 91M755 105h2M846 105h2"/></g>`;
  if (name === "lidar") return `<g ${common} opacity=".78"><circle cx="800" cy="270" r="42"/><circle cx="800" cy="270" r="104"/><circle cx="800" cy="270" r="166"/><path d="M800 270 930 165M800 270l153 70M800 270 701 139M800 270 675 382"/></g>`;
  return `<g ${common} opacity=".88"><circle cx="746" cy="264" r="58"/><path d="M800 264h145M883 264v49M928 264v35"/></g>`;
}

function svg(story) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="520" viewBox="0 0 1040 520">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${story.colors[0]}"/><stop offset="1" stop-color="${story.colors[1]}"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-opacity=".25"/></filter></defs>
    <rect width="1040" height="520" fill="url(#g)"/>
    <circle cx="912" cy="58" r="240" fill="white" opacity=".045"/><circle cx="862" cy="420" r="255" fill="white" opacity=".035"/>
    <g filter="url(#s)">${motif(story.motif)}</g>
    <text x="72" y="88" fill="white" opacity=".86" font-family="Arial,Helvetica,sans-serif" font-size="19" font-weight="700" letter-spacing="3">${escapeXml(story.eyebrow)}</text>
    <text x="72" y="174" fill="white" font-family="Arial,Helvetica,sans-serif" font-size="46" font-weight="800"><tspan x="72">${escapeXml(story.title.split(" ").slice(0, 5).join(" "))}</tspan><tspan x="72" dy="56">${escapeXml(story.title.split(" ").slice(5).join(" "))}</tspan></text>
    <text x="72" y="342" fill="white" opacity=".88" font-family="Arial,Helvetica,sans-serif" font-size="22"><tspan x="72">${escapeXml(story.detail.split(" ").slice(0, 8).join(" "))}</tspan><tspan x="72" dy="32">${escapeXml(story.detail.split(" ").slice(8).join(" "))}</tspan></text>
    <text x="72" y="460" fill="white" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="700" letter-spacing="2">tecMAMBO ORIGINAL</text>
  </svg>`;
}

await mkdir(outputDirectory, { recursive: true });
for (const story of stories) {
  await sharp(Buffer.from(svg(story))).webp({ quality: 86, effort: 6 }).toFile(fileURLToPath(new URL(story.file, outputDirectory)));
}
