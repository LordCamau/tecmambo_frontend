import type { Article, Author, Tag } from "@/lib/types";
import { loadDraftArticles } from "@/lib/article-drafts";
import { buildAfricanFintechNewsArticles } from "@/lib/african-fintech-news-2026";
import { buildAiArticles } from "@/lib/ai-articles";
import { buildAfricanTechNewsArticles } from "@/lib/african-tech-news-2026";
import { buildAfricanTechNewsJuly24Articles } from "@/lib/african-tech-news-july-24-2026";
import { buildAppleEcosystemArticles } from "@/lib/apple-ecosystem-news-2026";
import { buildAppleOpenAiLawsuitNewsArticles } from "@/lib/apple-openai-lawsuit-news-2026";
import { buildComputingLaptopNewsArticles } from "@/lib/computing-laptop-news-2026";
import { buildEditorialBundleArticles } from "@/lib/editorial-bundle-july-2026";
import { buildEditorialJuly13Articles } from "@/lib/editorial-bundle-july-13-2026";
import { buildEditorialJuly30Articles } from "@/lib/editorial-bundle-july-30-2026";
import { buildEditorialAugust1Articles } from "@/lib/editorial-bundle-august-1-2026";
import { buildEditorialAugust4Articles } from "@/lib/editorial-bundle-august-4-2026";
import { buildEditorialJuly7Articles } from "@/lib/editorial-bundle-july-7-2026";
import { buildEvMobilityNewsArticles } from "@/lib/ev-mobility-news-2026";
import { buildGlobalOpinionArticles } from "@/lib/global-opinion-essays-2026";
import { buildHardwareGadgetsNewsArticles } from "@/lib/hardware-gadgets-news-2026";
import { buildKenyaJuly9NewsArticles } from "@/lib/kenya-tech-news-july-9-2026";
import { buildKenyaJuly17NewsArticles } from "@/lib/kenya-tech-news-july-17-2026";
import { buildKenyaTechNewsArticles } from "@/lib/kenya-tech-news-july-2026";
import { buildOdysseyImaxArticle } from "@/lib/odyssey-imax-feature-2026";
import { buildPrimeValeArticle } from "@/lib/primevale-launch-article";
import { buildSamsungUnpackedJuly2026Article } from "@/lib/samsung-unpacked-july-2026-article";
import { buildVlcFreeSoftwareArticle } from "@/lib/vlc-free-software-story";
import { getRegion } from "@/lib/regions";

export const authors: Author[] = [
  {
    name: "Tim Humphreys",
    slug: "tim-humphreys",
    role: "tecMAMBO writer",
    bio: "Tim writes plain-English technology stories that connect specs, prices, products, and policy to everyday decisions.",
    avatar: "/authors/tim-humphreys.png",
    expertise: ["Phones", "Power & batteries", "Connectivity", "Reviews"]
  },
  {
    name: "Lulu Kiritu",
    slug: "lulu-kiritu",
    role: "Senior Writer and Editor",
    bio: "Lulu Kiritu is a Senior Writer and Editor at tecMAMBO, covering artificial intelligence. She is happiest turning a dense research paper into something you can actually use over lunch, and she writes about how AI shows up in real life, not just on stage at a launch. Based in Nairobi.",
    avatar: "/authors/lulu-kiritu.jpg",
    expertise: ["Artificial intelligence"]
  }
];

export const topics: Tag[] = [
  { name: "AI", slug: "ai", kind: "topic" },
  { name: "AI Shopping", slug: "ai-shopping", kind: "topic" },
  { name: "Agentic AI", slug: "agentic-ai", kind: "topic" },
  { name: "Android", slug: "android", kind: "topic" },
  { name: "Apps", slug: "apps", kind: "topic" },
  { name: "Smartphones", slug: "smartphones", kind: "topic" },
  { name: "E-Commerce", slug: "e-commerce", kind: "topic" },
  { name: "Quick Commerce", slug: "quick-commerce", kind: "topic" },
  { name: "Privacy", slug: "privacy", kind: "topic" },
  { name: "Computing", slug: "computing", kind: "topic" },
  { name: "Social Media", slug: "social-media", kind: "topic" },
  { name: "Entertainment", slug: "entertainment", kind: "topic" },
  { name: "Christopher Nolan", slug: "christopher-nolan", kind: "topic" },
  { name: "The Odyssey", slug: "the-odyssey", kind: "topic" },
  { name: "Hoyte van Hoytema", slug: "hoyte-van-hoytema", kind: "topic" },
  { name: "Film Cameras", slug: "film-cameras", kind: "topic" },
  { name: "70mm Film", slug: "70mm-film", kind: "topic" },
  { name: "Cinema Technology", slug: "cinema-technology", kind: "topic" },
  { name: "Film Technology", slug: "film-technology", kind: "topic" },
  { name: "Cameras", slug: "cameras", kind: "topic" },
  { name: "Cinema", slug: "cinema", kind: "topic" },
  { name: "TVs", slug: "tvs", kind: "topic" },
  { name: "Home Entertainment", slug: "home-entertainment", kind: "topic" },
  { name: "Digital Ownership", slug: "digital-ownership", kind: "topic" },
  { name: "Game Preservation", slug: "game-preservation", kind: "topic" },
  { name: "EVs & Mobility", slug: "evs-mobility", kind: "topic" },
  { name: "Autonomous Vehicles", slug: "autonomous-vehicles", kind: "topic" },
  { name: "Gaming", slug: "gaming", kind: "topic" },
  { name: "Wearables", slug: "wearables", kind: "topic" },
  { name: "Health Tech", slug: "health-tech", kind: "topic" },
  { name: "Smart Homes", slug: "smart-homes", kind: "topic" },
  { name: "Startups", slug: "startups", kind: "topic" },
  { name: "Business", slug: "business", kind: "topic" },
  { name: "Fintech", slug: "fintech", kind: "topic" },
  { name: "Banking", slug: "banking", kind: "topic" },
  { name: "Credit Cards", slug: "credit-cards", kind: "topic" },
  { name: "Policy", slug: "policy", kind: "topic" },
  { name: "Climate Policy", slug: "climate-policy", kind: "topic" },
  { name: "Climate Tech", slug: "climate-tech", kind: "topic" },
  { name: "Clean Cooking", slug: "clean-cooking", kind: "topic" },
  { name: "Energy", slug: "energy", kind: "topic" },
  { name: "Emerging Markets", slug: "emerging-markets", kind: "topic" },
  { name: "Cybersecurity", slug: "cybersecurity", kind: "topic" },
  { name: "Security Updates", slug: "security-updates", kind: "topic" },
  { name: "Audio", slug: "audio", kind: "topic" },
  { name: "Connectivity", slug: "connectivity", kind: "topic" },
  { name: "Routers", slug: "routers", kind: "topic" },
  { name: "Home Internet", slug: "home-internet", kind: "topic" },
  { name: "Networking", slug: "networking", kind: "topic" },
  { name: "Power & batteries", slug: "power-batteries", kind: "topic" },
  { name: "Smartphone Design", slug: "smartphone-design", kind: "topic" },
  { name: "Notifications", slug: "notifications", kind: "topic" },
  { name: "Google Pixel 11", slug: "google-pixel-11", kind: "topic" },
  { name: "Pixel Glow", slug: "pixel-glow", kind: "topic" },
  { name: "HiLight", slug: "hilight", kind: "topic" },
  { name: "Concept Phone", slug: "concept-phone", kind: "topic" },
  { name: "IFA 2026", slug: "ifa-2026", kind: "topic" },
  { name: "Display Technology", slug: "display-technology", kind: "topic" },
  { name: "Chipsets", slug: "chipsets", kind: "topic" },
  { name: "Smartphone Prices", slug: "smartphone-prices", kind: "topic" },
  { name: "Buying Advice", slug: "buying-advice", kind: "topic" },
  { name: "Midrange Phones", slug: "midrange-phones", kind: "topic" },
  { name: "Smartphone Batteries", slug: "smartphone-batteries", kind: "topic" },
  { name: "Silicon-Carbon", slug: "silicon-carbon", kind: "topic" },
  { name: "OnePlus N6x", slug: "oneplus-n6x", kind: "topic" },
  { name: "Battery Life", slug: "battery-life", kind: "topic" },
  { name: "Charging", slug: "charging", kind: "topic" },
  { name: "Accessories", slug: "accessories", kind: "topic" },
  { name: "Headphones", slug: "headphones", kind: "topic" },
  { name: "Smart Watches", slug: "smart-watches", kind: "topic" },
  { name: "VR & AR", slug: "vr-ar", kind: "topic" },
  { name: "G9L", slug: "g9l", kind: "topic" },
  { name: "Luxury EV", slug: "luxury-ev", kind: "topic" },
  { name: "China", slug: "china", kind: "topic" },
  { name: "Automotive Technology", slug: "automotive-technology", kind: "topic" },
  { name: "Battery Swap", slug: "battery-swap", kind: "topic" },
  { name: "EV Infrastructure", slug: "ev-infrastructure", kind: "topic" },
  { name: "Battery as a Service", slug: "battery-as-a-service", kind: "topic" },
  { name: "TLIP", slug: "tlip", kind: "topic" },
  { name: "Blockchain", slug: "blockchain", kind: "topic" },
  { name: "Customs", slug: "customs", kind: "topic" },
  { name: "Logistics", slug: "logistics", kind: "topic" },
  { name: "Mombasa Port", slug: "mombasa-port", kind: "topic" },
  { name: "Anne Kinuthia-Otieno", slug: "anne-kinuthia-otieno", kind: "topic" },
  { name: "Mobile Money", slug: "mobile-money", kind: "topic" },
  { name: "East Africa", slug: "east-africa", kind: "topic" },
  { name: "Payments", slug: "payments", kind: "topic" },
  { name: "Dividend", slug: "dividend", kind: "topic" },
  { name: "Ethiopia", slug: "ethiopia", kind: "topic" },
  { name: "Investing", slug: "investing", kind: "topic" },
  { name: "Telecoms", slug: "telecoms", kind: "topic" },
  { name: "iPhone 18", slug: "iphone-18", kind: "topic" },
  { name: "Foldable iPhone", slug: "foldable-iphone", kind: "topic" },
  { name: "Prepaid Card", slug: "prepaid-card", kind: "topic" },
  { name: "Grocery", slug: "grocery", kind: "topic" },
  { name: "Remittances", slug: "remittances", kind: "topic" },
  { name: "Corporate Governance", slug: "corporate-governance", kind: "topic" },
  { name: "iPhone", slug: "iphone", kind: "topic" },
  { name: "European Union", slug: "european-union", kind: "topic" },
  { name: "Interoperability", slug: "interoperability", kind: "topic" },
  { name: "Apple Glasses", slug: "apple-glasses", kind: "topic" },
  { name: "Materials Science", slug: "materials-science", kind: "topic" },
  { name: "Manufacturing", slug: "manufacturing", kind: "topic" },
  { name: "Hardware Durability", slug: "hardware-durability", kind: "topic" },
  { name: "Pixel 11", slug: "pixel-11", kind: "topic" },
  { name: "RAM", slug: "ram", kind: "topic" },
  { name: "Made by Google", slug: "made-by-google", kind: "topic" },
  { name: "Google Play Services", slug: "google-play-services", kind: "topic" },
  { name: "Google Wallet", slug: "google-wallet", kind: "topic" },
  { name: "Play Store", slug: "play-store", kind: "topic" },
  { name: "System Updates", slug: "system-updates", kind: "topic" },
];

