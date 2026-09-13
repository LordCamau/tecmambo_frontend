import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, Format, RegionTerm, Tag } from "@/lib/types";

type BuildArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };
type Parsed = {
  number: number;
  slug: string;
  format: Format;
  title: string;
  seoTitle: string;
  description: string;
  focusKeyphrase: string;
  secondaryKeywords: string[];
  originalValue: string;
  byline: string;
  quickAnswer: string;
  body: string[];
  faq: Array<{ question: string; answer: string }>;
};

const sourcePath = resolve(process.cwd(), "../../content/articles/tecmambo-sept10-12-roundup-2026-09-12.md");

const scheduleBySlug: Record<string, string> = {
  "hierascaffold-4d-lidar-autonomous-vehicles": "2026-09-13T00:46:00+03:00",
  "google-gemini-desktop-app-windows-10-11": "2026-09-13T01:13:00+03:00",
  "kenya-fortinet-ai-cybersecurity-talks": "2026-09-13T01:39:00+03:00",
  "beyondmimic-humanoid-robot-sprint-spin-kick": "2026-09-13T02:04:00+03:00",
  "kenya-digital-learning-junior-schools-status": "2026-09-13T02:31:00+03:00",
  "nubia-navix-ultra-doubao-ai-agent-phone": "2026-09-13T02:58:00+03:00",
  "android-password-manager-interoperability-transfer": "2026-09-13T03:25:00+03:00",
  "absa-bank-kenya-yusuf-omari-ceo-appointment": "2026-09-13T03:52:00+03:00",
  "anthropic-kenya-ai-influence-operation-2027-election": "2026-09-13T04:19:00+03:00"
};

const taxonomyBySlug: Record<string, { topics: string[]; brands: string[]; regions?: string[] }> = {
  "anthropic-kenya-ai-influence-operation-2027-election": { topics: ["ai-ethics", "kenya", "politics"], brands: ["anthropic", "openai"], regions: ["kenya"] },
  "absa-bank-kenya-yusuf-omari-ceo-appointment": { topics: ["business", "kenya", "banking"], brands: ["absa-bank-kenya", "im-bank"], regions: ["kenya"] },
  "kenya-fortinet-ai-cybersecurity-talks": { topics: ["policy", "kenya", "cybersecurity"], brands: ["fortinet"], regions: ["kenya"] },
  "kenya-digital-learning-junior-schools-status": { topics: ["kenya", "policy", "education"], brands: [], regions: ["kenya"] },
  "google-gemini-desktop-app-windows-10-11": { topics: ["ai", "software", "global"], brands: ["google", "windows", "microsoft"] },
  "nubia-navix-ultra-doubao-ai-agent-phone": { topics: ["smartphones", "china", "ai", "agentic-ai"], brands: ["nubia", "bytedance", "zte"] },
  "beyondmimic-humanoid-robot-sprint-spin-kick": { topics: ["ai", "robotics", "research"], brands: ["unitree"] },
  "hierascaffold-4d-lidar-autonomous-vehicles": { topics: ["ai", "research", "automotive-technology", "autonomous-vehicles"], brands: ["waymo"] },
  "android-password-manager-interoperability-transfer": { topics: ["security", "software", "global", "android", "interoperability"], brands: ["google", "fido-alliance", "1password", "bitwarden", "dashlane"] }
};

