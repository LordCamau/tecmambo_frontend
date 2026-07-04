import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type RegionKey = "kenya" | "nigeria" | "southAfrica" | "rwanda";

type BuildEvMobilityNewsArgs = {
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
  return new Date(Date.UTC(2026, 6, 3, hour, 0, 0)).toISOString();
}

export function buildEvMobilityNewsArticles({ authors, topics, brands, regions }: BuildEvMobilityNewsArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const mobility = bySlug(topics, "evs-mobility");
  const business = bySlug(topics, "business");
  const toyota = bySlug(brands, "toyota");
  const byd = bySlug(brands, "byd");
  const tesla = bySlug(brands, "tesla");
  const nio = bySlug(brands, "nio");

  return [
    {
      id: "ev-news-africa-financing-cost-parity",
      slug: "evs-cheaper-than-petrol-africa-financing",
      format: "business",
      title: "EVs could soon beat petrol on cost across Africa",
      seo: {
        title: "EVs could soon beat petrol on cost across Africa",
        description:
          "A study of 52 African countries finds EVs are close to being cheaper to own than petrol cars, and the last barrier is not technology. It is financing."
      },
      subhead:
        "Research across 52 African countries and six vehicle types finds electric on the verge of undercutting petrol, if the cost of borrowing comes down.",
      excerpt:
        "New research says EVs are close to cost parity across much of Africa, with expensive financing now doing more to slow adoption than the technology itself.",
      whyItMatters:
        "The main argument against EVs in Africa has always been cost. If financing, not technology, is the last barrier, then the fix is in banks and policy, not in waiting for better batteries.",
      body: [
        "Electric vehicles are close to becoming cheaper to own and run than petrol and diesel vehicles across much of Africa, and the last big barrier is not the technology but the cost of financing.",
        "That is the finding of research examining the total cost of ownership of EVs across 52 African countries and six passenger-vehicle segments: small and medium two-wheelers, small, medium, and large four-wheelers, and minibuses.",
        "The shift in thinking is significant. Most older projections did not expect battery power to be affordable enough to challenge petrol across the continent before 2040. Falling battery costs, surging global EV production, and Africa's strong solar resource have changed the picture.",
        "The study finds that battery-electric vehicles paired with solar off-grid charging could become cost-effective in many African countries well before 2040. In plain English, the vehicles and charging maths are moving faster than the old assumptions.",
        "So what stands in the way? Money, specifically the price of borrowing it. The researchers found that in more than half the countries examined, financing costs would need to fall by 7 to 15 percentage points for EVs to reach cost parity with conventional vehicles by 2030.",
        "That kind of drop cuts thousands of dollars off a vehicle's lifetime financing bill, often the difference between unaffordable and firmly within reach. Encouragingly, the study points to markets such as South Africa, Botswana, and Mauritius as already close to the financing conditions needed for parity.",
        "The nature of the problem matters because it points at the fix. The study argues technology risk is no longer the core issue. EVs are commercially mature and increasingly visible in Africa, from electric motorcycles to e-buses.",
        "What keeps interest rates punishing is country and lending risk: currency volatility, macroeconomic wobbles, and lenders that do not yet understand EV business models. Those are exactly the risks that public de-risking tools, guarantees, and specialised local asset financing are designed to absorb.",
        "For a Kenyan reader, this lands close to home. The e-mobility wave here, including electric motorcycles, three-wheelers, and buses already on Nairobi roads, runs on precisely these financing models.",
        "The vehicles are ready. The question is whether the money gets cheap enough, fast enough."
      ],
      closingLine:
        "The EV tipping point across Africa may not arrive from a miracle battery. It may arrive from a better loan.",
      author: tim,
      publishedAt: published(15),
      updatedAt: published(15),
      readTime: "5 min read",
      image: {
        src: "/articles/evs-cheaper-than-petrol-africa-financing.jpg",
        alt: "A white electric SUV in Kenya with doors open. Credit: GTSpirit.",
        credit: "GTSpirit",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [mobility, business],
      regions: [regions.kenya, regions.nigeria, regions.southAfrica, regions.rwanda],
      faq: [
        {
          question: "Are electric vehicles cheaper than petrol cars in Africa?",
          answer:
            "Not yet in most countries, but research across 52 African nations finds they are close, with financing costs now a major barrier."
        },
        {
          question: "What would make EVs cost-competitive in Africa?",
          answer:
            "Lower borrowing costs, public guarantees, local asset financing, falling battery prices, and solar charging can all push EVs toward cost parity."
        },
        {
          question: "Which African countries are closest to EV cost parity?",
          answer:
            "The study highlights South Africa, Botswana, and Mauritius as markets where financing conditions are already close to parity."
        }
      ],
      sources: [
        {
          label: "Moneyweb: Electric vehicles could soon be cheaper than petrol cars in Africa",
          url: "https://www.moneyweb.co.za/news/africa/electric-vehicles-could-soon-be-cheaper-than-petrol-cars-in-africa/"
        },
        {
          label: "Nature Energy: Battery-electric passenger vehicles will be cost-effective across Africa well before 2040",
          url: "https://www.nature.com/articles/s41560-025-01771-3"
        },
        {
          label: "ETH Zurich: Electric vehicles could catch on in Africa sooner than expected",
          url: "https://ethz.ch/en/news-and-events/eth-news/news/2026/01/electric-vehicles-could-catch-on-in-africa-sooner-than-expected.html"
        }
      ]
    },
    {
      id: "ev-news-toyota-bz4x-south-africa",
      slug: "toyota-first-ev-south-africa-chinese-pressure",
      format: "business",
      title: "Toyota finally sells an EV in South Africa. Why now?",
      seo: {
        title: "Toyota finally sells an EV in South Africa. Why now?",
        description:
          "Toyota's bZ4X is its first electric car in South Africa, arriving at R1.18 million as Chinese EV brands surge. What the move signals, and what it does not."
      },
      subhead:
        "The bZ4X is Toyota's first electric car in South Africa. It is less a product story than a signal: the Chinese EV surge has made sitting out impossible.",
      excerpt:
        "Toyota's first fully electric car in South Africa is a cautious, expensive signal that the country's EV market can no longer be ignored.",
      whyItMatters:
        "When the brand that has led South African car sales for decades finally plugs in, it signals where even the most hybrid-loyal carmaker thinks the market is heading.",
      body: [
        "Toyota, South Africa's dominant car brand for decades, is now selling its first fully electric Toyota-badged vehicle in the country.",
        "The bZ4X, a dual-motor, all-wheel-drive electric crossover, has gone on sale from R1,182,800, with a higher Touring version priced above it. It uses a 73.1kWh battery, is rated for roughly 450 to 480km of range in local listings, and supports DC fast charging from 0 to 80 percent in about 29 to 30 minutes under ideal conditions.",
        "The car matters less than the timing. Toyota has spent years arguing that hybrids, not pure EVs, suit markets like South Africa, pointing to thin charging infrastructure and the scepticism bred by years of load shedding.",
        "The bZ4X does not abandon that multi-pathway position. But it lands in a market being reshaped by aggressive Chinese entrants, with BYD, GWM, and others targeting South Africa as a key gateway and pricing sharply below the established brands.",
        "When the incumbent that least needed to move finally moves, it tells you the pressure is real.",
        "The honest read on the launch itself: this is a statement of intent, not a volume play. At over R1.18 million for an imported crossover, the bZ4X does little to put electric driving within reach of the mass market Toyota has owned for more than forty years.",
        "It also arrives after a wave of cheaper Chinese EVs and after Lexus, Toyota's premium sibling, had already entered the local battery-electric market.",
        "Still, the direction is unmistakable, and it echoes the financing research we covered on EV costs across Africa: the technology argument is fading, and the contest now is over price, infrastructure, and who moves fastest. See /business/evs-cheaper-than-petrol-africa-financing.",
        "Toyota entering the fray, even cautiously, makes electric harder for any South African buyer, or rival, to dismiss."
      ],
      closingLine:
        "The bZ4X will not make South Africa an EV mass market by itself, but Toyota's absence from that market is finally over.",
      author: tim,
      publishedAt: published(14),
      updatedAt: published(14),
      readTime: "5 min read",
      image: {
        src: "/articles/toyota-first-ev-south-africa.jpg",
        alt: "A red Toyota bZ4X photographed in South Africa. Credit: AutoTrader.",
        credit: "AutoTrader",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [mobility, toyota, byd],
      regions: [regions.southAfrica],
      faq: [
        {
          question: "What is Toyota's first electric car in South Africa?",
          answer:
            "It is the Toyota bZ4X, a battery-electric crossover sold from R1,182,800 in South Africa."
        },
        {
          question: "Why is Toyota launching an EV in South Africa now?",
          answer:
            "Competitive pressure is a major reason. Chinese EV brands such as BYD and GWM are becoming harder for established brands to ignore."
        }
      ],
      sources: [
        {
          label: "Toyota South Africa: bZ4X",
          url: "https://www.toyota.co.za/vehicles/bz4x"
        },
        {
          label: "Cars.co.za: Toyota bZ4X price and specs",
          url: "https://www.cars.co.za/motoring-news/toyota-bz4x-2026-price-specs/344922/"
        },
        {
          label: "TopAuto: Toyota's first electric car goes on sale in South Africa",
          url: "https://topauto.co.za/new-models/154391/toyotas-first-electric-car-goes-on-sale-in-south-africa-pricing-and-features/"
        }
      ]
    },
    {
      id: "ev-news-abidjan-lagos-electric-logistics",
      slug: "abidjan-lagos-corridor-electric-logistics",
      format: "business",
      title: "West Africa's mega-corridor eyes cleaner, smarter freight",
      seo: {
        title: "West Africa's mega-corridor eyes cleaner, smarter freight",
        description:
          "The Abidjan to Lagos corridor, West Africa's busiest trade artery, is moving toward multi-modal, electrified logistics. What is planned and why it matters."
      },
      subhead:
        "The Abidjan to Lagos artery is being pitched around multi-modal transport, smarter logistics, and cleaner mobility. Ambition is high; delivery is the test.",
      excerpt:
        "The EU Regional Business Forum put West Africa's Abidjan to Lagos corridor in front of investors, with rail, urban mobility, trade facilitation, and logistics on the table.",
      whyItMatters:
        "A huge share of West Africa's trade moves along one coastal artery. How that corridor modernises, and how clean it becomes, shapes prices and jobs across five countries and beyond.",
      body: [
        "West Africa's most important trade artery is being pushed toward a cleaner, smarter future.",
        "The EU Regional Business Forum on West Africa Corridors, held in Abidjan from March 30 to April 1, 2026, focused on investment opportunities in transport and logistics along the Abidjan to Lagos and Abidjan to Ouagadougou corridors.",
        "The official agenda did not present this as a single electric-truck announcement. It framed a broader transport upgrade: road transport, rail transport, maritime transport, corridor integration, urban mobility, and trade facilitation.",
        "That distinction matters. The corridor itself is one of Africa's most consequential infrastructure projects, running roughly 1,000 kilometres along the coast through Cote d'Ivoire, Ghana, Togo, Benin, and Nigeria. It links some of the region's largest cities and ports and carries a huge share of West Africa's trade and passenger movement.",
        "Why does the mobility angle matter? Because freight corridors are where transport emissions, costs, and delays concentrate. Long queues at borders, ageing diesel fleets, and road-only logistics make goods more expensive for everyone at the end of the chain.",
        "Shifting a share of that load to rail, tightening logistics with digital systems, and preparing dense routes for cleaner commercial transport is precisely where e-mobility can make early economic sense. Fixed corridors suit charging infrastructure far better than scattered, unpredictable traffic does.",
        "The honest caveat is the one that applies to every grand corridor announcement: forums are not asphalt, rails, border systems, or charging depots. The Abidjan to Lagos highway has been in planning for years, and timelines in multi-country megaprojects slip.",
        "The signal worth taking is directional: regional planners and funders are now discussing the corridor through the language of multimodal logistics, sustainable urban mobility, and trade facilitation, not only road expansion.",
        "Whether the electrons follow the intentions is the story we will keep watching."
      ],
      closingLine:
        "For now, the corridor is less an EV story than the kind of infrastructure story EV freight needs before it can become real.",
      author: tim,
      publishedAt: published(13),
      updatedAt: published(13),
      readTime: "5 min read",
      image: {
        src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1800&auto=format&fit=crop",
        alt: "Freight trucks on a highway. Credit: Unsplash.",
        credit: "Unsplash",
        width: 1800,
        height: 1200,
        type: "image/jpeg"
      },
      tags: [mobility, business],
      regions: [regions.nigeria],
      sources: [
        {
          label: "European Commission: EU Regional Business Forum, West Africa Corridors",
          url: "https://international-partnerships.ec.europa.eu/eu-business-fora/eu-regional-business-forum-west-africa-corridors-2026-03-30_en"
        },
        {
          label: "MobiliseYourCity: EU Regional Business Forum 2026",
          url: "https://www.mobiliseyourcity.net/node/1606"
        }
      ]
    },
    {
      id: "ev-news-bnef-ev-outlook-2026",
      slug: "bnef-ev-outlook-2026-record-sales-divergence",
      format: "news",
      title: "EV sales head for a record 23.3 million, but split world",
      seo: {
        title: "EV sales head for a record 23.3 million, but split world",
        description:
          "BloombergNEF expects 23.3 million EV sales in 2026, 27% of all new cars. Europe and emerging markets surge while the US stalls. The full picture, explained."
      },
      subhead:
        "BloombergNEF's 2026 outlook shows a record year with a sharp regional split: Europe and emerging markets accelerate while the US goes into reverse.",
      excerpt:
        "BloombergNEF expects passenger EV sales to hit 23.3 million in 2026, but the global transition is now moving at very different speeds.",
      whyItMatters:
        "One in four new cars sold this year will be electric. Where you live now decides whether that transition feels like the present or a distant rumour.",
      body: [
        "Global electric vehicle sales are heading for another record. BloombergNEF's Electric Vehicle Outlook 2026 expects 23.3 million passenger EVs to be sold worldwide this year, an 11 percent jump on 2025.",
        "That means about 27 percent of all new cars sold globally in 2026 will be electric, up from just 9 percent five years ago.",
        "Underneath the record, though, the report's real story is divergence. China remains the engine, but its market is maturing. Europe keeps climbing. Southeast Asia, India, Mexico, and Brazil are gaining momentum.",
        "The United States is the awkward counterpoint. BloombergNEF says weaker federal support has pushed the US outlook down sharply, making it one of the markets where the road now looks slower than it did only a couple of years ago.",
        "The counterweight is the rise of emerging markets, and this is the part that should interest African readers. EV adoption is no longer only a China, Europe, and California story.",
        "The drivers BloombergNEF names, escaping oil-import bills, affordable Chinese brands, and EV-centred industrial policy, are available to any country that chooses them. That is exactly the conversation African policymakers are having.",
        "The long game remains long. Electric cars on the road will take years to outnumber petrol ones, and more than a quarter of new cars this year is still a minority.",
        "But the direction has stopped being a debate. The question the report really poses is which markets ride the wave and which watch it pass, and that is decided by policy, not physics.",
        "For the global EV scoreboard behind those forecasts, see /business/byd-tesla-nio-june-2026-deliveries."
      ],
      closingLine:
        "The EV transition is still global, but it no longer moves like one global market.",
      author: tim,
      publishedAt: published(12),
      updatedAt: published(12),
      readTime: "4 min read",
      image: {
        src: "/articles/bnef-ev-outlook-2026-record-sales.jpg",
        alt: "A BYD electric vehicle front close-up. Credit: GreenCars.",
        credit: "GreenCars",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [mobility, byd, tesla],
      faq: [
        {
          question: "How many EVs will be sold in 2026?",
          answer: "BloombergNEF expects 23.3 million passenger EV sales globally in 2026, about 27 percent of all new cars."
        },
        {
          question: "Why are EV markets splitting?",
          answer:
            "Policy, incentives, affordable models, oil-import exposure, and industrial strategy now vary sharply by region, so adoption is moving at different speeds."
        },
        {
          question: "Which EV markets are gaining momentum?",
          answer:
            "BloombergNEF highlights continued strength in China, growth in Europe, and rising momentum in Southeast Asia, India, Mexico, and Brazil."
        }
      ],
      sources: [
        {
          label: "BloombergNEF: Electric Vehicle Outlook 2026",
          url: "https://about.bnef.com/insights/clean-transport/electric-vehicle-outlook/"
        },
        {
          label: "BloombergNEF: Electric Vehicle Outlook 2026 executive summary",
          url: "https://assets.bbhub.io/professional/sites/44/EVO2026-Executive-Summary.pdf"
        }
      ]
    },
    {
      id: "ev-news-model-availability-suv-bias",
      slug: "ev-model-explosion-suv-bias",
      format: "news",
      title: "EV choice is growing, but the market still tilts big",
      seo: {
        title: "EV choice is growing, but the market still tilts big",
        description:
          "The IEA counted 630 battery-electric car models globally in 2025, yet large cars and SUVs still dominate EV sales. Why that matters for affordable adoption."
      },
      subhead:
        "The IEA's Global EV Outlook shows more choice, but also a stubborn bias toward large cars and SUVs. For price-sensitive markets, that is the part that matters.",
      excerpt:
        "The global EV catalogue is expanding, but the IEA says large cars and SUVs still account for almost 70 percent of global EV sales.",
      whyItMatters:
        "The EV era is arriving with plenty of large vehicles. If affordable small electric cars stay scarce, entire markets, including much of Africa, get left waiting.",
      body: [
        "The world has never had more electric cars to choose from, but the menu is still tilted toward bigger, more expensive vehicles.",
        "The International Energy Agency's Global EV Outlook 2026 says 630 battery-electric car models were available globally in 2025. That is real choice compared with only a few years ago, but availability alone does not solve affordability.",
        "The striking detail is the shape of demand and supply. Large cars and SUVs accounted for almost 70 percent of the global EV market in 2025, and in the United States, more than 85 percent of electric models were large cars or SUVs.",
        "The economics behind the bias are simple. Big vehicles carry big margins, and batteries are expensive, so carmakers have leaned toward formats where the battery cost hides inside a premium price.",
        "The result is an EV market rich in large family crossovers and thin on the compact, cheap runabouts that many drivers actually need.",
        "That gap matters everywhere, and it matters acutely in Africa. The IEA repeatedly identifies affordability as a key barrier to EV adoption, while the Africa financing research we covered shows that cost, not battery science, is now the central fight. See /business/evs-cheaper-than-petrol-africa-financing.",
        "A catalogue that keeps swelling with large, costly formats does little for markets where the entry price is the entire battle. It also cedes the affordable ground to the handful of players, mostly Chinese brands, actually building small, cheaper EVs at scale.",
        "There are counter-currents worth naming. Chinese manufacturers keep pushing compact models, price competition has dragged EV prices down in several markets, and the used-EV pipeline is starting to reach import-dependent countries.",
        "But the headline stands: the EV model boom is real, and it is still weighted toward buyers who need less help. Watch not only how many EVs exist, but how many exist below the price of a mid-range petrol car."
      ],
      closingLine:
        "The affordable-EV question is not whether the world can build electric cars. It is whether it builds enough of the right ones.",
      author: tim,
      publishedAt: published(11),
      updatedAt: published(11),
      readTime: "4 min read",
      image: {
        src: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1800&auto=format&fit=crop",
        alt: "Electric SUVs on display. Credit: Unsplash.",
        credit: "Unsplash",
        width: 1800,
        height: 1200,
        type: "image/jpeg"
      },
      tags: [mobility],
      sources: [
        {
          label: "IEA: Global EV Outlook 2026",
          url: "https://www.iea.org/reports/global-ev-outlook-2026"
        },
        {
          label: "IEA: Trends in electric cars",
          url: "https://www.iea.org/reports/global-ev-outlook-2026/trends-in-electric-cars"
        }
      ]
    },
    {
      id: "ev-news-byd-tesla-nio-june-2026",
      slug: "byd-tesla-nio-june-2026-deliveries",
      format: "business",
      title: "BYD retakes the EV crown as June numbers land",
      seo: {
        title: "BYD retakes the EV crown as June numbers land",
        description:
          "Q2 delivery reports are in: BYD reclaims the global BEV lead, Tesla posts a solid quarter, NIO surges 62.9%, and BYD nearly outsells Toyota in Australia."
      },
      subhead:
        "The June and second-quarter delivery reports show BYD back on top globally, a resilient Tesla, a surging NIO, and one eye-catching result from Australia.",
      excerpt:
        "BYD delivered 557,090 fully electric vehicles in Q2 2026, ahead of Tesla's 480,126, while NIO posted its best month of the year.",
      whyItMatters:
        "Quarterly delivery numbers are the scoreboard of the EV transition, and this quarter's tell a sharper story than usual: the crown changed hands, and the map changed shape.",
      body: [
        "The second-quarter EV scoreboard is in, and the headline is a familiar rivalry with a twist. BYD delivered 557,090 fully electric vehicles in the quarter, enough to retake the global battery-electric lead from Tesla.",
        "Tesla still posted a strong quarter, delivering 480,126 vehicles after producing 451,758. That was its first year-on-year delivery growth after a difficult stretch, and the Model 3 and Model Y did almost all the heavy lifting.",
        "BYD's winning number was down from its own year-earlier high, but its international push is doing more of the work now. The company has been leaning harder into exports as competition and policy changes cool parts of its home market.",
        "Australia produced the quarter's most eye-catching single number. BYD delivered a record 18,881 vehicles there in June, finishing just 243 units behind Toyota, the market leader, according to VFACTS reporting.",
        "Tesla set its own Australian record the same month at 8,670 deliveries, with the Model Y reported as the country's best-selling vehicle outright.",
        "The third name worth knowing is NIO. The Chinese smart-EV maker delivered 40,597 vehicles in June, up 62.9 percent year on year and its best month of 2026, powered by its three-brand strategy of NIO, ONVO, and Firefly.",
        "Put together, the reports sketch the state of the race: China's giants are growing abroad faster than at home, Tesla has stabilised sharply, and the second tier of Chinese brands is scaling fast.",
        "For African markets watching from the sidelines, the exports are the story. The vehicles now flooding Australia and Southeast Asia at aggressive prices are the same competitive pressure that will define what electric driving costs here.",
        "For the broader market forecast, see /news/bnef-ev-outlook-2026-record-sales-divergence and /news/ev-model-explosion-suv-bias."
      ],
      closingLine:
        "The EV crown is not just about bragging rights. It tells you whose factories, supply chains, and export ambitions are setting the next price floor.",
      author: tim,
      publishedAt: published(10),
      updatedAt: published(10),
      readTime: "5 min read",
      image: {
        src: "https://images.unsplash.com/photo-1565688842882-e0b2693d3493?q=80&w=1800&auto=format&fit=crop",
        alt: "Rows of new electric cars at a distribution lot. Credit: Unsplash.",
        credit: "Unsplash",
        width: 1800,
        height: 1200,
        type: "image/jpeg"
      },
      tags: [mobility, business, byd, tesla, nio],
      faq: [
        {
          question: "Who sold more EVs in Q2 2026, BYD or Tesla?",
          answer:
            "BYD led in battery-electric deliveries with 557,090 vehicles in Q2 2026, ahead of Tesla's 480,126 deliveries."
        },
        {
          question: "How many vehicles did NIO deliver in June 2026?",
          answer: "NIO delivered 40,597 vehicles in June 2026, up 62.9 percent year on year."
        },
        {
          question: "How close did BYD come to Toyota in Australia?",
          answer:
            "BYD delivered 18,881 vehicles in Australia in June 2026, reportedly just 243 units behind Toyota."
        }
      ],
      sources: [
        {
          label: "Tesla Investor Relations: Q2 2026 production and deliveries",
          url: "https://ir.tesla.com/press-release/tesla-second-quarter-2026-production-deliveries-and-deployments"
        },
        {
          label: "Electrek: BYD Q2 2026 BEV deliveries",
          url: "https://electrek.co/2026/07/01/byd-tesla-q2-2026-bev-sales/"
        },
        {
          label: "NIO: June and Q2 2026 delivery update",
          url: "https://www.nio.com/news/20260701001"
        },
        {
          label: "CarExpert: VFACTS June 2026",
          url: "https://www.carexpert.com.au/car-news/vfacts-june-2026-new-vehicle-sales-set-all-time-monthly-record-as-byd-and-tesla-surge"
        }
      ]
    }
  ];
}