export const brands: Tag[] = [
  { name: "VLC", slug: "vlc", kind: "brand" },
  { name: "Sony", slug: "sony", kind: "brand" },
  { name: "PlayStation", slug: "playstation", kind: "brand" },
  { name: "Samsung", slug: "samsung", kind: "brand" },
  { name: "Glovo", slug: "glovo", kind: "brand" },
  { name: "Uber", slug: "uber", kind: "brand" },
  { name: "I&M Bank", slug: "im-bank", kind: "brand" },
  { name: "Mastercard", slug: "mastercard", kind: "brand" },
  { name: "KOKO Networks", slug: "koko-networks", kind: "brand" },
  { name: "Oraimo", slug: "oraimo", kind: "brand" },
  { name: "Apple", slug: "apple", kind: "brand" },
  { name: "OPPO", slug: "oppo", kind: "brand" },
  { name: "Xiaomi", slug: "xiaomi", kind: "brand" },
  { name: "Nothing", slug: "nothing", kind: "brand" },
  { name: "Vivo", slug: "vivo", kind: "brand" },
  { name: "Anthropic", slug: "anthropic", kind: "brand" },
  { name: "Amazon", slug: "amazon", kind: "brand" },
  { name: "Starlink", slug: "starlink", kind: "brand" },
  { name: "SpaceX", slug: "spacex", kind: "brand" },
  { name: "OpenAI", slug: "openai", kind: "brand" },
  { name: "Google", slug: "google", kind: "brand" },
  { name: "Huawei", slug: "huawei", kind: "brand" },
  { name: "Visa", slug: "visa", kind: "brand" },
  { name: "Onafriq", slug: "onafriq", kind: "brand" },
  { name: "Microsoft", slug: "microsoft", kind: "brand" },
  { name: "Windows", slug: "windows", kind: "brand" },
  { name: "Dell", slug: "dell", kind: "brand" },
  { name: "Intel", slug: "intel", kind: "brand" },
  { name: "AMD", slug: "amd", kind: "brand" },
  { name: "NVIDIA", slug: "nvidia", kind: "brand" },
  { name: "Lenovo", slug: "lenovo", kind: "brand" },
  { name: "Volkswagen", slug: "volkswagen", kind: "brand" },
  { name: "Toyota", slug: "toyota", kind: "brand" },
  { name: "BYD", slug: "byd", kind: "brand" },
  { name: "Tesla", slug: "tesla", kind: "brand" },
  { name: "BasiGo", slug: "basigo", kind: "brand" },
  { name: "Waymo", slug: "waymo", kind: "brand" },
  { name: "NIO", slug: "nio", kind: "brand" },
  { name: "Oura", slug: "oura", kind: "brand" },
  { name: "Wi-Fi Alliance", slug: "wi-fi-alliance", kind: "brand" },
  { name: "MTN", slug: "mtn", kind: "brand" },
  { name: "Airtel", slug: "airtel", kind: "brand" },
  { name: "Optasia", slug: "optasia", kind: "brand" },
  { name: "WhatsApp", slug: "whatsapp", kind: "brand" },
  { name: "Meta", slug: "meta", kind: "brand" },
  { name: "Safaricom", slug: "safaricom", kind: "brand" },
  { name: "Vodacom", slug: "vodacom", kind: "brand" },
  { name: "M-Pesa", slug: "m-pesa", kind: "brand" },
  { name: "TECNO", slug: "tecno", kind: "brand" },
  { name: "IMAX", slug: "imax", kind: "brand" },
  { name: "Technicolor", slug: "technicolor", kind: "brand" },
  { name: "Qualcomm", slug: "qualcomm", kind: "brand" },
  { name: "Snapdragon", slug: "snapdragon", kind: "brand" },
  { name: "TSMC", slug: "tsmc", kind: "brand" },
  { name: "OnePlus", slug: "oneplus", kind: "brand" },
  { name: "Motorola", slug: "motorola", kind: "brand" },
  { name: "Spiro", slug: "spiro", kind: "brand" },
  { name: "Shuttlers", slug: "shuttlers", kind: "brand" },
  { name: "Aions Ventures", slug: "aions-ventures", kind: "brand" },
  { name: "Holocene", slug: "holocene", kind: "brand" },
  { name: "Livestock Wealth", slug: "livestock-wealth", kind: "brand" },
  { name: "Heifer International", slug: "heifer-international", kind: "brand" },
  { name: "Development Bank of Rwanda", slug: "development-bank-of-rwanda", kind: "brand" },
  { name: "Flutterwave", slug: "flutterwave", kind: "brand" },
  { name: "Moniepoint", slug: "moniepoint", kind: "brand" },
  { name: "Paystack", slug: "paystack", kind: "brand" },
  { name: "PrimeVale", slug: "primevale", kind: "brand" },
  { name: "Xpeng", slug: "xpeng", kind: "brand" },
  { name: "Firefly", slug: "firefly", kind: "brand" },
  { name: "KRA", slug: "kra", kind: "brand" },
  { name: "Carrefour", slug: "carrefour", kind: "brand" },
  { name: "KCB", slug: "kcb", kind: "brand" },
  { name: "AirPods", slug: "airpods", kind: "brand" },
  { name: "PlasmaSolve", slug: "plasmasolve", kind: "brand" }
];

