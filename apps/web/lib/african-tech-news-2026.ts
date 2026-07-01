import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type RegionKey = "kenya" | "nigeria" | "southAfrica" | "rwanda";

type BuildAfricanTechNewsArgs = {
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

function published(day: number, hour = 6) {
  return new Date(Date.UTC(2026, 5, day, hour, 0, 0)).toISOString();
}

export function buildAfricanTechNewsArticles({ authors, topics, brands, regions }: BuildAfricanTechNewsArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const ai = bySlug(topics, "ai");
  const apps = bySlug(topics, "apps");
  const connectivity = bySlug(topics, "connectivity");
  const fintech = bySlug(topics, "fintech");
  const mobility = bySlug(topics, "evs-mobility");
  const smartphones = bySlug(topics, "smartphones");
  const startups = bySlug(topics, "startups");
  const openai = bySlug(brands, "openai");
  const samsung = bySlug(brands, "samsung");
  const tecno = bySlug(brands, "tecno");
  const microsoft = bySlug(brands, "microsoft");
  const spiro = bySlug(brands, "spiro");
  const google = bySlug(brands, "google");
  const shuttlers = bySlug(brands, "shuttlers");
  const aions = bySlug(brands, "aions-ventures");
  const holocene = bySlug(brands, "holocene");
  const livestockWealth = bySlug(brands, "livestock-wealth");
  const heifer = bySlug(brands, "heifer-international");
  const brd = bySlug(brands, "development-bank-of-rwanda");

  return [
    {
      id: "africa-news-openai-academy-nairobi",
      slug: "openai-academy-nairobi-ruto-altman",
      format: "news",
      title: "Ruto and Altman tease an OpenAI Academy for Nairobi",
      seo: {
        title: "Ruto and Altman tease an OpenAI Academy for Nairobi",
        description:
          "President Ruto and OpenAI's Sam Altman floated East Africa's first OpenAI Academy in Nairobi. Details are thin, but the signal matters."
      },
      subhead:
        "The idea is still early, with no public funding, curriculum, or launch date. But for a country already using ChatGPT heavily, the signal is worth watching.",
      excerpt:
        "Kenya is in talks with OpenAI about a possible OpenAI Academy in Nairobi, but the important details are still missing.",
      whyItMatters:
        "A training academy from the company behind ChatGPT would put serious AI skills within reach locally, if it moves from photo opportunity to funded reality.",
      body: [
        "President William Ruto and OpenAI chief executive Sam Altman have discussed the idea of making Nairobi home to East Africa's first OpenAI Academy, according to reports from the G7 Leaders' Summit.",
        "The proposal, as described so far, is a local hub for AI education, digital skills, and support for learners and educators. That sounds useful, but it is still a signal of intent rather than a finished project.",
        "There is no public detail yet on funding, curriculum, governance, locations, or timelines. Those details matter because training programmes only change lives when they are properly funded, locally accessible, and connected to real work.",
        "Kenya already has strong demand for AI tools, so the opportunity is obvious. The test is whether the announcement becomes a durable skills pipeline instead of another high-level photo moment."
      ],
      closingLine: "For now, file this under promising, not proven.",
      author: tim,
      publishedAt: published(30, 9),
      updatedAt: published(30, 9),
      readTime: "3 min read",
      image: {
        src: "/articles/openai-academy-nairobi-ruto-altman.jpg",
        alt: "William Ruto and Sam Altman in a photo attributed to William Ruto's X.com account @WilliamsRuto.",
        credit: "William Ruto on X, @WilliamsRuto"
      },
      tags: [ai, openai],
      regions: [regions.kenya],
      sources: [
        {
          label: "Kenyans.co.ke: Ruto, OpenAI CEO Sam Altman hold talks on establishing OpenAI Academy in Nairobi",
          url: "https://www.kenyans.co.ke/news/124397-ruto-openai-ceo-sam-altman-hold-talks-establishing-openai-academy-nairobi"
        }
      ]
    },
    {
      id: "africa-news-cbk-microfinance-capital",
      slug: "cbk-microfinance-capital-squeeze",
      format: "business",
      title: "Kenya's microfinance banks face a capital squeeze",
      seo: {
        title: "Kenya's microfinance banks face a capital squeeze",
        description:
          "The Central Bank of Kenya has signalled higher minimum capital for microfinance banks, and for smaller lenders the maths may no longer add up."
      },
      subhead: "Tougher capital rules are meant to make lenders safer, but they could also force smaller players into mergers or exits.",
      excerpt:
        "Kenya's proposed microfinance rules could raise the capital floor for smaller lenders and push consolidation across the sector.",
      whyItMatters:
        "If smaller lenders cannot meet tougher capital rules, some may merge or close, which changes where lower-income borrowers can get credit.",
      body: [
        "Kenya's microfinance banks are facing a regulatory squeeze that could reshape the sector, with proposed rules raising the minimum capital bar for institutions that serve lower-income borrowers.",
        "Higher capital floors are meant to make lenders safer and more resilient. The tradeoff is that they also make it harder for smaller institutions to remain independent if they cannot raise enough money quickly.",
        "That can push weaker players toward mergers, acquisitions, fresh capital raises, or exit. For customers, the result may be fewer institutions but stronger balance sheets.",
        "The detail to watch is the final threshold, the compliance timeline, and whether the rules preserve access to small loans in communities that commercial banks often underserve."
      ],
      author: tim,
      publishedAt: published(30, 8),
      updatedAt: published(30, 8),
      readTime: "3 min read",
      image: {
        src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1800&auto=format&fit=crop",
        alt: "Kenyan shilling notes.",
        credit: "Unsplash"
      },
      tags: [fintech],
      regions: [regions.kenya],
      sources: [
        {
          label: "Business Daily: Acquisitions loom as micro banks face higher capital limit",
          url: "https://www.businessdailyafrica.com/bd/corporate/companies/acquisitions-loom-as-micro-banks-face-higher-capital-limit-5498916"
        },
        {
          label: "Parliament of Kenya: The Microfinance Bill, National Assembly Bill No 26 of 2026",
          url: "https://parliament.go.ke/node/25833"
        }
      ]
    },
    {
      id: "africa-news-kenya-ai-policy",
      slug: "kenya-national-ai-policy",
      format: "news",
      title: "Kenya moves to finalise a national AI policy",
      seo: {
        title: "Kenya moves to finalise a national AI policy",
        description:
          "Kenya is finalising a national AI and Emerging Technologies policy to sit alongside its 2025 to 2030 AI Strategy. Here is what it is for."
      },
      subhead: "The policy is meant to turn Kenya's AI ambitions into rules, responsibilities, and public participation.",
      excerpt:
        "Kenya's AI and Emerging Technologies policy is meant to complement the National AI Strategy 2025 to 2030 and give governance work a clearer home.",
      whyItMatters:
        "Clear, early rules can give people protection and businesses confidence, and help decide whether AI in Kenya is built locally or simply imported.",
      body: [
        "Kenya is developing a national AI and Emerging Technologies policy intended to complement its National AI Strategy 2025 to 2030.",
        "The process began under the Ministry of Information, Communications and the Digital Economy, with KICTANet, international partners, and a technical working group drawn from government, academia, civil society, and startups.",
        "The policy is supposed to create a foundational framework for governing AI and other emerging technologies, with public participation built into the process. That matters because an AI strategy says where a country wants to go, while policy decides what builders, buyers, and citizens can expect on the way there.",
        "The substance will matter more than the launch. Kenya needs rules that protect people, give companies confidence, and leave enough room for local builders to experiment."
      ],
      author: tim,
      publishedAt: published(29, 12),
      updatedAt: published(29, 12),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1800&auto=format&fit=crop",
        alt: "Abstract technology pattern.",
        credit: "Unsplash"
      },
      tags: [ai],
      regions: [regions.kenya],
      sources: [
        {
          label: "Techweez: Kenya begins drafting National AI and Emerging Technologies Policy",
          url: "https://techweez.com/2026/01/19/kenya-ai-emerging-technologies-policy-development/"
        },
        {
          label: "Ministry of ICT: Inception workshop launches development of Kenya AI and Emerging Technologies Policy",
          url: "https://ict.go.ke/inception-workshop-launches-development-kenya-artificial-intelligence-ai-and-emerging-technologies"
        }
      ]
    },
    {
      id: "africa-news-samsung-a27-kenya",
      slug: "samsung-galaxy-a27-5g-kenya",
      format: "news",
      title: "Samsung's Galaxy A27 5G is starting to show up in Kenya",
      seo: {
        title: "Samsung Galaxy A27 5G: what Kenyan buyers should watch",
        description:
          "Samsung has announced the Galaxy A27 5G globally, and Kenyan listings are already appearing. The price will decide whether it makes sense."
      },
      subhead: "The phone is official globally, but Kenyan buyers should wait for local pricing and warranty clarity before treating it as a simple upgrade.",
      excerpt:
        "Samsung's Galaxy A27 5G is official globally and early Kenyan listings are appearing, but local price and warranty support matter most.",
      whyItMatters:
        "The A series is where most Kenyans actually buy, so a new mid-ranger matters more to real budgets than any flagship launch.",
      body: [
        "Samsung has announced the Galaxy A27 5G globally, and Kenyan retail listings have started to appear ahead of the usual local market settling period.",
        "That matters because the Galaxy A line is where many Kenyan buyers actually shop. It targets the middle of the market, where the decision is less about bragging rights and more about battery life, screen quality, camera reliability, and years of software support.",
        "We will hold a full verdict until local pricing, official availability, and warranty terms are clear. With mid-range phones, the launch figure and the street price a few weeks later can tell very different stories.",
        "For now, the advice is simple: watch the Kenyan price, confirm the regional variant, and do not ignore the older A series models if retailers discount them hard."
      ],
      author: tim,
      publishedAt: published(29, 10),
      updatedAt: published(29, 10),
      readTime: "3 min read",
      image: {
        src: "/articles/samsung-galaxy-a27-5g-kenya.jpg",
        alt: "Samsung Galaxy A27 5G promotional image from Samsung.com.",
        credit: "Samsung.com"
      },
      tags: [smartphones, samsung],
      regions: [regions.kenya],
      sources: [
        {
          label: "Samsung Newsroom: Samsung Galaxy A27 5G brings an immersive display and Awesome Intelligence to more users",
          url: "https://news.samsung.com/global/samsung-galaxy-a27-5g-brings-an-immersive-display-and-awesome-intelligence-to-more-users"
        },
        {
          label: "Silkroom Electronics: Samsung Galaxy A27 5G price in Kenya",
          url: "https://silkroom.odoo.com/shop/samsung-galaxy-a27-5g-6433"
        }
      ]
    },
    {
      id: "africa-news-tecno-ellaclaw",
      slug: "tecno-ellaclaw-ai-agent-beta",
      format: "news",
      title: "TECNO's EllaClaw AI agent can act inside your apps",
      seo: {
        title: "TECNO's EllaClaw AI agent can act inside your apps",
        description:
          "TECNO is testing EllaClaw, an AI agent that can manage your phone and act inside apps. It is a closed beta for now, with no release date."
      },
      subhead: "EllaClaw is still in closed beta, but it points toward phone AI that does tasks rather than only answering questions.",
      excerpt:
        "TECNO's EllaClaw is a beta AI agent that can manage phone tasks and work across supported apps, with user confirmation built in.",
      whyItMatters:
        "TECNO phones are everywhere in Kenya, so an on-device agent that taps and types for you could bring agent-style AI to budgets that global flagships ignore.",
      body: [
        "TECNO is testing EllaClaw, an AI agent that can manage phone tasks and take actions inside supported apps, rather than only answering questions.",
        "The company describes EllaClaw as an exploratory concept in internal testing and closed beta development. Its demos include system-level care, such as monitoring battery-draining apps or data usage, and cross-app actions such as shopping help or ride hailing.",
        "The interesting part is who TECNO reaches. Its phones are widely used across Kenya and other emerging markets, so agent-style AI does not have to remain a feature reserved for the most expensive flagships.",
        "As with any phone agent, the practical questions are access, consent, reliability, and recovery. If an assistant can act inside your apps, it must also show what it is doing and ask before it changes something important."
      ],
      author: tim,
      publishedAt: published(28, 15),
      updatedAt: published(28, 15),
      readTime: "4 min read",
      image: {
        src: "/articles/tecno-ellaclaw-ai-agent-beta.jpg",
        alt: "TECNO EllaClaw agentic AI graphic by Vincenz Lee for GadgetMatch.",
        credit: "Graphics by Vincenz Lee | GadgetMatch"
      },
      tags: [ai, smartphones, tecno],
      regions: [regions.kenya],
      sources: [
        {
          label: "PR Newswire: TECNO showcases expanded EllaClaw capabilities",
          url: "https://www.prnewswire.com/news-releases/tecno-showcases-expanded-ellaclaw-capabilities-advancing-practical-agentic-ai-that-gets-things-done-302808551.html"
        },
        {
          label: "Gizmochina: TECNO unveils upgraded EllaClaw AI with cross-app automation",
          url: "https://www.gizmochina.com/2026/06/26/tecno-ellaclaw-ai-cross-app-automation-smart-skills/"
        }
      ]
    },
    {
      id: "africa-news-kenya-space-data-summit",
      slug: "kenya-space-expo-global-data-festival",
      format: "news",
      title: "Nairobi hosts a major space and data summit",
      seo: {
        title: "Nairobi hosts a major space and data summit",
        description:
          "The Kenya Space Expo and Global Data Festival drew deep-tech professionals and delegates from dozens of countries to Nairobi."
      },
      subhead: "The joint event put space intelligence, data, and public-sector technology on the same Nairobi stage.",
      excerpt:
        "Nairobi hosted the Global Data Festival alongside the Kenya Space Expo and Conference, drawing delegates from more than 60 countries.",
      whyItMatters:
        "Hosting serious space and data events puts Kenya on the deep-tech map and brings the people, deals, and skills that follow such gatherings.",
      body: [
        "Nairobi hosted a major deep-tech gathering as the Global Data Festival ran alongside the Kenya Space Expo and Conference from 2 to 5 June 2026.",
        "The event brought together policymakers, researchers, statisticians, space scientists, technology firms, development partners, and private-sector innovators. Reporting from Space in Africa put attendance at more than 1,000 delegates from over 60 countries.",
        "The programme leaned into space intelligence, data-driven governance, geospatial tools, and emerging technology across African economies.",
        "Events like this matter beyond the opening ceremony. They are where partnerships form, where local engineers meet international peers, and where a country signals it intends to build in frontier areas, not just consume them."
      ],
      author: tim,
      publishedAt: published(28, 12),
      updatedAt: published(28, 12),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1800&auto=format&fit=crop",
        alt: "A satellite against a sky.",
        credit: "Unsplash"
      },
      tags: [connectivity],
      regions: [regions.kenya],
      sources: [
        {
          label: "Space in Africa: Kenya concludes the Global Data Festival and Space Expo Conference 2026",
          url: "https://spaceinafrica.com/2026/06/09/kenya-concludes-the-global-data-festival-and-space-expo-conference-2026/"
        },
        {
          label: "Kenya Space Agency: Global Data Festival and Kenya Space Expo and Conference 2026",
          url: "https://expo.ksa.go.ke/"
        }
      ]
    },
    {
      id: "africa-news-aions-seed-fund",
      slug: "aions-ventures-seed-fund-south-africa",
      format: "business",
      title: "A new R100m seed fund targets South Africa's startup gap",
      seo: {
        title: "A new R100m seed fund targets South Africa's startup gap",
        description:
          "Aions Ventures has launched a R100m seed fund to back early-stage South African tech startups stuck between traction and a Series A."
      },
      subhead: "Aions Seed Fund I is aimed at the awkward stage where a startup has evidence, but not yet the scale investors want.",
      excerpt:
        "Aions Ventures has launched a R100 million seed fund to help early-stage South African technology startups bridge the Series A gap.",
      whyItMatters:
        "The hardest money to raise is the bit between first traction and a big round, and that gap is where many good startups quietly die.",
      body: [
        "Aions Ventures has launched Aions Seed Fund I, a R100 million fund aimed at early-stage South African technology startups.",
        "The fund combines money from the High Impact Seed Fund of Funds and the Technology Innovation Agency, with a focus on helping local startups move from early traction toward Series A readiness.",
        "That gap is a familiar weak spot. A company can have a working product and early customers, yet still be too early or too small for larger investors.",
        "The fund is modest by global standards, but it is aimed at a practical bottleneck in the South African ecosystem. Alongside capital, the firm says founders will receive strategic and operational support."
      ],
      author: tim,
      publishedAt: published(28, 10),
      updatedAt: published(28, 10),
      readTime: "3 min read",
      image: {
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop",
        alt: "A South African city skyline.",
        credit: "Unsplash"
      },
      tags: [startups, aions],
      regions: [regions.southAfrica],
      sources: [
        {
          label: "Disrupt Africa: SA's Aions Ventures backs early-stage growth with $6.1m seed fund",
          url: "https://disruptafrica.com/2026/06/05/sas-aions-ventures-backs-early-stage-growth-with-6-1m-seed-fund/"
        }
      ]
    },
    {
      id: "africa-news-holocene-climate-fund",
      slug: "holocene-southern-africa-climate-tech-fund",
      format: "business",
      title: "Southern Africa gets its first dedicated climate-tech fund",
      seo: {
        title: "Southern Africa gets its first dedicated climate-tech fund",
        description:
          "Holocene has closed what is described as Southern Africa's first dedicated climate-tech fund, a sign capital is following the region's climate startups."
      },
      subhead: "A climate-only fund gives founders in energy, water, and resilience a backer built around their category.",
      excerpt:
        "Holocene has closed a dedicated Southern African climate-tech fund, giving the region's climate startups a more focused capital source.",
      whyItMatters:
        "Dedicated climate capital means founders working on energy, water, and climate resilience finally have investors who understand what they are building.",
      body: [
        "Holocene has closed what it describes as Southern Africa's first dedicated high-growth climate-technology fund.",
        "That is notable because climate startups often have to pitch generalist investors who may not understand longer sales cycles, hardware needs, policy risk, or the patient capital required for infrastructure-adjacent companies.",
        "A dedicated fund signals that capital is beginning to follow the problem: energy reliability, water pressure, circular economy tools, and climate resilience.",
        "The fund will matter most if it is large enough, patient enough, and hands-on enough to help founders turn useful pilots into businesses that can survive."
      ],
      author: tim,
      publishedAt: published(27, 15),
      updatedAt: published(27, 15),
      readTime: "3 min read",
      image: {
        src: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1800&auto=format&fit=crop",
        alt: "Solar panels under a clear sky.",
        credit: "Unsplash"
      },
      tags: [startups, holocene],
      regions: [regions.southAfrica],
      sources: [
        {
          label: "Africa Global Funds: Holocene closes Southern Africa's first dedicated climate tech fund",
          url: "https://www.africaglobalfunds.com/news/private-equity/fundraising/holocene-closes-southern-africas-first-dedicated-climate-tech-fund/"
        }
      ]
    },
    {
      id: "africa-news-microsoft-south-africa-cloud-ai",
      slug: "microsoft-south-africa-cloud-ai-investment",
      format: "news",
      title: "Microsoft expands cloud and AI capacity in South Africa",
      seo: {
        title: "Microsoft expands cloud and AI capacity in South Africa",
        description:
          "Microsoft has committed hundreds of millions of dollars to expand cloud and AI infrastructure in South Africa, deepening the local digital backbone."
      },
      subhead: "Local cloud capacity is not glamorous, but it is the layer businesses build on when AI moves from demo to deployment.",
      excerpt:
        "Microsoft is investing in South African cloud and AI infrastructure, adding capacity to one of Africa's most developed digital markets.",
      whyItMatters:
        "More local cloud and AI capacity means faster, cheaper, and more compliant services for South African businesses, and less reliance on infrastructure abroad.",
      body: [
        "Microsoft has committed a reported 329 million US dollars to expand cloud infrastructure and artificial intelligence capacity in South Africa.",
        "The practical value is boring in the best way. Local capacity can reduce latency, support data residency needs, improve resilience, and give businesses a stronger base for AI services.",
        "Investments of this scale also pull in partners, skills, and downstream activity. They are not just data centre stories. They shape what local companies can build, host, and sell.",
        "The wider context is a contest among big cloud providers to anchor Africa's digital backbone, with South Africa still one of the continent's most mature enterprise technology markets."
      ],
      author: tim,
      publishedAt: published(27, 12),
      updatedAt: published(27, 12),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1801&auto=format&fit=crop",
        alt: "A data centre building.",
        credit: "Unsplash"
      },
      tags: [ai, connectivity, microsoft],
      regions: [regions.southAfrica],
      sources: [
        {
          label: "Business Insider Africa: Microsoft picks South Africa for $329 million expansion",
          url: "https://africa.businessinsider.com/local/markets/microsoft-picks-south-africa-for-dollar329-million-expansion-in-cloud-infrastructure/34f0ktg"
        },
        {
          label: "Microsoft: Microsoft invests ZAR 5.4bn in South Africa",
          url: "https://news.microsoft.com/source/emea/features/microsoft-invests-zar-5-4bn-in-south-africa/"
        }
      ]
    },
    {
      id: "africa-news-livestock-wealth-liquidation",
      slug: "livestock-wealth-liquidation",
      format: "business",
      title: "South African agritech Livestock Wealth goes into liquidation",
      seo: {
        title: "South African agritech Livestock Wealth goes into liquidation",
        description:
          "Crowd-farming startup Livestock Wealth has gone into liquidation, a sobering reminder that even celebrated startups can run out of road."
      },
      subhead: "The crowd-farming startup was once a standout agritech story. Its collapse is a reminder to look beyond the pitch.",
      excerpt:
        "Livestock Wealth has gone into liquidation after a failed business rescue process, closing a once-celebrated South African agritech chapter.",
      whyItMatters:
        "Startup failures are part of the story too, and an honest ecosystem looks at why a once-celebrated company ran out of road, not just at the wins.",
      body: [
        "Livestock Wealth, the South African crowd-farming startup that let people invest in cattle and other farm assets, has gone into liquidation.",
        "The company was for years held up as a creative example of agritech and inclusive investing, which makes its collapse a sobering data point.",
        "Failures rarely have a single cause, and the responsible thing is to wait for the court and company detail rather than guess. The broader backdrop is a harder funding climate in which investors are more selective and weaker unit economics are punished faster.",
        "For founders and would-be investors, stories like this are a reminder to look past the narrative at the numbers underneath."
      ],
      closingLine: "We will follow what the liquidation process reveals.",
      author: tim,
      publishedAt: published(27, 9),
      updatedAt: published(27, 9),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1800&auto=format&fit=crop",
        alt: "Cattle grazing on a farm.",
        credit: "Unsplash"
      },
      tags: [startups, livestockWealth],
      regions: [regions.southAfrica],
      sources: [
        {
          label: "Disrupt Africa: SA crowd-farming startup Livestock Wealth goes into liquidation",
          url: "https://disruptafrica.com/2026/06/04/sa-crowd-farming-startup-livestock-wealth-goes-into-liquidation/"
        }
      ]
    },
    {
      id: "africa-news-spiro-funding",
      slug: "spiro-electric-mobility-funding-round",
      format: "business",
      title: "Spiro adds $55m as its electric-bike push grows",
      seo: {
        title: "Spiro adds $55m as its electric-bike push grows",
        description:
          "Electric mobility company Spiro has added $55m to a round now totalling $270m, expanding battery swapping across Nigeria and beyond."
      },
      subhead: "The battery-swap model is about daily economics, not just cleaner transport.",
      excerpt:
        "Spiro has added $55 million from NewTrails Capital, closing a $270 million round for its African electric motorcycle and battery-swap network.",
      whyItMatters:
        "Cheaper, swappable batteries could change the daily economics for the riders who move Nigeria's deliveries and commutes, if the network reaches them.",
      body: [
        "Electric mobility company Spiro has secured an additional 55 million US dollars from NewTrails Capital, closing its latest funding round at 270 million dollars.",
        "Spiro runs an electric motorcycle and battery-swapping network across African markets, including Nigeria, Kenya, Uganda, and Rwanda. The company says the money will help expand swapping infrastructure, manufacturing, and energy systems.",
        "The model matters most for riders who cannot afford to wait around for a battery to charge. Swapping a depleted battery for a charged one in seconds can change the daily maths of running an electric bike.",
        "The open question is how fast the network reaches ordinary riders, not just launch cities and investor decks."
      ],
      author: tim,
      publishedAt: published(26, 15),
      updatedAt: published(26, 15),
      readTime: "3 min read",
      image: {
        src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1800&auto=format&fit=crop",
        alt: "An electric motorcycle at a swap station.",
        credit: "Unsplash"
      },
      tags: [mobility, spiro],
      regions: [regions.nigeria, regions.kenya, regions.rwanda],
      sources: [
        {
          label: "EVreporter: Spiro closes $270M funding round with NewTrails Capital",
          url: "https://evreporter.com/spiro-closes-270-million-funding-round-with-55-million-investment-from-newtrails-capital/"
        },
        {
          label: "CIO Africa: Spiro raises additional $55 million funding",
          url: "https://cioafrica.co/spiro-raises-additional-55-million-funding/"
        }
      ]
    },
    {
      id: "africa-news-shuttlers-google-maps",
      slug: "shuttlers-google-maps-nigeria",
      format: "news",
      title: "Shuttlers joins Google Maps in Nigeria",
      seo: {
        title: "Shuttlers joins Google Maps in Nigeria",
        description:
          "After millions of journeys, Nigerian mobility startup Shuttlers is now on Google Maps, making its bus routes easier to find and plan."
      },
      subhead: "The point is simple: a transport service is easier to trust when it appears inside the map app people already use.",
      excerpt:
        "Shuttlers has integrated its Nigerian bus routes with Google Maps Transit after crossing 10 million journeys.",
      whyItMatters:
        "Putting a local bus service inside the map app people already use removes friction, and that is often what turns a good service into a habit.",
      body: [
        "Shuttlers, the Nigerian shared mobility startup, is now integrated with Google Maps Transit after completing more than 10 million journeys.",
        "The practical effect is simple and useful. Riders can discover routes inside Google Maps, the app many already open when planning movement across a city.",
        "Distribution like this can separate a service that works from one that becomes a habit. It meets commuters where they already are, instead of asking them to learn a separate system first.",
        "For Lagos commuters in particular, anything that makes a reliable scheduled alternative easier to find is worth noticing."
      ],
      author: tim,
      publishedAt: published(26, 12),
      updatedAt: published(26, 12),
      readTime: "3 min read",
      image: {
        src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1800&auto=format&fit=crop",
        alt: "A commuter bus on a city road.",
        credit: "Unsplash"
      },
      tags: [apps, mobility, google, shuttlers],
      regions: [regions.nigeria],
      sources: [
        {
          label: "TechCabal: Shuttlers brings bus routes to Google Maps after hitting 10 million trips",
          url: "https://techcabal.com/2026/06/08/shuttlers-integrates-bus-routes-into-google-maps-transit/"
        },
        {
          label: "Africa Tech Summit: Shuttlers announces Google Maps Transit integration and 10 million journeys milestone",
          url: "https://www.africatechsummit.com/insights/shuttlers-announces-google-maps-transit-integration-and-10-million-journeys-milestone/"
        }
      ]
    },
    {
      id: "africa-news-nigeria-startup-market",
      slug: "nigeria-startup-market-maturing-2026",
      format: "business",
      title: "Nigeria's startup scene grows up, and gets stricter",
      seo: {
        title: "Nigeria's startup scene grows up, and gets stricter",
        description:
          "Nigeria remains Africa's most watched startup market, but in 2026 investors are far harder on weak pricing and cash burn. What that means for founders."
      },
      subhead: "The market is still huge, but the era of growth without discipline is much harder to defend.",
      excerpt:
        "Nigeria remains one of Africa's biggest startup ecosystems, but investors are rewarding sharper pricing, lower burn, and real revenue.",
      whyItMatters:
        "The shift from growth-at-all-costs to disciplined business building changes which startups survive, and which everyday services last.",
      body: [
        "Nigeria is still one of Africa's most watched startup markets, with a deep founder pool, Lagos at the centre, and thousands of tracked technology companies across the ecosystem.",
        "The mood in 2026 is stricter. Investors are harder on weak ideas, weak pricing, and cash burn, and the edge now goes to founders who solve expensive problems and can actually collect revenue in tough conditions.",
        "That is not necessarily bad news for users. A disciplined market favours services built to last over services built to grow fast and disappear when the subsidy ends.",
        "For founders, the lesson is to treat Nigeria as a serious operations test, not simply a headline market. What works in Lagos still has to earn its way across the country."
      ],
      author: tim,
      publishedAt: published(26, 9),
      updatedAt: published(26, 9),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1800&auto=format&fit=crop",
        alt: "People working in a modern office.",
        credit: "Unsplash"
      },
      tags: [startups],
      regions: [regions.nigeria],
      sources: [
        {
          label: "StartupBlink: Nigeria startup ecosystem rankings, startups, and insights",
          url: "https://www.startupblink.com/startup-ecosystem/nigeria"
        },
        {
          label: "Ecofin Agency: Africa's startup ecosystems struggle to keep pace in global 2026 rankings",
          url: "https://www.ecofinagency.com/news-digital/2005-55753-africa-s-startup-ecosystems-struggle-to-keep-pace-in-global-2026-rankings"
        }
      ]
    },
    {
      id: "africa-news-ai-layoffs-nigeria",
      slug: "ai-driven-layoffs-african-tech-nigeria",
      format: "business",
      title: "AI is starting to cut African tech jobs",
      seo: {
        title: "AI is starting to cut African tech jobs",
        description:
          "Layoffs across African tech are rising in 2026, and companies are now citing AI directly. Nigeria is part of the story. Here is the honest picture."
      },
      subhead: "AI is no longer only a productivity pitch. In some roles, it is becoming part of the restructuring conversation.",
      excerpt:
        "TechCabal Insights tracked nearly 5,000 disclosed African tech job losses from 2023 to early 2026, with AI now part of some restructuring stories.",
      whyItMatters:
        "AI is shifting from a productivity tool to a job-replacement one in parts of African tech, and pretending otherwise helps no one plan.",
      body: [
        "Layoffs across African tech have risen sharply since 2023, and AI is increasingly part of the restructuring conversation in 2026.",
        "TechCabal Insights tracked at least 56 layoff events and 4,948 disclosed job losses across Africa's tech ecosystem between January 2023 and March 2026.",
        "Nigeria, as one of the continent's biggest tech employers, is part of this picture. The honest reading is that AI is moving from productivity aid to, in some roles, a replacement or a reason to redesign teams.",
        "None of this is unique to Africa, but it lands hard in markets where tech jobs are prized. The useful response for workers and founders is to treat AI fluency as a core skill, not as background noise."
      ],
      author: tim,
      publishedAt: published(25, 16),
      updatedAt: published(25, 16),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1801&auto=format&fit=crop",
        alt: "An empty office desk.",
        credit: "Unsplash"
      },
      tags: [ai, startups],
      regions: [regions.nigeria],
      sources: [
        {
          label: "TechCabal Insights: Inside Africa's tech layoffs",
          url: "https://insights.techcabal.com/inside-africas-tech-layoffs/"
        },
        {
          label: "TechCabal: Zap Africa cuts 44% of workforce in AI-driven restructuring",
          url: "https://techcabal.com/2026/02/28/zap-africa-layoffs/"
        }
      ]
    },
    {
      id: "africa-news-ayute-rwanda-2026",
      slug: "ayute-rwanda-agritech-challenge-2026",
      format: "news",
      title: "Rwanda advances 12 young agritech startups",
      seo: {
        title: "Rwanda advances 12 young agritech startups",
        description:
          "Rwanda has picked 12 youth-led agritech startups from over 1,200 applicants for the AYuTe Africa Challenge, a sign of its agritech momentum."
      },
      subhead: "The AYuTe Africa Challenge shows how much young founder energy is moving toward food, farming, and climate resilience.",
      excerpt:
        "Rwanda selected 12 youth-led agritech innovators for the AYuTe Africa Challenge Rwanda 2026 bootcamp from more than 1,200 applicants.",
      whyItMatters:
        "Better tools for smallholder farmers can lift incomes and cut waste, and Rwanda is deliberately backing the young people building them.",
      body: [
        "Rwanda has selected 12 youth-led agritech enterprises to advance in the AYuTe Africa Challenge Rwanda 2026, chosen from more than 1,200 applicants.",
        "The challenge, associated with Heifer International Rwanda, looks for scalable agricultural technologies that can lift productivity, improve market access, and help smallholder farmers cope with climate pressure.",
        "Agriculture remains central to Rwanda's economy and to many livelihoods, so tools that help farmers make better decisions on seeds, inputs, pests, weather, and prices can have outsized effects.",
        "The applicant pool is itself a signal. A lot of young Rwandans see agritech as a place to build. The next test is how many ideas become working, lasting businesses."
      ],
      author: tim,
      publishedAt: published(25, 14),
      updatedAt: published(25, 14),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1800&auto=format&fit=crop",
        alt: "A farmer using a phone in a field.",
        credit: "Unsplash"
      },
      tags: [startups, heifer],
      regions: [regions.rwanda],
      sources: [
        {
          label: "The New Times: Top 12 agritech innovators advance to AYuTe Rwanda 2026 bootcamp",
          url: "https://www.newtimes.co.rw/article/35054/news/featured/top-12-agritech-innovators-advance-to-ayute-rwanda-2026-bootcamp-ahead-of-grand-finale"
        },
        {
          label: "Africa Sustainability Matters: Rwanda agritech innovation challenge advances 12 startups",
          url: "https://africasustainabilitymatters.com/rwanda-agritech-innovation-challenge-advances-12-startups-as-digital-agriculture-gains-momentum-across-africa/"
        }
      ]
    },
    {
      id: "africa-news-kigali-innovation-city",
      slug: "kigali-innovation-city-progress-2026",
      format: "business",
      title: "Kigali Innovation City moves from blueprint to build",
      seo: {
        title: "Kigali Innovation City moves from blueprint to build",
        description:
          "Rwanda's $2bn Kigali Innovation City is advancing, with infrastructure work underway on a 61-hectare hub for universities, startups, and AI research."
      },
      subhead: "The big question is whether a planned innovation district can create jobs, companies, and exports, not just clean renders.",
      excerpt:
        "Kigali Innovation City is advancing in Gasabo District as Rwanda builds a 61-hectare hub for universities, labs, startups, offices, and housing.",
      whyItMatters:
        "A purpose-built hub clustering universities, startups, and research is a long bet on Rwanda growing its own tech industry, not just importing one.",
      body: [
        "Kigali Innovation City, Rwanda's long-running bet on becoming a stronger East African technology hub, is moving from blueprint toward buildout.",
        "The 61-hectare development in Gasabo District is designed as a mixed-use campus combining universities, research labs, startup space, offices, housing, retail, and hospitality.",
        "Projects of this scale are long bets. The meaningful metrics are not renders, but jobs, graduates, companies, research output, and exports over years.",
        "Rwanda's distinctive approach has been government-led de-risking and tight integration of education with enterprise. Whether that creates durable companies is the question that will take time to answer."
      ],
      author: tim,
      publishedAt: published(25, 12),
      updatedAt: published(25, 12),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800&auto=format&fit=crop",
        alt: "A modern campus development.",
        credit: "Unsplash"
      },
      tags: [startups],
      regions: [regions.rwanda],
      sources: [
        {
          label: "Top Africa News: Kigali Innovation City, Rwanda's data-driven bet on Africa's tech future",
          url: "https://www.topafricanews.com/2026/06/10/kigali-innovation-city-rwandas-data-driven-bet-on-africas-tech-future/"
        },
        {
          label: "Rwanda Ministry of Finance: Kigali Innovation City project secures US$20 million",
          url: "https://www.minecofin.gov.rw/news-detail/kigali-innovation-city-project-secures-us-20-million-to-finance-basic-infrastructure"
        }
      ]
    },
    {
      id: "africa-news-rwanda-brd-tech-debt-fund",
      slug: "rwanda-brd-early-stage-tech-debt-fund",
      format: "business",
      title: "Rwanda's development bank backs early-stage tech",
      seo: {
        title: "Rwanda's development bank backs early-stage tech",
        description:
          "The Development Bank of Rwanda is setting up a debt fund for early-stage tech startups, offering capital without forcing early ownership dilution."
      },
      subhead: "Debt is not right for every young company, but well-timed non-dilutive capital can help founders keep more ownership.",
      excerpt:
        "The Development Bank of Rwanda is setting up a debt fund for early-stage technology and high-growth startups under Rwanda's digital acceleration work.",
      whyItMatters:
        "Non-dilutive capital lets founders grow without giving away big chunks of their company early, which can mean healthier, more locally owned startups.",
      body: [
        "The Development Bank of Rwanda is establishing a debt fund tailored to early-stage technology and high-growth startups.",
        "The fund sits inside the wider Rwanda Digital Acceleration Project, which is backed by the World Bank and the Asian Infrastructure Investment Bank, and is designed to strengthen the country's digital innovation ecosystem.",
        "The financing is meant to be catalytic and non-dilutive, giving startups growth capital without forcing founders to surrender large ownership stakes too early.",
        "The details to watch are deployment timing, fund size, eligibility, pricing, and whether young companies can take on debt without adding pressure they are not ready for."
      ],
      author: tim,
      publishedAt: published(25, 10),
      updatedAt: published(25, 10),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1800&auto=format&fit=crop",
        alt: "Founders working in a co-working space.",
        credit: "Unsplash"
      },
      tags: [startups, fintech, brd],
      regions: [regions.rwanda],
      sources: [
        {
          label: "World Bank Blogs: Supporting Rwanda's digital entrepreneurs to scale",
          url: "https://blogs.worldbank.org/en/africacan/from-ambition-to-action-supporting-rwandas-digital-entrepreneurs-to-scale"
        },
        {
          label: "RISA: Rwanda Digital Acceleration Project",
          url: "https://www.risa.gov.rw/projects/rdap"
        }
      ]
    }
  ];
}
