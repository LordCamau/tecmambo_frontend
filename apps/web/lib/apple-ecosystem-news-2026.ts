import type { Article, Author, Tag } from "@/lib/types";

type BuildAppleEcosystemArgs = {
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
  return new Date(Date.UTC(2026, 6, 7, hour, 0, 0)).toISOString();
}

export function buildAppleEcosystemArticles({ authors, topics, brands }: BuildAppleEcosystemArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const lulu = bySlug(authors, "lulu-kiritu");

  const ai = bySlug(topics, "ai");
  const apps = bySlug(topics, "apps");
  const business = bySlug(topics, "business");
  const computing = bySlug(topics, "computing");
  const cybersecurity = bySlug(topics, "cybersecurity");
  const mobility = bySlug(topics, "evs-mobility");
  const smartphones = bySlug(topics, "smartphones");

  const anthropic = bySlug(brands, "anthropic");
  const apple = bySlug(brands, "apple");
  const google = bySlug(brands, "google");

  return [
    {
      id: "apple-ecosystem-foldable-iphone-ultra-luxury",
      slug: "apple-foldable-iphone-ultra-2500-luxury",
      format: "business",
      title: "The $2,500 iPhone Ultra: Apple's luxury tech gamble",
      seo: {
        title: "The $2,500 iPhone Ultra: Apple's luxury tech gamble",
        description:
          "Apple's first foldable, reportedly the iPhone Ultra, is tipped to start near $2,500 with big expectations. Inside the bet that luxury pricing now sells phones."
      },
      subhead:
        "Reports point to a September reveal, a price around $2,500, and shipment plans in the millions. The product is a foldable. The strategy is luxury.",
      excerpt:
        "Apple's rumored iPhone Ultra foldable is being framed by analysts as a premium device near $2,500, with shipment expectations that would test how high flagship phone prices can climb.",
      whyItMatters:
        'If a $2,500 phone sells in the millions, every maker learns the same lesson, and the ceiling on what a "normal" flagship costs moves for everyone, everywhere.',
      body: [
        "Apple is reportedly preparing one of the most expensive mainstream phones ever made, and the analyst story around it suggests the company expects millions of people to buy it.",
        "The first foldable iPhone, widely reported as the iPhone Ultra, is expected by market watchers to debut alongside the iPhone 18 Pro models in September 2026. Analyst and supply-chain reporting points to an average selling price around 2,500 US dollars, with higher storage tiers possibly moving closer to 3,000 US dollars. Shipment estimates in the 7 to 10 million range for the wider launch window would be a bold bet at that price.",
        "The rumored hardware picture remains unconfirmed until Apple announces it. Reports describe a book-style foldable with a 7.8-inch inner display and 5.5-inch cover screen, Touch ID instead of Face ID to save internal space, an A20 chip, Apple's C2 modem, and 12GB of memory.",
        "The more interesting story is the pricing psychology. A 2,500-dollar iPhone is not only a component-cost problem. It is a positioning move.",
        'The Ultra name does the same work it does on Apple Watch. It creates a top shelf that makes the rest of the range feel more reasonable. A 1,199-dollar Pro suddenly reads as the sensible choice beside a foldable that costs more than many laptops.',
        "Economists call goods that sell partly because they are expensive Veblen goods. Apple has been edging toward that territory for years, and a foldable iPhone would be its clearest move yet: visible, expensive, unmistakable, and designed to signal that the owner bought the newest thing.",
        "Apple also has an advantage rivals cannot easily copy. Samsung and Chinese brands have spent years absorbing foldable growing pains: creases, hinge anxiety, thickness, dust resistance, repair cost, and awkward app layouts. Apple can arrive late, skip the worst early embarrassment, and enter at the top of the price ladder.",
        "The counterweights are real. Foldables remain a small slice of the phone market. Durability is still a question for normal buyers. Supply reports suggest the launch could be constrained, which we cover in /opinion/iphone-ultra-scarcity-playbook. And for many readers, 2,500 US dollars is several months of salary.",
        "That last point is not a flaw in the strategy. It is the strategy. Apple is not trying to sell this phone to everyone. It is trying to make everyone want the brand that makes it."
      ],
      closingLine:
        "The iPhone Ultra rumor is not only about a folding screen. It is about Apple testing how much luxury the phone market can still absorb.",
      author: tim,
      publishedAt: published(7),
      updatedAt: published(7),
      readTime: "5 min read",
      image: {
        src: "/articles/apple-foldable-iphone-ultra-2500-luxury.jpg",
        alt: "A foldable iPhone concept being held in low light. Credit: Geeky Gadgets.",
        credit: "Geeky Gadgets",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [smartphones, business, apple],
      faq: [
        {
          question: "How much will Apple's foldable iPhone cost?",
          answer:
            "Reports and analyst estimates point to a starting price around 2,300 to 2,500 US dollars, with higher storage tiers possibly near 3,000. Apple has not confirmed pricing."
        },
        {
          question: "When will the iPhone Ultra launch?",
          answer:
            "Current reports expect a reveal alongside the iPhone 18 Pro models in September 2026, with availability possibly following later."
        },
        {
          question: "What are the rumored iPhone Ultra specs?",
          answer:
            "Supply-chain reports point to a book-style foldable with a 7.8-inch inner display, a 5.5-inch cover screen, Touch ID, an A20 chip, and 12GB of RAM."
        }
      ],
      sources: [
        { label: "MacRumors foldable iPhone coverage", url: "https://www.macrumors.com/roundup/foldable-iphone/" },
        { label: "Ming-Chi Kuo Apple supply-chain analysis", url: "https://medium.com/@mingchikuo" },
        { label: "Tom's Guide Apple foldable iPhone coverage", url: "https://www.tomsguide.com/phones/iphones" }
      ]
    },
    {
      id: "apple-ecosystem-iphone-ultra-scarcity-playbook",
      slug: "iphone-ultra-scarcity-playbook",
      format: "opinion",
      title: "The iPhone Ultra shortage is also a marketing plan",
      seo: {
        title: "The iPhone Ultra shortage is also a marketing plan",
        description:
          "Analyst Ming-Chi Kuo expects just 0.5 to 1 million foldable iPhones in Q3. Scarcity by necessity or design, it works the same. How to read the sold-out signs."
      },
      subhead:
        "Kuo says manufacturing limits will make the foldable iPhone scarce at launch, echoing the iPhone X. Whether the scarcity is forced or chosen, it will function as marketing. Here is how to read it.",
      excerpt:
        "Analyst estimates say Apple's first foldable iPhone could be scarce at launch. That may be a manufacturing constraint, but the sold-out effect still sells the product.",
      whyItMatters:
        '"Sold out" is the most persuasive advertisement in tech. Learning how limited supply manufactures desire is the best defence against paying scarcity prices for anything.',
      body: [
        "The most desirable phone of the year may become desirable partly because you cannot easily get one.",
        "Supply-chain analyst Ming-Chi Kuo has reportedly pointed to a limited launch window for Apple's foldable iPhone, with third-quarter production estimated around 500,000 to 1 million units. Wider second-half estimates sit much higher, while iPhone 18 Pro production is expected to be far larger. The practical outcome, if the estimates hold, is familiar: instant sell-outs, stretched delivery windows, and resale prices above retail.",
        "Kuo's comparison point is the iPhone X in 2017, announced with the September lineup, sold later, and scarce for months. That comparison matters because it reminds us that scarcity does not need to be fake to work as marketing.",
        "Here is the honest distinction. I do not think Apple needs to pretend foldable iPhones are hard to make. Folding displays and hinges at Apple's quality bar are genuinely difficult to manufacture at volume. Kuo's own framing is manufacturing constraint, not theatre.",
        "But scarcity in consumer tech does not need to be intended to function as marketing. A product that instantly sells out generates headlines no ad budget can buy. A six-week waiting list converts a purchase into an achievement. A resale price above retail becomes public proof that the market values the device more than the maker charged.",
        "Companies understand this. Launch quantities are chosen. A company that wanted to avoid sell-out theatre entirely could delay a launch until stock was deep. Almost nobody does, because in stock everywhere has never been the phrase that moves culture.",
        "So the useful skill is reading the signals like an adult. Sold out tells you about the size of the first production run, not the size of the product's merit. A waiting list measures manufacturing yield, not your need. A resale premium is a tax on impatience, paid by people who confused urgency with importance.",
        "The phone will probably exist in healthier supply by the second quarter after launch, at retail price, with early bugs patched. Quietly, that is the best time to buy almost any first-generation device.",
        "For the wider luxury-pricing context, see /business/apple-foldable-iphone-ultra-2500-luxury. The same story can be read two ways: Apple is building a very expensive foldable, and Apple is building desire around a very expensive foldable.",
        "The bottom line, from someone who loves new hardware: let the scarcity be Apple's problem. If the foldable is genuinely great, it will still be great in February, cheaper, fixed, and in stock. If it is only great because you could not have it, the waiting list did its real job."
      ],
      closingLine:
        "Do not let a delivery estimate make the buying decision for you. Scarcity is information, not instruction.",
      author: lulu,
      publishedAt: published(8),
      updatedAt: published(8),
      readTime: "4 min read",
      image: {
        src: "/articles/iphone-ultra-scarcity-playbook.jpg",
        alt: "A dark iPhone Ultra concept on a deep black background. Credit: Geeky Gadgets.",
        credit: "Geeky Gadgets",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [smartphones, business, apple],
      sources: [
        { label: "Ming-Chi Kuo Apple supply-chain analysis", url: "https://medium.com/@mingchikuo" },
        { label: "MacRumors foldable iPhone coverage", url: "https://www.macrumors.com/roundup/foldable-iphone/" },
        { label: "Fortune technology coverage", url: "https://fortune.com/section/tech/" }
      ]
    },
    {
      id: "apple-ecosystem-iphone-18-pro-dynamic-island",
      slug: "iphone-18-pro-smaller-dynamic-island",
      format: "news",
      title: "iPhone 18 Pro tipped for a much smaller Dynamic Island",
      seo: {
        title: "iPhone 18 Pro tipped for a much smaller Dynamic Island",
        description:
          "Leaks suggest the iPhone 18 Pro's Dynamic Island shrinks sharply, the next step in Apple's long march toward a clean, cutout-free screen. What is credible."
      },
      subhead:
        "Reports point to a roughly a-third-smaller island on the iPhone 18 Pro. Treat it as a leak, but it fits a decade-long trajectory that only points one way.",
      excerpt:
        "The iPhone 18 Pro is tipped for a substantially smaller Dynamic Island, a rumor that fits Apple's slow move toward a cleaner all-screen front.",
      whyItMatters:
        "The cutout is the last visible compromise on a phone's front. Each shrink is years of sensor engineering, and it hints at when the truly all-screen phone finally arrives.",
      body: [
        "Apple's next flagship may take its biggest visible step yet toward the all-screen phone, if the current leak picture holds.",
        "Reports around the iPhone 18 Pro point to a Dynamic Island roughly 35 percent smaller than today's pill-shaped cutout. That area houses the front camera and Face ID hardware, so shrinking it is not cosmetic work alone. It means Apple has found ways to compress the sensor package again.",
        "The usual caution applies: this is supply-chain rumor, not an announcement, and cutout claims have missed before. Still, the direction fits a trajectory Apple has followed with unusual patience.",
        "The 2017 iPhone X introduced the notch, a broad bite out of the display holding the camera, dot projector, infrared camera, proximity sensing, and more. Five years later, the iPhone 14 Pro compressed that compromise into the Dynamic Island and turned the hole into a software surface people actually used.",
        "Since then, the interesting changes have been internal. Face ID components have been consolidated and shrunk generation by generation. A one-third smaller island would suggest more unglamorous engineering work: combined modules, tighter packaging, optical redesigns, and under-display experiments that rarely become headline features but define the phone's face.",
        "The destination everyone assumes is obvious: Face ID under the glass, then eventually the camera too. Rival brands have attempted under-display cameras, but image quality has often disappointed. Apple's habit is to arrive late and polished rather than first and compromised.",
        "That is why a smaller island, rather than a disappearing one, feels believable. The technology may not be ready to vanish, so Apple makes it smaller until it can.",
        "There is a rival context too. Samsung's foldable leaks show one path to making phones feel new again, which we cover at /news/samsung-unpacked-july-z-fold-8-leaks. Apple is working the other path: make the front look less interrupted until the phone face finally becomes all screen.",
        "Should you care? If you buy phones on looks, a cleaner face is genuinely nice. The honest translation of this leak, though, is about time. The all-screen iPhone still looks generations away. The iPhone 18 Pro, if the report holds, is a waypoint."
      ],
      closingLine:
        "A smaller Dynamic Island would not reinvent the iPhone. It would show that Apple is still slowly sanding away the last visible compromise.",
      author: tim,
      publishedAt: published(9),
      updatedAt: published(9),
      readTime: "4 min read",
      image: {
        src: "/articles/iphone-18-pro-smaller-dynamic-island.jpg",
        alt: "An iPhone concept showing a smaller front camera cutout. Credit: WCCF Tech.",
        credit: "WCCF Tech",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [smartphones, apple],
      sources: [
        { label: "9to5Mac iPhone rumor coverage", url: "https://9to5mac.com/guides/iphone-18/" },
        { label: "MacRumors iPhone 18 coverage", url: "https://www.macrumors.com/roundup/iphone-18/" }
      ]
    },
    {
      id: "apple-ecosystem-ios-27-trust-insights",
      slug: "ios-27-trust-insights-scam-detection",
      format: "news",
      title: "iOS 27 can tell when you are being scammed, live",
      seo: {
        title: "iOS 27 can tell when you are being scammed, live",
        description:
          "Apple's Trust Insights framework flags social engineering scams as they happen, on-device, letting apps add warnings and delays. How it works and its limits."
      },
      subhead:
        "Apple is building real-time social engineering defence into the iPhone: on-device signals, risk scores, and friction added exactly when a scam is unfolding.",
      excerpt:
        "Apple's reported Trust Insights framework in iOS 27 is designed to spot live social engineering risk and help apps add warnings before users move money.",
      whyItMatters:
        "The scam that empties an account usually is not a hack, it is a phone call coaching someone to move their own money. A phone that notices the coaching, mid-call, is a genuinely new defence.",
      body: [
        "The most effective scams do not break into your phone. They talk you into opening it yourself.",
        "Apple's reported answer in iOS 27 is a framework called Trust Insights, designed to help apps detect, in real time, when a user may be getting coached through a social engineering scam over a call, text, or email. The goal is not to block every transaction. It is to add friction at the exact moment manipulation is happening.",
        "Per developer-material reporting around the beta, the framework runs mostly on-device. It looks at interaction patterns, timing, context, and basic sensor signals, which can act like behavioral fingerprints of someone acting under instruction rather than calm intent.",
        "If the signals look wrong, Trust Insights can assign a medium or high risk level. A banking app, wallet app, or payment app could then show a warning, add a deliberate delay, or require extra verification before money moves.",
        "The privacy design is the part Apple will want people to notice. The reporting says Trust Insights does not inspect the contents of Photos, Messages, or Mail. Instead, it analyses behavior on-device, discards the underlying data, and sends only a limited output value for wider risk checking.",
        "One telling detail is the cooldown around disabling the feature. If a user can turn protection off instantly, a scammer can simply coach them to do that too. A cooldown recognises how these crimes actually unfold: urgently, socially, and under pressure.",
        "Why this matters in mobile-money markets is obvious. The coached-fraud pattern is familiar: the urgent call, the fake reversal, the official-sounding voice, the victim walking themselves through a payment they do not understand until it is too late.",
        "The industry often reaches for cloud AI to scan content. Apple's more interesting bet is that behavior processed on the device can catch manipulation without reading messages. If that works, banks, telcos, and wallet providers will have a new security pattern to copy.",
        "The caveats are important. This is beta-era reporting. Real-world accuracy is unproven. False alarms during genuine urgent transactions are possible. A framework only helps users of apps that adopt it. And scammers will adapt.",
        "Still, the direction is exactly right. Scammers weaponised the phone's intimacy. It is overdue that the phone itself started noticing. For more practical AI coverage, start with /news/ai."
      ],
      closingLine:
        "If Trust Insights works as reported, the iPhone will become less of a silent tool in coached fraud and more of a warning voice in the room.",
      author: tim,
      publishedAt: published(10),
      updatedAt: published(10),
      readTime: "5 min read",
      image: {
        src: "/articles/ios-27-trust-insights-scam-detection.jpg",
        alt: "An iPhone showing an iOS 27 concept icon. Credit: Yahoo Tech.",
        credit: "Yahoo Tech",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [ai, cybersecurity, apps, apple],
      faq: [
        {
          question: "What is Trust Insights in iOS 27?",
          answer:
            "It is a reported Apple framework that helps apps detect, in real time, when a user may be the target of a live social engineering scam."
        },
        {
          question: "Does Trust Insights read my messages?",
          answer:
            "Current reporting says no. It analyses behavioral signals mostly on-device and does not inspect the contents of Photos, Messages, or Mail."
        },
        {
          question: "Can scammers make you turn it off?",
          answer:
            "Apple is reportedly building in a cooldown period when users disable it, specifically because scammers may coach victims to turn off protection."
        }
      ],
      sources: [
        { label: "9to5Mac iOS coverage", url: "https://9to5mac.com/guides/ios-27/" },
        { label: "Apple Developer documentation", url: "https://developer.apple.com/documentation/" }
      ]
    },
    {
      id: "apple-ecosystem-safari-mcp-server",
      slug: "safari-mcp-server-ai-agents",
      format: "news",
      title: "Safari just opened its doors to AI coding agents",
      seo: {
        title: "Safari just opened its doors to AI coding agents",
        description:
          "Apple's Safari now ships an MCP server letting AI agents inspect, debug and test websites directly. Why browsers building for bots changes web development."
      },
      subhead:
        "Safari Technology Preview now includes a Model Context Protocol server, sixteen tools that let any compatible AI agent see and debug the web the way a developer does.",
      excerpt:
        "Safari Technology Preview now includes an MCP server, giving compatible AI coding agents official tools to inspect, test, and debug websites in a live browser.",
      whyItMatters:
        "Browsers were built for human eyes. Apple adding an official doorway for AI agents signals that the web's most basic tool is being rebuilt for a second kind of user.",
      body: [
        "Apple has given AI agents an official way into Safari.",
        "The latest Safari Technology Preview reporting describes a built-in Model Context Protocol server with tools that let compatible AI coding agents work with a live browser window. Those tools include screenshots, page inspection, JavaScript execution, console output, network monitoring, viewport resizing, display emulation, and accessibility checks.",
        "The plain-English version: when an AI helps build a website, it often writes code without seeing how that code actually renders. Developers have filled the gap with community tools, but those can break when browsers update. An official Safari MCP server means an agent can inspect the page more like a developer does and debug its own work through a maintained browser doorway.",
        "The bigger signal is who is building these doors. Apple's Safari move follows an official MCP server for Xcode, and it lands alongside developer-tool vendors adding MCP support of their own.",
        "MCP itself started at Anthropic and is now stewarded through the Linux Foundation. OpenAI, Google, Microsoft, and other major platform companies have publicly moved toward the protocol, which is close to an industry-wide handshake in a young tooling layer.",
        "For developers, the practical upside is sturdier agent-assisted workflows. Official integrations are less likely to break on every browser update, and Safari has long been one of the more awkward browsers to automate cleanly.",
        "For web teams in Kenya and everywhere else, this matters because Safari-specific testing often comes late, if it comes at all. A browser-native bridge for agents makes it easier to catch layout, console, network, and accessibility issues before users do.",
        "The philosophical shift is larger. The browser is becoming a tool with two kinds of users: humans in front of the glass and agents behind it. Website builders now have to assume both are present.",
        "That will shape the web. Debugging, accessibility, testing, and search will increasingly be read by software before people ever see the page. For more plain-English AI coverage, see /news/ai."
      ],
      closingLine:
        "Safari's MCP server is not only a developer convenience. It is a sign that browsers are being rebuilt for agents as first-class users.",
      author: tim,
      publishedAt: published(11),
      updatedAt: published(11),
      readTime: "5 min read",
      image: {
        src: "/articles/safari-mcp-server-ai-agents.jpg",
        alt: "A Safari Technology Preview icon on a blue background. Credit: Apple.",
        credit: "Apple",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [ai, computing, apple, anthropic, google],
      faq: [
        {
          question: "What is the Safari MCP server?",
          answer:
            "It is a reported Model Context Protocol server in Safari Technology Preview that gives AI agents tools to inspect, debug, and test websites in a live browser."
        },
        {
          question: "What is MCP?",
          answer:
            "The Model Context Protocol is an open standard, originally introduced by Anthropic, for connecting AI agents to software tools and data."
        },
        {
          question: "Why does Safari MCP matter for developers?",
          answer:
            "It lets agents see how code renders in Safari and debug browser issues through an official integration instead of fragile workarounds."
        }
      ],
      sources: [
        { label: "Safari Technology Preview", url: "https://developer.apple.com/safari/technology-preview/" },
        { label: "Model Context Protocol", url: "https://modelcontextprotocol.io/" },
        { label: "The New Stack MCP coverage", url: "https://thenewstack.io/tag/model-context-protocol/" }
      ]
    },
    {
      id: "apple-ecosystem-carplay-dashboard-strategy",
      slug: "apple-carplay-car-keys-dashboard-takeover",
      format: "news",
      title: "Apple killed its car, and is taking your dashboard anyway",
      seo: {
        title: "Apple killed its car, and is taking your dashboard anyway",
        description:
          "iOS 27 reportedly overhauls CarPlay while Car Keys spreads to more automakers. How Apple is winning the car without building one, and what lock-in means."
      },
      subhead:
        "Reports point to a reworked CarPlay in iOS 27 and Apple Wallet car keys reaching more brands. The car project died; the strategy behind it did not.",
      excerpt:
        "Apple cancelled its car, but CarPlay and Wallet car keys keep moving deeper into the dashboard. That may be the better business.",
      whyItMatters:
        "The dashboard is becoming the next screen platform. Whoever controls it controls navigation, payments, and attention in the car, without the expense of building the car.",
      body: [
        "Apple cancelled its long-running car project in 2024, but it is still fighting for the most important screen inside the vehicle: the dashboard.",
        "Reporting around iOS 27 points to a reworked CarPlay framework, while Apple Wallet car keys continue to expand across supported automakers. The specific iOS 27 changes should be treated as reports until Apple documents them, but the strategy is already visible.",
        "Building a car is expensive, low-margin, heavily regulated, and physically brutal. Owning the car's software experience is a cleaner business.",
        "With CarPlay, the iPhone becomes the interface drivers trust for maps, media, messages, calls, and apps. With next-generation CarPlay, Apple has pushed toward instrument clusters and deeper vehicle information. With Wallet car keys, the iPhone or Apple Watch can become the thing that unlocks and starts the car.",
        "That gives Apple the relationship while automakers keep the factories, recalls, warranties, and repair networks. It is a strikingly good trade for Apple.",
        "This is also why some automakers resist it. General Motors famously chose to drop CarPlay from future EVs so it could own the software layer itself. Buyers have not exactly celebrated that decision, which says something about who holds leverage.",
        "For the owner, the appeal is real. One familiar interface. A key that cannot be left on the kitchen counter if your phone is already in your pocket. Navigation, music, payments, and messages that feel consistent between home, phone, and car.",
        "The catch is the same force that makes it work: lock-in. When car keys, dashboard behavior, navigation history, payment flows, and in-car apps all live inside one company's ecosystem, leaving that ecosystem quietly becomes harder.",
        "That is not automatically sinister. It is strategy. The time to understand it is while the choice still feels optional.",
        "The takeaway is simple: Apple lost the car and is trying to win the drive. Watch which automakers sign on to deeper CarPlay and which resist, because that map may matter more than any horsepower number on the brochure."
      ],
      closingLine:
        "The car project died, but the dashboard strategy did not. Apple may not need to build the vehicle if it owns the screen people touch.",
      author: tim,
      publishedAt: published(12),
      updatedAt: published(12),
      readTime: "5 min read",
      image: {
        src: "/articles/apple-carplay-car-keys-dashboard-takeover.jpg",
        alt: "A car dashboard showing Apple's next-generation CarPlay interface. Credit: Apple.",
        credit: "Apple",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [mobility, apps, apple],
      sources: [
        { label: "Apple CarPlay", url: "https://www.apple.com/ios/carplay/" },
        { label: "Apple Car Keys support", url: "https://support.apple.com/en-us/118271" },
        { label: "9to5Mac CarPlay coverage", url: "https://9to5mac.com/guides/carplay/" }
      ]
    }
  ];
}