const startupTopic = topics.find((topic) => topic.slug === "startups")!;
const aiTopic = topics.find((topic) => topic.slug === "ai")!;
const androidTopic = topics.find((topic) => topic.slug === "android")!;
const appsTopic = topics.find((topic) => topic.slug === "apps")!;
const connectivityTopic = topics.find((topic) => topic.slug === "connectivity")!;
const smartphoneTopic = topics.find((topic) => topic.slug === "smartphones")!;
const mobilityTopic = topics.find((topic) => topic.slug === "evs-mobility")!;
const powerTopic = topics.find((topic) => topic.slug === "power-batteries")!;
const whatsappBrand = brands.find((brand) => brand.slug === "whatsapp")!;
const metaBrand = brands.find((brand) => brand.slug === "meta")!;
const samsungBrand = brands.find((brand) => brand.slug === "samsung")!;
const kenyaRegion = getRegion("kenya")!;
const nigeriaRegion = getRegion("nigeria")!;
const southAfricaRegion = getRegion("south-africa")!;
const rwandaRegion = getRegion("rwanda")!;
const tanzaniaRegion = getRegion("tanzania")!;
const ethiopiaRegion = getRegion("ethiopia")!;

const appNewsArticles: Article[] = [
  {
    id: "news-whatsapp-usernames",
    slug: "whatsapp-usernames-reserve-now",
    format: "news",
    title: "WhatsApp is adding usernames, and you can reserve yours now",
    seo: {
      title: "WhatsApp adds usernames: reserve yours now",
      description:
        "WhatsApp is introducing usernames so you can chat without sharing your phone number. Reservations are open now, ahead of a full launch later in 2026."
    },
    subhead:
      "Reservations open this week. The feature itself arrives later in the year. Here is what a WhatsApp username actually does, and why grabbing yours early is worth a couple of minutes.",
    excerpt:
      "WhatsApp username reservations are open before the full launch later in 2026, letting you claim a handle that can help people reach you without showing your phone number.",
    whyItMatters:
      "For the millions of Kenyans who run work, groups, and side hustles on WhatsApp, this is the first time you can give someone a way to reach you without handing over your actual phone number.",
    body: [
      "WhatsApp is introducing usernames, and starting this week you can reserve the one you want ahead of a full launch later in 2026. The reservation is optional and takes a few seconds, but with billions of people likely to want a clean, memorable handle, the good ones will go fast.",
      "Here is the simple version of what this changes. Today, to message someone on WhatsApp you generally need their phone number. A number is personal, it is tied to a lot of your life, and handing it to a classmate, a neighbour, a Marketplace buyer, or a group admin you have never met can feel like more than you want to share. A username lets people reach you without ever seeing your number.",
      "That matters in group chats too. You might want to join the parents' chat or a community group without giving your number to a room full of strangers. With a username, you can.",
      "WhatsApp says more than three billion people use the app, so a lot of names overlap. That is why reservations are opening early, to give everyone a fair shot at the handle they want before someone else takes it. If you are stuck for ideas, WhatsApp offers a username generator to suggest one.",
      "The privacy design is the interesting part. There is no public directory to browse and no suggestions, so people will need to know your exact username to contact you for the first time. WhatsApp has also built an optional username key, an extra detail someone must know before they can message you, so you stay in control of who can reach you. Once usernames launch, the first time you message a person or business, they will no longer see your phone number, as long as you have turned your username on.",
      "For creators, small businesses, and organisations that want a consistent identity across apps, WhatsApp has reserved an option to claim your existing Instagram or Facebook username on WhatsApp, so your handle can match the one people already know.",
      "To reserve yours, update to the latest version of WhatsApp and go to Settings, then Account, then Username. WhatsApp says it will roll the feature out gradually over the coming months and will notify you in the app when usernames go live in your country.",
      "So, should you care? If you value your privacy, or if you run anything on WhatsApp, a business, a hustle, a community, this is one of the more useful changes the app has made in a while, because it finally separates let me reach you from here is my number."
    ],
    closingLine:
      "Reserve the handle you want now, then wait for the feature to switch on where you are. Keep your expectations calm on timing: reserving is live now, the full feature lands later in the year, and the rollout is gradual by country.",
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 30, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 30, 7, 0, 0)).toISOString(),
    readTime: "5 min read",
    image: {
      src: "/articles/whatsapp-usernames-reserve-now.jpg",
      alt: "Two people holding a large WhatsApp logo.",
      credit: "tecMAMBO image library",
      width: 2000,
      height: 1201,
      type: "image/jpeg"
    },
    tags: [appsTopic, whatsappBrand, metaBrand],
    faq: [
      {
        question: "What is a WhatsApp username?",
        answer: "A unique handle that lets people message you on WhatsApp without knowing your phone number."
      },
      {
        question: "How do I reserve a WhatsApp username?",
        answer: "Update to the latest version of WhatsApp, then go to Settings, then Account, then Username. It takes a few seconds."
      },
      {
        question: "Do I have to use a username?",
        answer: "No. Usernames are optional, and so is the extra username key."
      },
      {
        question: "When does the feature launch?",
        answer:
          "Reservations are open now. WhatsApp says usernames will roll out gradually over the coming months, later in 2026, and you will be notified in the app when they reach your country."
      },
      {
        question: "Will people still see my phone number?",
        answer:
          "Once usernames launch and you enable yours, people you message for the first time will reach you by username without seeing your number."
      }
    ],
    sources: [
      {
        label: "WhatsApp Blog: It's time to reserve your WhatsApp username",
        url: "https://blog.whatsapp.com/its-time-to-reserve-your-whatsapp-username"
      }
    ],
    regions: [kenyaRegion]
  }
];

