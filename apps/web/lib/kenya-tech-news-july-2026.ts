import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type BuildKenyaTechNewsArgs = {
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
  return new Date(Date.UTC(2026, 6, 1, hour, 0, 0)).toISOString();
}

export function buildKenyaTechNewsArticles({ authors, topics, brands, kenya }: BuildKenyaTechNewsArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const ai = bySlug(topics, "ai");
  const apps = bySlug(topics, "apps");
  const business = bySlug(topics, "business");
  const connectivity = bySlug(topics, "connectivity");
  const cybersecurity = bySlug(topics, "cybersecurity");
  const fintech = bySlug(topics, "fintech");
  const smartphones = bySlug(topics, "smartphones");
  const startups = bySlug(topics, "startups");
  const airtel = bySlug(brands, "airtel");
  const google = bySlug(brands, "google");
  const microsoft = bySlug(brands, "microsoft");
  const safaricom = bySlug(brands, "safaricom");
  const vodacom = bySlug(brands, "vodacom");

  return [
    {
      id: "kenya-news-vodacom-safaricom-control",
      slug: "vodacom-safaricom-majority-control",
      format: "business",
      title: "Vodacom takes majority control of Safaricom",
      seo: {
        title: "Vodacom takes majority control of Safaricom",
        description:
          "South Africa's Vodacom has completed a $2.1 billion deal for a 55% stake in Safaricom, turning Kenya's biggest company into its subsidiary. Here is what it means."
      },
      subhead:
        "After months of court battles, South Africa's Vodacom now owns about 55% of Safaricom. The Government of Kenya keeps 20%. Here is what changed, and what has not.",
      excerpt:
        "Vodacom now controls about 55% of Safaricom after completing a $2.1 billion transaction, while Kenya's government keeps a 20% stake.",
      whyItMatters:
        "Safaricom reaches almost every adult in Kenya through M-Pesa and mobile data, so who controls it, and where its profits are now counted, is not a small corporate detail.",
      body: [
        "Vodacom Group has completed its acquisition of an additional effective 20% stake in Safaricom, lifting its holding to about 55% and giving the South African group majority control of Kenya's largest company.",
        "The deal closed on June 30, 2026, after Kenya's Court of Appeal stayed a conservatory order on June 26 that had been blocking it, and once the remaining conditions were met.",
        "The transaction is worth about 2.1 billion US dollars, or roughly 272 billion shillings. It was first announced in December 2025 and was structured in two parts: Vodacom bought a 15% stake from the Government of Kenya for 204 billion shillings, and acquired an effective further 5% from Vodafone Group for 68 billion shillings.",
        "The Government of Kenya keeps a 20% stake, and Safaricom remains listed on the Nairobi Securities Exchange. The rest of the shares remain in public hands.",
        "The change that matters most is quieter than the headline. Under international accounting rules, Safaricom moves from being an associate in Vodacom's books to a fully consolidated subsidiary. In plain terms, Kenya's most valuable company is now counted inside a South African group.",
        "To see why this is a big deal, look at what Safaricom is. Its M-Pesa platform is the backbone of everyday money in Kenya, and fintech now drives about 44% of the company's Kenyan revenue. Vodacom says Safaricom has connected more than fifty million Kenyans and is expanding into Ethiopia, where it has about fourteen million customers.",
        "The government's case for selling is that it is unlocking value from a long-term investment. National Treasury Cabinet Secretary John Mbadi framed the proceeds as money for roads, energy, water, and airports, and stressed that Kenya remains Safaricom's home.",
        "Not everyone agreed the sale should go ahead. The deal was challenged in court by activists who argued that Safaricom is a strategic national asset, that the process needed more transparency, and that the shares were undervalued. The Court of Appeal lifted the blocking order, allowing completion while the wider case continues.",
        "So what changes for you? For now, very little on the surface. M-Pesa still works the same way, and Safaricom's services carry on as before. The real questions are strategic: pricing, competition, investment, and the direction of a company that so much of Kenya runs on."
      ],
      closingLine:
        "Vodacom says it will update the market on its medium-term targets around July 27, 2026, when it publishes first quarter results. That is when Kenyans should listen closely.",
      faq: [
        {
          question: "Does the Kenyan government still own part of Safaricom?",
          answer: "Yes. The Government of Kenya keeps a 20% stake, and Safaricom remains listed on the Nairobi Securities Exchange."
        },
        {
          question: "Will M-Pesa change after Vodacom takes control?",
          answer: "There is no immediate change to M-Pesa or Safaricom services. The bigger question is Vodacom's longer-term strategy for pricing, investment, and products."
        },
        {
          question: "How much was the Safaricom deal worth?",
          answer: "Vodacom and Vodafone put the transaction value at about 2.1 billion US dollars, or roughly 272 billion shillings."
        }
      ],
      author: tim,
      publishedAt: published(10),
      updatedAt: published(10),
      readTime: "5 min read",
      image: {
        src: "/articles/vodacom-safaricom-majority-control.jpg",
        alt: "Safaricom and Vodacom branding in a modern office lobby. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [business, fintech, safaricom, vodacom],
      regions: [kenya],
      sources: [
        {
          label: "Vodacom Group: completion of additional 20% effective stake in Safaricom",
          url: "https://www.vodacom.com/news-article.php?articleID=16911"
        },
        {
          label: "Vodafone: Vodafone completes Safaricom transaction",
          url: "https://www.vodafone.com/news/newsroom/corporate-and-financial/vodafone-completes-safaricom-transaction"
        },
        {
          label: "People Daily: Vodacom completes acquisition of extra 20% stake in Safaricom",
          url: "https://peopledaily.digital/business/vodacom-completes-acquisition-of-extra-20-stake-in-safaricom"
        }
      ]
    },
    {
      id: "kenya-news-mobile-data-800-million-gb",
      slug: "kenya-mobile-data-800-million-gb-4g-5g",
      format: "news",
      title: "Kenya hits 800 million GB of data as 2G and 3G fade",
      seo: {
        title: "Kenya hits 800 million GB of data as 2G and 3G fade",
        description:
          "Kenya's regulator says mobile data use hit 800 million GB in a quarter, smartphones passed 50 million, and 5G is climbing. Here is what the numbers show."
      },
      subhead:
        "The Communications Authority's latest quarterly report shows a country moving decisively to faster networks and smartphones. The detail under the headline numbers is the interesting part.",
      excerpt:
        "Kenya used about 800 million GB of mobile data in one quarter as smartphones crossed 50 million and 5G subscriptions kept rising.",
      whyItMatters:
        "The way an entire country gets online is shifting under our feet, and it shapes everything from which phones are worth buying to which services can reach you.",
      body: [
        "Kenyans used about 800 million gigabytes of mobile broadband data in a single quarter, a 6% jump, as the country keeps shifting off older networks toward faster ones.",
        "The figures come from the Communications Authority of Kenya's sector statistics for January to March 2026, the third quarter of the 2025 to 2026 financial year. They show a digital economy that is no longer just being built, but heavily used.",
        "The move away from legacy networks is clear. 2G subscriptions fell from 10.4 million in December 2025 to 9.7 million by March 2026, and 3G dropped from 5.6 million to 5 million over the same period.",
        "Meanwhile, 4G climbed to around 45.9 million subscriptions and 5G reached 1.9 million, up from about 1.7 million. That means 5G added roughly 170,000 subscriptions in three months.",
        "The most striking detail sits with 5G. Data consumed by 5G subscribers crossed the 100 million gigabyte mark for the first time, hitting about 102 million gigabytes in the quarter. The average 5G user got through 53.5 gigabytes, more than three times the national average across mobile broadband users.",
        "Underpinning all of this is a device shift. Smartphone connections crossed the 50 million mark for the first time, reaching about 50.2 million, while feature phones stood at about 28.5 million. Cheaper smartphones are pulling more people into data-heavy apps, video, social platforms, payments, learning, and work tools.",
        "There is a catch worth understanding. 5G's growth is still gated by the cost of compatible phones. Many entry-level handsets sold in Kenya support only 4G, so 5G remains concentrated among heavier users who can afford pricier devices.",
        "For most buyers, 4G is still where the value is. 5G makes sense if you are a heavy user, live or work in good coverage, and can justify the extra phone cost."
      ],
      closingLine:
        "Kenya's internet story has moved from getting online to how much we use, and that changes what phones, plans, and services are worth your money.",
      faq: [
        {
          question: "How much mobile data did Kenya use?",
          answer: "About 800 million gigabytes in the January to March 2026 quarter, according to the Communications Authority of Kenya."
        },
        {
          question: "Are smartphones now more common than feature phones in Kenya?",
          answer: "Yes. Smartphone connections crossed 50 million, while feature phones stood at about 28.5 million."
        },
        {
          question: "Is 5G worth it in Kenya?",
          answer: "For heavy users with a compatible phone and good coverage, yes. For most people, 4G still offers better value because 5G phones cost more."
        }
      ],
      author: tim,
      publishedAt: published(9),
      updatedAt: published(9),
      readTime: "4 min read",
      image: {
        src: "/articles/kenya-mobile-data-800-million-gb-4g-5g.jpg",
        alt: "A smiling man using two smartphones. Credit: Wirestock | magnific.com.",
        credit: "Wirestock | magnific.com",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [connectivity, smartphones, safaricom],
      regions: [kenya],
      sources: [
        {
          label: "Communications Authority of Kenya: increased adoption of smartphones and mobile network infrastructure",
          url: "https://www.ca.go.ke/increased-adoption-smartphones-and-expansion-mobile-network-infrastructure-drive-surge-kenya"
        },
        {
          label: "Business Daily: Kenya's 5G data use tops 100 million GB",
          url: "https://www.businessdailyafrica.com/bd/corporate/technology/kenya-s-5g-data-use-tops-100-million-gb-as-uptake-increases-5504350"
        },
        {
          label: "Telecom Review Africa: Kenya's telecom sector accelerates",
          url: "https://www.telecomreviewafrica.com/articles/general-news/28885-kenyas-telecom-sector-accelerates-as-mobile-subscriptions-reach-84-million/"
        }
      ]
    },
    {
      id: "kenya-news-ai-policy-connecting-codes",
      slug: "kenya-ai-policy-connecting-codes-conference",
      format: "news",
      title: "Kenya warned to match AI growth with real laws",
      seo: {
        title: "Kenya warned to match AI growth with real laws",
        description:
          "At the Connecting Codes Conference 2026, lawmakers warned that Kenya's AI boom needs governance to protect privacy and data. Here is the state of play."
      },
      subhead:
        "At a Nairobi conference, a parliamentary committee chair said Kenya's AI ambitions must be matched by governance. It is the same tension playing out worldwide, with a local twist.",
      excerpt:
        "Kenyan lawmakers and digital knowledge experts say AI adoption needs stronger legal and governance frameworks before harm outruns protection.",
      whyItMatters:
        "AI is already in Kenyan farms, clinics, and classrooms, but the laws meant to protect people from its downsides are not fully there yet, and that gap is where harm happens.",
      body: [
        "Kenya's lawmakers have a warning about the country's fast-growing use of artificial intelligence: the technology is racing ahead of the rules meant to govern it.",
        "The message came out of the Connecting Codes Conference 2026, held at the Kenya National Library Service headquarters in Nairobi in June, where government leaders, researchers, academics, librarians, and international partners discussed AI, digital humanities, and knowledge systems.",
        "Daniel Epuyo Nanok, the Chairperson of the Parliamentary Broadcasting and Library Committee and Member of Parliament for Turkana West, made the case plainly. AI is already reshaping education, healthcare, agriculture, and public service delivery, but it brings real challenges around accountability, transparency, privacy, and equitable access.",
        "His core argument was that Kenya's legal and governance frameworks must evolve with the technology, and that Parliament has a duty to encourage innovation while safeguarding citizens' rights.",
        "Nanok also added a distinctly African dimension that global AI debates often skip. He warned that limited representation of local languages, histories, and cultural content risks leaving African perspectives out of the world's digital knowledge systems.",
        "The conference itself sat at the meeting point of AI, digital humanities, and information institutions. Its organisers framed it around technical systems, cultural knowledge systems, and the ethical and professional frameworks that shape how information is created, interpreted, preserved, and shared.",
        "None of this is happening in a vacuum. Kenya already has a National AI Strategy running from 2025 to 2030, and an Artificial Intelligence Bill has been moving through Parliament. The instinct on display here is the right one: decide early what Kenya wants from AI instead of inheriting someone else's defaults.",
        "The hard part is execution. Conference speeches are useful only if they become working law, proper oversight, public literacy, and institutions that can protect people without smothering the builders everyone says they want to support."
      ],
      closingLine: "Kenya's AI moment will be judged less by how loudly it celebrates the tools and more by how well it protects the people using them.",
      faq: [
        {
          question: "What was the Connecting Codes Conference 2026 about?",
          answer: "It focused on artificial intelligence, digital humanities, knowledge systems, libraries, cultural heritage, and responsible access to information."
        },
        {
          question: "What did Daniel Epuyo Nanok warn about?",
          answer: "He warned that Kenya's AI growth needs stronger legal and governance frameworks around accountability, transparency, privacy, and equitable access."
        },
        {
          question: "Does Kenya already have an AI policy direction?",
          answer: "Yes. Kenya has a National AI Strategy for 2025 to 2030, and an Artificial Intelligence Bill has been working through Parliament."
        }
      ],
      author: tim,
      publishedAt: published(8),
      updatedAt: published(8),
      readTime: "4 min read",
      image: {
        src: "/articles/kenya-ai-policy-connecting-codes-conference.jpg",
        alt: "Participants at the Connecting Codes Conference 2026. Credit: KNLS | facebook.com.",
        credit: "KNLS | facebook.com",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [ai],
      regions: [kenya],
      sources: [
        {
          label: "The Star: Kenya urged to match AI growth with stronger laws and governance frameworks",
          url: "https://www.the-star.co.ke/sasa/technology/2026-06-29-kenya-urged-to-match-ai-growth-with-stronger-laws-frameworks"
        },
        {
          label: "KBC: Kenya calls for ethical use of AI at Connecting Codes Conference 2026",
          url: "https://www.kbc.co.ke/kenya-calls-for-ethical-use-of-ai-use-at-connecting-codes-conference-2026/"
        },
        {
          label: "University of Kansas Libraries: Connecting Codes Conference",
          url: "https://lib.ku.edu/igel/connecting-codes"
        }
      ]
    },
    {
      id: "kenya-news-microsoft-elevate-ai-counties",
      slug: "microsoft-elevate-ai-skilling-kenya-counties",
      format: "news",
      title: "Microsoft's AI skilling expands across Kenyan counties",
      seo: {
        title: "Microsoft's AI skilling expands across Kenyan counties",
        description:
          "Microsoft, Stanbic Kenya Foundation and Konza Technopolis are expanding AI skills training beyond Nairobi to counties like Kwale, Kilifi and Embu."
      },
      subhead:
        "The Microsoft Elevate AI skilling initiative, run with Stanbic Kenya Foundation, Pathways Technologies, and Konza Technopolis, is pushing foundational AI skills out to the counties.",
      excerpt:
        "Microsoft and partners are expanding practical AI training beyond Nairobi, with 152 participants trained across Kwale, Kilifi, Mombasa, Taita Taveta, and Embu.",
      whyItMatters:
        "Most AI opportunity in Kenya still clusters in Nairobi, so training that reaches counties like Kwale, Kilifi, and Embu is how the benefits start to spread beyond the capital.",
      body: [
        "While the big AI headlines tend to be about billion-dollar data centres, a quieter and arguably more important effort is happening at ground level: teaching people across Kenya how to actually use the technology.",
        "Microsoft, working with Stanbic Kenya Foundation, Pathways Technologies, and Konza Technopolis, is expanding its Elevate AI National Skilling Initiative beyond Nairobi and into the counties.",
        "So far, the programme has trained 152 participants across Kwale, Kilifi, Mombasa, Taita Taveta, and Embu, with a deliberate focus on equipping trainers and institutions rather than only individuals. The point is to make the skills travel further.",
        "The training is practical, not just theoretical. Reporting on the rollout says the content is being adapted to sectors that matter locally, including agriculture, entrepreneurship, and small business operations.",
        "The partnership plays to each side's strengths. Microsoft brings technology and AI expertise, while Stanbic Kenya Foundation brings reach through youth, small business, and community networks. TechMoran reports that Stanbic's Future ni Digital platform has reached more than 250,000 learners since 2019.",
        "Microsoft AI Skills Director Winnie Karanu framed the value as county-level and community-based delivery, expanding access beyond major cities. That matters because concentrating AI skills in Nairobi would simply widen the gap between the capital and everywhere else.",
        "The model is sensible: train trainers, adapt content to local work, and use county networks to keep access close to people. The honest caveat is that headcount is the easy metric. The real measure will be whether training in Kwale or Embu turns into jobs, better businesses, and income."
      ],
      closingLine:
        "AI skilling only matters if it changes what people can do. The counties are where that promise gets tested.",
      faq: [
        {
          question: "Who is running the AI training?",
          answer: "Microsoft is working with Stanbic Kenya Foundation, Pathways Technologies, and Konza Technopolis through the Microsoft Elevate AI National Skilling Initiative."
        },
        {
          question: "Where is the AI training happening?",
          answer: "Reported rollout locations include Kwale, Kilifi, Mombasa, Taita Taveta, and Embu."
        },
        {
          question: "What does the Microsoft Elevate AI training teach?",
          answer: "It focuses on foundational and practical AI skills, with content adapted to areas such as agriculture, entrepreneurship, and small business."
        }
      ],
      author: tim,
      publishedAt: published(7),
      updatedAt: published(7),
      readTime: "4 min read",
      image: {
        src: "/articles/microsoft-elevate-ai-skilling-kenya-counties.jpg",
        alt: "Microsoft Africa Development Centre office signage in Kenya. Credit: Nixon Kanali/TechTrends Media.",
        credit: "Nixon Kanali/TechTrends Media",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [ai, microsoft],
      regions: [kenya],
      sources: [
        {
          label: "TechMoran: Stanbic Foundation and Microsoft expand AI skills partnership",
          url: "https://techmoran.com/2026/06/26/stanbic-foundation-microsoft-expand-ai-skills-partnership-through-national-training-initiative/"
        },
        {
          label: "Africa Business Communities: Stanbic Foundation, Microsoft train 152 trainers in AI skills",
          url: "https://africabusinesscommunities.com/tech-24/stanbic-foundation-microsoft-train-152-trainers-in-ai-skills-across-five-kenyan-counties/"
        },
        {
          label: "Pathways Technologies: AI National Skilling Programme",
          url: "https://pathwaystechnologies.com/ai-national-skilling-program/"
        }
      ]
    },
    {
      id: "kenya-news-nifc-certifies-15-tech-ai-firms",
      slug: "nifc-certifies-15-tech-ai-firms",
      format: "business",
      title: "Nairobi hub certifies 15 tech and AI firms, eyes Sh26bn",
      seo: {
        title: "Nairobi hub certifies 15 tech and AI firms, eyes Sh26bn",
        description:
          "The Nairobi International Financial Centre has certified 15 new firms in AI, fintech and digital assets, targeting Sh25.9 billion and 1,000 jobs."
      },
      subhead:
        "The Nairobi International Financial Centre added 15 firms in one go, weighted toward AI, fintech, and digital assets, as Kenya pitches itself as the continent's financial gateway.",
      excerpt:
        "Kenya's Nairobi International Financial Centre has certified 15 firms in AI, fintech, digital assets, and capital markets, with projected investment of about Sh25.9 billion.",
      whyItMatters:
        "Kenya is trying to become the place advanced digital finance and AI companies choose to set up in Africa. Who those firms are, and whether they deliver, shapes the jobs and investment that follow.",
      body: [
        "Kenya's Nairobi International Financial Centre has certified 15 new firms in a single move, in a push to position Nairobi as a regulated home for advanced digital finance and artificial intelligence in Africa.",
        "The certified companies are expected to mobilise more than 200 million US dollars, about Sh25.9 billion, and create over 1,000 direct and indirect jobs if the promised activity turns into offices, hires, and operating businesses.",
        "The new cohort leans heavily toward the technologies shaping modern finance. It spans artificial intelligence, fintech, digital payments, digital assets and tokenised securities, carbon and climate finance, insurance, investment management, and capital markets infrastructure.",
        "Among the names in the cohort are the digital asset platform Valor Capital, ReportsAI, Afrex Technologies, and Onfon Mobile, alongside firms such as Bupa Global Insurance, Etica Capital, Giraffe Bioenergy, and Africa First Exchange.",
        "Certification is not just a badge. Firms admitted to the NIFC set up physical offices in Kenya and gain access to state incentives, including tax holidays, in exchange for basing operations in the country.",
        "NIFC Chief Executive Daniel Mainda framed each certification as a vote of confidence in Kenya's regulatory environment and its ambition to build the ecosystem that will define the next generation of finance in Africa.",
        "The context is a country moving deliberately. Established under a 2017 law but slow to start, the NIFC now has dozens of firms on its books after new incentives introduced last year drew fresh interest, and it has signed cooperation agreements with financial centres in Qatar, Kazakhstan, and Morocco.",
        "The clear intent is to make Nairobi a regulated safe harbour for the parts of finance, digital assets and AI-powered services that many markets are still nervous about.",
        "The honest caveat is the one that applies to every investment-target headline: certified commitments are projections, not banked capital. The real measure will be how quickly these firms turn certification into offices, hires, and activity that reaches the wider economy."
      ],
      closingLine:
        "For now, the direction is confident, and the concentration of AI and digital-asset firms is a useful signal of where Kenya wants to compete.",
      faq: [
        {
          question: "What did the NIFC announce?",
          answer:
            "It certified 15 new firms expected to mobilise more than 200 million US dollars, about Sh25.9 billion, and create over 1,000 jobs, weighted toward AI, fintech, and digital assets."
        },
        {
          question: "What do certified NIFC firms get?",
          answer:
            "Certified firms can access state incentives, including tax holidays, in return for setting up physical operations in Kenya."
        }
      ],
      author: tim,
      publishedAt: new Date(Date.UTC(2026, 6, 2, 12, 0, 0)).toISOString(),
      updatedAt: new Date(Date.UTC(2026, 6, 2, 12, 0, 0)).toISOString(),
      readTime: "4 min read",
      image: {
        src: "/articles/nifc-certifies-15-tech-ai-firms.jpg",
        alt: "A Nairobi International Financial Centre official speaking at a podium. Credit: Francis Nderitu | NMG.",
        credit: "Francis Nderitu | NMG",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [fintech, ai, startups],
      regions: [kenya],
      sources: [
        {
          label: "Nairobi International Financial Centre",
          url: "https://nifc.ke/"
        },
        {
          label: "Business Daily",
          url: "https://www.businessdailyafrica.com/"
        },
        {
          label: "Capital FM",
          url: "https://www.capitalfm.co.ke/business/"
        },
        {
          label: "Citizen Digital",
          url: "https://www.citizen.digital/"
        }
      ]
    },
    {
      id: "kenya-news-safaricom-sale-infrastructure-fund",
      slug: "safaricom-sale-244-billion-infrastructure-fund",
      format: "business",
      title: "Government banks Sh244.5bn from the Safaricom sale",
      seo: {
        title: "Government banks Sh244.5bn from the Safaricom sale",
        description:
          "Kenya has received Sh244.5 billion from the Vodacom Safaricom deal, seeding a new National Infrastructure Fund. Here is the breakdown, and the controversy."
      },
      subhead:
        "The completed Vodacom takeover has delivered Sh244.5 billion to the Treasury, earmarked for roads, energy, water, and airports. Not everyone agrees it was a good deal.",
      excerpt:
        "Kenya has received about Sh244.5 billion from the Vodacom Safaricom transaction, with the money headed into the National Infrastructure Fund.",
      whyItMatters:
        "This is one of the largest cash injections the Kenyan state has ever received in one go. Where it goes, and whether the country got fair value, affects every taxpayer.",
      body: [
        "The Kenyan government has received about Sh244.5 billion from the sale of part of its Safaricom stake to South Africa's Vodacom, one of the largest single cash injections the state has ever banked.",
        "The money is being channelled into the newly created National Infrastructure Fund, the same vehicle that received about Sh103 billion from the Kenya Pipeline Company listing.",
        "The figure breaks down in two parts. The government sold roughly 6 billion Safaricom shares, a 15% stake, at Sh34 each, raising about Sh204.3 billion.",
        "On top of that, Vodacom paid an advance dividend of about Sh40.2 billion, a prepayment tied to the government's remaining shares, bringing the total to Sh244.5 billion.",
        "The share sale was executed as a block trade on the Nairobi Securities Exchange on June 30, the largest single transaction in the bourse's history, pushing that day's turnover to around Sh208 billion.",
        "With the deal done, Vodacom's effective stake in Safaricom rises to 55%, giving it majority control, while the government keeps 20%. Safaricom remains listed on the NSE.",
        "The Treasury says the proceeds will fund roads, energy, water, and airports, part of President William Ruto's ambition to raise money for infrastructure without piling on more debt. Cabinet Secretary John Mbadi has stressed that Kenya remains Safaricom's home.",
        "It was not a smooth sale. The transaction was contested in court over both its price and the wisdom of handing majority control of a strategic national asset to a foreign company.",
        "Petitioners argued the state undervalued Safaricom, and an expert affidavit filed in a constitutional petition alleged the country left a very large sum on the table. That remains an attributed court allegation, not a settled finding.",
        "The government rejects the criticism, pointing to a share price it says carried a premium over the recent market average, and to conditions it secured, including keeping Safaricom's data in Kenya, retaining board seats, and requiring a Kenyan chief executive.",
        "For ownership context, this follows Vodacom's completed move to majority control of Safaricom. The headline is simple, and the questions underneath it are not: the state has a rare windfall, but fair value and disciplined spending are what deserve scrutiny next."
      ],
      closingLine:
        "The next test is not whether the money arrived. It is whether the infrastructure fund spends it in a way Kenyans can actually see and measure.",
      faq: [
        {
          question: "How much did the government get from the Safaricom sale?",
          answer:
            "About Sh244.5 billion, made up of roughly Sh204.3 billion for the 15% stake plus about Sh40.2 billion in advance dividend."
        },
        {
          question: "Where is the Safaricom sale money going?",
          answer: "Into the National Infrastructure Fund, earmarked for roads, energy, water, and airports."
        },
        {
          question: "Does the government still own part of Safaricom?",
          answer: "Yes. The Government of Kenya retains a 20% stake, and Safaricom remains listed on the Nairobi Securities Exchange."
        }
      ],
      author: tim,
      publishedAt: new Date(Date.UTC(2026, 6, 2, 11, 0, 0)).toISOString(),
      updatedAt: new Date(Date.UTC(2026, 6, 2, 11, 0, 0)).toISOString(),
      readTime: "5 min read",
      image: {
        src: "/articles/safaricom-sale-244-billion-infrastructure-fund.jpg",
        alt: "Safaricom and Vodacom branding beside the Kenyan coat of arms. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [business, fintech, safaricom, vodacom],
      regions: [kenya],
      sources: [
        {
          label: "Business Daily",
          url: "https://www.businessdailyafrica.com/"
        },
        {
          label: "The Standard",
          url: "https://www.standardmedia.co.ke/business"
        },
        {
          label: "Vodacom Group",
          url: "https://www.vodacom.com/"
        }
      ]
    },
    {
      id: "kenya-news-google-play-indie-games-fund-africa",
      slug: "google-play-indie-games-fund-kenya",
      format: "business",
      title: "Google Play launches a Sh129m indie games fund for Africa",
      seo: {
        title: "Google Play launches a Sh129m indie games fund for Africa",
        description:
          "Google Play's first Indie Games Fund offers African studios, Kenya included, equity-free grants of up to Sh25.8 million. Here is how it works and how to apply."
      },
      subhead:
        "Google Play's first Indie Games Fund for Africa puts 1 million dollars behind independent studios across 32 countries, Kenya among them, with grants that do not take a stake.",
      excerpt:
        "Google Play's first Indie Games Fund for Africa offers equity-free grants of 50,000 to 200,000 dollars to independent studios, with Kenya among eligible countries.",
      whyItMatters:
        "African game studios have the talent but rarely the capital. Equity-free money and mentorship, without giving up ownership, is exactly the gap this tries to fill.",
      body: [
        "Google Play has launched its first Indie Games Fund for Africa, committing 1 million US dollars, about Sh129 million, to help independent game studios across the continent grow their games and reach a global audience.",
        "Kenyan developers are among those eligible, and applications are open now.",
        "The appeal is in the structure. The money is equity-free, meaning selected studios keep full ownership of their businesses, and it comes with technical support and mentorship rather than just a cheque.",
        "Individual studios can receive between 50,000 and 200,000 dollars, roughly Sh6.5 million to Sh25.8 million, to refine their games, strengthen their technical setup, and improve how discoverable they are on the platform.",
        "The fund is pan-African, open to independent studios in 32 countries including Kenya, Nigeria, South Africa, Ghana, Tanzania, and Uganda.",
        "To qualify, a studio must be registered in an eligible country, have 50 or fewer employees, and have already published at least one mobile, PC, or console game.",
        "Successful applicants commit to putting their games on Google Play and joining the Google Play Pass programme for two years. Applications close on July 31, 2026, with the 10 chosen studios expected to be announced in September.",
        "Google frames the initiative as tackling the biggest thing holding African studios back, which is not talent but access to capital. That is a fair diagnosis.",
        "The continent has a lively, creative game-development scene and a strong storytelling culture, and the recurring obstacle has been money to turn a promising game into a sustainable business.",
        "Whether 1 million dollars spread across ten studios moves the needle for the wider ecosystem is a fair question. For the developers who win backing, and for African stories reaching a global audience, it is still a real and welcome door."
      ],
      closingLine:
        "If you already have a published game and a small studio, this is worth checking now, not the week applications close.",
      faq: [
        {
          question: "What is the Google Play Indie Games Fund?",
          answer:
            "It is Google Play's first Africa-focused fund for independent game studios, offering equity-free grants of 50,000 to 200,000 dollars plus mentorship."
        },
        {
          question: "Can Kenyan game developers apply?",
          answer:
            "Yes. Kenya is one of the eligible African countries. Studios need 50 or fewer employees and at least one published game."
        },
        {
          question: "When is the application deadline?",
          answer: "Applications close on July 31, 2026, with 10 selected studios expected to be announced in September."
        }
      ],
      author: tim,
      publishedAt: new Date(Date.UTC(2026, 6, 2, 10, 0, 0)).toISOString(),
      updatedAt: new Date(Date.UTC(2026, 6, 2, 10, 0, 0)).toISOString(),
      readTime: "4 min read",
      image: {
        src: "/articles/google-play-indie-games-fund-kenya.jpg",
        alt: "A Google logo installation photographed from above. Credit: Avicena Fily A Kako.",
        credit: "Avicena Fily A Kako",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [apps, startups, google],
      regions: [kenya],
      sources: [
        {
          label: "Google Play",
          url: "https://play.google.com/"
        },
        {
          label: "Capital FM",
          url: "https://www.capitalfm.co.ke/business/"
        },
        {
          label: "Kenyans.co.ke",
          url: "https://www.kenyans.co.ke/"
        }
      ]
    },
    {
      id: "kenya-news-national-cybersecurity-agency-ai-threats",
      slug: "kenya-national-cybersecurity-agency-ai-threats",
      format: "news",
      title: "Kenya backs a Cybersecurity Agency as AI fraud rises",
      seo: {
        title: "Kenya backs a Cybersecurity Agency as AI fraud rises",
        description:
          "As AI deepfakes and digital fraud grow, Kenya is standing up a National Cybersecurity Agency to protect eCitizen and critical systems. What it means."
      },
      subhead:
        "With Parliament clearing a new National Cybersecurity Agency, the government is sharpening its defences against AI-generated deepfakes and fraud aimed at the digital economy.",
      excerpt:
        "Kenya is backing a National Cybersecurity Agency as AI-generated deepfakes, online fraud, and attacks on public digital services grow more sophisticated.",
      whyItMatters:
        "More of Kenyan life now runs through digital government platforms like eCitizen, so the systems protecting your data and money are national infrastructure, and they are under growing, smarter attack.",
      body: [
        "Kenya is moving to strengthen its digital defences as AI-powered threats grow, with the government backing the creation of a new National Cybersecurity Agency.",
        "The plans were set out by Internal Security and National Administration Principal Secretary Raymond Omollo at the sixth annual Information Security Management Systems conference in Naivasha, held on July 1 and organised by the National Computer and Cybercrimes Coordination Committee and the Kenya Bureau of Standards.",
        "Omollo welcomed Parliament's approval of the agency, saying it will improve national coordination, strengthen resilience, and sharpen Kenya's preparedness against evolving cyber threats.",
        "His warning was pointed: as technology advances, the country is seeing AI-generated deepfakes, sophisticated misinformation campaigns, online fraud, and identity manipulation that threaten public trust and national security.",
        "The stakes are clearest in how much of Kenyan life now runs online. Omollo pointed to the eCitizen platform, which now hosts more than 24,000 government services, serves over 15 million users, and processes about 500,000 transactions a day.",
        "National security is no longer just about physical infrastructure. It now means protecting cloud systems, payment platforms, telecoms networks, and critical information that citizens depend on daily.",
        "Existing measures already include the Computer Misuse and Cybercrimes Act and the 2024 critical infrastructure regulations, but the new agency is meant to give Kenya a more coordinated national response.",
        "Omollo also pressed for Kenya to build and export its own cybersecurity solutions rather than only importing them.",
        "The direction is sensible, because a coordinating agency is exactly what a fast-digitising country needs as its attack surface widens.",
        "The real work is in the doing: staffing the agency, funding it, and turning conference commitments into protection that ordinary Kenyans feel when they log in to a government service or face a convincing AI-made scam."
      ],
      closingLine:
        "The agency will be judged by whether it makes digital public services safer, not by how serious the launch language sounds.",
      faq: [
        {
          question: "What is Kenya's National Cybersecurity Agency?",
          answer:
            "It is a newly approved body meant to coordinate the country's cyber defences, strengthen resilience, and improve preparedness against cyber threats."
        },
        {
          question: "Why is Kenya creating it now?",
          answer:
            "Because AI-generated deepfakes, online fraud, misinformation, and attacks on digital platforms like eCitizen are rising as more of government and daily life moves online."
        }
      ],
      author: tim,
      publishedAt: new Date(Date.UTC(2026, 6, 2, 9, 0, 0)).toISOString(),
      updatedAt: new Date(Date.UTC(2026, 6, 2, 9, 0, 0)).toISOString(),
      readTime: "4 min read",
      image: {
        src: "/articles/kenya-national-cybersecurity-agency-ai-threats.jpg",
        alt: "Dr. Raymond Omollo speaking at an information security conference. Credit: Dr. Raymond Omollo - CBS / x.com.",
        credit: "Dr. Raymond Omollo - CBS / x.com",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [cybersecurity, ai],
      regions: [kenya],
      sources: [
        {
          label: "Citizen Digital",
          url: "https://www.citizen.digital/"
        },
        {
          label: "The Star",
          url: "https://www.the-star.co.ke/"
        },
        {
          label: "People Daily",
          url: "https://peopledaily.digital/"
        }
      ]
    },
    {
      id: "kenya-news-nse-airtel-leadership-changes",
      slug: "nse-airtel-kenya-leadership-changes",
      format: "business",
      title: "New leaders at the NSE and Airtel Kenya",
      seo: {
        title: "New leaders at the NSE and Airtel Kenya",
        description:
          "A big week of corporate change: Tom Mulwa takes over as NSE chairman and Djibril Tobe becomes Airtel Kenya's MD. Here is what each transition means."
      },
      subhead:
        "Tom Mulwa becomes chairman of the Nairobi Securities Exchange, and Djibril Tobe takes over as Airtel Kenya's managing director, two changes at the top of Kenya's tech-business world.",
      excerpt:
        "The Nairobi Securities Exchange and Airtel Kenya have new leaders, with Tom Mulwa named NSE chairman and Djibril Tobe taking over as Airtel Kenya managing director.",
      whyItMatters:
        "The bourse where Kenya's biggest companies raise money, and the telco fighting hardest to challenge Safaricom, both just changed hands. New leaders set new directions.",
      body: [
        "A busy week of corporate reshuffles has put new leaders atop two institutions central to Kenya's technology and business landscape: the Nairobi Securities Exchange and Airtel Kenya.",
        "At the NSE, Tom Mulwa has been appointed chairman of the board, effective July 13, 2026, succeeding Kiprono Kittony. The board approved the move on June 30.",
        "Mulwa brings more than three decades in financial services as the long-serving chief executive of Liaison Group, which he built into a pan-African non-banking financial services firm.",
        "He also chairs Kenya National REITs, sits on the National Investment Council, and joined the NSE board in September 2025.",
        "He takes over from Kittony, who chaired the exchange for six years, a period in which the NSE ended an 11-year drought in new share listings and pushed products meant to draw in more retail investors.",
        "Mulwa inherits an exchange focused on attracting more listings, deepening the market, and widening participation.",
        "At Airtel Kenya, Senegalese executive Djibril Tobe has become managing director, effective June 30, succeeding Ashish Malhotra.",
        "Tobe arrives with more than 20 years across telecoms, consumer goods, and consulting, most recently as managing director of Airtel Congo Brazzaville, with earlier leadership roles at Airtel Chad and Airtel Burkina Faso.",
        "He takes over a company that grew sharply under Malhotra, who rolled out more than 2,000 network sites, lifted Airtel Money's market share from 2% to 11%, doubled revenue, and grew subscribers from 16 million to more than 24 million.",
        "Malhotra leaves to become chief executive of Indus Towers Africa.",
        "The timing matters. The NSE is trying to turn recent momentum into a deeper, busier market that more companies, including tech firms, choose to list on. Airtel, Kenya's second-largest operator, is pressing its network expansion to keep chipping away at Safaricom's dominance."
      ],
      closingLine:
        "Both new leaders step in at a moment when execution, not just ambition, will decide how far each institution goes next.",
      author: tim,
      publishedAt: new Date(Date.UTC(2026, 6, 2, 8, 0, 0)).toISOString(),
      updatedAt: new Date(Date.UTC(2026, 6, 2, 8, 0, 0)).toISOString(),
      readTime: "4 min read",
      image: {
        src: "/articles/nse-airtel-kenya-leadership-changes.jpg",
        alt: "Airtel Kenya executive portrait in front of Airtel branding. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [business, connectivity, airtel],
      regions: [kenya],
      sources: [
        {
          label: "Nairobi Securities Exchange",
          url: "https://www.nse.co.ke/"
        },
        {
          label: "Business Daily",
          url: "https://www.businessdailyafrica.com/"
        },
        {
          label: "Capital FM",
          url: "https://www.capitalfm.co.ke/business/"
        },
        {
          label: "Airtel Kenya",
          url: "https://www.airtelkenya.com/"
        }
      ]
    }
  ];
}
