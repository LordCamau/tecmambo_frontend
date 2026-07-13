import type { Article, Author, Tag } from "@/lib/types";

type BuildGlobalOpinionArgs = {
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
  return new Date(Date.UTC(2026, 6, 13, hour, 0, 0)).toISOString();
}

export function buildGlobalOpinionArticles({ authors, topics, brands }: BuildGlobalOpinionArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const ai = bySlug(topics, "ai");
  const business = bySlug(topics, "business");
  const mobility = bySlug(topics, "evs-mobility");
  const spacex = bySlug(brands, "spacex");
  const apple = bySlug(brands, "apple");
  const google = bySlug(brands, "google");
  const huawei = bySlug(brands, "huawei");
  const byd = bySlug(brands, "byd");
  const tesla = bySlug(brands, "tesla");

  return [
    {
      id: "opinion-global-tech-triad-2026",
      slug: "america-innovates-china-replicates-europe-regulates",
      format: "opinion",
      title: "America invents it, China perfects it, Europe writes the rules for it",
      seo: {
        title: "America innovates, China replicates, Europe regulates?",
        description:
          "China just caught an orbital rocket booster in a net at sea, 11 years after SpaceX first landed one. What the old aphorism gets right, where it is dangerously out of date, and what it means for Africa."
      },
      subhead:
        "The world's most quoted tech aphorism just got its best evidence and its best counter-evidence in the same week, from the same rocket. A long look at what each power actually does, with the examples that prove it and the ones that break it.",
      excerpt:
        "The old line says America innovates, China replicates, and Europe regulates. China's rocket catch shows why that line is useful, and why it is no longer enough.",
      whyItMatters:
        "The three biggest tech powers have settled into roles that shape every phone you buy, every app you use, and every law that governs them. Understanding those roles, and where they are breaking down, is understanding the next decade of technology.",
      body: [
        "On July 10, over the South China Sea, the first stage of a Long March 10B rocket fell back through the sky, deployed four hooks, and let itself be caught in a net strung across the deck of a waiting ship. With that catch, China became only the second nation ever to recover an orbital-class rocket booster under control. The first was the United States, where SpaceX landed a Falcon 9 in December 2015 and has since turned the trick into a weekly routine that gave it command of most of the mass humanity sends to orbit.",
        "Eleven years behind, chasing an American invention, with Chinese coverage framing the feat as chipping away at US dominance. If you wanted a single image for the most quoted aphorism in technology, that America innovates, China replicates, and Europe regulates, you could not stage a better one. Blue Origin later joined the US recovery club with New Glenn, which is why the clean claim is not that China became the second organisation to recover a booster, but that it became the first country outside the United States to do it.",
        "I want to resist the temptation to close the case there, because the interesting truth is sharper. The aphorism is genuinely useful: each region really has settled into a signature move, and the examples run deep. But treated as a law of nature it is a decade out of date, and the same Chinese rocket that seems to prove it also quietly breaks it. Hidden in that net catch is the real story of how technological power works now, and, for those of us watching from Nairobi, a question about which role Africa gets to play.",
        "Start with the part the meme gets right, because it gets a lot right.",
        "## America still owns the zero-to-one moment",
        "America invents the future, and has for seventy years. The list is not close. The transistor and the integrated circuit. The internet itself, born as a US defence research project. GPS, another Pentagon gift the world now navigates by. The graphical personal computer, the smartphone as we know it, the search engine, social media, cloud computing, the GPU that accidentally became the engine of modern AI, and the transformer architecture behind every chatbot now finishing our sentences. The reusable orbital rocket. The mainstream electric car. When something genuinely new enters the world of technology, the odds remain overwhelming that it enters through America.",
        "The reasons are structural, not genetic. America pairs the world's deepest risk capital with a culture that treats failure as tuition: a founder can raise millions on a story, burn it on an idea that does not work, and raise again, a cycle that would end careers most other places. Beneath the venture capital sits sixty years of government research money, from the agency that seeded the internet to the university labs that trained the AI generation, and above it sits the magnet: the brightest engineers from Lagos, Bangalore, Shenzhen, and, yes, Nairobi, have for decades done their best work on American payrolls. Innovation is not in the water. It is in the incentives.",
        "## China starts by replicating, then changes the market",
        "China begins by replicating, and the record is equally frank about it. Its internet grew up behind a wall as a mirror of America's: a Google there became Baidu, an Amazon became Alibaba, a Twitter became Weibo, an Uber became Didi. Its national champion aircraft answers Boeing and Airbus. Its chipmakers reverse-engineer where they cannot buy. And now its rockets recover, more than a decade after Falcon 9, in a programme every analyst describes with the same word: catch-up. The state does not really deny the pattern; it industrialises it, with technology transfer as a price of market access and national plans that name the foreign capabilities to be matched, sector by sector, date by date.",
        "But here is where honest analysis has to part ways with the meme, because replicates describes where China starts, not where it finishes. Consider what happened in every industry where the copying phase ended. Chinese EVs began as crude clones; today BYD has overtaken Tesla in global electrified-vehicle sales, and has challenged or passed it on pure battery-electric deliveries in key recent windows. Chinese firms own much of the battery chemistry and supply chain the whole industry depends on, and Western carmakers now do some of the imitating.",
        "Solar panels, commodity drones, 5G network equipment: Chinese companies do not merely follow in these markets, they define them. WeChat pioneered the super-app a decade before Western platforms began awkwardly imitating it. TikTok's recommendation engine was novel enough that America's giants copied it feature for feature, a complete inversion of the old direction of theft. DeepSeek shocked the AI world not by copying a frontier model but by showing how far efficiency can travel when capital is scarcer than ambition.",
        "And that net catch over the South China Sea? SpaceX lands boosters on legs. China caught one with a ship-based net, a method its engineers argue can save the mass of landing legs and widen the margin for error. The goal was borrowed. The method was not.",
        "The honest formulation is that China is the greatest fast-follower in industrial history, and fast-following, done at Chinese scale and speed, ends in leadership. Japan ran the same play with cars and electronics; South Korea ran it with chips and phones. Replication is not the opposite of innovation. It is, for late starters, the road to it, and China is far enough down that road that the meme flatters the West more than it informs it.",
        "## Europe writes the rulebook, because it keeps losing the scale game",
        "And Europe? Europe regulates, and the joke lands because it is true. The continent that gave the world the scientific revolution now exports law. Its privacy regulation set the template that dozens of countries copied. Its charging-port mandate forced Apple, the world's most valuable company, to redesign the iPhone. Its digital markets and AI acts are becoming the default rulebooks that global companies build to once and apply everywhere, a phenomenon with its own name, the Brussels Effect, because it is genuinely a form of power. When the whole world's cookie banners, privacy policies, and USB-C ports trace back to one parliament, that parliament matters.",
        "The cruelty of the joke is what it leaves out, and what Europe left on the table. Europe is not short of invention. The web itself was born at CERN. The architecture inside virtually every phone processor on earth was designed in Cambridge. The most important machine in all of technology, the one that etches advanced chips and without which neither Silicon Valley nor Shenzhen ships a flagship product, is built by exactly one company, and it is Dutch. DeepMind, the lab that produced some of AI's defining breakthroughs, was founded in London. And that is precisely the indictment: it was bought by Google.",
        "Skype, bought. ARM's economics, captured elsewhere. Europe's pattern is not failing to invent; it is failing to keep, scale, and own what it invents, because its capital markets are shallow, its market is fragmented across languages and jurisdictions, and its most ambitious founders still board planes to San Francisco. Even Brussels now says this out loud: the continent's own landmark competitiveness report reads like a confession. A civilisation that invents the web and builds the chip machine, yet whose most successful tech export is the cookie banner, has not chosen regulation over innovation. It has defaulted to regulating because it kept losing the other game.",
        "So the aphorism survives, but only in a corrected form: America still owns the zero-to-one moment. China owns one-to-a-billion, and increasingly the next zero-to-one in anything made of atoms. Europe owns the rulebook, partly by conviction and partly by forfeit.",
        "And the roles are already bleeding into each other. America, panicking, has discovered industrial policy and export controls, deciding by government order who may use the most powerful AI models, a story we covered when the most capable systems on earth went dark for three weeks by decree. That is not the behaviour of a confident innovator; it is the behaviour of a power learning to regulate. China, sanctioned out of buying key technology, is being forced to invent rather than acquire, which may prove the greatest gift its rivals ever gave it. Even Europe has begun talking about sovereignty and building rather than only refereeing. The triad is real, and it is dissolving at the edges.",
        "## The question for Africa is which verb we choose",
        "Which brings the question home. Reading this from Kenya, we are not spectators; we are the customer all three are competing for. The phone in your hand is most likely Chinese. The platforms on it are American. And the data protection law governing what they do with your information is a lightly localised copy of Europe's, as is much of the AI bill now moving through our Parliament. Africa currently consumes all three exports: the products, the copies, and the rules.",
        "The lesson of this whole story is that the roles are strategies, not destinies. Nobody assigned China the fast-follower role; it chose it, funded it, and ground through two decades of being mocked for cheap imitations before the imitations started leading. That path is open to any economy serious enough to walk it, and Kenya has already proven the other direction is possible too: mobile money was not copied here, it was invented here, and the world spent fifteen years catching up to M-Pesa. One genuine, scaled innovation bought this country more technological respect than a hundred imported platforms.",
        "So my take, in the end, is less about the three giants than about everyone else. America innovates, China replicates its way to innovation, Europe regulates what it failed to keep. The meme is a warning label, not a map of the permanent world order. The only question that matters for the rest of us is the one each of those powers answered decades ago: which verb are we choosing? Because the one thing the story of that rocket in the net makes absolutely clear is that the verbs are chosen, not assigned."
      ],
      closingLine: "The verbs are chosen, not assigned.",
      author: tim,
      publishedAt: published(7),
      updatedAt: published(7),
      readTime: "10 min read",
      image: {
        src: "/articles/america-invents-china-perfects-europe-rules-tecmambo-updated.jpg",
        alt: "A labeled triptych showing America, China, and Europe through rocket recovery and technology regulation imagery. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [business, ai, mobility, spacex, apple, google, huawei, byd, tesla],
      sources: [
        {
          label: "tecMAMBO: Claude Fable 5 export controls",
          url: "/news/anthropic-mythos-models-export-control"
        },
        {
          label: "tecMAMBO: EV sales head for a record 23.3 million",
          url: "/news/bnef-ev-outlook-2026-record-sales-divergence"
        },
        {
          label: "tecMAMBO: BYD retakes the EV crown",
          url: "/news/byd-tesla-nio-june-2026-deliveries"
        },
        {
          label: "tecMAMBO: Kenya is writing AI rules early",
          url: "/opinion/kenya-ai-rules-quiet-advantage"
        },
        {
          label: "CERN: The birth of the web",
          url: "https://home.cern/science/computing/birth-web"
        },
        {
          label: "Arm: Company history",
          url: "https://www.arm.com/company/history"
        },
        {
          label: "ASML: EUV lithography",
          url: "https://www.asml.com/en/technology/lithography-principles/euv-lithography"
        }
      ]
    }
  ];
}