const reviewArticles: Article[] = [
  {
    id: "review-samsung-galaxy-a37-5g",
    slug: "samsung-galaxy-a37-5g-review",
    format: "review",
    contentFormat: "research_based_review",
    reviewMethod: "research_based",
    hasOriginalTesting: false,
    title: "Samsung Galaxy A37 5G review: a dependable mid-ranger that plays it safe",
    seo: {
      title: "Samsung Galaxy A37 5G review: solid, safe, and best on a deal",
      description:
        "The Galaxy A37 5G nails the basics, a great screen, all-day battery, and six years of updates, but plays it safe and cost too much at launch. Our verdict."
    },
    subhead:
      "The Galaxy A37 5G is a sensible Samsung mid-ranger with a great screen, long support, and dependable battery life, but it is much better when discounted.",
    excerpt:
      "The Samsung Galaxy A37 5G gets the important things right, a bright screen, all-day battery, and years of updates, without trying anything bold.",
    whyItMatters:
      "In the mid-range, the smart questions are not about headline specs but about the boring things that decide whether a phone is worth it: does it last the day, last the years, and cost the right price?",
    body: [
      "The Samsung Galaxy A37 5G is a mid-range Android phone that gets the important things right, a big bright screen, long battery, and years of software support, without trying anything bold. It launched in April 2026 as the successor to the popular A36, and the honest summary is right there in how familiar it feels. This is a safe, sensible phone. Whether that is exactly what you want, or a little too little, is the whole review.",
      "## Design and thinness",
      "The A37 is clean, modern, and almost indistinguishable from last year's A36. It has a plastic frame with a glass back protected by Gorilla Glass Victus+, and the same triple-camera island as before. At 7.4mm and 196 grams it is slim enough but not especially light. The meaningful upgrade is durability: it moves up to an IP68 rating for dust and water resistance, which is reassuring at this price. Two practical notes: there is no microSD card slot, and like most phones now, there is no charger in the box. It is an unshowy, solidly built design that will not turn heads but will not let you down either.",
      "[[image:galaxy-a37-design]]",
      "## Display",
      "No complaints here, and this is a highlight. The 6.7-inch Super AMOLED runs at a smooth 120Hz, hits up to 1,900 nits at peak so it stays readable in sunlight, and shows the bold, punchy colours Samsung screens are known for. It is unchanged from the A36, but it remains one of the best displays you will find at this price. Watching video and scrolling both feel great.",
      "[[image:galaxy-a37-display]]",
      "## Performance",
      "The A37 runs Samsung's Exynos 1480 chip with 6 to 12GB of memory depending on the model. It is not new silicon, and the gains over the last generation are modest, but Samsung has added a vapour chamber to keep temperatures in check. In everyday use, apps, browsing, social media, and casual games, it is smooth and responsive. Push it with heavy gaming and it is merely adequate rather than impressive. This is competent mid-range performance, not a leap forward, and if raw speed is your priority, you can do better for the money.",
      "## Camera",
      "The A37 has a triple rear camera: a 50-megapixel main lens with optical stabilisation, an 8-megapixel ultrawide, and a 5-megapixel macro, plus a 12-megapixel front camera, with video up to 4K. The main camera is the one that matters, and it is good for the price, producing bright, detailed, colourful shots in daylight and handling low light reasonably well with Samsung's Nightography. Samsung improved the sensor and processing over the A36, and it shows. The ultrawide is ordinary, and the 5-megapixel macro is more of a spec-sheet entry than a lens you will actually use. For everyday photos and social media, though, this setup covers the basics comfortably.",
      "[[image:galaxy-a37-camera]]",
      "## Battery life",
      "The 5,000mAh battery is a reliable all-day performer. Samsung markets it as a two-day phone, which is optimistic; in real use you get a comfortable full day, often stretching to a day and a half with lighter use, and you will still be charging it most nights. It supports 45W fast charging, roughly 60 percent in half an hour, but remember there is no charger included, so you will need to supply a compatible fast charger to hit those speeds. Endurance is one of this phone's quiet strengths.",
      "[[image:galaxy-a37-battery]]",
      "## Software and updates",
      "This is the A37's real superpower, and the reason to take it seriously. It ships with Android 16 and Samsung's polished One UI 8.5, and it promises six major Android upgrades and six years of security updates, which keeps it current and safe into 2032. It also includes a useful slice of Samsung's Galaxy AI tools, such as Circle to Search, Object Eraser, and voice transcription. Support of that length is genuinely rare at this price, and it changes the maths: this is a phone you can confidently keep for years rather than replace in two, which quietly makes it better value the longer you own it.",
      "## Price and value",
      "Here is the deciding factor. The A37 launched at around 449 US dollars, and at that price it was hard to recommend, because it competes with strong rivals that offer more character or more phone for similar money. Samsung effectively conceded the misjudgement, and the price has since fallen closer to 350 dollars, where it becomes a genuinely sensible buy. For Kenyan buyers, current retail checks put it around KSh39,999 for the 6GB/128GB model, KSh44,999 for 8GB/256GB, and KSh49,999 for 12GB/256GB. The lesson is simple: the A37 is worth it on a deal and overpriced at full launch price. Watch the price before you buy.",
      "## The verdict",
      "The Galaxy A37 5G is the definition of a safe choice. Its published specifications and independent assessments support the fundamentals: the screen, battery, software support, and reliability. It just does not excite, and it leans heavily on last year's phone. If you value dependability, long support, and the Samsung experience, and you buy it at a sensible price, it is a credible option. If you want the newest performance or the best raw value, check the discounts and the rivals first."
    ],
    goDeeper: {
      intro: "A concise spec sheet for the Samsung Galaxy A37 5G.",
      specs: [
        { label: "Display", value: "6.7-inch Super AMOLED, 120Hz, up to 1,900 nits" },
        { label: "Chip", value: "Exynos 1480" },
        { label: "Memory and storage", value: "6 to 12GB RAM, 128 or 256GB storage, no microSD" },
        { label: "Rear cameras", value: "50MP main with OIS, 8MP ultrawide, 5MP macro" },
        { label: "Front camera", value: "12MP" },
        { label: "Battery and charging", value: "5,000mAh, 45W wired" },
        { label: "Build", value: "Plastic frame, Gorilla Glass Victus+, IP68" },
        { label: "Software", value: "Android 16 with One UI 8.5" },
        { label: "Updates", value: "Six OS upgrades and six years of security updates" },
        { label: "Price", value: "Launch price about 449 US dollars, now typically lower. Current Kenya retail checks show roughly KSh39,999 to KSh49,999 depending on RAM and storage." }
      ]
    },
    verdict: {
      score: "3.5/5",
      summary:
        "The Samsung Galaxy A37 5G is a dependable, sensible mid-range phone that does almost everything well and almost nothing surprising. You get a lovely 6.7-inch AMOLED screen, all-day battery, capable cameras, and a genuinely outstanding promise of six years of updates. The catch is that it looks and performs much like last year's model, leans on familiar hardware, and launched at a price that asked too much. Catch it on a deal and it is easy to recommend, especially if you want a phone that lasts. At full launch price, rivals give you more.",
      pros: [
        "Bright, smooth 6.7-inch 120Hz AMOLED display",
        "Reliable all-day 5,000mAh battery",
        "Six OS upgrades and six years of security updates",
        "Polished One UI software",
        "IP68 durability",
        "Solid main camera"
      ],
      cons: [
        "Nearly identical to the A36",
        "Familiar mid-range chip, so no real leap in speed",
        "Ordinary ultrawide and macro cameras",
        "No charger in the box",
        "Overpriced at launch and much better on discount"
      ]
    },
    itemReviewed: "Samsung Galaxy A37 5G",
    inlineImages: [
      {
        id: "galaxy-a37-design",
        src: "/articles/galaxy-a37-5g-options.jpg",
        alt: "Samsung Galaxy A37 5G colour options laid out on a table. Credit: Daniel Schmidt.",
        credit: "Daniel Schmidt",
        width: 720,
        height: 480,
        type: "image/jpeg"
      },
      {
        id: "galaxy-a37-display",
        src: "/articles/galaxy-a37-5g-display.jpg",
        alt: "Samsung Galaxy A37 5G display viewed from the front. Credit: Daniel Schmidt.",
        credit: "Daniel Schmidt",
        width: 720,
        height: 480,
        type: "image/jpeg"
      },
      {
        id: "galaxy-a37-camera",
        src: "/articles/galaxy-a37-5g-camera.jpg",
        alt: "Samsung Galaxy A37 5G rear camera in close-up. Credit: Daniel Schmidt.",
        credit: "Daniel Schmidt",
        width: 720,
        height: 480,
        type: "image/jpeg"
      },
      {
        id: "galaxy-a37-battery",
        src: "/articles/galaxy-a37-5g-charging.jpg",
        alt: "Samsung Galaxy A37 5G USB-C charging ports stacked together. Credit: Daniel Schmidt.",
        credit: "Daniel Schmidt",
        width: 720,
        height: 480,
        type: "image/jpeg"
      }
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 6, 2, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 6, 2, 7, 0, 0)).toISOString(),
    readTime: "8 min read",
    image: {
      src: "/articles/samsung-galaxy-a37-5g-review.jpg",
      alt: "Samsung Galaxy A37 5G product image. Credit: Samsung.",
      credit: "Samsung",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    tags: [smartphoneTopic, samsungBrand, androidTopic, powerTopic],
    faq: [
      {
        question: "Is the Samsung Galaxy A37 5G a good phone?",
        answer:
          "Yes, it is a dependable mid-ranger with a great screen, all-day battery, and six years of updates. It is best value on a discount rather than at full launch price."
      },
      {
        question: "How long will the Galaxy A37 5G get updates?",
        answer: "Six major Android upgrades and six years of security updates, keeping it supported into 2032."
      },
      {
        question: "Does the Galaxy A37 5G have a good camera?",
        answer:
          "The 50-megapixel main camera is solid for the price, with good daylight and night shots. The ultrawide and macro are ordinary."
      },
      {
        question: "What is the Galaxy A37 5G battery life like?",
        answer:
          "A comfortable full day, sometimes a day and a half with light use, with 45W fast charging. Samsung's two-day claim is optimistic."
      },
      {
        question: "Galaxy A37 5G vs A36?",
        answer:
          "The A37 is very similar, with the same design and display and a familiar chip, plus small camera and IP68 improvements. Existing A36 owners do not need to upgrade."
      }
    ],
    sources: [
      { label: "Samsung Galaxy A37 5G", url: "https://www.samsung.com/" },
      { label: "GSMArena Samsung Galaxy A37 5G specs", url: "https://www.gsmarena.com/samsung_galaxy_a37-14378.php" },
      { label: "Tech Advisor Samsung Galaxy A37 5G review", url: "https://www.techadvisor.com/article/2785937/samsung-galaxy-a37-5g-review.html" },
      { label: "Avechi Samsung Galaxy A37 5G Kenya pricing", url: "https://avechi.co.ke/product-tag/samsung-galaxy-a37/" }
    ]
  }
];