const heroBySlug: Record<string, Article["image"]> = {
  "anthropic-kenya-ai-influence-operation-2027-election": { src: "/articles/september13/anthropic-kenya-ai-influence-operation.webp", alt: "Editorial illustration about AI-generated political posts in Kenya, showing connected accounts without depicting a real person.", caption: "Anthropic identified a single operator using Claude to create batches of political posts aimed at Kenyan audiences.", credit: "tecMAMBO", width: 1040, height: 520, type: "image/webp" },
  "absa-bank-kenya-yusuf-omari-ceo-appointment": { src: "/articles/september13/absa-bank-kenya-yusuf-omari.webp", alt: "Editorial illustration representing the leadership transition at Absa Bank Kenya.", caption: "Absa Bank Kenya confirmed Yusuf Omari as Managing Director and CEO after a period as interim chief.", credit: "tecMAMBO", width: 1040, height: 520, type: "image/webp" },
  "kenya-fortinet-ai-cybersecurity-talks": { src: "/articles/september13/kenya-fortinet-cybersecurity.webp", alt: "Editorial illustration of a digital shield representing Kenya's cybersecurity talks with Fortinet.", caption: "Kenya's talks with Fortinet form part of a broader year of cybersecurity diplomacy and institution building.", credit: "tecMAMBO", width: 1040, height: 520, type: "image/webp" },
  "kenya-digital-learning-junior-schools-status": { src: "/articles/september13/kenya-digital-learning-smartboards.webp", alt: "Editorial illustration of a classroom smartboard for Kenya's digital learning rollout.", caption: "The government programme covers 10,382 public junior schools and is being delivered in phases.", credit: "tecMAMBO", width: 1040, height: 520, type: "image/webp" },
  "google-gemini-desktop-app-windows-10-11": { src: "/articles/september13/gemini-desktop-windows.webp", alt: "Editorial illustration of the Gemini desktop app on a four-pane Windows interface.", caption: "Google's native Gemini app supports Windows 10 and Windows 11.", credit: "tecMAMBO", width: 1040, height: 520, type: "image/webp" },
  "nubia-navix-ultra-doubao-ai-agent-phone": { src: "/articles/september13/nubia-navix-ultra-doubao.webp", alt: "Editorial illustration of a phone with an AI agent interface and an access control symbol.", caption: "Nubia's NaviX Ultra will put ByteDance's Doubao assistant at the centre of the phone experience.", credit: "tecMAMBO", width: 1040, height: 520, type: "image/webp" },
  "beyondmimic-humanoid-robot-sprint-spin-kick": { src: "/articles/september13/beyondmimic-humanoid-robot.webp", alt: "Editorial illustration of a humanoid robot performing an agile movement.", caption: "BeyondMimic combines motion-specific control policies with a diffusion model that composes learned skills.", credit: "tecMAMBO", width: 1040, height: 520, type: "image/webp" },
  "hierascaffold-4d-lidar-autonomous-vehicles": { src: "/articles/september13/hierascaffold-4d-lidar.webp", alt: "Editorial illustration of LiDAR rings scanning a changing urban environment.", caption: "HieraScaffold generates synthetic LiDAR scenes by separating static structures from moving objects.", credit: "tecMAMBO", width: 1040, height: 520, type: "image/webp" },
  "android-password-manager-interoperability-transfer": { src: "/articles/september13/android-password-manager-transfer.webp", alt: "Editorial illustration of a key representing direct password manager transfers on Android.", caption: "Android now supports direct credential transfers between participating password managers without an export file.", credit: "tecMAMBO", width: 1040, height: 520, type: "image/webp" }
};

