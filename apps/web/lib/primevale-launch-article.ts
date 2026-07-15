import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type BuildPrimeValeArticleArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
  kenya: RegionTerm;
};

function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing content term: ${slug}`);
  return item;
}

function published() {
  return new Date(Date.UTC(2026, 6, 14, 8, 30, 0)).toISOString();
}

export function buildPrimeValeArticle({ authors, topics, brands, kenya }: BuildPrimeValeArticleArgs): Article {
  const tim = bySlug(authors, "tim-humphreys");
  const startups = bySlug(topics, "startups");
  const business = bySlug(topics, "business");
  const primeVale = bySlug(brands, "primevale");

  return {
    id: "kenya-business-primevale-property-marketplace",
    slug: "primevale-kenya-property-marketplace",
    format: "news",
    title: "PrimeVale is betting that informed property buyers are better buyers",
    seo: {
      title: "PrimeVale: a new Kenyan property platform betting on education",
      description:
        "PrimeVale, a new Kenyan property marketplace, pairs listings with plain-language guides to close the industry's information gap. A look at the promise and the hard part."
    },
    subhead:
      "The new marketplace says it wants to teach buyers, not just list to them. It is a genuinely good idea entering a genuinely crowded market. The real questions are execution, and independence.",
    excerpt:
      "PrimeVale says its new Kenyan property marketplace will pair listings with plain-language guides for first-time buyers. The education-first idea is strong, but trust will depend on verification and independence.",
    whyItMatters:
      "Property is the single biggest purchase most Kenyans ever make, and the information gap around it costs real money. A platform trying to close that gap is worth understanding, and worth scrutinising.",
    body: [
      "A new property marketplace called PrimeVale has launched in Kenya with a pitch that stands out from the usual listings-and-leads model: it says it wants to help Kenyans understand property, not just buy it. According to the company, PrimeVale pairs a conventional property marketplace, where buyers can browse apartments, houses, land, and off-plan projects and contact agents and developers, with a plain-language education arm of guides, explainers, and news aimed squarely at first-time buyers.",
      "## What PrimeVale says it is",
      "On the surface, by the company's own description, PrimeVale works like any modern property portal: browse and filter by location and budget, then reach out to the people behind the listings. The differentiator PrimeVale emphasises is its property advice section, a growing library it describes as \"Real Estate 101,\" written in plain language to answer the questions first-time buyers actually ask.",
      "What does freehold really mean? How does an off-plan payment plan work? What should you check before paying a deposit? How do you verify a title deed? What did the latest Finance Bill change for buyers? PrimeVale says its longer-term ambition is to become Kenya's leading real estate news and education platform, going beyond guides into policy coverage, market trends, neighbourhood spotlights, and developer updates.",
      "## The problem it is aiming at is real",
      "Strip away the pitch, and PrimeVale is pointing at something genuine. Kenyan property runs on information asymmetry, the gap between what sellers and insiders know and what ordinary buyers understand, and that gap has a price.",
      "Duplicated or forged title deeds, deposits paid on land the seller does not actually own, off-plan projects that stall or never break ground, and widespread confusion over leasehold versus freehold or what a \"ready title\" truly means have cost Kenyan buyers dearly for years.",
      "When property is the biggest financial decision of your life, being the uninformed party in the room is not just uncomfortable, it is dangerous. So a platform that treats buyer education as a core feature, rather than a neglected blog, is aiming at a real and painful problem, and that is to its credit.",
      "## The bet: trust as a business model",
      "PrimeVale's underlying thesis, in its own framing, is that an informed buyer is a better buyer, and that trust built through education will bring the agents and developers who list on the platform better and more qualified leads. On paper that is a smart alignment: teach people, earn their trust, and the marketplace becomes more valuable to both sides.",
      "It is, notably, close to the same logic that underpins credible media, including this publication, which is built on the idea that clarity earns trust. So we are sympathetic to the instinct. We are also, from experience, familiar with how hard it is to actually live up to.",
      "## The hard part",
      "Two challenges deserve naming honestly. The first is the market. PrimeVale is not entering open ground. Kenya already has several established property marketplaces, and many of them already advertise verified listings, trusted platforms, and expert insights. Buyer education and trust are precisely the flags incumbents already wave. Standing out will take genuinely better content and genuinely stronger verification, not just a better tagline.",
      "The second challenge is deeper, and it is the one every marketplace that also wants to be a trusted educator has to face. PrimeVale's paying customers are the agents and developers who list on it. Its promise to readers is honest, independent education about buying from agents and developers. Those two things can coexist, but only with real discipline.",
      "The guides have to be willing to tell a reader to walk away from a bad deal, to spell out the risks of off-plan buying even when off-plan developers are clients, and to stop the education from quietly turning into marketing for whoever is paying.",
      "If PrimeVale's advice section stays genuinely independent, it is both a public good and a real competitive moat. If it slowly becomes content marketing for its own listings, buyers will sense it, and the trust the entire model rests on will drain away. Verification faces the same test: the word \"verified\" is only worth something if the checks behind it are real and enforced.",
      "## The bottom line",
      "PrimeVale has picked the right problem and a genuinely appealing position. In a market that has long profited from keeping buyers in the dark, betting on informed buyers is both decent and potentially smart business. Whether it works comes down to execution on two things that cannot be faked: whether its education is genuinely independent and useful, and whether its listings are genuinely verified.",
      "Kenyan property buyers would be better off if a platform got both right. Whether PrimeVale turns out to be that platform is something only its track record, not its launch announcement, can show.",
      "For now, if you are house-hunting or simply trying to make sense of the market, it is worth a look, with the same healthy scepticism you should bring to any property platform, and the same rule that protects every buyer: never pay a deposit before you have done your own independent checks."
    ],
    closingLine:
      "PrimeVale's launch is interesting because the problem is real. The proof will be whether the platform keeps buyers better informed when money and listings start pulling in the other direction.",
    faq: [
      {
        question: "What is PrimeVale?",
        answer:
          "According to the company, PrimeVale is a new Kenyan property marketplace that combines listings with a plain-language education section about buying property."
      },
      {
        question: "What does PrimeVale do?",
        answer:
          "It lets buyers browse apartments, houses, land, and off-plan projects and contact agents and developers, and it publishes guides and news explaining how property buying in Kenya works."
      },
      {
        question: "How is PrimeVale different from other Kenyan property sites?",
        answer:
          "Its stated differentiator is buyer education, a library it calls Real Estate 101, and a longer-term ambition to become Kenya's leading property news and education platform."
      },
      {
        question: "Are PrimeVale's listings verified and safe?",
        answer:
          "Any platform's verification is only as reliable as the checks behind it. Whatever platform you use, independently verify title deeds and never pay a deposit before your own due diligence."
      },
      {
        question: "Where can I find PrimeVale?",
        answer: "The company lists its platform and property blog at primevale.co.ke."
      }
    ],
    author: tim,
    publishedAt: published(),
    updatedAt: published(),
    readTime: "6 min read",
    image: {
    src: "/articles/primevale-property-marketplace-pexels.jpg",
      alt: "A person browsing a property marketplace on a laptop. Credit: Pexels.",
      credit: "Pexels",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    tags: [startups, business, primeVale],
    regions: [kenya],
    sources: [
      {
        label: "PrimeVale company press release and statement",
        url: "https://primevale.co.ke/"
      },
      {
        label: "PrimeVale official website",
        url: "https://primevale.co.ke/"
      }
    ]
  };
}