const regionalArticles: Article[] = [
  {
    id: "africa-kenya-ai-policy",
    slug: "kenya-ai-rules-mean-more-than-paperwork",
    format: "business",
    title: "Kenya's AI rules mean more than paperwork",
    subhead: "Good AI policy is not just about control. It is about giving builders, buyers, and citizens a clearer floor to stand on.",
    excerpt: "Kenya's AI debate is really about confidence: who gets protected, who gets to build, and how much of the future is made locally.",
    whyItMatters:
      "Clear rules can help local AI companies sell to cautious customers without making the market feel closed before it has grown.",
    body: [
      "AI policy can sound distant until a startup tries to sell a tool to a bank, a hospital, or a county office. Then the questions get practical very quickly. Where is the data stored? Who is accountable when the answer is wrong? Can a person appeal a decision the system helped make?",
      "Kenya's opportunity is to keep those questions practical. A rulebook that is too loose leaves citizens exposed and serious buyers nervous. A rulebook that is too heavy can make young companies spend more time proving compliance than proving usefulness.",
      "The best version sits in the middle: clear consent, clear accountability, room for local experimentation, and enough certainty that builders do not have to wait for rules written somewhere else."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 26, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 26, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop",
      alt: "A laptop and phone on a tidy desk",
      credit: "Unsplash"
    },
    tags: [startupTopic, aiTopic],
    regions: [kenyaRegion]
  },
  {
    id: "africa-nigeria-fintech",
    slug: "why-nigerian-fintech-keeps-spreading-into-everyday-life",
    format: "business",
    title: "Why Nigerian fintech keeps spreading into everyday life",
    subhead: "The most durable fintech products do not feel like finance. They feel like fewer errands, faster payments, and clearer records.",
    excerpt: "Nigeria's fintech story is not only about big funding rounds. The useful products are the ones that make daily money movement less tiring.",
    whyItMatters:
      "When payments, savings, credit, and business tools meet people where they already transact, software becomes infrastructure.",
    body: [
      "The strongest Nigerian fintech products tend to win by reducing friction. They shorten a payment queue, make a small business ledger easier to trust, or turn a phone into a tool that can receive money without ceremony.",
      "That is why the category keeps spreading beyond the finance team. A market trader, creator, logistics operator, or student may not think of themselves as using fintech. They are simply using the thing that helps money move with less waiting.",
      "The next test is trust. Convenience gets people to try a service. Transparent fees, reliable support, and clear dispute handling are what make them keep it."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 24, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 24, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1800&auto=format&fit=crop",
      alt: "A person paying for a product at a retail counter",
      credit: "Unsplash"
    },
    tags: [startupTopic, appsTopic],
    regions: [nigeriaRegion]
  },
  {
    id: "africa-south-africa-power-apps",
    slug: "south-africas-power-apps-show-what-useful-tech-looks-like",
    format: "real-life",
    title: "South Africa's power apps show what useful tech looks like",
    subhead: "The best local software often starts with a very ordinary question: what do people need to plan their day?",
    excerpt: "Power and connectivity tools are a reminder that useful technology is not always glamorous. Sometimes it just helps people plan.",
    whyItMatters:
      "When infrastructure is uneven, good apps can turn uncertainty into a plan. That is a real consumer benefit.",
    body: [
      "Some apps become useful because they are clever. Others become useful because the world around them is inconvenient. South Africa's power-planning tools sit in that second category, and that is not an insult.",
      "A good local utility app does not need to be beautiful first. It needs to be timely, clear, and honest about what it knows. If it helps someone charge a laptop, schedule a call, or keep a small shop running, it has done something more valuable than most novelty features.",
      "That lesson travels well beyond power cuts. The best local tech starts with the friction people actually feel, then removes just enough of it to make the day easier."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 23, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 23, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1800&auto=format&fit=crop",
      alt: "Network hardware with connected cables",
      credit: "Unsplash"
    },
    tags: [appsTopic, connectivityTopic],
    regions: [southAfricaRegion]
  },
  {
    id: "africa-rwanda-digital-services",
    slug: "rwandas-digital-services-lesson-is-about-boring-reliability",
    format: "explainer",
    title: "Rwanda's digital services lesson is about boring reliability",
    subhead: "The most impressive public-service technology is often the kind people stop noticing because it simply works.",
    excerpt: "Rwanda's digital-service push is a useful reminder that the real test for civic tech is reliability, not spectacle.",
    whyItMatters:
      "When public services move online, the design challenge is trust. People need to know the service is clear, accessible, and consistent.",
    body: [
      "Civic technology is easy to oversell. A portal, app, or digital ID system can sound transformative in a launch speech, then fail quietly if people cannot understand it or reach it when they need it.",
      "That is why the boring parts matter most: plain language, uptime, support, accessibility, and a clear path when something goes wrong. Digital public services earn trust by being predictable.",
      "Rwanda's lesson for other markets is not that every service should become an app. It is that the technology around public services should make the service feel simpler, not more distant."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 21, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 21, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1800&auto=format&fit=crop",
      alt: "A calm public office with desks and computers",
      credit: "Unsplash"
    },
    tags: [appsTopic, connectivityTopic],
    regions: [rwandaRegion]
  }
];

