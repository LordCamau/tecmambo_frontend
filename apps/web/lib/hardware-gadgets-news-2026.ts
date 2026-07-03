import type { Article, Author, Tag } from "@/lib/types";

type BuildHardwareGadgetsNewsArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
};

function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing content term: ${slug}`);
  return item;
}

function published(hour: number) {
  return new Date(Date.UTC(2026, 6, 3, hour, 0, 0)).toISOString();
}

export function buildHardwareGadgetsNewsArticles({ authors, topics, brands }: BuildHardwareGadgetsNewsArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const smartphones = bySlug(topics, "smartphones");
  const wearables = bySlug(topics, "wearables");
  const audio = bySlug(topics, "audio");
  const samsung = bySlug(brands, "samsung");
  const apple = bySlug(brands, "apple");
  const xiaomi = bySlug(brands, "xiaomi");
  const nothing = bySlug(brands, "nothing");

  return [
    {
      id: "hardware-news-samsung-z-fold-8-leaks",
      slug: "samsung-unpacked-july-z-fold-8-leaks",
      format: "news",
      title: "Samsung Unpacked lands July 22: Z Fold 8 leaks explained",
      seo: {
        title: "Samsung Unpacked lands July 22: Z Fold 8 leaks explained",
        description:
          "Samsung's next Unpacked is expected on July 22 in London, with the Z Fold 8 heavily leaked: a 200MP camera, an ultra-thin body, and a possible new tier."
      },
      subhead:
        "The leaks are so complete that the event risks being a formality. Here is what is credibly known, what is contested, and what is still guesswork.",
      excerpt:
        "Samsung's next Galaxy Unpacked is widely expected on July 22, with Z Fold 8 leaks pointing to thinner hardware, camera upgrades, and a possible wider model.",
      whyItMatters:
        "Foldables are where phone design is actually moving, and this launch will set the bar, and the prices, that every rival gets measured against for the next year.",
      body: [
        "Samsung's next Galaxy Unpacked is widely expected on July 22, 2026, in London, and its next foldables have leaked so thoroughly that the reveal risks feeling like a formality. A quick honesty note before the details: Samsung has not fully confirmed every product detail, so treat this as a strong rumor picture rather than fact.",
        "The consistent story across supply-chain leaks is that the Galaxy Z Fold 8 generation is about doing more with less thickness. Some reports put the slimmest model near 4.1mm unfolded, while newer leaks around the wider model point closer to 4.5mm, which is why the exact number should stay in rumor territory until launch day.",
        "Camera leaks are split too. Some reports point to a 200MP main camera on the premium Fold tier, while others describe a dual 50MP setup for the wider model. That disagreement matters because it suggests Samsung may be preparing more than one book-style Fold, not merely one direct successor.",
        "Under the hood, the reporting broadly points to Qualcomm's Snapdragon 8 Elite Gen 5 chip, more efficient screens, and battery and charging upgrades over the Fold 7 generation. Those details would make sense, but they are still reported specs, not Samsung's official spec sheet.",
        "The most interesting rumor is about the lineup itself. Multiple reports say Samsung could ship two book-style foldables for the first time: the familiar tall, narrow design, and a new wider model with a squarer inner screen aimed at people who found previous Folds too narrow when closed.",
        "Here is where the leaks genuinely disagree: some outlets call the wider phone the standard Fold 8 and the thin, narrow one a premium Fold 8 Ultra, while others use Fold 8 Wide for the squarer model. The naming will only be settled on stage.",
        "Either way, a premium tier makes competitive sense. Chinese rivals such as Honor, Oppo, and Huawei have pushed hard on thinness and battery for two generations, and an expected foldable from Apple looms over the category.",
        "Pricing leaks suggest a starting price around 1,999 US dollars, in line with the Fold 7, with the Galaxy Z Flip 8 expected alongside as a more modest refresh. New Galaxy Watch models and possibly XR or smart-glasses news are also rumored for the event, but the foldables are clearly the main act.",
        "For more launch-season context, the Apple Watch redesign rumor is a different kind of hardware story, but the same advice applies: wait for the official details before spending around an upgrade cycle. See /news/apple-watch-2027-redesign-band-compatibility.",
        "Should you care? If you are foldable-curious, this is the launch to wait for, since even the rumors reshape the buying maths: a thinner, better-camera Fold at the top, a wider model that behaves more like a normal phone when shut, and last year's excellent Fold 7 about to get cheaper."
      ],
      closingLine:
        "If the July 22 date holds, pre-orders will likely open around the event, and we will replace the rumor picture with confirmed facts once Samsung says them on stage.",
      author: tim,
      publishedAt: published(11),
      updatedAt: published(11),
      readTime: "5 min read",
      image: {
        src: "/articles/samsung-unpacked-z-fold-8-leaks.jpg",
        alt: "Samsung Galaxy Z Fold 8 leaked render. Credit: Android Headlines.",
        credit: "Android Headlines",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [smartphones, samsung],
      faq: [
        {
          question: "When is the next Samsung Galaxy Unpacked?",
          answer: "It is widely reported for July 22, 2026, in London, with Samsung teasers and preorder signals pointing in that direction."
        },
        {
          question: "What is rumored for the Galaxy Z Fold 8?",
          answer:
            "Leaks point to thinner foldable hardware, Snapdragon 8 Elite Gen 5, camera upgrades, and possibly a second wider Fold model, but the exact specs differ by report."
        },
        {
          question: "Will there be a Galaxy Z Fold 8 Ultra?",
          answer:
            "Reports disagree on naming. A premium tier is rumored, but which model carries the Ultra name remains unconfirmed until Samsung announces the lineup."
        }
      ],
      sources: [
        {
          label: "TechRadar: Samsung Galaxy Z Fold 8 specs and case leaks",
          url: "https://www.techradar.com/phones/samsung-galaxy-phones/samsung-galaxy-z-fold-8-specs-and-cases-leaks-fill-the-gaps-in-samsungs-new-teaser-and-there-could-be-one-disappointing-omission"
        },
        {
          label: "The Verge: Samsung wide foldable image leaks",
          url: "https://www.theverge.com/tech/959372/samsung-galaxy-z-fold-wide-image-leaks"
        },
        {
          label: "T3: Samsung Unpacked preorder signals",
          url: "https://www.t3.com/tech/android-phones/samsung-confirms-galaxy-z-fold-8-launch-date-early-heres-when-pre-orders-should-start"
        }
      ]
    },
    {
      id: "hardware-news-apple-watch-2027-redesign",
      slug: "apple-watch-2027-redesign-band-compatibility",
      format: "news",
      title: "Apple Watch redesign may break your bands in 2027",
      seo: {
        title: "Apple Watch redesign may break your bands in 2027",
        description:
          "A prominent leaker says a major 2027 Apple Watch redesign will change how bands attach, making current straps obsolete. What to do before you upgrade."
      },
      subhead:
        "The long-rumored Apple Watch X overhaul appears to be back on, now pointed at 2027. The practical advice is simple: stop stockpiling bands.",
      excerpt:
        "A new Apple Watch rumor says a 2027 redesign could change the band attachment system, potentially making today's straps incompatible.",
      whyItMatters:
        "Many Apple Watch owners have more money in their band collection than in the watch itself. If the attachment system changes, all of that becomes decoration.",
      body: [
        "Apple is reportedly planning its biggest Apple Watch redesign in years for 2027, and the change that would touch most owners is the least glamorous one: a new band attachment system that could make existing straps incompatible.",
        "The claim comes from Instant Digital, a Weibo-based leaker with a track record on Apple supply-chain details, so treat it as a credible rumor rather than a certainty.",
        "The logic behind the change is about space. The slide-in band mechanism Apple has used since the first Watch takes up room inside the case. Reworking how bands attach could free internal space that Apple might spend on a larger battery or more health sensors.",
        "Earlier reporting from Bloomberg's Mark Gurman described Apple exploring a magnetic band system. The current leak does not prove that specific mechanism is coming, but it revives the same basic idea: Apple may need to break band compatibility to redesign the Watch more meaningfully.",
        "This is essentially the Apple Watch X overhaul rumored for the Watch's tenth anniversary in 2024 that never materialised. The new leak suggests the idea may have been delayed rather than cancelled.",
        "The timeline matters for anyone shopping now. This September's expected models, often discussed as the Apple Watch Series 12 and Ultra 4, are tipped to be more incremental updates that keep the current design and band system.",
        "The more radical overhaul is pointed at the Series 13 in 2027. That fits Apple's rhythm neatly: the Watch has historically kept a design language for a few generations before a reset.",
        "The honest caveats: this is one leaker reviving older reporting, Apple never comments on future products, and the same leaker previously pointed to 2028 before shifting to 2027, so the date itself is soft.",
        "It is also plausible Apple keeps the old band system alive on a cheaper SE model to soften the blow, though that is speculation.",
        "The practical takeaway is worth acting on even at rumor strength. If you own an Apple Watch and plan to upgrade in the next couple of years, do not invest heavily in new bands right now, especially premium ones.",
        "A collection that outvalues the watch itself is common, and if the attachment changes in 2027, none of it carries over. Buy the strap you need, skip the ones you merely want, and wait for the design to settle.",
        "This sits beside the Samsung foldable rumors as part of a wider 2026 to 2027 hardware reset cycle. See /news/samsung-unpacked-july-z-fold-8-leaks."
      ],
      closingLine:
        "The rumor may change, but the shopping advice is sturdy: do not stockpile expensive bands when the connector itself might be headed for a reset.",
      faq: [
        {
          question: "Will my Apple Watch bands work with future models?",
          answer:
            "They are expected to work with this year's rumored Series 12 and Ultra 4. A rumored 2027 redesign, however, may change the attachment system and break compatibility."
        },
        {
          question: "What is the Apple Watch X?",
          answer:
            "It is the name often used for a long-rumored major Apple Watch redesign, including a slimmer case, more internal space, and a possible new band system."
        },
        {
          question: "Should I stop buying Apple Watch bands?",
          answer: "If you plan to upgrade in 2027, it is sensible to hold off on expensive new bands until the redesign is confirmed."
        }
      ],
      author: tim,
      publishedAt: published(10),
      updatedAt: published(10),
      readTime: "4 min read",
      image: {
        src: "/articles/apple-watch-2027-redesign-band-compatibility.jpg",
        alt: "Apple Watch style smartwatch receiving a call. Credit: Adweek.",
        credit: "Adweek",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [wearables, apple],
      sources: [
        {
          label: "MacRumors: Apple Watch redesign coming next year",
          url: "https://www.macrumors.com/2026/06/30/apple-watch-redesign-coming-next-year/"
        },
        {
          label: "Wareable: Apple Watch 2027 design overhaul leak",
          url: "https://www.wareable.com/apple/apple-watch-2027-design-overhaul-band-backward-compatibility-leak"
        },
        {
          label: "Cult of Mac: Apple Watch redesign band compatibility rumor",
          url: "https://www.cultofmac.com/news/apple-watch-13-will-bring-major-redesign"
        }
      ]
    },
    {
      id: "hardware-news-wifi-audio-earbuds",
      slug: "wifi-audio-earbuds-beyond-bluetooth",
      format: "news",
      title: "Wi-Fi earbuds are here, and Bluetooth is on notice",
      seo: {
        title: "Wi-Fi earbuds are here, and Bluetooth is on notice",
        description:
          "Xiaomi and vivo now ship earbuds that stream over Wi-Fi at up to 4.6Mbps for true lossless audio. How it works, the catches, and whether you should care."
      },
      subhead:
        "A new generation of earbuds quietly switches from Bluetooth to Wi-Fi to stream true lossless audio. The idea is excellent. The compatibility catch is not.",
      excerpt:
        "Premium earbuds from Xiaomi and vivo can use Wi-Fi for higher-bandwidth lossless audio, but early compatibility is tightly limited.",
      whyItMatters:
        "Bluetooth has been the invisible ceiling on wireless sound quality for two decades. The first cracks in that ceiling are now shipping in real products.",
      body: [
        "A quiet shift is underway in premium audio: earbuds that no longer rely on Bluetooth alone. The newest high-end models can hand off to Wi-Fi when paired with the right phone, jumping from Bluetooth's narrow pipe to enough bandwidth for genuinely lossless, hi-res audio.",
        "The trend has real products behind it. Xiaomi shipped the Buds 5 Pro Wi-Fi, built on Qualcomm's S7 Pro chip and a technology called XPAN that streams 24-bit, 96kHz lossless audio at up to 4.2Mbps over Wi-Fi.",
        "Vivo has now announced its TWS 5 Pro, which takes a different route, using a custom Wi-Fi connection rather than Qualcomm's branded approach, and claims up to 4.6Mbps.",
        "When two major manufacturers arrive at the same idea by different roads, it is a direction, not a gimmick.",
        "Why does bandwidth matter? Bluetooth was never designed for high-fidelity music, so every Bluetooth codec compresses your audio to squeeze it through a narrow pipe.",
        "Most people genuinely do not notice, but the ceiling is real, and it is why wireless and audiophile have never fully gotten along.",
        "A Wi-Fi link is a wider pipe. It can carry full lossless quality, and in Qualcomm's version, it can also offer extra range because the buds can stay connected around your home network rather than only within a few metres of your phone.",
        "Now the honest catches, and they are significant. First, compatibility: Wi-Fi audio mode only works with specific matching phones. Xiaomi's buds currently do their full Wi-Fi trick with limited flagship support, and vivo's support is tied to a handful of its own phones in China.",
        "Buy them with the wrong phone and you have expensive Bluetooth earbuds.",
        "Second, power: Wi-Fi streaming can drain the buds faster in some implementations, with vivo quoting roughly four to five hours in Wi-Fi mode.",
        "Third, an unglamorous truth about hearing: on small in-ear drivers, in traffic or a noisy office, the difference between good compressed audio and true lossless is subtle, and many listeners will not pick it in a blind test.",
        "So, should you care? As a purchase, not yet, unless you own the exact matching flagship and care deeply about lossless. As a signal, absolutely. This is the beginning of wireless audio outgrowing Bluetooth's limits.",
        "Expect Apple, Samsung, and the rest to answer, and expect works best with our phone lock-in to be the price of early entry."
      ],
      closingLine:
        "Wi-Fi earbuds are not the default yet, but Bluetooth finally has serious pressure from shipping products rather than lab demos.",
      faq: [
        {
          question: "What are Wi-Fi earbuds?",
          answer:
            "They are earbuds that can stream audio over a Wi-Fi connection instead of only Bluetooth, allowing higher-bandwidth lossless audio."
        },
        {
          question: "Which earbuds support Wi-Fi audio?",
          answer:
            "Xiaomi's Buds 5 Pro Wi-Fi use Qualcomm XPAN, while vivo's TWS 5 Pro uses a custom Wi-Fi approach. Both need specific compatible phones for their best mode."
        },
        {
          question: "Is Wi-Fi audio better than Bluetooth?",
          answer:
            "It offers far more bandwidth for lossless quality and, in some versions, better range, but early products have compatibility and battery-life catches."
        }
      ],
      author: tim,
      publishedAt: published(9),
      updatedAt: published(9),
      readTime: "5 min read",
      image: {
        src: "/articles/wifi-audio-earbuds-beyond-bluetooth.jpg",
        alt: "Xiaomi Buds Pro 5 earbuds in an open charging case. Credit: Gadgetmatch.",
        credit: "Gadgetmatch",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [audio, xiaomi],
      sources: [
        {
          label: "Xiaomi: Buds 5 Pro Wi-Fi",
          url: "https://www.mi.com/global/product/xiaomi-buds-5-pro/"
        },
        {
          label: "What Hi-Fi: Xiaomi Buds 5 Pro Wi-Fi",
          url: "https://www.whathifi.com/news/xiaomi-claims-a-world-first-for-its-new-lossless-wireless-earbuds"
        },
        {
          label: "TechRadar: Wi-Fi earbuds and lossless audio",
          url: "https://www.techradar.com/audio/earbuds-airpods/wi-fi-earbuds-are-coming-for-bluetooth"
        }
      ]
    },
    {
      id: "hardware-news-nothing-phone-4b",
      slug: "nothing-phone-4b-launch-july",
      format: "news",
      title: "Nothing Phone (4b) lands July 7: what to expect",
      seo: {
        title: "Nothing Phone (4b) lands July 7: what to expect",
        description:
          "Nothing's budget Phone (4b) launches July 7 with the signature transparent design, a Glyph Bar, and leaked specs including a 120Hz AMOLED and big battery."
      },
      subhead:
        "Nothing's cheaper line returns on July 7, carrying the design flourishes that made the brand a cult favourite into a price bracket most flagships ignore.",
      excerpt:
        "Nothing has confirmed the Phone (4b) for July 7, with leaks pointing to a transparent-style design, Glyph Bar, 120Hz AMOLED display, and a large battery.",
      whyItMatters:
        "The budget mid-range is where most people actually buy, and Nothing is one of the few brands trying to make that segment feel desirable rather than merely adequate.",
      body: [
        "Nothing will launch the Phone (4b) on July 7, 2026, continuing the London-based brand's push into the budget-friendly mid-range where its previous affordable models found a cult following.",
        "The launch has been officially teased, with India confirmed as a lead market, and the Ear (3a) earbuds expected at the same event.",
        "What makes Nothing's budget phones interesting has never been raw specs; it is that they refuse to look and feel cheap.",
        "Official teasers and reporting point to a transparent-style rear treatment and a Glyph Bar for notifications, along with Nothing's clean, bloat-light version of Android, the software experience that has become as much of a selling point as the design.",
        "On the hardware, treat the details as credible leaks rather than confirmed specs until the event. Reports point to a 6.77-inch AMOLED display at 120Hz, a Snapdragon 6 Gen 4 chip, a 50MP main camera with a 16MP front camera, and a large battery.",
        "Different outlets report different battery figures, from around 5,400mAh to 6,000mAh, a discrepancy the launch will settle.",
        "Expected pricing in India sits around the 30,000-rupee mark, which is the aggressive mid-range territory its predecessor played in. Longer software support in the range of several years of security updates is also expected, which matters more at this price than any single spec.",
        "The context is what makes this launch worth watching. The budget mid-range is the most important segment in most of the world, including Kenya, yet it is usually served with anonymous, interchangeable hardware.",
        "Nothing's bet is that design, personality, and clean software can win there just as they did at higher prices.",
        "Its earlier budget models proved there is real appetite for that; the Phone (4b) has to prove it again against fierce competition from Samsung's A series, Redmi, and Tecno, all of whom fight hard at this price.",
        "For the wider market, keep an eye on our smartphone archive at /news/smartphones. We will verify availability and pricing for the Kenyan market once the phone is official, since local price is where a budget phone's argument is won or lost."
      ],
      closingLine:
        "If Nothing gets the price right, the Phone (4b) could be another reminder that affordable phones do not have to feel anonymous.",
      faq: [
        {
          question: "When does the Nothing Phone (4b) launch?",
          answer: "Nothing has announced the Phone (4b) launch for July 7, 2026, with India confirmed as a lead market."
        },
        {
          question: "What are the expected Nothing Phone (4b) specs?",
          answer:
            "Leaks point to a 6.77-inch 120Hz AMOLED display, Snapdragon 6 Gen 4, a 50MP main camera, Glyph Bar, and a battery reported between 5,400mAh and 6,000mAh."
        },
        {
          question: "How much will the Nothing Phone (4b) cost?",
          answer: "Pricing is not confirmed, but expectations in India sit around 30,000 rupees, which is aggressive mid-range territory."
        }
      ],
      author: tim,
      publishedAt: published(8),
      updatedAt: published(8),
      readTime: "4 min read",
      image: {
        src: "/articles/nothing-phone-4b-launch-july.jpg",
        alt: "Nothing Phone 4b product image in blue. Credit: Nothing.",
        credit: "Nothing",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [smartphones, nothing],
      sources: [
        {
          label: "Nothing Community: Phone (4b) coming soon",
          url: "https://nothing.community/en/d/58766-phone-4b-coming-soon"
        },
        {
          label: "Engadget: Nothing teases the Phone 4b",
          url: "https://www.engadget.com/2201344/nothing-teases-phone-4b/"
        },
        {
          label: "Gizchina: Nothing Phone (4b) first look",
          url: "https://www.gizchina.com/nothing-phones-2/nothing-phone-4b-first-look-partial-transparency-glyph-bar-and-a-blue-that-pops"
        }
      ]
    }
  ];
}
