import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type RegionKey = "kenya" | "nigeria" | "southAfrica" | "rwanda" | "tanzania";

type BuildAfricanFintechNewsArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
  regions: Record<RegionKey, RegionTerm>;
};

function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing content term: ${slug}`);
  return item;
}

function published(hour: number) {
  return new Date(Date.UTC(2026, 6, 4, hour, 0, 0)).toISOString();
}

export function buildAfricanFintechNewsArticles({ authors, topics, brands, regions }: BuildAfricanFintechNewsArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const business = bySlug(topics, "business");
  const fintech = bySlug(topics, "fintech");
  const startups = bySlug(topics, "startups");
  const flutterwave = bySlug(brands, "flutterwave");
  const moniepoint = bySlug(brands, "moniepoint");
  const mpesa = bySlug(brands, "m-pesa");
  const mtn = bySlug(brands, "mtn");
  const paystack = bySlug(brands, "paystack");
  const africaLeadRegions = [regions.kenya, regions.nigeria, regions.southAfrica, regions.rwanda];

  return [
    {
      id: "africa-fintech-second-wave-credit",
      slug: "african-fintech-second-wave-credit",
      format: "business",
      title: "African fintech's second wave: from payments to credit",
      seo: {
        title: "African fintech's second wave: from payments to credit",
        description:
          "BCG and TechCabal data show African fintech pivoting from payment apps to credit, B2B infrastructure and debt funding. What the second wave means, explained."
      },
      subhead:
        "The money, the models, and the mission of African fintech are all shifting at once: away from growth-at-all-costs payment apps and toward credit, infrastructure, and sustainable economics.",
      excerpt:
        "African fintech is moving beyond payment apps into credit, B2B infrastructure, embedded finance, and debt-funded models built around real cash flows.",
      whyItMatters:
        "The first wave of fintech got Africans paying digitally. The second decides whether that rail starts financing businesses, farms, and lives, which is where the real economic change happens.",
      body: [
        "African fintech is entering a second wave: a shift away from basic payment apps and toward credit, business infrastructure, embedded finance, and more sustainable economics.",
        "The framing comes from Boston Consulting Group's report Beyond Payments: Unlocking Africa's Second FinTech Wave, and the funding data from TechCabal Insights tells the same story from the money side.",
        "Start with the scale of what is at stake. BCG projects African fintech revenues rising to about 65 billion US dollars by 2030, making Africa the fastest-growing fintech market globally. The composition is changing too. Payments built the first wave, but BCG argues that lending, savings, insurance, and B2B financial infrastructure are where the next wave of value is likely to come from.",
        "In plain English, the first wave solved how people move money. The second asks whether that money movement can help people and businesses access credit, working capital, insurance, savings, and better trade rails.",
        "The funding numbers show the pivot underway. TechCabal Insights tracked 711 million US dollars in African startup funding in the first quarter of 2026, with fintech still among the strongest sectors. Across the first half of the year, debt and hybrid financing kept gaining importance because many fintechs are now funding loan books and cash-flow businesses, not just user-acquisition campaigns.",
        "That matters because venture money for yet another wallet app has cooled. The giants of the first wave, including M-Pesa and MTN MoMo, are now institutional fixtures. They are no longer easy targets for a startup that wants to win by discounting transfers and buying users.",
        "The second-wave builders are chasing harder problems: cross-border payment costs, SME credit, merchant infrastructure, open banking, agent networks, and the financial tools that sit behind everyday trade. Those are less glamorous than a new app icon, but they can be more useful.",
        "There is a sobering layer under the optimism. Consolidation, acquisitions, and layoffs are filtering out weaker players, a shift we explain in /business/african-fintech-mergers-acquisitions-consolidation. The businesses that survive will need stronger unit economics, cleaner compliance, and a clearer answer to how they make money.",
        "You can see the second wave from different angles across the continent: Tanzania's supervised sandbox at /business/bank-of-tanzania-sandbox-third-cohort, Nigeria's stablecoin trade workaround at /business/stablecoins-nigeria-cross-border-trade, and Africa's linked-exchange push at /business/aelp-phase-2-african-exchanges-linked.",
        "For readers in Kenya, the practical translation is this: the next wave of fintech will show up less as new apps to download and more as credit you can actually access through your till, stock financing, chama, wallet, or supplier relationship.",
        "That is quieter than the mobile-money revolution. It may end up mattering more."
      ],
      closingLine:
        "The EV-style tipping point for African fintech will not be another shiny wallet. It will be useful credit on rails people already trust.",
      author: tim,
      publishedAt: published(13),
      updatedAt: published(13),
      readTime: "5 min read",
      image: {
        src: "https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1800&auto=format&fit=crop",
        alt: "A trader using a phone for a mobile payment. Credit: Unsplash.",
        credit: "Unsplash",
        width: 1800,
        height: 1200,
        type: "image/jpeg"
      },
      tags: [fintech, business, mpesa, mtn],
      regions: africaLeadRegions,
      faq: [
        {
          question: "What is African fintech's second wave?",
          answer:
            "It is the shift from basic payment apps toward credit, savings, insurance, embedded finance, and B2B financial infrastructure."
        },
        {
          question: "Why is debt financing growing in African fintech?",
          answer:
            "Many fintechs are becoming lenders and infrastructure businesses with loan books and predictable cash flows, so debt can fund activity without diluting ownership."
        },
        {
          question: "Why does this matter beyond startups?",
          answer:
            "If the second wave works, mobile-money and payment rails can start financing real businesses, farms, households, and cross-border trade."
        }
      ],
      sources: [
        {
          label: "BCG: Beyond Payments, Unlocking Africa's Second FinTech Wave",
          url: "https://www.bcg.com/publications/2026/beyond-payments-unlocking-africas-second-fintech-wave"
        },
        {
          label: "TechCabal Insights: African startups raised over $700M in Q1 2026",
          url: "https://insights.techcabal.com/over-700m-raised-in-q1-2026/"
        },
        {
          label: "TechCabal Insights: African tech funding H1 2026",
          url: "https://insights.techcabal.com/1-44-billion-raised-in-the-first-half-of-2026/"
        }
      ]
    },
    {
      id: "africa-fintech-bank-of-tanzania-sandbox",
      slug: "bank-of-tanzania-sandbox-third-cohort",
      format: "business",
      title: "Tanzania opens its fintech sandbox for a third round",
      seo: {
        title: "Tanzania opens its fintech sandbox for a third round",
        description:
          "The Bank of Tanzania is taking applications for the third cohort of its fintech regulatory sandbox until July 31. Who can apply and why sandboxes matter."
      },
      subhead:
        "Banks, mobile money operators, and fintechs have until July 31 to apply to live-test products under the central bank's supervision.",
      excerpt:
        "The Bank of Tanzania has opened applications for the third cohort of its fintech regulatory sandbox, with submissions due by July 31, 2026.",
      whyItMatters:
        "A sandbox lets innovators test products real regulators have not yet written rules for, which is how new financial services reach the public without either stalling or running wild.",
      body: [
        "The Bank of Tanzania has opened applications for the third cohort of its Fintech Regulatory Sandbox, giving banks, mobile money operators, electronic money issuers, and fintech companies a supervised route to test new financial products.",
        "Applications run through the central bank's portal at frsp.bot.go.tz and close on July 31, 2026. The call is aimed at financial products or services not already covered by existing regulatory frameworks.",
        "A regulatory sandbox is a safe, fenced space where an innovator can run a real product with real users, under the regulator's eye, before the full rulebook exists for it. It solves a chicken-and-egg problem: regulators cannot write good rules for products they have never seen working, and innovators cannot launch products that no rule clearly permits.",
        "That makes the sandbox useful for the kinds of products fintech founders keep pushing toward: new lending models, digital savings tools, merchant finance, crowdfunding-style products, blockchain-based services, and other financial tools that do not fit neatly inside old categories.",
        "The regional context matters. East African regulators are increasingly using sandboxes, tiered licensing, and open-banking ideas as digital finance deepens. Tanzania launched its sandbox framework in 2024, and the third cohort suggests the regulator wants to keep learning with the market rather than waiting for every new model to arrive fully formed.",
        "Tanzania's timing is also important because mobile money is now central to the country's economy. As digital transactions grow, so do the risks around fraud, consumer protection, data use, and unclear liability. A sandbox can help safeguards get built into products before they scale.",
        "The honest caveat for founders is that sandbox entry is not the same as a licence. It is a supervised test, not a permanent pass to operate. The path from test to full authorisation can still be slow, which is why many fintechs pair regulatory engagement with bank or mobile-money partnerships.",
        "Still, for East African fintech builders, the window is real. If you are building something current rules do not clearly cover, July 31 is not a date to admire from afar.",
        "This is one practical piece of Africa's wider fintech second wave, where payments, credit, trade rails, and regulation are all maturing at once. Start with the anchor explainer at /business/african-fintech-second-wave-credit."
      ],
      closingLine:
        "A sandbox is not permission to move recklessly. It is permission to prove the product while the rules catch up.",
      author: tim,
      publishedAt: published(12),
      updatedAt: published(12),
      readTime: "4 min read",
      image: {
        src: "/articles/bank-of-tanzania-sandbox-third-cohort.jpg",
        alt: "NALA fintech founders wearing branded shirts. Credit: Empower Africa.",
        credit: "Empower Africa",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [fintech],
      regions: [regions.tanzania],
      faq: [
        {
          question: "What is the Bank of Tanzania fintech sandbox?",
          answer:
            "It is a supervised environment where eligible financial service providers and fintech companies can test products not yet covered by existing rules."
        },
        {
          question: "When do applications close?",
          answer: "Applications for the third cohort close on July 31, 2026, through the Bank of Tanzania sandbox portal."
        },
        {
          question: "Who can apply?",
          answer:
            "The call covers financial service providers and fintech companies, including banks, mobile money operators, and electronic money issuers."
        }
      ],
      sources: [
        {
          label: "Bank of Tanzania: Third Cohort application notice",
          url: "https://www.bot.go.tz/Adverts/PressRelease/en/2026062419511842.pdf"
        },
        {
          label: "TanzaniaInvest: Bank of Tanzania opens third fintech sandbox cohort",
          url: "https://www.tanzaniainvest.com/finance/bot-fintech-sandbox-third-cohort-2026"
        },
        {
          label: "UNCDF: The Tanzania fintech regulatory playbook",
          url: "https://www.uncdf.org/article/9058/the-tanzania-fintech-regulatory-playbook"
        }
      ]
    },
    {
      id: "africa-fintech-nigeria-stablecoins-trade",
      slug: "stablecoins-nigeria-cross-border-trade",
      format: "business",
      title: "How stablecoins became Nigeria's trade workaround",
      seo: {
        title: "How stablecoins became Nigeria's trade workaround",
        description:
          "Facing dollar scarcity, Nigerian importers and businesses increasingly settle cross-border payments in USDT and USDC. How it works and what the risks are."
      },
      subhead:
        "Dollar-pegged tokens like USDT and USDC are increasingly the practical rail for Nigerian import-export payments. It is a workaround born of necessity, with real benefits and real risks.",
      excerpt:
        "Nigerian businesses are using stablecoins as a bottom-up workaround for dollar scarcity, slow settlement, and cross-border payment friction.",
      whyItMatters:
        "When businesses cannot get dollars through banks, trade does not stop, it reroutes. Stablecoins have become that route at scale, and regulators everywhere are watching Nigeria to see how it plays out.",
      body: [
        "For a growing share of Nigerian businesses, the practical answer to chronic foreign-exchange bottlenecks is neither the bank queue nor the parallel market. It is a stablecoin.",
        "Dollar-pegged tokens, mainly USDT and USDC, have become a bottom-up rail for cross-border trade payments, with some import-export settlements moving through virtual asset service providers instead of traditional correspondent banking.",
        "The mechanics explain the appeal. A stablecoin is a cryptocurrency designed to hold a fixed value, usually one token to one US dollar, backed by reserves. For a Lagos importer paying a supplier in China or Dubai, the traditional route can mean sourcing scarce dollars through a bank, waiting days, and dealing with rates that may not match market reality.",
        "The stablecoin route is simpler in practice: convert naira to USDT or USDC through a local provider, send the token, and let the supplier receive dollar-linked value in minutes. It can work outside banking hours, across borders, and with clearer pricing than a slow bank process.",
        "It is worth being precise. This is not an official national trade policy, and calling it official would overstate the point. It is a practical standard created from below when businesses discover that the old channel does not meet demand.",
        "Nigeria's regulatory posture has moved from hostility toward a more supervised virtual-asset regime, but the space is still evolving. That means businesses are operating in a market that is more visible than before, but not risk-free or fully settled.",
        "The risks deserve equal airtime. Stablecoins carry issuer and reserve risk, local on-and-off ramps can fail or defraud users, and regulators worry about capital flight, money laundering, and quiet dollarisation. None of that has stopped adoption, because the alternative for many traders is worse: trade that cannot settle.",
        "This story sits inside the wider African fintech second wave explained in /business/african-fintech-second-wave-credit. Payments were the first act. The next act is about credit, trade rails, compliance, and the infrastructure that businesses quietly rely on.",
        "For the rest of Africa, including Kenya, Nigeria is the preview. Wherever hard currency is scarce and trade is digital, the same workaround is likely to spread."
      ],
      closingLine:
        "Stablecoins are not magic money. In Nigeria, they are what happens when trade needs a rail and the official one is too slow or too scarce.",
      author: tim,
      publishedAt: published(11),
      updatedAt: published(11),
      readTime: "5 min read",
      image: {
        src: "/articles/stablecoins-nigeria-cross-border-trade.jpg",
        alt: "A Nigeria stablecoin concept with naira symbol and digital finance imagery. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [fintech, business],
      regions: [regions.nigeria],
      faq: [
        {
          question: "Why do Nigerian businesses use stablecoins?",
          answer:
            "They use dollar-pegged tokens to work around dollar scarcity, slow bank settlement, and cross-border payment friction when paying foreign suppliers."
        },
        {
          question: "Is stablecoin use official policy in Nigeria?",
          answer:
            "No. The article frames it as a bottom-up business workaround inside an evolving virtual-asset regulatory regime, not as an official trade policy."
        },
        {
          question: "What are the risks of stablecoin trade payments?",
          answer:
            "Risks include issuer reserve risk, unreliable local exchanges, fraud, capital-flight concerns, money-laundering concerns, and regulatory uncertainty."
        }
      ],
      sources: [
        {
          label: "Chainalysis: 2025 geography of cryptocurrency report",
          url: "https://www.chainalysis.com/blog/2025-global-crypto-adoption-index/"
        },
        {
          label: "SEC Nigeria: Accelerated Regulatory Incubation Program",
          url: "https://sec.gov.ng/accelerated-regulatory-incubation-program-arip/"
        },
        {
          label: "BCG: Beyond Payments, Unlocking Africa's Second FinTech Wave",
          url: "https://www.bcg.com/publications/2026/beyond-payments-unlocking-africas-second-fintech-wave"
        }
      ]
    },
    {
      id: "africa-fintech-aelp-phase-2",
      slug: "aelp-phase-2-african-exchanges-linked",
      format: "business",
      title: "Africa links 11 stock exchanges as AELP Phase II launches",
      seo: {
        title: "Africa links 11 stock exchanges as AELP Phase II launches",
        description:
          "The African Exchange Linkage Project's Phase II connects 11 exchanges for cross-border trading, launched at the BAFM Forum with youth and ETFs in focus."
      },
      subhead:
        "At the BAFM Forum in Dar es Salaam, regulators launched the next phase of the project stitching Africa's stock markets together, and named the youth as the next investor class.",
      excerpt:
        "Phase II of the African Exchange Linkage Project expands the network to 11 exchanges and more than 50 brokers, pushing African capital markets closer together.",
      whyItMatters:
        "African savers have mostly been locked into their home market's handful of stocks. Linking exchanges means a Kenyan can more easily own Nigerian, Ghanaian, or South African companies, and vice versa.",
      body: [
        "Africa's long-promised integrated capital market took a concrete step in Dar es Salaam. At the 13th Building African Financial Markets Forum, the African Securities Exchanges Association launched Phase II of the African Exchange Linkage Project.",
        "The project, built with the African Development Bank, connects stock exchanges so participating brokers can execute cross-border trades through a common platform.",
        "Phase II expands the network to 11 African stock exchanges and more than 50 stockbrokers, with Botswana, Ghana, Eswatini, and Uganda joining the linkage. The goal is a more integrated African capital market by 2030.",
        "The plain-English version: a broker in Nairobi should be able to put a client's money into a listed company in Lagos, Accra, Johannesburg, or another linked market without the investor opening a foreign broker account and fighting a maze of paperwork.",
        "For African markets that are often small and thinly traded in isolation, pooling buyers and sellers across borders is one of the most practical ways to deepen liquidity.",
        "The forum also pointed to who the buyers of the future might be. With a young population, African exchanges are looking at products such as exchange-traded funds and tokenised real-world assets as more accessible entry points than old paperwork-heavy share accounts.",
        "Tanzania used the stage to show its own alternative-finance progress, including Sukuk issuances totalling around 260 million US dollars.",
        "The caveat is important. Market linkage is plumbing, and plumbing changes behaviour slowly. Currencies still complicate settlement, investor education remains uneven, and a platform cannot create liquidity by itself.",
        "Still, this is the same pattern we see across African finance: fragmented national systems slowly being stitched into something larger. The second-wave fintech story is about the same thing from a startup angle, explained at /business/african-fintech-second-wave-credit. This is the capital-market version."
      ],
      closingLine:
        "Owning a slice of Africa's best companies is not yet as easy as a mobile-money transfer. AELP Phase II moves the continent a little closer.",
      author: tim,
      publishedAt: published(10),
      updatedAt: published(10),
      readTime: "5 min read",
      image: {
        src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1800&auto=format&fit=crop",
        alt: "A stock market display board. Credit: Unsplash.",
        credit: "Unsplash",
        width: 1800,
        height: 1200,
        type: "image/jpeg"
      },
      tags: [fintech, business],
      regions: [regions.tanzania, ...africaLeadRegions],
      faq: [
        {
          question: "What is the African Exchange Linkage Project?",
          answer:
            "It is an ASEA and African Development Bank project connecting African stock exchanges so brokers can execute cross-border trades through a common platform."
        },
        {
          question: "How many exchanges are connected in Phase II?",
          answer:
            "Phase II expands the network to 11 African stock exchanges and more than 50 participating stockbrokers."
        },
        {
          question: "What could this mean for ordinary investors?",
          answer:
            "Over time, it could make it easier to buy shares listed in other African countries through a local broker, while supporting products such as ETFs."
        }
      ],
      sources: [
        {
          label: "TanzaniaInvest: Building African Financial Markets Forum 2026 Day 1",
          url: "https://www.tanzaniainvest.com/finance/capitalmarkets/building-africa-financial-markets-forum-2026-day-1"
        },
        {
          label: "African Exchanges Linkage Project: news and events",
          url: "https://africanexchangeslink.com/category/news-and-events/"
        },
        {
          label: "African Securities Exchanges Association",
          url: "https://african-exchanges.org/"
        }
      ]
    },
    {
      id: "africa-fintech-ma-consolidation",
      slug: "african-fintech-mergers-acquisitions-consolidation",
      format: "business",
      title: "Africa's fintech shakeout: the M&A wave, explained",
      seo: {
        title: "Africa's fintech shakeout: the M&A wave, explained",
        description:
          "Over 30 M&A deals in one quarter: Flutterwave buys Mono, Moniepoint enters Kenya, Paystack absorbs Brass. Why African fintech is consolidating fast."
      },
      subhead:
        "With funding hyper-selective, the market leaders are buying growth: acquiring licensed local startups instead of grinding through years of organic expansion.",
      excerpt:
        "African fintech is consolidating fast as stronger companies buy data rails, licences, local footholds, and distressed rivals.",
      whyItMatters:
        "Consolidation decides which apps and rails survive, and buying a licensed local player has become the fastest legal route into a new African market. Your favourite fintech may soon have a new owner.",
      body: [
        "African fintech is consolidating at a pace the ecosystem has never seen. TechCabal Insights tracked more than 30 merger and acquisition deals in the first quarter of 2026 alone, and the first half of the year kept the dealmaking pressure high.",
        "The message under the numbers is simple: the era of every fintech fighting alone for a licence in every African market is ending. The stronger companies are buying the rails, teams, licences, and footholds they need.",
        "The marquee deals sketch the pattern. Flutterwave acquired open-banking platform Mono, buying data rails that sit beneath payments and lending. Moniepoint pushed into Kenya by acquiring Sumac Microfinance Bank, a move that offered a licence, a book, and a local operating base in one stroke.",
        "Paystack absorbed the struggling business-banking startup Brass and integrated microfinance-bank capability of its own. Other deals show the same direction: compliance, lending, identity, payments, and embedded-finance infrastructure are being pulled into larger platforms.",
        "Why buy instead of expand the old way? Regulation, mostly. Entering a new African market organically can mean years of licensing, local incorporation, compliance work, bank partnerships, and relationship building. Acquiring a licensed local player collapses that timeline.",
        "That is why the Moniepoint-Sumac route into Kenya is being watched closely. It shows how a large fintech can enter a market through the regulated financial layer rather than starting from zero.",
        "The sober half of the story is what consolidation filters out. Alongside the deals are shutdowns, market exits, restructuring, and layoffs. That is painful for the people involved, and it is also what a maturing market looks like: fewer, stronger companies with clearer economics in place of many subsidised ones.",
        "This is the tougher side of the second-wave fintech shift explained in /business/african-fintech-second-wave-credit. Credit, infrastructure, and compliance require scale. Scale often arrives by acquisition.",
        "For users across the continent, including in Kenya where the acquisitions are now landing, the practical effects will be mixed. Consolidation can mean better-funded, more reliable services. It can also mean less competition and higher fees down the line."
      ],
      closingLine:
        "Who owns your fintech is about to matter almost as much as which app you chose.",
      author: tim,
      publishedAt: published(9),
      updatedAt: published(9),
      readTime: "5 min read",
      image: {
        src: "/articles/african-fintech-mergers-acquisitions-consolidation.jpg",
        alt: "African fintech brands displayed around an exhibition floor. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [fintech, startups, business, flutterwave, moniepoint, paystack],
      regions: africaLeadRegions,
      faq: [
        {
          question: "Why is African fintech consolidating?",
          answer:
            "Funding is more selective, regulation is complex, and larger fintechs can expand faster by buying licensed local players or infrastructure startups."
        },
        {
          question: "Why do licences matter so much?",
          answer:
            "Financial services are regulated country by country. Buying a licensed institution can shorten the time needed to enter a market."
        },
        {
          question: "Is consolidation good for users?",
          answer:
            "It can improve reliability and funding depth, but it can also reduce competition and create pressure for higher fees later."
        }
      ],
      sources: [
        {
          label: "TechCabal Insights: African startups raised over $700M in Q1 2026",
          url: "https://insights.techcabal.com/over-700m-raised-in-q1-2026/"
        },
        {
          label: "TechCabal Insights: African tech funding H1 2026",
          url: "https://insights.techcabal.com/1-44-billion-raised-in-the-first-half-of-2026/"
        },
        {
          label: "TechCabal: African startups raised over $700M in Q1 2026",
          url: "https://techcabal.com/2026/04/08/over-700m-raised-in-q1-2026/"
        }
      ]
    }
  ];
}