const sourcesBySlug: Record<string, Article["sources"]> = {
  "anthropic-kenya-ai-influence-operation-2027-election": [
    { label: "Anthropic: Detecting and countering misuse of AI, September 2026", url: "https://www.anthropic.com/threat-intelligence-report-september-2026" }
  ],
  "absa-bank-kenya-yusuf-omari-ceo-appointment": [
    { label: "Absa Bank Kenya: official company update", url: "https://ke.linkedin.com/company/absa-bank-kenya" },
    { label: "Business Today: Yusuf Omari confirmed as Absa Bank Kenya MD and CEO", url: "https://businesstoday.co.ke/yusuf-omari-confirmed-as-absa-bank-kenya-md-and-ceo/" },
    { label: "TechCabal: I&M appoints departing Absa chief Abdi Mohamed", url: "https://techcabal.com/2026/06/29/im-taps-departing-absa-chief-abdi-mohamed-as-kenya-ceo/" }
  ],
  "kenya-fortinet-ai-cybersecurity-talks": [
    { label: "TechAfrica News: Kenya and Fortinet discuss stronger cybersecurity", url: "https://techafricanews.com/2026/09/11/kenya-and-fortinet-discuss-stronger-cybersecurity-and-ai-driven-threat-defence/" }
  ],
  "kenya-digital-learning-junior-schools-status": [
    { label: "Kenya ICT Ministry: 10,382 schools set to benefit from laptops and smart boards", url: "https://ict.go.ke/10382-schools-set-benefit-new-laptops-and-smart-boards" },
    { label: "Kenya ICT Ministry: June 9 rollout remarks", url: "https://ict.go.ke/sites/default/files/2026-06/REMARKS%20BY%20MR%20STEPHEN%20ISABOKE%2C%20EBS%20PRINCIPAL%20SECRETARY%20FOR%20BROADCASTING%20AND%20TELECOMMUNICATIONS%2C%20MINISTRY%20OF%20INFORMATION%2C%20COMMUNICATIONS%20AND%20THE%20DIGITAL%20ECONOMY%20DURING%20THE%20FLAG-OFF%20OF%20THE%20FIRST%20CONSIGNMENT%20OF%20LAPTOPS%20TO%20SCHOOLS%209%20JUNE.pdf" }
  ],
  "google-gemini-desktop-app-windows-10-11": [
    { label: "Google: Gemini app now available on Windows", url: "https://blog.google/innovation-and-ai/products/gemini-app/gemini-app-now-on-windows/" },
    { label: "Google Help: Gemini desktop app system requirements", url: "https://support.google.com/gemini/answer/18263854?hl=en" },
    { label: "Google: Gemini app now available on macOS", url: "https://blog.google/innovation-and-ai/products/gemini-app/gemini-app-now-on-mac-os/" }
  ],
  "nubia-navix-ultra-doubao-ai-agent-phone": [
    { label: "TechNode: Nubia sets September 16 launch for Doubao-powered NaviX Ultra", url: "https://technode.com/2026/09/07/nubia-navix-ultra-ai-agent-phone/" },
    { label: "Yicai Global: WeChat and banking apps restrict devices with Doubao assistant", url: "https://www.yicaiglobal.com/news/wechat-some-chinese-banking-apps-reportedly-restrict-devices-with-bytedances-new-ai-voice-assistant" }
  ],
  "beyondmimic-humanoid-robot-sprint-spin-kick": [
    { label: "BeyondMimic research project", url: "https://beyondmimic.github.io/" },
    { label: "arXiv: BeyondMimic", url: "https://arxiv.org/abs/2508.08241" },
    { label: "Science Robotics: BeyondMimic", url: "https://www.science.org/doi/10.1126/scirobotics.adx8924" }
  ],
  "hierascaffold-4d-lidar-autonomous-vehicles": [
    { label: "Singapore University of Technology and Design: HieraScaffold research release", url: "https://www.eurekalert.org/news-releases/1143352" },
    { label: "ICML 2026: HieraScaffold conference listing", url: "https://icml.cc/Downloads/2026" }
  ],
  "android-password-manager-interoperability-transfer": [
    { label: "Google: Switch password managers without downloading a file", url: "https://blog.google/products-and-platforms/platforms/android/switch-password-managers/" },
    { label: "FIDO Alliance: Credential Exchange specifications overview", url: "https://fidoalliance.org/fido-alliance-credential-exchange-specifications-overview/" },
    { label: "Apple Developer: Securely import and export passkeys", url: "https://developer.apple.com/videos/play/wwdc2025/279/" },
    { label: "Dashlane: Credential Exchange compatibility", url: "https://support.dashlane.com/hc/en-us/articles/32779418812050-Import-your-data-to-Dashlane-using-the-Credential-Exchange-Protocol-CXP" }
  ]
};

