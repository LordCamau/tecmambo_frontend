import type { Article, Author, Tag } from "@/lib/types";
import { loadDraftArticles } from "@/lib/article-drafts";
import { buildAfricanFintechNewsArticles } from "@/lib/african-fintech-news-2026";
import { buildAiArticles } from "@/lib/ai-articles";
import { buildAfricanTechNewsArticles } from "@/lib/african-tech-news-2026";
import { buildAppleEcosystemArticles } from "@/lib/apple-ecosystem-news-2026";
import { buildEditorialBundleArticles } from "@/lib/editorial-bundle-july-2026";
import { buildEvMobilityNewsArticles } from "@/lib/ev-mobility-news-2026";
import { buildHardwareGadgetsNewsArticles } from "@/lib/hardware-gadgets-news-2026";
import { buildKenyaTechNewsArticles } from "@/lib/kenya-tech-news-july-2026";
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
  { name: "Android", slug: "android", kind: "topic" },
  { name: "Apps", slug: "apps", kind: "topic" },
  { name: "Smartphones", slug: "smartphones", kind: "topic" },
  { name: "Computing", slug: "computing", kind: "topic" },
  { name: "Social Media", slug: "social-media", kind: "topic" },
  { name: "Entertainment", slug: "entertainment", kind: "topic" },
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
  { name: "Cybersecurity", slug: "cybersecurity", kind: "topic" },
  { name: "Security Updates", slug: "security-updates", kind: "topic" },
  { name: "Audio", slug: "audio", kind: "topic" },
  { name: "Connectivity", slug: "connectivity", kind: "topic" },
  { name: "Routers", slug: "routers", kind: "topic" },
  { name: "Home Internet", slug: "home-internet", kind: "topic" },
  { name: "Networking", slug: "networking", kind: "topic" },
  { name: "Power & batteries", slug: "power-batteries", kind: "topic" },
  { name: "Accessories", slug: "accessories", kind: "topic" },
  { name: "Headphones", slug: "headphones", kind: "topic" },
  { name: "Smart Watches", slug: "smart-watches", kind: "topic" },
  { name: "VR & AR", slug: "vr-ar", kind: "topic" },
];

export const brands: Tag[] = [
  { name: "Sony", slug: "sony", kind: "brand" },
  { name: "PlayStation", slug: "playstation", kind: "brand" },
  { name: "Samsung", slug: "samsung", kind: "brand" },
  { name: "Oraimo", slug: "oraimo", kind: "brand" },
  { name: "Apple", slug: "apple", kind: "brand" },
  { name: "Xiaomi", slug: "xiaomi", kind: "brand" },
  { name: "Nothing", slug: "nothing", kind: "brand" },
  { name: "Vivo", slug: "vivo", kind: "brand" },
  { name: "Anthropic", slug: "anthropic", kind: "brand" },
  { name: "Amazon", slug: "amazon", kind: "brand" },
  { name: "OpenAI", slug: "openai", kind: "brand" },
  { name: "Google", slug: "google", kind: "brand" },
  { name: "Microsoft", slug: "microsoft", kind: "brand" },
  { name: "Volkswagen", slug: "volkswagen", kind: "brand" },
  { name: "Toyota", slug: "toyota", kind: "brand" },
  { name: "BYD", slug: "byd", kind: "brand" },
  { name: "Tesla", slug: "tesla", kind: "brand" },
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
  { name: "Spiro", slug: "spiro", kind: "brand" },
  { name: "Shuttlers", slug: "shuttlers", kind: "brand" },
  { name: "Aions Ventures", slug: "aions-ventures", kind: "brand" },
  { name: "Holocene", slug: "holocene", kind: "brand" },
  { name: "Livestock Wealth", slug: "livestock-wealth", kind: "brand" },
  { name: "Heifer International", slug: "heifer-international", kind: "brand" },
  { name: "Development Bank of Rwanda", slug: "development-bank-of-rwanda", kind: "brand" },
  { name: "Flutterwave", slug: "flutterwave", kind: "brand" },
  { name: "Moniepoint", slug: "moniepoint", kind: "brand" },
  { name: "Paystack", slug: "paystack", kind: "brand" }
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
      "The Galaxy A37 5G is the definition of a safe choice. It nails the fundamentals, the screen, the battery, the software support, and the reliability, and it will serve most people well for years. It just does not excite, and it leans heavily on last year's phone. If you value dependability, long support, and the Samsung experience, and you buy it at a sensible price, it is easy to live with and easy to recommend. If you want the newest performance or the best raw value, check the discounts and the rivals first. A dependable 3.5 out of 5."
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
    subhead: "The most important electric vehicles may be the ones that lower daily running costs, not the ones on glossy stages.",
    excerpt: "Electric motorbikes are a practical mobility story: battery swaps, charging access, repair networks, and daily earnings all matter more than hype.",
    whyItMatters:
      "If electric mobility is going to work for more people, it has to make the everyday commute and delivery shift cheaper, simpler, and easier to maintain.",
    body: [
      "Electric cars get the dramatic photos, but electric motorbikes may be the more interesting test of whether EVs can fit real urban life. They are cheaper to buy, easier to park, and closer to the daily economics of riders who count every shilling spent on fuel and repairs.",
      "The challenge is not only the bike. It is the system around it: charging, battery swaps, spare parts, financing, and technicians who can keep the fleet moving when something breaks.",
      "That is why the best electric mobility story is not a single launch. It is a network that makes the cheaper choice feel reliable enough to trust every morning."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 25, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 25, 7, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop",
      alt: "Motorbike parked on a city street",
      credit: "Unsplash"
    },
    tags: [mobilityTopic, powerTopic],
    regions: [kenyaRegion]
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
const editorialBundleArticles = buildEditorialBundleArticles({ authors, topics, brands });
const hardwareGadgetsNewsArticles = buildHardwareGadgetsNewsArticles({ authors, topics, brands });
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
  ...appleEcosystemArticles,
  ...editorialBundleArticles,
  ...appNewsArticles,
  ...hardwareGadgetsNewsArticles,
  ...evMobilityNewsArticles,
  ...reviewArticles,
  ...kenyaTechNewsArticles,
  ...africanTechNewsArticles,
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
