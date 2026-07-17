import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type BuildKenyaJuly17NewsArgs = {
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

function published(hour: number) {
  return new Date(Date.UTC(2026, 6, 17, hour, 0, 0)).toISOString();
}

const jpegImageType = "image/jpeg" as const;

export function buildKenyaJuly17NewsArticles({ authors, topics, brands, kenya }: BuildKenyaJuly17NewsArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const lulu = bySlug(authors, "lulu-kiritu");
  const ai = bySlug(topics, "ai");
  const apps = bySlug(topics, "apps");
  const business = bySlug(topics, "business");
  const connectivity = bySlug(topics, "connectivity");
  const fintech = bySlug(topics, "fintech");
  const mobility = bySlug(topics, "evs-mobility");
  const policy = bySlug(topics, "policy");
  const startups = bySlug(topics, "startups");
  const airtel = bySlug(brands, "airtel");
  const basigo = bySlug(brands, "basigo");
  const glovo = bySlug(brands, "glovo");
  const moniepoint = bySlug(brands, "moniepoint");
  const safaricom = bySlug(brands, "safaricom");
  const starlink = bySlug(brands, "starlink");
  const uber = bySlug(brands, "uber");

  return [
    {
      id: "kenya-news-uber-delivery-hero-glovo-kenya",
      slug: "uber-buys-delivery-hero-glovo-kenya",
      format: "business",
      title: "Uber is buying Glovo's owner. What it means for Kenya",
      seo: {
        title: "Uber is buying Glovo's owner. What it means for Kenya",
        description:
          "Uber's $14.8bn deal for Delivery Hero hands it Glovo, Kenya's biggest delivery app, alongside Uber Eats. The deal, the timeline, and the competition question."
      },
      subhead:
        "Uber's proposed Delivery Hero takeover would put Glovo and Uber Eats under one owner, raising a very Kenyan competition question.",
      excerpt:
        "Uber's agreement to buy Delivery Hero would bring Glovo into the same group as Uber Eats, a major shift for Kenya's food and grocery delivery market.",
      whyItMatters:
        "Kenya's delivery market has already lost Jumia Food and Bolt Food. If Glovo and Uber Eats end up under one owner, restaurants, riders, and customers will need regulators to ask hard questions about competition.",
      body: [
        "Uber has agreed to buy Delivery Hero, the German parent of Glovo, in one of the biggest deals in the history of food delivery, and it lands directly on Kenyan doorsteps. Announced in Berlin on Thursday, July 16, the agreement offers Delivery Hero shareholders 41.50 euros per share in cash, valuing the company at 13.0 billion euros, about 14.8 billion US dollars, and it would combine Uber's mobility and delivery empire with Delivery Hero's brands across the world.",
        "The scale is striking. The combined platforms span 99 countries with pro-forma gross bookings of 236 billion dollars in 2025. Uber keeps Delivery Hero's operations in 50 markets, spanning Baedal Minjok in South Korea, talabat in the Middle East, foodpanda across Asia, PedidosYa in Latin America, and, the part that matters here, Glovo's business across Africa, including Kenya.",
        "To pre-empt some competition objections, Delivery Hero is separately selling its operations in 14 mostly European markets where the two overlap to investment firm SSW Partners for about 1.6 billion dollars. Uber already owned roughly a quarter of Delivery Hero, both boards back the offer, and the companies expect completion in the second half of 2027, pending regulatory approvals.",
        "## The Kenyan question",
        "Here is the local arithmetic. Glovo is Kenya's largest on-demand food and grocery delivery platform. Its main surviving rival is Uber Eats. Jumia Food shut down at the end of 2023, and Bolt Food exited Kenya in 2024, which means the market's consolidation already happened before this deal, leaving essentially two big apps standing.",
        "If Uber completes the acquisition and keeps Glovo Kenya, the two dominant delivery platforms in this country would share one owner. Notice what the European carve-out implies: where Glovo and Uber Eats compete head-to-head in Europe, the overlapping businesses are being sold off precisely because regulators would object. Kenya has the same overlap, and no announced carve-out.",
        "That makes this a genuine question for the Competition Authority of Kenya, which has intervened in digital-market consolidation before, and it is the single most important local detail to watch as the deal grinds through approvals.",
        "Being honest about both sides of it: consolidation is not automatically bad for users. A merged operation could mean better coverage, one stronger app, and more sustainable economics in a business that has burned money for a decade. The exits of Jumia Food and Bolt Food show how brutal the standalone economics were.",
        "But the textbook risks are real too: less pressure on delivery fees and commissions, weaker bargaining power for restaurants and riders, and fewer alternatives when service declines. Competition is the mechanism that keeps an app honest, and Kenya would be down to roughly one owner of it.",
        "Nothing changes tomorrow. Glovo and Uber Eats continue operating separately through a long approval process, and the deal could yet be reshaped by regulators anywhere along the way. But the direction is set, and for Kenyan restaurants, riders, and anyone who orders dinner by app, this Berlin announcement is worth following all the way home."
      ],
      closingLine:
        "The delivery app you open at lunch may soon be part of a much bigger global machine, and Kenya should not sleepwalk through that change.",
      faq: [
        {
          question: "Is Uber buying Glovo?",
          answer:
            "Uber has agreed to buy Delivery Hero, Glovo's parent company. The deal still needs regulatory approvals and is expected to close in the second half of 2027 if it proceeds."
        },
        {
          question: "Will Glovo and Uber Eats merge in Kenya?",
          answer:
            "Not immediately. The companies continue operating separately during the approval process. Kenya's regulator could also require remedies before any local consolidation happens."
        },
        {
          question: "Is this a monopoly in Kenya?",
          answer:
            "It is not automatically a monopoly, but it is a serious competition question because Glovo and Uber Eats are the two most visible remaining delivery platforms in Kenya."
        }
      ],
      author: tim,
      publishedAt: published(7),
      updatedAt: published(7),
      readTime: "5 min read",
      image: {
        src: "/articles/uber-buys-glovo-parent-company.jpg",
        alt: "Uber and Glovo logos shown as a merger graphic.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: jpegImageType
      },
      tags: [apps, business, uber, glovo],
      regions: [kenya],
      sources: [
        { label: "Delivery Hero investor relations", url: "https://www.deliveryhero.com/investors/" },
        { label: "Uber investor relations", url: "https://investor.uber.com/" }
      ]
    },
    {
      id: "kenya-news-moniepoint-rose-muturi-ceo",
      slug: "moniepoint-rose-muturi-kenya-ceo",
      format: "business",
      title: "Moniepoint names Rose Muturi CEO for Kenya",
      seo: {
        title: "Moniepoint names Rose Muturi CEO for Kenya",
        description:
          "Moniepoint has appointed Rose Muturi to lead Kenya after its Sumac Microfinance Bank deal. The Nigerian fintech is moving from entry to execution."
      },
      subhead:
        "The appointment turns Moniepoint's Kenyan expansion from a licence story into a leadership story.",
      excerpt:
        "Rose Muturi will lead Moniepoint's Kenya operation as the Nigerian fintech tries to turn its Sumac acquisition into a real SME banking push.",
      whyItMatters:
        "Kenya is not short of fintech apps. What matters is whether new entrants can build trust, meet regulation, and offer small businesses something better than the tools they already use.",
      body: [
        "Moniepoint, the Nigerian fintech unicorn, has appointed Rose Muturi as its chief executive for Kenya, putting a local executive at the centre of its next East African push.",
        "The move follows Moniepoint's route into Kenya through Sumac Microfinance Bank, a deal that gave the company a regulated base instead of forcing it to build from zero. That matters because Kenya's fintech market is both attractive and unusually demanding: mobile money is mature, business owners are digitally literate, and regulators watch financial products closely.",
        "Muturi's job is not simply to launch an app. It is to make Moniepoint useful to merchants and small businesses that already juggle M-Pesa, bank accounts, till numbers, card payments, loans, inventory tools, and accounting headaches.",
        "## Why leadership matters here",
        "In Nigeria, Moniepoint became known for serving everyday merchants with payment terminals, business accounts, loans, and software that made small shops easier to run. Kenya has similar merchants, but not the same market. M-Pesa is deeply embedded, banks are more digital than outsiders assume, and agent networks already shape how money moves.",
        "That means Moniepoint's Kenyan play has to be local, not copied and pasted. A CEO with experience in the Kenyan financial-services market gives the company a better chance of reading the room, especially around compliance, customer support, pricing, and the trust that small businesses need before moving their money.",
        "The timing also fits a broader African fintech pattern. Large players are increasingly entering markets through regulated institutions rather than pure app launches. We saw that in the wider Moniepoint and Sumac story, and in Africa's fintech consolidation wave, where licences, local teams, and operating history have become valuable assets.",
        "For Kenyan SMEs, more serious competition for their business is straightforwardly good news, whatever the eventual outcome: better terms, better tools, and a reason for every provider to try harder.",
        "The open question is whether Moniepoint can become more than a Nigerian success story abroad. Kenya will test whether its merchant operating system works in a market where the default expectation is already high."
      ],
      closingLine:
        "Moniepoint has a licence route and now a local leader. The harder part is earning a place on Kenyan merchants' counters.",
      faq: [
        {
          question: "Who is Moniepoint's CEO in Kenya?",
          answer: "Moniepoint has appointed Rose Muturi as chief executive for its Kenya business."
        },
        {
          question: "How did Moniepoint enter Kenya?",
          answer:
            "Moniepoint's Kenya strategy is linked to its Sumac Microfinance Bank acquisition, which gives it a regulated operating base."
        },
        {
          question: "What does Moniepoint offer small businesses?",
          answer:
            "Moniepoint is known for merchant payments, business accounts, loans, and software tools designed for small and medium-sized businesses."
        }
      ],
      author: tim,
      publishedAt: published(8),
      updatedAt: published(8),
      readTime: "4 min read",
      image: {
        src: "/articles/moniepoint-rose-muturi.jpg",
        alt: "Rose Muturi, Moniepoint's chief executive for Kenya. Credit: Daba.",
        credit: "Daba",
        width: 1040,
        height: 520,
        type: jpegImageType
      },
      tags: [fintech, business, startups, moniepoint],
      regions: [kenya]
    },
    {
      id: "kenya-news-airtel-money-rudishiwa",
      slug: "airtel-money-rudishiwa-cashback-bonus-wallet",
      format: "news",
      title: "Airtel Money's Rudishiwa turns cashback into a habit",
      seo: {
        title: "Airtel Money Rudishiwa: cashback for Kenyan users",
        description:
          "Airtel Money's Rudishiwa campaign gives Kenyan customers cashback-style bonuses. Here is what the wallet is really trying to change."
      },
      subhead:
        "Cashback is not only a promotion. In mobile money, it is a way to train behaviour.",
      excerpt:
        "Airtel Money is using Rudishiwa to reward Kenyan users and make its wallet feel more useful for everyday transactions.",
      whyItMatters:
        "Mobile money competition is no longer only about whether a wallet works. It is about whether people remember to use it when they pay, send, buy, save, or borrow.",
      body: [
        "Airtel Money's Rudishiwa campaign is a simple idea with a bigger goal: give customers something back when they use the wallet, then make that habit stick.",
        "In plain English, Rudishiwa is a cashback-style push. Users make eligible Airtel Money transactions and receive bonuses or rewards back into the ecosystem. The immediate appeal is obvious: everyone likes getting something back. The strategic reason is sharper. Airtel wants more Kenyans to think of Airtel Money as a daily wallet, not just the place they land when a specific fee or offer looks cheaper.",
        "That matters because Kenya's mobile money market is not evenly balanced. Safaricom's M-Pesa remains the dominant habit, and habits are hard to break. People send money where their family, shops, drivers, landlords, schools, and informal groups already transact. The network effect is enormous.",
        "## Why cashback works",
        "Cashback attacks that problem gently. It does not ask a user to switch everything overnight. It asks them to try one transaction, then another. If the reward is visible and predictable, the wallet starts feeling useful. If the reward is confusing, delayed, or full of fine print, the habit dies quickly.",
        "Airtel's wider challenge is to turn a campaign into routine. That means strong merchant acceptance, reliable cash-in and cash-out points, clean dispute handling, and pricing that does not make the reward feel like a trick.",
        "The bigger lesson is that Kenya's mobile money battle is shifting from access to preference. Most people can use digital money. The question is which wallet they choose when no one is forcing the choice.",
        "Rudishiwa gives Airtel a friendly reason to appear in that moment. Whether it changes long-term behaviour depends on whether users still reach for Airtel Money after the promotion feels normal."
      ],
      closingLine:
        "Cashback wins attention. Reliability wins the wallet.",
      faq: [
        {
          question: "What is Airtel Money Rudishiwa?",
          answer:
            "Rudishiwa is a cashback-style Airtel Money campaign that rewards eligible wallet transactions."
        },
        {
          question: "Why is Airtel using cashback?",
          answer:
            "Cashback can encourage repeated use, which is important in a mobile money market shaped by strong user habits."
        },
        {
          question: "Does Rudishiwa make Airtel Money cheaper than M-Pesa?",
          answer:
            "It depends on the transaction, reward rules, and fees. Users should compare the total cost and not only the headline reward."
        }
      ],
      author: tim,
      publishedAt: published(9),
      updatedAt: published(9),
      readTime: "4 min read",
      image: {
        src: "/articles/airtel-money-rudishiwa.jpg",
        alt: "Airtel Money Rudishiwa campaign artwork. Credit: Airtel Kenya.",
        credit: "Airtel Kenya",
        width: 1040,
        height: 520,
        type: jpegImageType
      },
      tags: [fintech, airtel],
      regions: [kenya]
    },
    {
      id: "kenya-news-basigo-expansion-grid",
      slug: "basigo-electric-bus-expansion-grid-question",
      format: "business",
      title: "BasiGo's electric bus growth now meets the grid question",
      seo: {
        title: "BasiGo electric bus expansion meets Kenya's grid question",
        description:
          "BasiGo's electric bus expansion is a climate and transport win, but scale now depends on depots, charging, financing, and Kenya's power grid."
      },
      subhead:
        "Electric buses are no longer a demo in Nairobi. The next test is whether the system around them scales.",
      excerpt:
        "BasiGo's electric bus push is moving from proof of concept to infrastructure challenge, with charging, depots, and financing now in focus.",
      whyItMatters:
        "Electric buses can cut fuel costs and urban emissions, but they only work at scale if charging, routes, depots, finance, and grid reliability move together.",
      body: [
        "BasiGo has made electric buses feel normal on Kenyan roads, which is exactly why the harder question has arrived: can the infrastructure around them keep up?",
        "The first phase of e-bus adoption is about proof. Can the bus carry passengers all day? Can operators earn money? Do riders accept it? Does the driver trust the vehicle? In Nairobi, that proof is no longer hypothetical. Electric buses are visible, quieter, and easier to understand than a climate-policy document.",
        "The second phase is about systems. Buses need depots, chargers, grid connections, route planning, maintenance teams, spare parts, financing, and predictable power costs. When one bus charges overnight, the system can absorb it. When hundreds do, the question becomes local electricity capacity and operational choreography.",
        "## The financing layer",
        "BasiGo's model has always been as much about financing as about vehicles. Electric buses cost more upfront than many diesel alternatives, even when they can be cheaper to run over time. That gap is where pay-as-you-drive models, bank partnerships, and asset financing matter.",
        "For operators, the real calculation is not whether electric is good in theory. It is whether the monthly cash flow works after loan payments, charging costs, maintenance, route revenue, and downtime. A bus that is cheaper over ten years still fails if the first three years are unaffordable.",
        "Then comes the grid. Kenya's electricity mix is relatively clean, which strengthens the climate case. But charging infrastructure still has to be built where buses sleep, not where policy papers are written. Depots need enough power at the right time, and utilities need to plan for clusters of demand.",
        "The upside is large. Public transport is where electrification can matter quickly because each vehicle moves many people every day. One well-used electric bus can replace a lot of diesel kilometres.",
        "BasiGo's next milestone, then, is not simply more buses. It is a working network of finance, charging, maintenance, and power that lets more operators buy in without feeling like they are joining an experiment."
      ],
      closingLine:
        "The electric bus has made its point. Now Kenya has to build the boring parts that let it scale.",
      faq: [
        {
          question: "Why do electric buses matter in Kenya?",
          answer:
            "They can reduce fuel costs, cut urban emissions, and improve public transport if charging and financing work at scale."
        },
        {
          question: "What is the biggest challenge for BasiGo now?",
          answer:
            "The next challenge is scaling the system around the buses: depots, charging, maintenance, grid capacity, and financing."
        },
        {
          question: "Are electric buses cheaper than diesel buses?",
          answer:
            "They can be cheaper to run over time, but the upfront cost and financing structure determine whether operators can afford them."
        }
      ],
      author: tim,
      publishedAt: published(10),
      updatedAt: published(10),
      readTime: "5 min read",
      image: {
        src: "/articles/basigo-power-grid.jpg",
        alt: "A BasiGo electric bus near wind power infrastructure. Credit: BasiGo.",
        credit: "BasiGo",
        width: 1040,
        height: 520,
        type: jpegImageType
      },
      tags: [mobility, business, basigo],
      regions: [kenya]
    },
    {
      id: "kenya-news-home-fibre-speed-wars-starlink",
      slug: "kenya-home-fibre-speed-wars-starlink",
      format: "news",
      title: "Kenya's home internet fight is moving past speed",
      seo: {
        title: "Kenya home fibre speed wars move past speed",
        description:
          "Kenyan fibre providers are selling faster home internet, but Starlink's capacity freeze shows reliability, coverage, and support now matter just as much."
      },
      subhead:
        "Fibre providers can shout about megabits. Starlink's freeze is a reminder that capacity is the real product.",
      excerpt:
        "Kenya's home internet market is becoming a fight over reliability, support, coverage, and congestion, not only headline speed.",
      whyItMatters:
        "Home internet is now work infrastructure, school infrastructure, and entertainment infrastructure. The best provider is not always the one with the biggest number on the flyer.",
      body: [
        "Kenya's home internet market is getting louder, but the useful question is becoming quieter: does the connection hold up when everyone in your neighbourhood is online?",
        "Fibre providers have spent years selling speed. Bigger numbers are easy to advertise: 20Mbps, 50Mbps, 100Mbps, 1Gbps. The problem is that a speed number is not the whole experience. Latency, congestion, router quality, customer support, installation time, outage response, fair-use policies, and upload speed matter too.",
        "Starlink made that clear in a different way. Its freeze on new signups in several Kenyan counties showed that demand can outrun capacity even when the technology is impressive. Satellite broadband is useful where fibre has not reached, but dense urban demand still runs into physics.",
        "## What households should compare",
        "For households, the smarter comparison is not simply fibre versus satellite. It is use case versus reliability. A remote worker on video calls needs stable latency and upload performance. A family streaming at night needs consistent evening speeds. A rural business may accept higher latency if satellite is the only dependable option.",
        "Safaricom, Zuku, Jamii Telecom, Poa Internet, Faiba, and other fibre or fixed-wireless players are competing in a market where users have become more sophisticated. A cheap package that collapses every evening is not cheap if it breaks work.",
        "The next round of competition should be more transparent. Providers should publish realistic peak-time speeds, upload speeds, outage histories, and router support instead of only headline downloads.",
        "Kenya's broadband market is healthier when users can switch. But switching only works when customers understand what they are buying.",
        "So yes, speed still matters. It just does not matter alone anymore."
      ],
      closingLine:
        "The best home internet plan is the one that behaves well at 8pm, not the one that looks best in a morning speed test.",
      faq: [
        {
          question: "Is fibre better than Starlink in Kenya?",
          answer:
            "In dense urban areas, fibre often has a capacity and latency advantage. Starlink can be more useful where fibre is unavailable or unreliable."
        },
        {
          question: "What should I check before buying home internet?",
          answer:
            "Check peak-time performance, upload speed, latency, installation time, router quality, outage support, and any fair-use rules."
        },
        {
          question: "Why did Starlink freeze new signups in Kenya?",
          answer:
            "Starlink froze signups in some areas because local demand exceeded available satellite capacity."
        }
      ],
      author: tim,
      publishedAt: published(12),
      updatedAt: published(12),
      readTime: "4 min read",
      image: {
        src: "/articles/safaricom-home-fibre.jpg",
        alt: "A Safaricom Home Fibre router on a balcony. Credit: TechCabal.",
        credit: "TechCabal",
        width: 1040,
        height: 520,
        type: jpegImageType
      },
      tags: [connectivity, safaricom, starlink],
      regions: [kenya]
    },
    {
      id: "kenya-news-stablecoin-economy-freelancers",
      slug: "kenya-stablecoin-economy-freelancers",
      format: "business",
      title: "Stablecoins are becoming Kenya's quiet freelance rail",
      seo: {
        title: "Stablecoins are becoming Kenya's quiet freelance rail",
        description:
          "Kenyan freelancers and small exporters are using dollar stablecoins to receive and hold value. The opportunity is real, and so are the risks."
      },
      subhead:
        "The crypto story worth watching is not speculation. It is the dollar payment rail under ordinary digital work.",
      excerpt:
        "Stablecoins are increasingly relevant to Kenyan freelancers, agencies, and small exporters who need faster dollar payments and protection from currency friction.",
      whyItMatters:
        "For many online workers, the payment problem is not ideology. It is how to get paid quickly, cheaply, and in a currency that holds value long enough to plan with.",
      body: [
        "Stablecoins are becoming part of Kenya's quiet freelance economy, not because most workers want to be crypto people, but because getting paid across borders is still more painful than it should be.",
        "A stablecoin is a digital token designed to track a real-world currency, most commonly the US dollar. The point is not that the token will make you rich. The point is that it can move quickly, settle outside normal banking hours, and hold dollar value before a worker converts it into shillings.",
        "For Kenyan freelancers, agencies, creators, developers, consultants, and small exporters, that can be useful. International clients may want to pay in dollars. Bank transfers can be slow or expensive. Payment platforms can have country limits, withdrawal fees, or awkward compliance checks. A dollar stablecoin can feel like a workaround.",
        "## The risk is not theoretical",
        "But a workaround is not the same as consumer protection. Stablecoins depend on issuers, reserves, exchanges, wallets, network fees, private keys, and the legal environment around them. If a user sends funds to the wrong address, falls for a fake wallet, or uses a weak exchange, the money may be gone.",
        "Kenya also has a policy question to settle. Regulators need to separate useful payment innovation from money laundering, scams, tax evasion, and consumer harm. That is not easy, especially when the product crosses borders faster than the rules do.",
        "Nigeria's stablecoin trade workaround shows why this matters beyond crypto circles. When people face foreign exchange friction, they find rails that move. Kenya should study that lesson early rather than pretend the behaviour will wait for perfect regulation.",
        "The practical advice is simple. If you are paid through stablecoins, understand the wallet, the issuer, the conversion route, the fees, and the tax trail. Do not treat a payment rail as a savings plan unless you know exactly what backs it.",
        "Stablecoins may become boring infrastructure one day. They are not boring yet."
      ],
      closingLine:
        "The future of stablecoins in Kenya will be decided less by hype and more by whether they make legitimate payments safer, cheaper, and easier to audit.",
      faq: [
        {
          question: "Why would a Kenyan freelancer use stablecoins?",
          answer:
            "A freelancer may use stablecoins to receive dollar-linked payments quickly, especially when bank transfers or payment platforms are expensive or slow."
        },
        {
          question: "Are stablecoins legal in Kenya?",
          answer:
            "Kenya's regulatory position is evolving. Users should check current guidance from financial regulators and avoid platforms that do not meet compliance standards."
        },
        {
          question: "Are stablecoins risk-free?",
          answer:
            "No. Users face wallet, exchange, issuer, scam, liquidity, and regulatory risks, even when a token is designed to track the dollar."
        }
      ],
      author: lulu,
      publishedAt: published(13),
      updatedAt: published(13),
      readTime: "5 min read",
      image: {
        src: "/articles/kenya-stable-coins.jpg",
        alt: "Stablecoin payment rails illustrated for Kenyan freelancers. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: jpegImageType
      },
      tags: [fintech],
      regions: [kenya]
    },
    {
      id: "kenya-news-digital-learning-junior-schools",
      slug: "kenya-digital-learning-junior-schools",
      format: "news",
      title: "Kenya's digital learning push now faces the classroom test",
      seo: {
        title: "Kenya digital learning push faces the classroom test",
        description:
          "Kenya's school technology plans sound strong on paper. The real test is devices, teacher support, content, connectivity, and maintenance."
      },
      subhead:
        "The hard part of edtech is not announcing devices. It is keeping them useful after the cameras leave.",
      excerpt:
        "Kenya's digital learning ambitions now depend on teacher training, maintenance, connectivity, and content that fits real classrooms.",
      whyItMatters:
        "Technology in schools can widen opportunity or widen inequality. The difference is usually implementation, not slogans.",
      body: [
        "Kenya's digital learning push is entering the phase where announcements matter less and classrooms matter more.",
        "For years, the country's education technology conversation has circled around devices, connectivity, digital content, teacher training, and the gap between urban and rural schools. The promise is easy to understand: better access to learning materials, more interactive lessons, and pupils who grow up comfortable with digital tools.",
        "The delivery is harder. A tablet without a trained teacher is a shiny notebook. A smart board without maintenance becomes furniture. Online content without reliable power or internet becomes a frustration. And digital systems that work in a pilot can stumble when stretched across thousands of schools.",
        "## What actually makes school technology work",
        "The useful checklist is practical. Are teachers trained before devices arrive? Is there a support line when equipment fails? Are lessons aligned with the curriculum? Are pupils protected from unsafe content and data collection? Is there a budget for repairs after year one?",
        "Kenya has a chance to avoid the old trap where technology is counted by units delivered rather than learning improved. The better metric is whether teachers use the tools consistently and whether pupils understand more because of them.",
        "There is also an equity question. A well-connected private school can layer AI tools and online resources onto already strong teaching. A rural public school may still be solving power, staffing, and connectivity. National policy has to close that gap, not decorate it.",
        "The next digital learning story should therefore be less about the device and more about the support system around it.",
        "Edtech works when it becomes invisible: the lesson flows, the teacher is confident, the pupil learns, and no one is fighting the machine."
      ],
      closingLine:
        "Kenya does not need digital classrooms for their own sake. It needs better classrooms that happen to use digital tools well.",
      faq: [
        {
          question: "What is Kenya's digital learning challenge?",
          answer:
            "The challenge is not only buying devices. It is training teachers, maintaining equipment, providing content, and ensuring reliable power and connectivity."
        },
        {
          question: "Can technology improve Kenyan classrooms?",
          answer:
            "Yes, if it supports teachers and pupils directly. Technology alone does not improve learning without implementation and support."
        },
        {
          question: "What should parents watch for?",
          answer:
            "Parents should ask whether tools are used regularly, whether teachers are trained, and whether digital learning improves actual understanding."
        }
      ],
      author: tim,
      publishedAt: published(14),
      updatedAt: published(14),
      readTime: "4 min read",
      image: {
        src: "/articles/kenya-digital-learning-push.jpg",
        alt: "Kenyan school pupils using tablets in a classroom. Credit: Huawei.",
        credit: "Huawei",
        width: 1040,
        height: 520,
        type: jpegImageType
      },
      tags: [ai, apps, policy],
      regions: [kenya]
    }
  ];
}