const enrichmentBySlug: Record<string, string[]> = {
  "anthropic-kenya-ai-influence-operation-2027-election": [
    "## How to read an AI threat report responsibly",
    "A provider threat report is useful evidence about activity observed inside that provider's systems. It is not a complete census of a political campaign, and it cannot establish who ultimately funded an operator unless the investigation finds that evidence. Anthropic assigned the Kenya activity the identifier GTG-54004, described the prompts and outputs it observed, and explained the enforcement action it took. That supports conclusions about how Claude was used. It does not support jumping from favorable posts to an allegation against the public official named in those posts.",
    "The distinction also matters for newsroom language. Coordinated accounts are not automatically evidence of many actors or automated posting infrastructure, and AI-generated text is not proof that every account was fully automated. The documented behavior was a single operator requesting batches of posts intended to look independent. Keeping those terms narrow makes the account more accurate and helps readers separate confirmed platform evidence from political speculation.",
    "## What Kenyan platforms and campaigns can do before 2027",
    "Platforms can look for repeated prompt patterns, identical batch sizes, synchronized hashtags, and clusters of recently created accounts. Campaigns and public offices can publish clear denials when support appears inauthentic and preserve records that help investigators trace origin. Newsrooms can avoid amplifying a hashtag solely because it trends, disclose when a claim comes from a platform report, and state what the report does not prove. Those steps will not stop every operation, but they raise the cost of turning cheap generated copy into apparent public consensus.",
    "For readers, the most reliable signals remain provenance and corroboration. A large volume of similar posts is not a substitute for named sources, verifiable documents, or independently reported public opinion. The Kenya case is important precisely because it shows the attempt can be inexpensive even when the impact is small. That is a reason for better verification, not a reason to assume every political post is synthetic."
    ,"## What Anthropic did after detection",
    "Anthropic says it removed the accounts and organization associated with the activity and added behavioral detections intended to identify similar misuse. The report also notes that information from OpenAI helped connect related activity. That cross-company cooperation matters because an operator blocked on one service can move to another, change account names, and repeat the same workflow. Shared indicators can shorten the time between an attempt starting and a platform recognizing the pattern.",
    "Enforcement still leaves a public accountability gap. Platforms can disclose enough detail for researchers and election observers to understand a tactic without publishing instructions that make abuse easier. Regular updates using consistent labels, dates, confidence language, and reach estimates would help Kenya compare incidents over time instead of treating every disclosure as an isolated alarm. That record would also help journalists correct early claims when later evidence changes the picture."
  ],
  "absa-bank-kenya-yusuf-omari-ceo-appointment": [
    "## The numbers Omari now has to defend",
    "A chief financial officer promoted to chief executive inherits unusual accountability for the starting balance sheet. Omari already helped shape capital allocation, expense discipline, and financial reporting, so investors can judge the next phase against decisions made during his finance tenure rather than granting a long reset period. The appointment therefore puts continuity under a measurable test: can recent efficiency improvements translate into durable revenue growth while credit costs and competition remain demanding?",
    "Kenyan banking is also more than a branch expansion contest. Mobile channels, agency banking, cross-border payments, and small-business credit all change the cost and risk profile of growth. Absa's challenge is to increase digital use without treating transaction volume as the same thing as profitable customer relationships. Our earlier comparison of [Equity and Absa's H1 2026 results](/business/equity-absa-h1-2026-results-digital-banking-kenya) shows why that distinction matters.",
    "## What customers and investors should watch next",
    "The first useful signals will be management appointments, medium-term targets, and the next set of results rather than the ceremonial language around the promotion. Investors should watch the cost-to-income ratio, loan growth, asset quality, return on equity, and capital buffers. Customers should pay closer attention to service reliability, digital fees, dispute resolution, and whether product changes make credit or payments meaningfully easier to use.",
    "Omari's long tenure reduces transition risk, but it also raises the standard for execution. He knows the bank, its regulators, and its operating constraints. If Absa changes direction, it should be possible to identify the decision quickly. If it stays the course, the board will expect a cleaner link between the efficiency gains credited to his time as CFO and the growth expected from him as CEO."
  ],
  "kenya-fortinet-ai-cybersecurity-talks": [
    "## AI can help defenders, but it is not a security agency",
    "AI-assisted security tools can group alerts, detect unusual behavior, and help analysts prioritize incidents faster than a manual queue. They can also produce false positives, miss unfamiliar attacks, and become another complex system that needs oversight. A national cyber strategy therefore cannot be reduced to buying an AI product. It needs incident reporting rules, trained responders, clear authority, procurement controls, and a way to coordinate government, telecom operators, banks, cloud providers, and critical infrastructure.",
    "That is why the institutional part of Kenya's discussion matters more than the vendor name. A dedicated agency would need a published mandate that avoids duplicating existing functions, protects civil liberties, and establishes who can order action during a serious incident. Without that framework, better threat intelligence can still arrive at the wrong desk or sit unused because organizations are unsure what they are allowed to share.",
    "## The questions a future agreement should answer",
    "If the talks produce a contract or formal partnership, the public should be able to see the scope, duration, procurement route, data handling rules, performance measures, and exit terms. Any system processing government network telemetry also needs safeguards covering data location, access logs, independent audits, and the treatment of personal information. Those are ordinary governance questions, not objections to using advanced security tools.",
    "For now, the available evidence supports a narrower conclusion: Kenya and Fortinet discussed strategic cooperation, not a completed deployment. The next newsworthy milestone would be a formal instrument, budget line, legislative proposal, or operational launch. Until one appears, describing the meeting as part of a longer policy process is more useful than presenting it as a finished cybersecurity upgrade.",
    "The public record should also distinguish capacity building from product procurement. Training analysts, running exercises, and sharing threat information can proceed without locking the state into one vendor's platform. Publishing that distinction would make future announcements easier to evaluate and reduce the risk that a general policy conversation is mistaken for a binding commercial decision. That clarity matters for public trust."
  ],
  "kenya-digital-learning-junior-schools-status": [
    "## Hardware is only the first checkpoint",
    "A smartboard can improve a lesson only when the classroom has reliable electricity, appropriate digital content, a trained teacher, and a maintenance path when equipment fails. Procurement totals are easy to announce, but those supporting conditions determine whether a device becomes daily infrastructure or locked storage. A serious evaluation should therefore count working installations and classroom use, not merely equipment dispatched from a central warehouse.",
    "Connectivity matters too, but not every lesson should depend on a live connection. Schools need approved materials that can work offline, secure update processes, and clear rules for student data. Teachers need time to practice with the equipment before being assessed on its use. County-level reporting can make these dependencies visible by showing delivery, installation, training, uptime, and repair status separately.",
    "## How progress should be measured",
    "The national figure of 10,382 schools describes intended coverage. A transparent progress dashboard would add the number delivered, installed, connected, actively used, and repaired, with dates for each county. It should also disclose device specifications, warranty terms, content availability, accessibility support, and the number of teachers trained for each installation. That would let parents and school leaders distinguish a shipment milestone from a functioning classroom service.",
    "Learning outcomes should remain the final measure. Useful indicators could include teacher adoption, student access to curriculum materials, lesson preparation time, and improvements in specific subjects, while controlling for other changes. None of that diminishes the importance of the June launch. It simply sets a higher standard for judging a publicly funded digital programme than the number printed on a distribution plan.",
    "Parents and school boards can help verify delivery locally by recording when equipment arrives, whether it is installed, how often it is used, and how quickly faults are resolved. Aggregated reporting from schools would give the national programme an evidence base that is harder to produce from procurement records alone and would highlight counties that need extra infrastructure or training support. It would also help the ministry identify recurring technical failures before warranties expire and show whether replacement parts reach rural schools on time."
  ],
  "google-gemini-desktop-app-windows-10-11": [
    "## Privacy and workplace controls still matter",
    "A desktop shortcut makes an assistant easier to reach, but convenience does not change the sensitivity of the material users paste into it. Employees should follow their organization's rules before sharing contracts, customer records, source code, or internal email. Connected Workspace features can be useful for summarization, yet they also make account permissions and administrator controls part of the security boundary. Users should review which services are connected and remove access they no longer need.",
    "The app's modest storage requirement does not mean every task runs locally. Gemini remains a cloud service for many capabilities, so connectivity, account type, and Google's current data handling terms can affect the experience. Anyone working with confidential information should check the terms attached to the specific consumer, education, or business account rather than assuming one policy covers every edition.",
    "## What Windows users should check before installing",
    "First confirm the PC runs Windows 10 or newer, has at least 8GB of RAM, and has enough free storage. Then confirm the Google account is eligible for the desired feature in the user's country and language. A paid plan may raise limits without making a region-restricted feature available. The cleanest test is the feature list displayed inside the signed-in account, not a list copied from another market.",
    "Windows 10 support is valuable, but it should not be read as a reason to ignore operating-system security. Microsoft ended free support for most Windows 10 editions in October 2025. People who remain on the platform should understand their update path, especially on a computer used for work or financial accounts. Gemini's availability extends the assistant's reach; it does not extend Microsoft's security lifecycle for the operating system underneath it.",
    "For African users, support for older PCs can reduce an immediate access barrier. The practical experience will still depend on connection quality because many advanced requests require cloud processing. A lightweight installer is helpful, but bandwidth use, latency, and feature availability will determine whether the desktop app is more useful than the browser in day-to-day work."
  ],
  "nubia-navix-ultra-doubao-ai-agent-phone": [
    "## Permission is the product",
    "Traditional voice assistants mostly answer questions or trigger functions exposed through approved interfaces. A screen-operating agent is different because usefulness depends on seeing what another app shows and acting inside it. That collapses the distance between assistant, accessibility tool, and automation framework. The same capability can save time for a user and trigger fraud controls for a bank because both outcomes rely on synthetic taps that resemble remote control.",
    "A durable design needs more than a one-time permission prompt. Users need a visible record of what the agent opened, which data it read, what actions it attempted, and where confirmation was required. App developers need a reliable way to allow low-risk tasks while blocking payments, identity checks, security settings, or messages that should never be sent without explicit approval.",
    "## What to verify at the September 16 launch",
    "The final launch should settle the processor, display, camera, battery, charging, price, memory configurations, and sale date. More important, Nubia and ByteDance need to explain whether the retail software still depends on INJECT_EVENTS, which apps are compatible, how on-screen information is processed, and whether sensitive tasks are excluded by policy or by technical enforcement. Pre-launch specification reports should not be mistaken for that final disclosure.",
    "Availability outside China is another open question. Doubao is built around ByteDance's Chinese AI ecosystem and local app relationships, so international expansion would require different services, regulatory reviews, and partner agreements. The NaviX Ultra can still be influential even if it remains domestic. Its launch will provide a real test of whether an agent phone can negotiate app trust at consumer scale rather than only perform a controlled stage demonstration."
  ],
  "beyondmimic-humanoid-robot-sprint-spin-kick": [
    "## One training recipe does not mean one controller",
    "The paper's architecture is easy to flatten into an inaccurate claim. BeyondMimic uses a common reinforcement-learning recipe and shared hyperparameters, but the low-level tracking stage produces motion-specific policies. The unifying step comes later: a conditional diffusion policy can compose those primitives to pursue task objectives. That is more scalable than hand-engineering every sequence, but it is not one universal controller learning every movement in a single pass.",
    "This distinction helps explain why the physical demonstrations matter. Simulation lets researchers train at scale and expose a controller to many variations. Real hardware introduces motor limits, latency, imperfect sensing, balance errors, and impacts. Transferring representative motions to the Unitree G1 tests whether the learned behavior survives that gap, even though it does not prove reliability across every surface or unpredictable environment.",
    "## What would count as the next breakthrough",
    "The next step is not a more dramatic kick. It is longer task sequences with recovery from interruptions, interaction with unfamiliar objects, safe operation near people, and consistent performance across different robot bodies. Researchers will also need ways to constrain generated motion so that a high-level plan cannot demand forces, speeds, or contacts that the hardware cannot safely execute.",
    "BeyondMimic is best understood as infrastructure for robot learning. The public-facing clips demonstrate agility, while the research contribution is a pipeline that turns human motion references into reusable control skills and composes them toward new goals. That is a narrower claim than general-purpose humanoid intelligence, but it is also a more concrete and testable advance.",
    "Independent replication on different machines will show how much of the result comes from the general method and how much depends on the Unitree G1 setup. That is normal for research at this stage, and it is the evidence to watch next."
  ],
  "hierascaffold-4d-lidar-autonomous-vehicles": [
    "## Why a hierarchical representation saves work",
    "A LiDAR sensor records points on visible surfaces, not every empty coordinate in a city-sized volume. Modeling all that empty space wastes memory and computation. HieraScaffold concentrates representation near relevant surfaces and divides the scene into a static scaffold and dynamic objects. The hierarchy gives the generator a stable street layout first, then a structured way to place motion within it over time.",
    "That separation also matches how downstream perception systems reason. Buildings and road geometry usually persist, while vehicles, cyclists, and pedestrians move through them. A model that preserves both the stable context and temporally coherent movement can generate sequences that are more useful for training than isolated frames that look plausible but contradict one another from moment to moment.",
    "## Synthetic data still needs a reality check",
    "Generated scenes can increase coverage of uncommon conditions, but they can also reproduce the blind spots of their training data or introduce artifacts that a detector learns by accident. Teams need held-out real-world benchmarks, scenario diversity checks, and analysis by weather, geography, object type, and distance. Improvement on KITTI-360 and Waymo Open is encouraging evidence, not a universal safety certificate.",
    "For African cities, the open question is domain coverage. Road markings, vehicle fleets, pedestrian behavior, lighting, and street geometry can differ from the datasets most commonly used in autonomous-driving research. A scalable generator could eventually help, but only if it is trained and evaluated with representative local data. HieraScaffold reduces the cost of constructing synthetic sequences; it does not remove the need to measure whether those sequences resemble the places where a system will operate."
  ],
  "android-password-manager-interoperability-transfer": [
    "## What moves and what users should verify",
    "The new exchange can include passwords and passkeys, but the exact set of imported records depends on both participating apps. After a transfer, users should verify several important accounts before deleting anything from the old manager. They should also confirm that passkeys work on the destination, recovery information is current, and autofill is assigned to the intended provider. A successful transfer message is not a substitute for testing access.",
    "Direct exchange removes the most obvious risk of a plain CSV sitting in Downloads. It does not make credential migration risk-free. The destination vault still needs a strong master password where applicable, multifactor authentication, current software, and a recovery plan. Users should begin the process from inside the official destination app and reject unexpected prompts that arrive through email, messages, or a browser advertisement.",
    "## Compatibility is more specific than Android 8",
    "Google says the platform capability reaches Android 8 and newer, but partner apps can impose later requirements. Dashlane lists Android 10 or newer for its Credential Exchange import flow, while Bitwarden support can depend on a newer Android release and Google Play services build. That means two people with Android phones can see different options even when both use supported password managers.",
    "The right sequence is to update Android, Google Play services, and both password managers, then read the destination app's current support page. If the direct option is unavailable, do not assume an error or downgrade security settings to force it. Keep the old vault intact, wait for the compatible rollout, or use the provider's documented migration method while handling any export file carefully and deleting it securely after verification."
  ]
};