const mobilityArticles: Article[] = [
  {
    id: "mobility-1",
    slug: "why-electric-motorbikes-matter-more-than-flashy-ev-launches",
    format: "real-life",
    title: "Why electric motorbikes matter more than flashy EV launches",
    seo: {
      title: "Why electric motorbikes matter more than flashy EV launches",
      description:
        "Electric boda bodas, not premium EVs, are the real electric-vehicle revolution in Kenya. The economics, battery swapping, the e-mobility tariff, and what it means for riders."
    },
    subhead: "The most important electric vehicles may be the ones that lower daily running costs, not the ones on glossy stages.",
    excerpt: "Electric motorbikes are a practical mobility story: battery swaps, charging access, repair networks, and daily earnings all matter more than hype.",
    whyItMatters:
      "If electric mobility is going to work for more people, it has to make the everyday commute and delivery shift cheaper, simpler, and easier to maintain. In Kenya that shift is already happening, and it is happening on two wheels.",
    body: [
      "Electric cars get the dramatic photos: the sculpted bodywork, the countdown clock, the founder pacing a stage. But in Kenya, and across much of Africa, the electric vehicle quietly changing the most lives is far humbler. It is the boda boda, the motorcycle taxi that threads people and parcels through every town and estate in the country. There are millions of them, and for a huge number of young Kenyans a bike is not a lifestyle choice but a livelihood. That is exactly why the move to electric two-wheelers matters more than any glossy car launch: it changes the daily maths of how people earn.",
      "The scale makes the point. By the end of 2025, electric motorcycles made up the overwhelming majority of Kenya's registered electric vehicles, roughly 31,900 of about 43,300 by registration data, most of them boda bodas. Electric cars are a rounding error next to the electric boda. When people ask whether EVs are working in Kenya, they are usually looking at the wrong vehicle. The revolution is on two wheels, and it is commercial, not aspirational.",
      "## The number that actually moves a rider",
      "For a boda rider, the decision is not about the planet first. It is about what is left at the end of the day. A petrol boda commonly burns 500 to 1,000 shillings of fuel a day, often 700 to 800 on a busy one. Electricity is not in the same league. A full charge can cost as little as 8 to 15 shillings and carry a bike 25 to 50 kilometres, and the ride-hailing firm Bolt estimates riders save 300 to 500 shillings a day by switching to electric, which it puts at around 182,500 shillings a year. Put plainly, the fuel line on a rider's day can shrink from the biggest cost to almost a footnote, and that money goes straight into rent, school fees, and food.",
      "Two honest qualifiers. First, those are headline figures from operators and vary with the bike, the route, and the day. Second, the fuel saving is partly offset by what you pay for the battery, whether you rent it, swap it, or finance it. The electric boda is cheaper to run. The industry's real achievement has been making it affordable to start.",
      "## Why the battery, not the bike, is the real product",
      "The single most expensive part of an electric motorcycle is its battery, as Ecobodaa co-founder Steve Juma has put plainly. Ask a rider to pay for the bike and the battery upfront and the sums collapse, because the people who most need the savings are the ones with the least cash to put down. The move that unlocked the market was to separate the two. Under a battery-as-a-service or swap model, the rider buys or finances a cheaper bike without the battery, then pays to trade a depleted pack for a charged one at a station in the couple of minutes it takes to refuel a petrol bike. No waiting hours to charge, no anxiety about being stranded far from a socket, and no huge battery cost on day one. For a commercial rider whose income depends on staying on the road, swapping is not a convenience. It is the thing that makes electric viable at all.",
      "There is a genuine split in approach. Swap networks such as Spiro, ARC Ride, and Ampersand bet that riders want to trade batteries like refuelling and never think about charging. Others, including the Kenyan firm Roam, lean toward riders owning dual-battery packs they charge themselves, trading swap-station convenience for full ownership and no per-swap fee. Neither is obviously right. Swapping wins on uptime and low entry cost; ownership wins for riders who can charge at home or base and would rather not pay a network forever. The decider in any given neighbourhood is whoever's station, or whoever's home socket, is actually within reach. That is the same lesson as car charging, where the charger you can reach beats the faster one across town, which we get into at [The real test for EV charging isn't speed. It's location.](/explainers/the-real-test-for-ev-charging-isnt-speed-its-location).",
      "## A launch is a moment. A network is the product",
      "This is why the most important electric-mobility news is rarely a single glamorous unveiling. It is the slow, unglamorous build-out of the system around the bike: swap stations dense enough to trust, spare parts on the shelf, technicians trained to fix a motor instead of a carburettor, and financing a rider on a cash income can actually service. The money is following that logic. Spiro, which operates across Kenya, Benin, Togo, Rwanda, and Uganda, has talked of thousands of swap stations and raised well over 100 million dollars in the past year to build them. Ampersand, which came to Kenya in 2022, has raised again to push its fleet toward five figures. ARC Ride is wiring Nairobi with hundreds of battery points. Even Yadea, China's largest e-motorbike maker, has entered the Kenyan race. None of that makes a dramatic keynote. All of it decides whether the cheaper choice feels reliable enough to bet your morning on. The scale of the fundraising is a story in itself, as we covered with Spiro at [Spiro adds $55m as its electric-bike push grows](/business/spiro-electric-mobility-funding-round).",
      "## The quiet role of the grid and the tariff",
      "Two things make Kenya an unusually good place for this. First, the grid is mostly clean, dominated by geothermal and hydro, so an electric boda is genuinely lower-carbon here in a way it is not everywhere. Second, policy has started to notice. Kenya's energy regulator introduced a dedicated e-mobility electricity tariff, with cheaper power for charging, reported at around 16 shillings a unit at peak and 8 shillings off-peak, which nudges operators to fill batteries when the grid is quiet. The effect shows up on Kenya Power's own books: it has reported EV-charging revenue climbing from under a million shillings a month in mid-2023 to tens of millions by early 2026, cumulatively into the hundreds of millions. When the national utility starts counting boda charging as a real revenue line, the trend has left the pilot stage.",
      "## Where it still gets hard",
      "None of this means the transition is finished, and it would be dishonest to pretend otherwise. Swap-station coverage is still thin outside the big towns, so a rider who strays off the network is back to range anxiety. Battery ageing and ownership raise fair questions: who carries the cost when a pack degrades, and what is a used electric boda actually worth at resale, a market that barely exists yet. Riders have pushed back where networks feel too rigid or too pricey, wanting more flexibility in how and where they swap. Financing, for all its cleverness, still loads a monthly obligation onto people with volatile daily incomes. And the informal repair economy that keeps petrol bodas alive, the fundi on every corner, has to be retrained for a very different machine. These are solvable problems, but they are the difference between a good launch and a lasting shift.",
      "## Why this beats the flashy launch",
      "Set the electric boda against the premium EV reveal and the contrast is the whole argument. A flagship electric car changes the commute of a few thousand people who could mostly afford a car anyway. An electric boda network changes the take-home pay of hundreds of thousands of riders who count every shilling, cleans the air in the estates where they work, and does it on a grid that is already largely renewable. It is cheaper, it scales faster, and its benefits land on the people with the least room to spare. The stage version of electrification is about desire. The street version is about arithmetic, and arithmetic is what moves a market. For the heavier vehicles working the same logic, our look at electric buses and the strain they put on the grid is a useful companion at [BasiGo's electric bus growth now meets the grid question](/business/basigo-electric-bus-expansion-grid-question).",
      "## If you are the one deciding",
      "If you ride for a living, the questions worth asking are practical, not ideological. How dense is the swap or charging network on your actual routes, not on a map. What does a swap or a full charge really cost you per day against the fuel you burn now. Do you own the battery or rent it forever, and what happens to your costs if the pack degrades. Is the monthly financing something your worst week can still cover, not just your best. Are there trained technicians and parts near you when, not if, something breaks. Get honest answers to those and the electric boda usually wins on the only scoreboard a working rider cares about: what is left at the end of the day. Wait for confirmed local pricing and current tariff details before you commit, because both move."
    ],
    goDeeper: {
      intro:
        "A quick, plain-English reference for the electric boda economics above, drawn from operator estimates, Kenya Power figures, and the regulator's e-mobility tariff. Treat the numbers as current-market estimates that shift with fuel prices, exchange rates, and each company's terms, and confirm the specifics locally before deciding.",
      specs: [
        { label: "Petrol fuel cost", value: "Roughly KSh500 to KSh1,000 a day, often KSh700 to KSh800 on a busy day." },
        { label: "Electric charge cost", value: "About KSh8 to KSh15 for a full charge, good for roughly 25 to 50km." },
        { label: "Reported daily saving", value: "Bolt estimates KSh300 to KSh500 a day, around KSh182,500 a year." },
        { label: "E-mobility tariff", value: "A dedicated EV rate, reported near KSh16 per unit at peak and KSh8 off-peak." },
        { label: "The main cost", value: "The battery. Swap and battery-as-a-service models separate it from the bike to cut the upfront price." },
        { label: "Two models", value: "Swap networks (Spiro, ARC Ride, Ampersand) versus rider-owned dual batteries (Roam)." },
        { label: "Market share", value: "Electric motorcycles were about 31,900 of roughly 43,300 registered EVs in Kenya by end of 2025." },
        { label: "Grid", value: "Kenya's power is mostly geothermal and hydro, so charging is genuinely low-carbon here." }
      ]
    },
    closingLine:
      "The flashy launch sells a feeling. The electric boda sells a smaller fuel bill every single day, and in the end that is the version of the electric future that actually changes how people live.",
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 25, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 25, 7, 0, 0)).toISOString(),
    readTime: "9 min read",
    image: {
      src: "/articles/electric_motorbikes_roam_electric_tecMAMBO.jpg",
      alt: "A man presenting a row of orange ROAM electric motorbikes inside the ROAM assembly facility. Credit: ROAM.",
      credit: "ROAM",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    tags: [mobilityTopic, powerTopic],
    regions: [kenyaRegion],
    faq: [
      {
        question: "Why do electric motorbikes matter more than electric cars in Kenya?",
        answer:
          "Because boda bodas are a livelihood for hundreds of thousands of riders and made up the large majority of Kenya's registered EVs by the end of 2025. Cutting a rider's daily fuel cost changes real take-home earnings at a scale a premium car launch never reaches."
      },
      {
        question: "How much can an electric boda save a rider?",
        answer:
          "Operators put the fuel saving high. A petrol bike can burn KSh500 to KSh1,000 of fuel a day, while a full electric charge can cost as little as KSh8 to KSh15. Bolt estimates riders save KSh300 to KSh500 a day, though the battery you rent or finance offsets part of that."
      },
      {
        question: "What is battery swapping, and why does it matter?",
        answer:
          "Instead of waiting to charge, a rider trades a depleted battery for a charged one at a station in minutes, like refuelling. It removes charging downtime and range anxiety, and because the pricey battery is rented rather than bought, it slashes the upfront cost that keeps many riders on petrol."
      },
      {
        question: "Is charging an electric boda actually cheaper and cleaner in Kenya?",
        answer:
          "Yes on both counts. Kenya's grid is mostly geothermal and hydro, so charging is low-carbon, and the regulator's e-mobility tariff offers cheaper power, reported around KSh8 per unit off-peak, well below the cost of petrol per kilometre."
      },
      {
        question: "What are the biggest risks before switching?",
        answer:
          "Thin swap-station coverage outside major towns, uncertainty over battery ageing and resale value, monthly financing on a volatile income, and whether trained technicians and spare parts are nearby. Check the network on your real routes and confirm current pricing before committing."
      }
    ],
    sources: [
      {
        label: "Business Daily: Inside the battery-rental model powering Kenya's electric motorbike uptake",
        url: "https://www.businessdailyafrica.com/bd/corporate/technology/inside-the-battery-rental-model-powering-kenya-s-electric-motorbike-uptake-5414432"
      },
      {
        label: "The Kenyan Wall Street: Bolt records surge in electric boda use as fuel prices bite",
        url: "https://kenyanwallstreet.com/bolt-electric-boda-fuel-price"
      },
      {
        label: "Capital Business: Kenya Power moves to regularize EV charging as e-mobility tariff revenues surge",
        url: "https://www.capitalfm.co.ke/business/2026/06/kenya-power-moves-to-regularize-ev-charging-customers-as-e-mobility-tariff-revenues-surge/"
      },
      {
        label: "Business Daily: China's largest e-motorbike maker Yadea enters Kenya EV race",
        url: "https://www.businessdailyafrica.com/bd/corporate/shipping-logistics/china-largest-e-motorbike-maker-yadea-enters-kenya-ev-race-5486744"
      },
      {
        label: "Ethical Business Africa: Kenya's electric motorcycle revolution reaches critical threshold",
        url: "https://ethicalbusiness.africa/2026/02/02/kenyas-electric-motorcycle-revolution-reaches-critical-threshold/"
      }
    ]
  },
  {
    id: "mobility-2",
    slug: "the-real-test-for-ev-charging-isnt-speed-its-location",
    format: "explainer",
    title: "The real test for EV charging isn't speed. It's location.",
    subhead: "Fast chargers are useful, but the charger you can actually reach at the right time matters more.",
    excerpt: "EV charging is not only a battery story. It is a maps, rent, power, parking, and payments story too.",
    whyItMatters:
      "Charging access decides whether an EV feels freeing or stressful. The best network is the one that fits how people already move.",
    body: [
      "Charging speed is easy to advertise because a number looks impressive. Location is harder to sell, but it matters more. A slower charger near home, work, or a regular stop can be more useful than a faster one that sits across town.",
      "Good charging networks solve several small problems at once. They need clear pricing, reliable power, safe parking, simple payments, and enough availability that drivers do not plan their whole day around a socket.",
      "That is why EV adoption depends on maps as much as motors. A charger becomes useful when it appears where life already happens."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 19, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 19, 7, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1800&auto=format&fit=crop",
      alt: "Electric car plugged into a charger",
      credit: "Unsplash"
    },
    tags: [mobilityTopic, powerTopic]
  },
  {
    id: "mobility-3",
    slug: "what-ride-hailing-apps-changed-after-the-hype-faded",
    format: "business",
    title: "What ride-hailing apps changed after the hype faded",
    subhead: "The real product was never just the app. It was pricing, trust, routing, payments, and a market of drivers trying to make the day add up.",
    excerpt: "Ride-hailing changed how cities move, but the hard questions now are about driver earnings, reliability, and what a fair trip should cost.",
    whyItMatters:
      "Mobility platforms sit between convenience and livelihoods. The design choices show up in both a passenger's bill and a driver's day.",
    body: [
      "The first version of ride hailing felt like magic because it removed uncertainty. You could see the car, the driver, the price, and the route. That was a real improvement over hoping transport would appear at the right time.",
      "The mature version is less magical and more complicated. Prices move, driver incentives change, traffic eats into earnings, and users start comparing reliability instead of novelty.",
      "The next mobility winners will be the companies that treat drivers as part of the product, not as a hidden cost behind the button."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 17, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 17, 7, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1800&auto=format&fit=crop",
      alt: "Cars moving through city traffic",
      credit: "Unsplash"
    },
    tags: [mobilityTopic, appsTopic],
    regions: [kenyaRegion, southAfricaRegion]
  },
  {
    id: "mobility-4",
    slug: "why-cheap-e-bikes-are-harder-to-buy-than-they-look",
    format: "wallet-watch",
    title: "Why cheap e-bikes are harder to buy than they look",
    subhead: "A low price can hide weak batteries, poor brakes, awkward parts, and warranty terms nobody explains at checkout.",
    excerpt: "Buying an e-bike is less about the motor headline and more about battery quality, spares, brakes, weight, and local support.",
    whyItMatters:
      "A bargain e-bike can become expensive if the battery fades quickly or simple replacement parts are hard to find.",
    body: [
      "Cheap e-bikes are tempting because the promise is obvious: easier movement for less money. The part worth slowing down for is ownership after the first week.",
      "Ask about the battery chemistry, replacement cost, brake quality, tyre size, charger warranty, and whether a local repair shop can actually get parts. Those boring details decide whether the bike stays useful.",
      "The best budget buy is not always the cheapest one. It is the one with a battery and support story you can believe."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 15, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 15, 7, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1800&auto=format&fit=crop",
      alt: "A bicycle parked near a city wall",
      credit: "Unsplash"
    },
    tags: [mobilityTopic, powerTopic]
  }
];

