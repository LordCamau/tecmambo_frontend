import type { Article, Author, Tag } from "@/lib/types";

type BuildSamsungUnpackedJuly2026ArticleArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
};

function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing content term: ${slug}`);
  return item;
}

const eventTime = new Date(Date.UTC(2026, 6, 22, 15, 0, 0)).toISOString();

export function buildSamsungUnpackedJuly2026Article({ authors, topics, brands }: BuildSamsungUnpackedJuly2026ArticleArgs): Article {
  const tim = bySlug(authors, "tim-humphreys");
  const smartphones = bySlug(topics, "smartphones");
  const wearables = bySlug(topics, "wearables");
  const ai = bySlug(topics, "ai");
  const samsung = bySlug(brands, "samsung");
  const google = bySlug(brands, "google");

  return {
    id: "samsung-galaxy-unpacked-july-2026-everything-announced",
    slug: "samsung-galaxy-unpacked-july-2026-everything-announced",
    format: "news",
    title: "Samsung goes Ultra: everything announced at the London Unpacked, from a 4.1mm Fold to Gemini glasses",
    seo: {
      title: "Samsung Unpacked 2026: Fold8 Ultra, Gemini glasses, more",
      description:
        "Samsung's London Unpacked delivered the first Ultra foldable at 4.1mm, a wider Fold8, the Flip8, two new watches, and Gemini-powered smart glasses. Every announcement, explained."
    },
    subhead:
      "At its first UK Unpacked in fourteen years, Samsung split its book-style foldable in two, sent its watches diving, and put Google's AI into designer eyewear. Here is every product, what is confirmed, and what it all signals.",
    excerpt:
      "Samsung's London Unpacked delivered the first Ultra foldable at 4.1mm, a wider Fold8, the Flip8, two new watches, and Gemini-powered smart glasses. Every announcement, explained.",
    whyItMatters:
      "Samsung just redrew its most ambitious product lines in one afternoon: foldables got a premium Ultra tier, the ordinary Fold got a friendlier shape, and Gemini moved onto your face. What launched today frames the whole premium market Apple answers in September.",
    body: [
      "Samsung used its Galaxy Unpacked event in London on July 22 to make two statements at once: foldables are now important enough to deserve an Ultra tier, and the next place its AI ambitions live is on your face. At the company's first major UK launch in fourteen years, it announced the Galaxy Z Fold8 Ultra, the thinnest Fold ever made, a reshaped standard Z Fold8, the Z Flip8, the Galaxy Watch Ultra2 and Watch9, and its long-awaited smart glasses built with Google, Warby Parker, and Gentle Monster and powered by Gemini. Much of it had leaked, as we reported in our pre-event roundup at /news/samsung-unpacked-july-z-fold-8-leaks, but the details that survived contact with the stage still tell a story worth reading closely. A note on the numbers below: headline facts come from Samsung's announcements and launch coverage, and we flag where specifics still deserve the fine-print check before you order anything.",
      "## The eyewear frontier: Gemini moves onto your face",
      "[[image:glasses]]",
      "The genuine surprise-that-wasn't was Samsung's entry into smart glasses, a category Meta's Ray-Bans have had largely to themselves. Samsung's answer is its first intelligent eyewear, widely called the Galaxy Glasses, built on Google's Android XR platform and styled in partnership with the eyewear brands Warby Parker and Gentle Monster. It takes the same deliberate bet Meta took: no display at all. These are camera-and-audio glasses, with a 12MP camera, dual microphones, and directional speakers in a frame that weighs roughly 50 grams, with battery life quoted up to nine hours and a charging case good for up to seven more charges. A Qualcomm AR1 processor and Google's Gemini do the thinking.",
      "The intelligence is the point. Gemini rides along hands-free, and the pitch is real-time contextual help: look at a sign, a menu, or a landmark and ask about it, get live audio translation of a conversation, walking navigation whispered into your ear, and summaries of your notifications without touching your phone. Privacy is addressed the Samsung way, with Knox safeguards and a visible recording light when the camera is active, the industry's uneasy compromise for wearable cameras.",
      "Two honest observations. First, the designer partnerships matter more than the silicon, because the lesson of every smart-glasses attempt since Google Glass is that nobody wears computers that look like computers; Warby Parker and Gentle Monster exist on this spec sheet to make the technology invisible. Second, for readers here, the live-translation feature is quietly the killer app in multilingual markets like ours, and glasses that translate speech in real time are a genuinely different proposition in Nairobi than in London. Availability and Kenyan pricing are the details to watch.",
      "## Foldables reimagined: the Fold splits in two",
      "[[image:fold8-ultra]]",
      "The headline hardware was the Galaxy Z Fold8 Ultra, the first foldable Samsung has ever crowned with its top badge, and the measurements explain why. At 4.1 millimetres unfolded and 215 grams, it is the thinnest Fold yet, opening to an expansive 8-inch inner display with a 6.5-inch cover screen. The camera finally matches the flagship slabs, led by a 200MP main sensor and a 50MP ultrawide, and inside sit Qualcomm's Snapdragon 8 Elite Gen 5 for Galaxy and a 5,000mAh battery, both firsts for the line. A new Flex Titanium hinge is claimed to further flatten the fold's oldest embarrassment, the crease. It starts at 2,100 US dollars, premium pricing for the premium badge, and almost exactly what the leaks predicted.",
      "[[image:fold8]]",
      "The cleverer product may be the Galaxy Z Fold8 beneath it. Rather than a cheaper copy of the Ultra, Samsung reshaped it: shorter and wider, passport-like when shut, with a wider 5.5-inch cover screen and a 7.6-inch inner display that unfolds to a squarer 4:3 shape for video and games and rotates to 3:4 for reading. It starts at 1,900 dollars. This is Samsung answering the longest-running complaint about book foldables, that the closed phone was a narrow, awkward remote control, and early coverage is already predicting the wider model becomes the best-selling Fold to date. The split finally resolves what months of contradictory leaks could not: the Ultra is the thin, tall statement piece; the standard Fold is the friendly one.",
      "[[image:flip8]]",
      "The Galaxy Z Flip8 is the family's accessible foldable, and this year the clamshell earns its own upgrades rather than coasting. It keeps the Snapdragon 8 Elite Gen 5 for Galaxy and pairs a 6.9-inch main display with a larger, redesigned 4.1-inch FlexWindow that now behaves almost like a small home screen: swipe up for an app tray, swipe down for notifications and the quick panel, and rearrange or add widgets without ever opening the phone. Samsung also leaned into the cover camera, adding a Camcorder Grip mode, Super Steady with a horizontal lock, and dual recording that captures the creator and the subject at once, alongside better battery life. It is still the cheapest way into a Samsung foldable, and the one most people will actually buy.",
      "All three phones ship with One UI 9 on Android 17, and the software story leans hard into agentic AI, with features like Now Brief, which surfaces personalised updates and next steps on the cover screen, an AI Assistant Activity dashboard that shows what the on-device agents have actually done, and My FanCam auto-reframing. As always with launch-day AI features, the demos are the promise and the shipping software is the test.",
      "## Wearables and health: the watch that goes diving",
      "[[image:watches]]",
      "The Galaxy Watch Ultra2 is Samsung's most serious sports watch yet, a 47mm titanium build now certified for scuba diving, developed with the dive brand Mares, with 10ATM water resistance, real-time ascent and descent tracking, and safety decompression alerts, and pitched at extreme sport in general. Two numbers stand out. The display is quoted at a world-first 5,000 nits of peak brightness, which is the difference between glancing at your wrist in equatorial noon sun and shading it with your hand, a spec that matters more in Mombasa than in most launch-event cities. And the 800mAh battery, up roughly 35 percent, addresses the eternal smartwatch complaint. Driving it is the new Snapdragon Wear Elite platform, a genuine generational jump for a wearable-chip category that had stagnated for years.",
      "The Galaxy Watch9 takes the everyday lane: thinner, with a lighter, redesigned band built for comfortable 24/7 wear, improved heart-rate sensors, and a battery around 20 percent larger. The 24/7 framing is deliberate, because the health features that matter most, sleep tracking and continuous baselines, only work if the watch never leaves the wrist. Our recent essay on what always-on health monitoring does to its wearers applies here in full, at /opinion/can-smartwatch-predict-illness-health-anxiety.",
      "## The strategic takeaway",
      "Read together, today's launches are Samsung fortifying both ends of its territory at once. The Ultra badge on a foldable is a price-and-prestige answer to what everyone in the industry expects in September: Apple's first folding iPhone, reportedly arriving around 2,500 dollars, exactly the airspace the 2,100-dollar Fold8 Ultra now occupies in advance, and which we unpack at /business/apple-foldable-iphone-ultra-2500-luxury. The wider Fold8 is the volume play, betting that a friendlier shape converts the foldable-curious mainstream that Chinese rivals have been courting with their own thin, wide designs. And the glasses are Samsung and Google jointly refusing to let Meta define AI eyewear unopposed, with Gemini as the differentiator neither Meta nor Apple can license.",
      "The comparison that frames the rest of the year is with Apple, whose iPhone line answers in September. Where Samsung is reinventing the shape of the phone, Apple is reportedly reworking the camera, with the iPhone 18 Pro's rumoured variable aperture the kind of single hardware reason a mature phone needs to feel new, which we cover at /news/iphone-18-pro-variable-aperture-rumors. Two different bets on where a flagship earns its price.",
      "For Kenyan buyers, the practical notes are familiar: none of these prices include our duties and margins, so wait for confirmed local pricing and availability before doing the maths, and remember the pattern that follows every Unpacked, last year's excellent Fold 7 and Watch Ultra just became the value picks as their prices fall. Pre-orders opened on launch day, with general availability from August 7, and we will follow with local pricing, availability, and full reviews as devices reach the market."
    ],
    closingLine:
      "Samsung split its most ambitious phone in two, sent its watch diving, and put Gemini on your face, and in doing so it drew the premium map that Apple now has to answer in September.",
    author: tim,
    publishedAt: eventTime,
    updatedAt: eventTime,
    readTime: "8 min read",
    image: {
      src: "/articles/samsung-unpacked-july-2026-everything-announced.jpg",
      alt: "The Samsung Galaxy Z Fold8 Ultra held folded in one hand, showing its triple rear cameras against a purple Ultra backdrop. Credit: Samsung.",
      credit: "Samsung",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    inlineImages: [
      {
        id: "glasses",
        src: "/articles/samsung-unpacked-2026-gemini-smart-glasses.jpg",
        alt: "A person wearing Samsung's Gemini-powered smart glasses outdoors. Credit: Samsung.",
        credit: "Samsung",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      {
        id: "fold8-ultra",
        src: "/articles/samsung-galaxy-z-fold8-ultra.jpg",
        alt: "The Samsung Galaxy Z Fold8 Ultra held open in two hands to show its thin unfolded profile. Credit: Samsung.",
        credit: "Samsung",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      {
        id: "fold8",
        src: "/articles/samsung-galaxy-z-fold8.jpg",
        alt: "The Samsung Galaxy Z Fold8 folded shut, showing its wider passport-shaped cover screen. Credit: Samsung.",
        credit: "Samsung",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      {
        id: "flip8",
        src: "/articles/samsung-galaxy-z-flip8.jpg",
        alt: "The Samsung Galaxy Z Flip8 clamshell foldable half open on a surface. Credit: Samsung.",
        credit: "Samsung",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      {
        id: "watches",
        src: "/articles/samsung-galaxy-watch-ultra2-watch9.jpg",
        alt: "The Samsung Galaxy Watch Ultra2 rugged titanium smartwatch worn on a wrist outdoors. Credit: Samsung.",
        credit: "Samsung",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      }
    ],
    tags: [smartphones, wearables, ai, samsung, google],
    faq: [
      {
        question: "What did Samsung announce at Galaxy Unpacked July 2026?",
        answer:
          "The Galaxy Z Fold8 Ultra, a reshaped Galaxy Z Fold8, the Galaxy Z Flip8, the Galaxy Watch Ultra2, the Galaxy Watch9, and its first intelligent eyewear, built with Google, Warby Parker, and Gentle Monster and running Gemini."
      },
      {
        question: "How thin is the Galaxy Z Fold8 Ultra?",
        answer:
          "4.1 millimetres unfolded and 215 grams, making it the thinnest Galaxy Fold yet, with an 8-inch inner display, a 200MP main camera, and a 5,000mAh battery, starting at 2,100 US dollars."
      },
      {
        question: "What is different about the standard Galaxy Z Fold8?",
        answer:
          "A new shorter, wider shape with a 7.6-inch inner display that unfolds to a 4:3 ratio and a wider 5.5-inch cover screen, designed to feel like a normal phone when closed, starting at 1,900 dollars."
      },
      {
        question: "Do Samsung's smart glasses have a screen?",
        answer:
          "No. They are display-free camera-and-audio glasses with a 12MP camera and directional speakers, using Google's Gemini for hands-free assistance including live translation and navigation."
      },
      {
        question: "What is new in the Galaxy Watch Ultra2?",
        answer:
          "A 47mm titanium build with scuba-dive certification developed with Mares, a 5,000-nit display, a roughly 35 percent larger 800mAh battery, and the new Snapdragon Wear Elite chip."
      }
    ],
    sources: [
      {
        label: "Samsung Global Newsroom: Galaxy Z Fold8 Ultra, Fold8 and Flip8 first look",
        url: "https://news.samsung.com/global/galaxy-unpacked-july-2026-a-first-look-at-galaxy-z-fold8-ultra-galaxy-z-fold8-and-galaxy-z-flip8"
      },
      {
        label: "Samsung Global Newsroom: Galaxy Watch Ultra2 and Watch9 first look",
        url: "https://news.samsung.com/global/galaxy-unpacked-july-2026-a-first-look-at-galaxy-watch-ultra2-and-galaxy-watch9"
      },
      {
        label: "Google: Galaxy Unpacked, Gemini and Samsung are better together",
        url: "https://blog.google/products-and-platforms/platforms/android/galaxy-unpacked-2026/"
      },
      {
        label: "Android Central: Galaxy Unpacked 2026 launch, everything announced",
        url: "https://www.androidcentral.com/phones/live/samsung-galaxy-unpacked-2026-launch-live-z-fold-8-ultra-z-fold-8-z-flip-8-galaxy-glasses-and-all-the-news"
      },
      {
        label: "Tom's Guide: Samsung Galaxy Unpacked 2026 recap",
        url: "https://www.tomsguide.com/news/live/samsung-galaxy-unpacked-2026-live"
      },
      {
        label: "tecMAMBO pre-event coverage: Samsung Unpacked lands July 22, the Z Fold 8 leaks explained",
        url: "/news/samsung-unpacked-july-z-fold-8-leaks"
      }
    ]
  };
}