const internalLinksBySlug: Record<string, Array<{ text: string; href: string }>> = {
  "absa-bank-kenya-yusuf-omari-ceo-appointment": [{ text: "Equity and Absa's H1 2026 results", href: "/business/equity-absa-h1-2026-results-digital-banking-kenya" }]
};

function value(source: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, "m"));
  if (!match?.[1]) throw new Error(`Missing September 13 field: ${label}`);
  return match[1].trim().replace(/^`|`$/g, "");
}

function required<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing September 13 ${kind}: ${slug}`);
  return item;
}

function firstSentence(text: string) {
  return text.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim() ?? text;
}

function parseBundle(): Parsed[] {
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  if (/[—–�]/.test(source)) throw new Error("The September 13 source contains a prohibited dash or malformed character.");
  const blocks = source.split(/^# ARTICLE \d+\s*$/m).slice(1, 10).map((block) => block.trim().replace(/\n\n---[\s\S]*$/, "").trim());
  if (blocks.length !== 9) throw new Error(`Expected 9 September 13 articles, found ${blocks.length}.`);
  return blocks.map((block, index) => {
    const title = value(block, "H1");
    const bodyMatch = block.match(new RegExp(`^# ${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n\\n([\\s\\S]*?)\\n\\n## Sources\\n`, "m"));
    if (!bodyMatch?.[1]) throw new Error(`Malformed September 13 article: ${title}`);
    const parts = bodyMatch[1].trim().split(/\n{2,}/).map((part) => part.trim());
    const quickAnswer = parts.shift()?.match(/^\*\*Quick answer:\*\*\s*([\s\S]+)$/)?.[1]?.trim();
    if (!quickAnswer) throw new Error(`Missing September 13 quick answer: ${title}`);
    const faqIndex = parts.indexOf("## Frequently asked questions");
    if (faqIndex < 0) throw new Error(`Missing September 13 FAQ: ${title}`);
    const faqParts = parts.splice(faqIndex).slice(1);
    const faq = faqParts.map((part) => {
      const [questionLine, ...answerLines] = part.split("\n");
      const question = questionLine?.match(/^\*\*(.+\?)\*\*$/)?.[1];
      const answer = answerLines.join(" ").trim();
      if (!question || !answer) throw new Error(`Malformed September 13 FAQ: ${title}`);
      return { question, answer };
    });
    const slug = value(block, "Suggested slug");
    return {
      number: index + 1,
      slug,
      format: "explainer",
      title,
      seoTitle: value(block, "SEO title"),
      description: value(block, "Meta description"),
      focusKeyphrase: value(block, "Focus keyphrase"),
      secondaryKeywords: value(block, "Secondary keywords").split(",").map((keyword) => keyword.trim()),
      originalValue: value(block, "Original value"),
      byline: value(block, "Byline"),
      quickAnswer,
      body: [...parts, ...(enrichmentBySlug[slug] ?? [])],
      faq
    };
  });
}