const businessArticles: Article[] = [
  {
    id: "business-1",
    slug: "why-local-ai-startups-are-selling-workflows-not-magic",
    format: "business",
    title: "Why local AI startups are selling workflows, not magic",
    subhead: "The useful companies are packaging AI around customer support, finance, logistics, and routine office tasks.",
    excerpt: "AI startup winners are less interested in spectacle and more interested in boring jobs that save teams time every week.",
    whyItMatters:
      "This is where AI becomes a real budget line for small companies. The best products will feel practical before they feel futuristic.",
    body: [
      "The clearest AI startup pitches are not trying to sound like science fiction. They start with a task a business already pays someone to repeat, then ask whether software can make that task faster, safer, or easier to audit.",
      "That shift matters because it changes what buyers should ask. The right question is not whether a startup uses the newest model. It is whether the product fits the workflow, protects the data, and leaves a human in charge of important decisions.",
      "For founders, the lesson is just as direct. A narrow tool with clear savings will usually beat a broad AI promise that nobody knows how to deploy."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 22, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 22, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1800&auto=format&fit=crop",
      alt: "Startup team discussing product plans around a laptop",
      credit: "Unsplash"
    },
    tags: [startupTopic, aiTopic],
    regions: [kenyaRegion, nigeriaRegion, southAfricaRegion, rwandaRegion]
  },
  {
    id: "business-2",
    slug: "the-quiet-business-behind-pay-later-gadget-shops",
    format: "business",
    title: "The quiet business behind pay-later gadget shops",
    subhead: "Device financing can help buyers access better gear, but the fine print decides whether the deal is fair.",
    excerpt: "Pay-later gadget offers are spreading because they solve a real cash-flow problem, but buyers need the total cost in plain sight.",
    whyItMatters:
      "A low deposit can hide a high final price. Clear comparisons help buyers separate useful financing from expensive pressure.",
    body: [
      "A phone or laptop paid over several months can make sense when the device helps someone study, work, or earn. The problem starts when the shelf price, deposit, fees, and penalties are shown in different places.",
      "For retailers, financing increases the number of people who can say yes. For customers, it only works when the full repayment amount is visible before the first payment is made.",
      "The better version of this market is boring in the best way: clear prices, clear deadlines, and no surprise lockouts."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 20, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 20, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1800&auto=format&fit=crop",
      alt: "A person paying for a product at a retail counter",
      credit: "Unsplash"
    },
    tags: [startupTopic, appsTopic],
    regions: [kenyaRegion]
  },
  {
    id: "business-3",
    slug: "why-repair-networks-may-be-the-next-phone-battleground",
    format: "business",
    title: "Why repair networks may be the next phone battleground",
    subhead: "As phones last longer, repair access is becoming part of the buying decision, not an afterthought.",
    excerpt: "Brands that make batteries, screens, and diagnostics easier to access may earn trust long after launch day.",
    whyItMatters:
      "A phone that is easy to repair can be cheaper over its full life. That matters more as flagship prices keep climbing.",
    body: [
      "The phone market is no longer only about launch specs. People are keeping devices longer, which means batteries, screens, and software support now shape the real cost of ownership.",
      "Repair networks are becoming a competitive advantage because they reduce anxiety. Buyers want to know what happens after a cracked display, a weak battery, or a charging port failure.",
      "The brands that treat repair as part of the product may end up looking more premium than brands that only win on launch-day hardware."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 18, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 18, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1800&auto=format&fit=crop",
      alt: "Technician working on electronics at a repair bench",
      credit: "Unsplash"
    },
    tags: [startupTopic, smartphoneTopic],
    regions: [kenyaRegion, nigeriaRegion, southAfricaRegion]
  }
];

