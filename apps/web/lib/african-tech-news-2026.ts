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

function publishedJuly(day: number, hour = 6) {
  return new Date(Date.UTC(2026, 6, day, hour, 0, 0)).toISOString();
}

export function buildAfricanTechNewsArticles({ authors, topics, brands, regions }: BuildAfricanTechNewsArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const ai = bySlug(topics, "ai");
  const apps = bySlug(topics, "apps");
  const business = bySlug(topics, "business");
  const connectivity = bySlug(topics, "connectivity");
  const fintech = bySlug(topics, "fintech");
  const mobility = bySlug(topics, "evs-mobility");
  const smartphones = bySlug(topics, "smartphones");
  const startups = bySlug(topics, "startups");
  const openai = bySlug(brands, "openai");
  const samsung = bySlug(brands, "samsung");
  const tecno = bySlug(brands, "tecno");
  const microsoft = bySlug(brands, "microsoft");
  const volkswagen = bySlug(brands, "volkswagen");
  const mtn = bySlug(brands, "mtn");
  const airtel = bySlug(brands, "airtel");
  const optasia = bySlug(brands, "optasia");
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
      id: "africa-news-south-africa-digital-economy-pillars",
      slug: "south-africa-digital-economy-pillars-strategy",
      format: "business",
      title: "South Africa sets six pillars for its digital economy",
      seo: {
        title: "South Africa sets six pillars for its digital economy",
        description:
          "South Africa's DCDT has laid out a six-pillar digital economy strategy, from subsea cables to AI and data centres. Here is what it aims to do."
      },
      subhead:
        "Ahead of the Africa Tech Festival, the country's digital priorities are being framed around the infrastructure and policy layers needed for a stronger tech economy.",
      excerpt:
        "South Africa is framing its digital-economy push around six priorities: subsea cables and telecoms, AI, data centres, cybersecurity, startups, and cross-border digital transformation.",
      whyItMatters:
        "A national plan only matters if it is funded and delivered, but naming the priorities tells you where South Africa intends to compete, and where the money and jobs may follow.",
      body: [
        "South Africa is framing its next digital-economy push around six priorities: subsea cables and telecoms, artificial intelligence, data centres, cybersecurity, startup growth, and cross-border digital transformation.",
        "The framing matters because these are not separate buzzwords. Cheaper connectivity is the foundation. Local data-centre capacity keeps cloud and AI workloads closer to home. Cybersecurity protects that infrastructure. Startups turn the pipes into products, while cross-border digital transformation decides whether South African companies can trade digitally across the continent instead of building for one market at a time.",
        "The Department of Communications and Digital Technologies, led by Minister Solly Malatsi, has been positioned as a key public-sector partner around this agenda ahead of the Africa Tech Festival. Read generously, it is a statement that South Africa wants to compete across the whole digital stack, not only in consumer apps.",
        "The hard part is delivery. South Africa has had plenty of well-written strategies before, and the gap between a plan and working infrastructure can be wide. Electricity constraints, spectrum policy, public procurement, skills, and funding will decide whether these pillars become real projects or remain stage language.",
        "For now, this is a useful map of intent. The next thing to watch is not another speech, but what gets funded, permitted, built, secured, and connected over the next year."
      ],
      author: tim,
      publishedAt: publishedJuly(1, 12),
      updatedAt: publishedJuly(1, 12),
      readTime: "4 min read",
      image: {
        src: "/articles/south-africa-digital-economy-pillars.jpg",
        alt: "President Cyril Ramaphosa speaking at the Google Cloud Summit in Johannesburg. Credit: GovernmentZA / x.com.",
        credit: "GovernmentZA / x.com",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [business, connectivity, ai],
      regions: [regions.southAfrica],
      sources: [
        {
          label: "Africa Tech Festival: six pillars, one connected ecosystem",
          url: "https://tmt.knect365.com/africa-tech-festival/"
        },
        {
          label: "South Africa DCDT: Minister Solly Malatsi",
          url: "https://www.dcdt.gov.za/minister.html"
        }
      ]
    },
    {
      id: "africa-news-south-africa-debut-4-ai-creative-fund",
      slug: "south-africa-debut-4-ai-creative-fund",
      format: "business",
      title: "South Africa's Debut 4 fund backs AI in the creative economy",
      seo: {
        title: "South Africa's Debut 4 fund backs AI in the creative economy",
        description:
          "The fourth Debut Fund from DSAC and BASA targets 50 young creative-tech entrepreneurs, focusing on AI and digital tools in rural and peri-urban areas."
      },
      subhead:
        "The Department of Sport, Arts and Culture and Business and Arts South Africa have launched a fourth Debut Fund, this time built around AI and digital tools for creative businesses.",
      excerpt:
        "South Africa's Debut 4 programme is aimed at 50 young creative-tech entrepreneurs using AI and digital tools, with a focus on rural and peri-urban communities.",
      whyItMatters:
        "Most creative and tech funding pools in the big cities, so a fund aimed at rural and peri-urban young people is a deliberate attempt to spread the opportunity.",
      body: [
        "South Africa has launched the fourth Debut Fund Programme, this time centred on bringing artificial intelligence and digital technologies into creative businesses.",
        "The programme is backed by the Department of Sport, Arts and Culture and Business and Arts South Africa. Its target is specific: 50 emerging creative-technology entrepreneurs aged 18 to 35, with a focus on rural and peri-urban communities.",
        "In plain English, this is money and support for young creatives who want to use AI, digital production, online distribution, or related tools to turn creative work into sustainable businesses. That matters because creative-tech opportunity often concentrates in Johannesburg, Cape Town, and Durban while smaller towns and peri-urban communities get left behind.",
        "The timing is also important. AI is already changing music, design, film, marketing, illustration, and publishing. Giving young creators the tools and capital to use it on their own terms is a more constructive response than leaving them to be displaced by it.",
        "As with any grant programme, the real measure will come after the launch: how many of the 50 build something durable, how transparent the selection is, and whether the rural and peri-urban focus reaches people beyond the usual applicant networks."
      ],
      author: tim,
      publishedAt: publishedJuly(1, 11),
      updatedAt: publishedJuly(1, 11),
      readTime: "4 min read",
      image: {
        src: "/articles/south-africa-debut-4-ai-creative-fund.jpg",
        alt: "Debut Fund Programme artwork for South African creative entrepreneurs. Credit: BASA.",
        credit: "BASA",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [business, startups, ai],
      regions: [regions.southAfrica],
      sources: [
        {
          label: "Business and Arts South Africa: Debut Programme",
          url: "https://basa.co.za/programmes/debut-programme/"
        },
        {
          label: "South Africa DSAC: Department of Sport, Arts and Culture",
          url: "https://www.dsac.gov.za/"
        }
      ]
    },
    {
      id: "africa-news-volkswagen-south-africa-new-energy-vehicles",
      slug: "volkswagen-south-africa-new-energy-vehicle-crossroads",
      format: "business",
      title: "Volkswagen SA at a new-energy-vehicle crossroads",
      seo: {
        title: "Volkswagen SA at a new-energy-vehicle crossroads",
        description:
          "Volkswagen South Africa is under pressure to shift toward hybrids and EVs, but warns it needs government policy clarity first. Here is the real picture."
      },
      subhead:
        "Reports of a sweeping EV pivot overstate it. The accurate story is a carmaker at a crossroads, pushing government for the policy certainty it says it needs to invest.",
      excerpt:
        "Volkswagen Group Africa is taking cautious hybrid steps in South Africa while pressing government for clearer new-energy-vehicle policy.",
      whyItMatters:
        "VW's Kariega plant supports thousands of jobs, so whether South Africa can hold onto car manufacturing as the world shifts to electric is a real economic question, not just an industry one.",
      body: [
        "Volkswagen's South African arm is under pressure to modernise toward new-energy vehicles, but the honest story is more cautious than a sweeping electric-car pivot.",
        "Volkswagen Group Africa has spent 2026 warning that it needs clearer government policy before it can commit the large investments required for a full transition. Managing director Martina Biene has described 2026 as a make-or-break year and pushed for urgency on new-energy-vehicle policy.",
        "The stakes are large. Volkswagen's Kariega plant in the Eastern Cape employs thousands of people directly and exports much of what it builds, especially to Europe, where emissions rules are moving carmakers toward hybrids and electric vehicles.",
        "The concrete steps so far are incremental. Volkswagen has talked about mild-hybrid technology for locally built models, imported plug-in hybrids, and a new SUV planned for the local plant. It has also signalled that fully electric local production is unlikely before the mid-2030s.",
        "That makes this a negotiation and a warning, not a done deal. South Africa wants to keep automotive jobs and industrial capacity. Volkswagen wants policy certainty, incentives, and a business case strong enough to compete with manufacturing rivals such as Morocco. The technology shift is real, but the local investment path is still being argued over."
      ],
      author: tim,
      publishedAt: publishedJuly(1, 10),
      updatedAt: publishedJuly(1, 10),
      readTime: "5 min read",
      image: {
        src: "/articles/volkswagen-south-africa-kariega.jpg",
        alt: "Volkswagen South Africa team members at the Kariega plant. Credit: Volkswagen SA.",
        credit: "Volkswagen SA",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [mobility, business, volkswagen],
      regions: [regions.southAfrica],
      faq: [
        {
          question: "Is Volkswagen moving its South African plant to electric cars?",
          answer:
            "Not yet. Volkswagen is taking incremental hybrid steps and says it needs clearer government policy before committing to large new-energy-vehicle investment."
        },
        {
          question: "Why does this matter for South Africa?",
          answer:
            "Car manufacturing is a major employer and exporter. If future vehicle investment moves elsewhere, South Africa could lose jobs, skills, and industrial capacity."
        }
      ],
      sources: [
        {
          label: "Engineering News: Volkswagen Group Africa presses for new-energy-vehicle clarity",
          url: "https://www.engineeringnews.co.za/"
        },
        {
          label: "Volkswagen Group Africa: company profile and Kariega operations",
          url: "https://www.vw.co.za/en/volkswagen-experience/volkswagen-group-africa.html"
        }
      ]
    },
    {
      id: "africa-news-sars-ai-auto-assessments-2026",
      slug: "sars-ai-auto-assessments-2026",
      format: "news",
      title: "SARS leans on AI for the 2026 tax season",
      seo: {
        title: "SARS leans on AI for the 2026 tax season",
        description:
          "South Africa's revenue service is expanding AI and automated data-matching to run frictionless auto-assessments this filing season. What taxpayers should know."
      },
      subhead:
        "Ahead of the 2026 filing season, SARS says it is relying more on automated data-matching and AI-driven third-party data to run auto-assessments.",
      excerpt:
        "SARS is using more automation and third-party data to pre-fill tax returns and run auto-assessments for the 2026 filing season.",
      whyItMatters:
        "When the taxman uses AI to pre-fill and cross-check your return, filing gets easier for many people, but it also means the system already knows a lot before you type a word.",
      body: [
        "The South African Revenue Service is leaning harder on automation and data matching for the 2026 tax season, especially through auto-assessments.",
        "The idea is simple. Instead of every taxpayer manually completing a return from scratch, SARS pulls data from third parties such as employers, banks, retirement funds, and medical schemes, matches it against your profile, and produces a pre-filled assessment.",
        "For many salaried taxpayers with straightforward affairs, that can turn filing into a check-and-accept process. Automation helps SARS compare records at scale and flag mismatches that would be difficult to catch manually.",
        "The convenience is real. The caution is just as real. Auto-assessment changes the starting point: SARS already has a detailed picture of your finances before you engage. That makes it important to check the proposed assessment carefully before accepting it.",
        "If you have income, deductions, side work, medical expenses, retirement contributions, or other details that third-party data does not capture correctly, the pre-filled return can be wrong in ways that are easy to miss. An easier tax season should not become an unchecked one."
      ],
      author: tim,
      publishedAt: publishedJuly(1, 9),
      updatedAt: publishedJuly(1, 9),
      readTime: "4 min read",
      image: {
        src: "/articles/sars-ai-auto-assessments-2026.jpg",
        alt: "South African Revenue Service signage outside a SARS office. Credit: Golegal.",
        credit: "Golegal",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [ai],
      regions: [regions.southAfrica],
      faq: [
        {
          question: "What is a SARS auto-assessment?",
          answer:
            "It is a tax assessment SARS pre-fills using third-party data and automation, which you review and accept or correct rather than completing from scratch."
        },
        {
          question: "Should I just accept my auto-assessment?",
          answer:
            "Only after checking it. If your income, deductions, or expenses are not fully captured, you may need to update the return before submitting."
        }
      ],
      sources: [
        {
          label: "SARS: Auto Assessment",
          url: "https://www.sars.gov.za/types-of-tax/personal-income-tax/auto-assessment/"
        },
        {
          label: "SARS: Tax Season",
          url: "https://www.sars.gov.za/types-of-tax/personal-income-tax/tax-season/"
        }
      ]
    },
    {
      id: "africa-news-rwanda-egypt-ai-partnership",
      slug: "rwanda-egypt-ai-partnership",
      format: "news",
      title: "Rwanda and Egypt move to build an African AI alliance",
      seo: {
        title: "Rwanda and Egypt move to build an African AI alliance",
        description:
          "Rwanda's Paula Ingabire and Egypt's ICT minister met in Cairo to shape a shared, responsible African AI agenda, with an MoU and joint pilots planned."
      },
      subhead:
        "Rwanda's ICT minister met her Egyptian counterpart in Cairo to draft a joint framework for responsible, development-focused AI, with concrete pilots in mind.",
      excerpt:
        "Rwanda and Egypt are working toward a shared African AI framework, including a planned MoU and pilot projects in public-service sectors.",
      whyItMatters:
        "If Africa keeps building AI country by country, it stays a patchwork. Two of the continent's most deliberate digital states teaming up is a step toward shaping the rules together.",
      body: [
        "Rwanda and Egypt are moving toward a joint African framework for artificial intelligence, after ministers from both countries met in Cairo on June 29, 2026.",
        "Rwanda's Minister of ICT and Innovation, Paula Ingabire, met Egypt's Minister of Communications and Information Technology, Amr Talaat, with the two sides discussing responsible, inclusive AI that serves development goals rather than launch-stage hype.",
        "The practical part is the important bit. The countries discussed a Memorandum of Understanding and joint AI-powered pilots in areas such as healthcare, agriculture, local-language technologies, and government services. They also discussed coordinating in regional and international forums so African countries have a stronger voice in AI governance.",
        "This matters beyond Rwanda and Egypt. Both countries have been deliberate about national digital planning, and both understand that AI built elsewhere can miss African languages, public-service realities, and data constraints.",
        "The caution is familiar: an MoU is not a product. The value will show only if pilots ship, work, and improve real services. But the instinct is right. African states pooling talent and use cases is stronger than each country trying to build an AI future alone."
      ],
      author: tim,
      publishedAt: publishedJuly(1, 8),
      updatedAt: publishedJuly(1, 8),
      readTime: "4 min read",
      image: {
        src: "/articles/rwanda-egypt-ai-partnership.jpg",
        alt: "Rwanda and Egypt officials seated during a bilateral AI cooperation meeting. Credit: RwandaICT / x.com.",
        credit: "RwandaICT / x.com",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [ai],
      regions: [regions.rwanda],
      sources: [
        {
          label: "Daily News Egypt: Egypt and Rwanda explore joint AI framework",
          url: "https://www.dailynewsegypt.com/"
        },
        {
          label: "Egypt State Information Service: Rwanda and Egypt digital cooperation",
          url: "https://www.sis.gov.eg/"
        }
      ]
    },
    {
      id: "africa-news-rwanda-digital-public-infrastructure",
      slug: "rwanda-digital-public-infrastructure-strategy",
      format: "business",
      title: "Rwanda launches a Digital Public Infrastructure strategy",
      seo: {
        title: "Rwanda launches a Digital Public Infrastructure strategy",
        description:
          "Rwanda has deployed a next-generation Digital Public Infrastructure strategy to unify citizen services and lay the data foundation for national AI."
      },
      subhead:
        "Building on its new National AI Agency, Rwanda has rolled out a Digital Public Infrastructure strategy to unify citizen services on an open, governed foundation.",
      excerpt:
        "Rwanda's Digital Public Infrastructure strategy is meant to unify citizen services and create the governed data rails needed for national AI systems.",
      whyItMatters:
        "Before a country can safely run AI-powered public services, it needs the plumbing: identity, data, and payment rails that work together. This is Rwanda building those pipes.",
      body: [
        "Rwanda has deployed a next-generation Digital Public Infrastructure strategy designed to unify citizen services and create a stronger data foundation for public-sector AI.",
        "Digital Public Infrastructure sounds abstract, but it is practical. It is the shared digital plumbing of a modern state: identity, data exchange, service delivery, and trust rails that let public systems work together securely.",
        "The strategy builds on Rwanda's wider AI governance push, including its National AI Agency work, by focusing on the foundations needed before public services can sensibly use AI at national scale.",
        "That sequencing matters. Plenty of governments announce flashy AI projects before sorting identity, data governance, interoperability, and privacy. Rwanda's approach is more sober: build the pipes first, then put smarter services on top.",
        "The challenge is capacity. Strategies and agencies coordinate the work, but they do not automatically produce the engineers, auditors, product teams, and civil servants needed to make the systems run well. Still, laying the foundation before chasing the demo is the right order."
      ],
      author: tim,
      publishedAt: publishedJuly(1, 7),
      updatedAt: publishedJuly(1, 7),
      readTime: "4 min read",
      image: {
        src: "/articles/rwanda-digital-public-infrastructure.jpg",
        alt: "A speaker at Rwanda DPI Day in front of a Rwanda Information Society Authority backdrop. Credit: AFRwanda / x.com.",
        credit: "AFRwanda / x.com",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [ai, business],
      regions: [regions.rwanda],
      faq: [
        {
          question: "What is Digital Public Infrastructure?",
          answer:
            "It is the shared digital foundation of a state, including identity, data exchange, and service rails that let public services work together securely."
        },
        {
          question: "Why is Rwanda doing this now?",
          answer:
            "Rwanda needs governed data and identity systems before it can safely scale AI-powered public services across government."
        }
      ],
      sources: [
        {
          label: "Rwanda Information Society Authority: Rwanda Digital Acceleration Project",
          url: "https://www.risa.gov.rw/projects/rdap"
        },
        {
          label: "Rwanda ICT Chamber: digital public infrastructure work",
          url: "https://ict.rw/"
        }
      ]
    },
    {
      id: "africa-news-smart-africa-ai-council-data-governance",
      slug: "smart-africa-ai-council-data-governance",
      format: "news",
      title: "Smart Africa pushes to harmonise cross-border AI data rules",
      seo: {
        title: "Smart Africa pushes to harmonise cross-border AI data rules",
        description:
          "From its Kigali base, the Smart Africa Alliance's AI Council is working to unify cross-border data rules so African startups can scale across the continent."
      },
      subhead:
        "Operating from Kigali, the Smart Africa Alliance's AI Council is working on regional policy to unify cross-border data transfer, with Rwanda helping lead the effort.",
      excerpt:
        "Smart Africa is using its AI Council to push regional data-governance alignment, a quiet but important condition for African startups to scale across borders.",
      whyItMatters:
        "A startup that has to relearn the data rules in every country cannot scale. Harmonised rules are quietly one of the most important things for African tech to grow beyond borders.",
      body: [
        "The Smart Africa Alliance, headquartered in Kigali, is working on one of African tech's least glamorous but most important problems: data rules that stop at national borders.",
        "Through its AI Council and wider digital-policy work, Smart Africa has been pushing governments toward more harmonised approaches to data governance, cross-border data transfer, and responsible AI.",
        "The reason this matters is simple. A startup built in one African country that wants to serve customers in another can run into mismatched rules on data storage, consent, transfer, and oversight. Every new market adds legal cost and uncertainty.",
        "Harmonised rules would make regional expansion easier. A company could build for a bloc of markets instead of rewriting its compliance plan country by country. That would be especially useful for AI products, which often need training data, inference infrastructure, and user information to move securely across jurisdictions.",
        "The caveat is that harmonising data law across sovereign countries is slow and politically hard. Recommendations are not the same thing as binding law. But if even a smaller group of countries aligns, the payoff for African startups, and for African-led data governance, could be significant."
      ],
      author: tim,
      publishedAt: publishedJuly(1, 6),
      updatedAt: publishedJuly(1, 6),
      readTime: "4 min read",
      image: {
        src: "/articles/smart-africa-ai-data-governance.jpg",
        alt: "Smart Africa sign lit above a conference audience. Credit: Smart Africa.",
        credit: "Smart Africa",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [ai, connectivity],
      regions: [regions.rwanda],
      sources: [
        {
          label: "Smart Africa Alliance: Artificial Intelligence for Africa Blueprint",
          url: "https://smartafrica.org/knowledge/artificial-intelligence-for-africa-blueprint/"
        },
        {
          label: "Smart Africa Alliance",
          url: "https://smartafrica.org/"
        }
      ]
    },
    {
      id: "africa-news-nigeria-airtime-credit-restored",
      slug: "nigeria-airtime-credit-restored-fccpc",
      format: "business",
      title: "Airtime credit is back for millions of Nigerians",
      seo: {
        title: "Airtime credit is back for millions of Nigerians",
        description:
          "Airtime and data lending has fully resumed in Nigeria after a two-month suspension tied to an FCCPC regulatory fight. Here is what happened and what is next."
      },
      subhead:
        "After a two-month suspension caused by a regulatory standoff, airtime and data credit services are fully restored, though the underlying legal fight is not over.",
      excerpt:
        "Airtime and data lending has resumed in Nigeria after a suspension linked to FCCPC digital-lending rules and a court fight.",
      whyItMatters:
        "For roughly 40 million Nigerians, borrowed airtime and data is not a convenience but a lifeline to stay connected, work, and study. Losing it, then getting it back, was a real disruption.",
      body: [
        "Millions of Nigerians can once again borrow airtime and data after telecom-credit services resumed following a regulatory standoff.",
        "The credit engine behind much of this lending is Optasia, the fintech firm that powers airtime and data advances for operators including MTN and Airtel through its local subsidiary Nairtime. The service disruption came after operators moved to comply with new Federal Competition and Consumer Protection Commission rules covering digital lending.",
        "Those rules, known as the DEON regulations, would have expanded oversight to telecom-based credit and required operators and partners to seek approvals. The dispute moved into court, enforcement was restrained, and the FCCPC suspended the rules pending the case, allowing services to return.",
        "There is a bigger policy fight under the relief. The government has framed the reform as consumer protection and a way to reshape a lucrative market. Industry players argue the disruption hurt ordinary users and that the market was already competitive.",
        "For users, the immediate answer is simple: borrowed airtime and data are back. The longer-term answer depends on how the court and regulators settle the rules that govern the service."
      ],
      author: tim,
      publishedAt: published(30, 20),
      updatedAt: published(30, 20),
      readTime: "4 min read",
      image: {
        src: "/articles/nigeria-airtime-credit-restored.jpg",
        alt: "A group of people holding mobile phones while checking airtime and data. Credit: Webphatic.",
        credit: "Webphatic",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [fintech, connectivity, optasia, mtn, airtel],
      regions: [regions.nigeria],
      faq: [
        {
          question: "Is airtime credit working again in Nigeria?",
          answer: "Yes. Airtime and data lending services have resumed after the regulatory suspension."
        },
        {
          question: "Why was airtime credit suspended?",
          answer:
            "Operators paused services after FCCPC digital-lending rules created new approval requirements for telecom-based credit."
        },
        {
          question: "Is the issue settled?",
          answer:
            "Not fully. Services have resumed, but the regulatory and legal questions around the rules still matter."
        }
      ],
      sources: [
        {
          label: "Guardian Nigeria: airtime credit services restored after FCCPC dispute",
          url: "https://guardian.ng/"
        },
        {
          label: "Optasia: company and telecom credit services",
          url: "https://www.optasia.com/"
        }
      ]
    },
    {
      id: "africa-news-nigeria-nimc-act-2026",
      slug: "nigeria-nimc-act-2026-digital-identity",
      format: "business",
      title: "Tinubu signs NIMC Act 2026, reshaping digital identity",
      seo: {
        title: "Tinubu signs NIMC Act 2026, reshaping digital identity",
        description:
          "Nigeria's new NIMC Act 2026 makes the identity commission the country's Root Certification Authority, laying the base for a large digital-trust economy."
      },
      subhead:
        "President Tinubu has signed a new identity law that turns NIMC into the trust anchor for Nigeria's digital economy, replacing a framework nearly two decades old.",
      excerpt:
        "Nigeria's NIMC Act 2026 rewrites digital identity rules and gives the identity commission a central trust role for public-key infrastructure.",
      whyItMatters:
        "Identity is the foundation everything digital sits on, from opening a bank account to verifying a business. Rewriting the rules for it quietly reshapes Nigeria's whole digital economy.",
      body: [
        "Nigeria has rewritten the rules of its digital identity system with the National Identity Management Commission Act 2026.",
        "The law replaces an older framework and expands NIMC's role in how Nigerians are identified and verified online. The most consequential change is technical but far-reaching: NIMC is positioned as the Root Certification Authority for Nigeria's national public-key and digital-trust infrastructure.",
        "In plain English, NIMC becomes a central anchor for secure authentication, encryption, digital signatures, and identity verification across government and private services.",
        "The law reinforces the National Identification Number as the foundational credential under a one-person, one-identity principle. It also points toward stronger data protection, special enrolment measures for vulnerable groups, and a multipurpose identity card.",
        "For ordinary users and businesses, the long-term promise is easier and safer verification across banks, government services, telecoms, and online platforms. The risk is implementation. Identity systems only earn trust when enrolment works, privacy is respected, errors can be fixed, and the institutions handling the data are held accountable."
      ],
      author: tim,
      publishedAt: published(30, 19),
      updatedAt: published(30, 19),
      readTime: "4 min read",
      image: {
        src: "/articles/nigeria-nimc-act-2026.jpg",
        alt: "President Bola Tinubu signing a document linked to Nigeria's identity framework. Credit: NIMC.",
        credit: "NIMC",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [business],
      regions: [regions.nigeria],
      faq: [
        {
          question: "What does the NIMC Act 2026 change?",
          answer:
            "It expands NIMC's role in digital identity and positions the commission as a trust anchor for secure authentication and digital services."
        },
        {
          question: "How does it affect Nigerians?",
          answer:
            "Over time, it should make identity verification easier across government, banks, telecoms, and private services, if implementation is handled well."
        }
      ],
      sources: [
        {
          label: "NIMC: National Identity Management Commission",
          url: "https://nimc.gov.ng/"
        },
        {
          label: "Nigeria Data Protection Commission",
          url: "https://ndpc.gov.ng/"
        }
      ]
    },
    {
      id: "africa-news-nigeria-local-smartphone-manufacturing",
      slug: "nigeria-local-smartphone-manufacturing-drive",
      format: "business",
      title: "Nigeria pushes to build smartphones at home",
      seo: {
        title: "Nigeria pushes to build smartphones at home",
        description:
          "Nigeria's government is courting global device makers to set up local smartphone assembly, aiming to cut the cost of getting online and create tech jobs."
      },
      subhead:
        "The federal government has launched a drive to attract global device makers to assemble smartphones in Nigeria, targeting the cost of getting online.",
      excerpt:
        "Nigeria wants global device makers to assemble smartphones locally, a push aimed at lowering device costs and creating manufacturing jobs.",
      whyItMatters:
        "The single biggest barrier to getting online for many Nigerians is the price of a phone. Building them locally could lower that barrier and create industrial jobs at the same time.",
      body: [
        "Nigeria is pushing to bring more smartphone assembly and manufacturing into the country, courting global device makers to build physical production capacity locally.",
        "The logic is easy to understand. For millions of Nigerians, the barrier to the internet is not only network coverage or data prices. It is the upfront cost of a capable smartphone.",
        "Because many devices are imported, prices carry shipping costs, duties, currency pressure, and supply-chain uncertainty. Local assembly could trim some of those costs, shorten supply chains, and create jobs around component handling, assembly, repair, and distribution.",
        "The ambition is right, but it is not the same as a factory opening. Attracting original equipment manufacturers depends on reliable power, predictable policy, access to components, logistics, and a market large enough to justify the investment.",
        "Similar pushes across Africa have had mixed results. Some assembly plants have created useful local capacity, while others have struggled to compete with cheaper imports. The question is whether Nigeria can make the incentives and operating conditions strong enough for global device makers to commit."
      ],
      author: tim,
      publishedAt: published(30, 18),
      updatedAt: published(30, 18),
      readTime: "4 min read",
      image: {
        src: "/articles/nigeria-local-smartphone-manufacturing.jpg",
        alt: "A worker assembling a smartphone on a production line. Credit: Billy Ogada | Nation Media Group.",
        credit: "Billy Ogada | Nation Media Group",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [smartphones, business],
      regions: [regions.nigeria],
      sources: [
        {
          label: "Nigeria Ministry of Communications, Innovation and Digital Economy",
          url: "https://fmcide.gov.ng/"
        },
        {
          label: "NCC: Nigerian Communications Commission",
          url: "https://www.ncc.gov.ng/"
        }
      ]
    },
    {
      id: "africa-news-africa-technology-expo-2026-lagos",
      slug: "africa-technology-expo-2026-lagos",
      format: "business",
      title: "Africa Technology Expo 2026 draws thousands to Lagos",
      seo: {
        title: "Africa Technology Expo 2026 draws thousands to Lagos",
        description:
          "The Africa Technology Expo scaled to two days in Lagos, gathering thousands of tech leaders around smart infrastructure, logistics, and fintech."
      },
      subhead:
        "The Africa Technology Expo grew to a two-day format at the National Theatre in Lagos, with a heavy focus on smart infrastructure, logistics, and fintech.",
      excerpt:
        "Africa Technology Expo 2026 drew thousands of founders, investors, and technology leaders to Lagos, with infrastructure and logistics sharing the spotlight with fintech.",
      whyItMatters:
        "Big expos are where deals, partnerships, and hiring actually happen, so the scale of an event is a rough gauge of a startup ecosystem's health and confidence.",
      body: [
        "Africa Technology Expo 2026 drew thousands of technology leaders, founders, investors, and operators to Lagos for a larger two-day gathering.",
        "The event leaned into smart infrastructure, logistics, fintech, and the practical systems that move people, goods, money, and services across African cities.",
        "That matters because expos are more than stage panels. They are where founders meet investors, vendors find customers, partnerships form over coffee, and hiring conversations start in corridors.",
        "The subject mix is also revealing. Nigerian tech is still deeply shaped by fintech, but the attention around infrastructure and logistics suggests founders and investors are looking more closely at the physical systems that make digital services useful in the real world.",
        "Conference numbers should always be treated carefully. Reported deal pipelines usually include intentions, partnerships, and opportunities rather than money already in the bank. Still, a growing Lagos expo is a genuine signal of confidence in Africa's largest startup market."
      ],
      author: tim,
      publishedAt: published(30, 17),
      updatedAt: published(30, 17),
      readTime: "4 min read",
      image: {
        src: "/articles/nigeria-africa-technology-expo-2026.jpg",
        alt: "Attendees networking on the floor at Africa Technology Expo in Lagos. Credit: CloudsaAfrica / x.com.",
        credit: "CloudsaAfrica / x.com",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [startups, business],
      regions: [regions.nigeria],
      sources: [
        {
          label: "Africa Technology Expo",
          url: "https://africatechnologyexpo.com/"
        },
        {
          label: "ATE 2026 Lagos event information",
          url: "https://eventbrite.com/"
        }
      ]
    },
    {
      id: "africa-news-nsia-npi-4-startup-prize",
      slug: "nsia-npi-4-startup-prize",
      format: "business",
      title: "Nigeria's NSIA opens its NPI 4.0 startup prize",
      seo: {
        title: "Nigeria's NSIA opens its NPI 4.0 startup prize",
        description:
          "Nigeria's sovereign wealth fund has opened applications for NPI 4.0, pooling prize money and equity pathways for startups in hardware, cleantech, and agritech."
      },
      subhead:
        "The Nigeria Sovereign Investment Authority has opened applications for the fourth NSIA Prize for Innovation, with prize money and investment pathways for early-stage founders.",
      excerpt:
        "NSIA Prize for Innovation 4.0 is open to Nigerian startups working on sectors such as hardware, cleantech, agritech, and practical local infrastructure problems.",
      whyItMatters:
        "Most startup funding chases apps and fintech. A prize aimed at hardware, cleantech, and agritech backs the harder, physical problems that are tougher to fund but deeply useful.",
      body: [
        "Nigeria's sovereign wealth fund is putting money behind early-stage founders again through the fourth NSIA Prize for Innovation.",
        "The programme pairs prize money with investment pathways for Nigerian startups, with a focus on practical sectors such as hardware, cleantech, agritech, and other localised systems.",
        "That focus is the useful part. Most startup capital in Nigeria and across Africa gravitates toward software and fintech because they are cheaper to build and faster to scale. Hardware, clean energy, and agricultural technology are harder, slower, and more capital-intensive.",
        "They are also deeply needed. Food systems, energy access, industrial productivity, and climate resilience do not get solved by another dashboard alone. They often require physical tools, distribution, maintenance, and patient capital.",
        "Prize cash by itself rarely turns a prototype into a company, so the investment-pathway angle matters. The programme will be judged by what happens after demo day: whether winners build durable businesses rather than simply collect a cheque and stall."
      ],
      author: tim,
      publishedAt: published(30, 16),
      updatedAt: published(30, 16),
      readTime: "4 min read",
      image: {
        src: "/articles/nigeria-nsia-npi-4-startup-prize.jpg",
        alt: "A speaker at the Nigeria Sovereign Investment Authority Prize for Innovation event. Credit: NSIA.",
        credit: "NSIA",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [startups],
      regions: [regions.nigeria],
      sources: [
        {
          label: "NSIA Prize for Innovation",
          url: "https://nsia-ip.com/"
        },
        {
          label: "Nigeria Sovereign Investment Authority",
          url: "https://nsia.com.ng/"
        }
      ]
    },
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
        src: "/articles/kenya-space-expo-conference-2026.jpg",
        alt: "Kenya Space Agency exhibition booth at the Kenya Space Expo and Conference. Credit: expo.ksa.go.ke.",
        credit: "expo.ksa.go.ke",
        width: 1040,
        height: 520,
        type: "image/jpeg"
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
        src: "/articles/south-africa-r100m-startup-fund.jpg",
        alt: "South African flag in front of a Cape Town business district skyline. Credit: HERE Technologies.",
        credit: "HERE Technologies",
        width: 1040,
        height: 520,
        type: "image/jpeg"
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
        src: "/articles/holocene-southern-africa-climate-tech-fund.jpg",
        alt: "Holocene team members pictured in front of a Holocene Investments Solutions sign. Credit: holocene.africa / Instagram.",
        credit: "holocene.africa / Instagram",
        width: 1040,
        height: 520,
        type: "image/jpeg"
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
        src: "/articles/microsoft-south-africa-data-centre.jpg",
        alt: "People seated outside a Microsoft South Africa office. Credit: Microsoft South Africa.",
        credit: "Microsoft South Africa",
        width: 1040,
        height: 520,
        type: "image/jpeg"
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
        src: "/articles/spiro-electric-mobility.jpg",
        alt: "A red Spiro electric motorcycle inside a workshop. Credit: Spiro.",
        credit: "Spiro",
        width: 1040,
        height: 520,
        type: "image/jpeg"
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
        src: "/articles/shuttlers-google-maps-nigeria.jpg",
        alt: "A Shuttlers bus route shown on Google Maps beside Shuttlers buses. Credit: tecMAMBO Media.",
        credit: "tecMAMBO Media",
        width: 1040,
        height: 520,
        type: "image/jpeg"
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