const parsedArticles = parseBundle();

export const editorialSeptember13ImportReport = parsedArticles.map((article) => ({
  article: article.number,
  slug: article.slug,
  byline: article.byline,
  categories: taxonomyBySlug[article.slug]?.topics ?? [],
  internalLinks: internalLinksBySlug[article.slug] ?? [],
  publicationStatus: "published" as const,
  outstandingGates: []
}));

export function buildEditorialSeptember13Articles({ authors, topics, brands, regions }: BuildArgs): Article[] {
  return parsedArticles.map((parsed) => {
    const taxonomy = taxonomyBySlug[parsed.slug];
    const publishedAt = scheduleBySlug[parsed.slug];
    const image = heroBySlug[parsed.slug];
    const sources = sourcesBySlug[parsed.slug];
    if (!taxonomy || !publishedAt || !image || !sources?.length) throw new Error(`Incomplete September 13 article mapping: ${parsed.slug}`);
    const words = [parsed.title, parsed.quickAnswer, ...parsed.body, ...parsed.faq.flatMap((item) => [item.question, item.answer])].join(" ").split(/\s+/).filter(Boolean).length;
    return {
      id: `editorial-september13-${parsed.number}`,
      slug: parsed.slug,
      format: parsed.format,
      contentFormat: "explainer",
      isNewsworthy: true,
      title: parsed.title,
      seo: { title: parsed.seoTitle, description: parsed.description, focusKeyphrase: parsed.focusKeyphrase, secondaryKeywords: parsed.secondaryKeywords },
      subhead: parsed.description,
      excerpt: firstSentence(parsed.quickAnswer),
      whyItMatters: parsed.originalValue,
      quickAnswer: parsed.quickAnswer,
      body: parsed.body,
      faq: parsed.faq,
      author: required(authors, parsed.byline === "Lulu Camau" ? "lulu-camau" : "tim-humphreys", "author"),
      publishedAt,
      updatedAt: publishedAt,
      readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
      image,
      tags: [...taxonomy.topics.map((slug) => required(topics, slug, "topic")), ...taxonomy.brands.map((slug) => required(brands, slug, "brand"))],
      regions: taxonomy.regions?.map((slug) => required(regions, slug, "region")),
      sources,
      sourceDisclosure: "Claims were checked against the linked primary and authoritative sources on September 13, 2026.",
      googleAdsEligible: true,
      workflowVersion: "gated",
      publicationStatus: "publish",
      editorialStatus: "published",
      indexingStatus: "index",
      excludeFromDiscovery: false,
      sourceChecked: true,
      humanEditorApproved: true,
      editor: "tecMAMBO Editorial Desk",
      reviewedAt: "2026-09-13T04:32:00+03:00",
      hasOriginalPhotography: false,
      originalValueType: "curated_context"
    };
  });
}