const aiArticles = buildAiArticles({ authors, topics, brands });
const appleEcosystemArticles = buildAppleEcosystemArticles({ authors, topics, brands });
const appleOpenAiLawsuitNewsArticles = buildAppleOpenAiLawsuitNewsArticles({ authors, topics, brands });
const editorialBundleArticles = buildEditorialBundleArticles({ authors, topics, brands });
const editorialJuly13Articles = buildEditorialJuly13Articles({
  authors,
  topics,
  brands,
  regions: {
    kenya: kenyaRegion
  }
});
const editorialJuly30Articles = buildEditorialJuly30Articles({
  authors,
  topics,
  brands,
  regions: {
    kenya: kenyaRegion,
    nigeria: nigeriaRegion,
    southAfrica: southAfricaRegion
  }
});
const editorialAugust1Articles = buildEditorialAugust1Articles({ authors, topics, brands });
const editorialAugust4Articles = buildEditorialAugust4Articles({
  authors,
  topics,
  brands,
  regions: [kenyaRegion, rwandaRegion, tanzaniaRegion, ethiopiaRegion]
});
const odysseyImaxArticle = buildOdysseyImaxArticle({ authors, topics, brands });
const editorialJuly7Articles = buildEditorialJuly7Articles({
  authors,
  topics,
  brands,
  regions: {
    kenya: kenyaRegion,
    nigeria: nigeriaRegion,
    southAfrica: southAfricaRegion,
    rwanda: rwandaRegion
  }
});
const hardwareGadgetsNewsArticles = buildHardwareGadgetsNewsArticles({ authors, topics, brands });
const samsungUnpackedJuly2026Article = buildSamsungUnpackedJuly2026Article({ authors, topics, brands });
const computingLaptopNewsArticles = buildComputingLaptopNewsArticles({ authors, topics, brands });
const evMobilityNewsArticles = buildEvMobilityNewsArticles({
  authors,
  topics,
  brands,
  regions: {
    kenya: kenyaRegion,
    nigeria: nigeriaRegion,
    southAfrica: southAfricaRegion,
    rwanda: rwandaRegion
  }
});
const kenyaTechNewsArticles = buildKenyaTechNewsArticles({
  authors,
  topics,
  brands,
  kenya: kenyaRegion
});
const kenyaJuly9NewsArticles = buildKenyaJuly9NewsArticles({
  authors,
  topics,
  brands,
  kenya: kenyaRegion
});
const kenyaJuly17NewsArticles = buildKenyaJuly17NewsArticles({
  authors,
  topics,
  brands,
  kenya: kenyaRegion
});
const africanTechNewsArticles = buildAfricanTechNewsArticles({
  authors,
  topics,
  brands,
  regions: {
    kenya: kenyaRegion,
    nigeria: nigeriaRegion,
    southAfrica: southAfricaRegion,
    rwanda: rwandaRegion
  }
});
const africanTechNewsJuly24Articles = buildAfricanTechNewsJuly24Articles({
  authors,
  topics,
  brands,
  regions: {
    kenya: kenyaRegion,
    nigeria: nigeriaRegion,
    southAfrica: southAfricaRegion
  }
});
const africanFintechNewsArticles = buildAfricanFintechNewsArticles({
  authors,
  topics,
  brands,
  regions: {
    kenya: kenyaRegion,
    nigeria: nigeriaRegion,
    southAfrica: southAfricaRegion,
    rwanda: rwandaRegion,
    tanzania: tanzaniaRegion
  }
});
const globalOpinionArticles = buildGlobalOpinionArticles({ authors, topics, brands });
const primeValeArticle = buildPrimeValeArticle({
  authors,
  topics,
  brands,
  kenya: kenyaRegion
});
const vlcFreeSoftwareArticle = buildVlcFreeSoftwareArticle({ authors, topics, brands });

const regionAssignments: Record<string, string[]> = {
  "kenya-ai-rules-quiet-advantage": ["kenya"],
  "three-ai-assistants-real-nairobi-week": ["kenya"],
  "end-of-free-ai-not-a-disaster": ["kenya"],
  "anthropic-mythos-models-export-control": ["kenya"]
};

function attachRegions(article: Article): Article {
  if (article.regions?.length) return article;
  const assigned = regionAssignments[article.slug]?.map((slug) => getRegion(slug)).filter((region): region is NonNullable<typeof region> => Boolean(region));
  return assigned?.length ? { ...article, regions: assigned } : article;
}

export const articles: Article[] = [
  ...editorialAugust4Articles,
  odysseyImaxArticle,
  primeValeArticle,
  vlcFreeSoftwareArticle,
  ...globalOpinionArticles,
  ...appleOpenAiLawsuitNewsArticles,
  ...editorialAugust1Articles,
  ...editorialJuly30Articles,
  ...editorialJuly13Articles,
  ...appleEcosystemArticles,
  ...editorialBundleArticles,
  ...editorialJuly7Articles,
  ...appNewsArticles,
  samsungUnpackedJuly2026Article,
  ...hardwareGadgetsNewsArticles,
  ...computingLaptopNewsArticles,
  ...evMobilityNewsArticles,
  ...reviewArticles,
  ...kenyaJuly17NewsArticles,
  ...kenyaJuly9NewsArticles,
  ...kenyaTechNewsArticles,
  ...africanTechNewsArticles,
  ...africanTechNewsJuly24Articles,
  ...africanFintechNewsArticles,
  ...regionalArticles,
  ...mobilityArticles,
  ...businessArticles,
  ...aiArticles,
  ...loadDraftArticles({ authors, topics, brands })
].map(attachRegions).sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export { glossaryTerms } from "./glossary-data";
