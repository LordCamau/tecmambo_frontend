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
  const business = bySlug(topics, "business");
  const connectivity = bySlug(topics, "connectivity");
  const fintech = bySlug(topics, "fintech");
  const smartphones = bySlug(topics, "smartphones");
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
        alt: "Safaricom headquarters beside the Vodacom logo. Credit: Safaricom.co.ke.",
        credit: "Safaricom.co.ke",
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
    }
  ];
}
