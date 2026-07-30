import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type RegionKey = "kenya" | "nigeria" | "southAfrica";

type BuildAfricanTechNewsJuly24Args = {
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
  return new Date(Date.UTC(2026, 6, day, hour, 0, 0)).toISOString();
}

function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;
}

export function buildAfricanTechNewsJuly24Articles({ authors, topics, brands, regions }: BuildAfricanTechNewsJuly24Args): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const lulu = bySlug(authors, "lulu-kiritu");
  const ai = bySlug(topics, "ai");
  const business = bySlug(topics, "business");
  const policy = bySlug(topics, "policy");
  const startups = bySlug(topics, "startups");
  const fintech = bySlug(topics, "fintech");
  const banking = bySlug(topics, "banking");
  const connectivity = bySlug(topics, "connectivity");
  const smartphones = bySlug(topics, "smartphones");
  const climateTech = bySlug(topics, "climate-tech");
  const energy = bySlug(topics, "energy");
  const quickCommerce = bySlug(topics, "quick-commerce");
  const eCommerce = bySlug(topics, "e-commerce");
  const cybersecurity = bySlug(topics, "cybersecurity");
  const moniepoint = bySlug(brands, "moniepoint");
  const uber = bySlug(brands, "uber");
  const glovo = bySlug(brands, "glovo");
  const openai = bySlug(brands, "openai");
  const google = bySlug(brands, "google");

  return [
    {
      id: "africa-july24-kenya-ai-msme-strategy-ai-bill",
      slug: "kenya-ai-strategy-msmes-artificial-intelligence-bill-2026",
      format: "news",
      title: "Kenya's plan to put AI in eight million small businesses, explained",
      seo: {
        title: "Kenya AI strategy for MSMEs and the AI Bill 2026 explained",
        description:
          "Kenya wants to mainstream AI across nearly eight million small businesses while the Artificial Intelligence Bill 2026 moves through the Senate. What it means for owners."
      },
      subhead:
        "The government is pushing AI into the shops, workshops, and traders that make up most of the economy, just as the Senate debates the rules that will govern it.",
      excerpt:
        "Kenya's MSME ministry is pushing AI adoption across millions of small firms as the Artificial Intelligence Bill 2026 moves through the Senate. The plan, the law, and the catch.",
      whyItMatters:
        "MSMEs are where most Kenyans actually work and earn. If AI reaches them cheaply and safely it changes real incomes; if it arrives as hype or heavy rules, it changes very little.",
      body: [
        "Kenya wants artificial intelligence to stop being a big-company tool and start working inside the small businesses that carry most of the economy. The Ministry of MSME Development has unveiled a national push to mainstream AI across nearly eight million micro, small, and medium enterprises, the shops, salons, workshops, farms, and traders that employ the majority of working Kenyans. It lands at the same moment the Artificial Intelligence Bill 2026 is moving through the Senate, so the country is trying to spread a technology and write its rulebook at the same time. Here is what the plan promises, what the law would change, and where the gap between the two could open.",
        "## What the MSME AI drive actually proposes",
        "The pitch, pushed by the ministry and its principal secretary, is that AI can become the next engine of Kenyan enterprise rather than a luxury for large firms. In practice that means encouraging small businesses to use AI for the unglamorous work that eats their time: tracking inventory, writing quotes and invoices, answering customers, drafting marketing, and forecasting demand. The stated goals are to automate stock and record-keeping, streamline local manufacturing, and lift competitiveness so Kenyan firms can trade under the African Continental Free Trade Area rather than being undercut by bigger regional players.",
        "The reason the target is small business and not the corporate tower is simple arithmetic. MSMEs are estimated to contribute somewhere between a quarter and a third of Kenya's gross domestic product and the bulk of its jobs. A tool that shaves an hour of admin off a trader's day, or helps a workshop price a job correctly, does not sound dramatic, but multiplied across millions of firms it is exactly where productivity gains would show up in real incomes.",
        "## Why small businesses are the right place to aim",
        "Most Kenyans do not work for a company with an IT department. They run or work in a stall, a boda operation, a tailoring shop, a small farm, or a one-person service. Margins are thin and time is the scarcest resource. That is why the most useful AI for this group is not a flashy model but a cheap assistant that removes friction: a mama mboga checking stock and pricing, a fundi turning a rough spec into a written quote, a salon managing bookings and reminders, a small exporter drafting listings for a cross-border marketplace. The free and low-cost tiers of today's assistants already do much of this, which is what makes a mass-adoption drive plausible rather than aspirational.",
        "The honest caution is that adoption is not the same as benefit. AI is confident even when it is wrong, and a small business acting on a bad number, a wrong tax figure, or an invented supplier can lose money it cannot spare. The drive will only pay off if it is paired with basic digital skills and a habit of checking anything financial or local before acting on it.",
        "## The Artificial Intelligence Bill 2026",
        "Running alongside the adoption push is the country's first serious attempt to regulate the technology. The Artificial Intelligence Bill 2026, sponsored by nominated Senator Karen Nyamu, would be Kenya's first comprehensive AI law. It proposes an independent Office of the Artificial Intelligence Commissioner, and a four-tier risk classification system modelled on the European Union's AI Act, sorting AI uses from minimal to high risk with obligations that rise accordingly. It carries real teeth, with fines of up to 5 million shillings, about 40,000 US dollars, and prison terms of up to two years for creating or distributing harmful AI-generated content. The Bill sits on top of the Kenya AI Strategy 2025 to 2030, which is built on three pillars: AI infrastructure, data and governance, and research and commercialisation. We covered the wider policy picture in our look at Kenya's national AI policy at [Kenya moves to finalise a national AI policy](/news/kenya-national-ai-policy).",
        "## The tension between speed and rules",
        "The two efforts pull in slightly different directions, and that is the story worth watching. One arm of government is urging millions of small firms to adopt AI as fast as possible, while another is drafting a risk-based law with commissioners, classifications, and penalties. Some legal analysts have asked whether the Bill is being proposed too soon, before the market and the institutions are ready, and whether its compliance burden could land hardest on the small firms the adoption drive is trying to empower. A good law protects users from real harm, deepfakes, fraud, and abusive automated decisions, without turning routine tool use by a corner shop into a regulatory risk. Whether Kenya strikes that balance is the open question. Our earlier argument that clear rules can be a quiet advantage rather than a brake is at [Kenya is writing AI rules early. That is an edge.](/opinion/kenya-ai-rules-quiet-advantage).",
        "## What it means for a small business owner",
        "If you run a small business, the practical move is not to wait for the policy to settle. Start with one repeated task that drains your week, stock counts, customer replies, quotes, or simple marketing, and try a free assistant on it for a fortnight, checking every figure before you rely on it. Keep customer and payment data out of tools you do not trust, because privacy is your risk to manage. And keep half an eye on the Bill as it firms up, since its final risk tiers will decide whether you face any obligations at all, which for most ordinary users should be light to none. The opportunity here is real, but it belongs to owners who treat AI as a fast assistant to double-check, not an oracle to obey."
      ],
      closingLine:
        "Kenya is betting that AI reaches more lives through a million small businesses than through any single grand launch. The bet only pays off if the tools stay cheap, the rules stay sensible, and owners keep checking the answers.",
      author: lulu,
      publishedAt: published(24, 6),
      updatedAt: published(24, 6),
      readTime: "7 min read",
      image: {
        src: "/articles/kenya-sme-ai-plan-2026.webp",
        alt: "A KEPSA speaker addressing an annual conference for Kenyan small and medium enterprises.",
        credit: "CapitalFM",
        width: 1040,
        height: 520,
        type: "image/webp"
      },
      tags: [ai, business, policy],
      regions: [regions.kenya],
      faq: [
        {
          question: "What is Kenya's AI strategy for MSMEs?",
          answer:
            "It is a government push, led by the Ministry of MSME Development, to help nearly eight million small businesses adopt AI for everyday tasks like inventory, records, pricing, marketing, and customer service, aimed at raising productivity and competitiveness under the AfCFTA."
        },
        {
          question: "What is the Artificial Intelligence Bill 2026?",
          answer:
            "It is Kenya's first comprehensive AI law, sponsored by Senator Karen Nyamu. It proposes an Office of the AI Commissioner, a four-tier risk classification modelled on the EU AI Act, and penalties of up to 5 million shillings and two years in prison for harmful AI-generated content."
        },
        {
          question: "How can AI actually help a small business in Kenya?",
          answer:
            "Mostly by removing admin friction: tracking stock, writing quotes and invoices, answering customers, drafting marketing, and forecasting demand. Free and low-cost assistants already handle much of this, though owners should verify any financial or local figures before acting."
        },
        {
          question: "Could the AI Bill create problems for small businesses?",
          answer:
            "Possibly, if the compliance burden is heavy. Analysts have questioned whether the Bill is premature. For most ordinary users the obligations should be light, but the final risk tiers will decide how much, if anything, small firms have to do."
        }
      ],
      sources: [
        {
          label: "allAfrica: AI to drive next generation of Kenyan enterprises, says PS Mang'eni",
          url: "https://allafrica.com/stories/202607240294.html"
        },
        {
          label: "Oraro & Company: The Artificial Intelligence Bill, 2026 and Kenya's MSMEs",
          url: "https://www.oraro.co.ke/the-artificial-intelligence-bill-2026-opportunity-or-threat-to-kenyas-msmes/"
        },
        {
          label: "Techweez: Senate introduces AI Bill proposing an AI Commissioner",
          url: "https://techweez.com/2026/03/17/kenya-artificial-intelligence-ai-bill-2026/"
        }
      ]
    },
    {
      id: "africa-july24-kenya-ca-ced-importer-licence",
      slug: "kenya-communications-equipment-importer-licence-250000",
      format: "news",
      title: "Kenya's new KSh250,000 licence to import phones and routers, explained",
      seo: {
        title: "Kenya KSh250,000 phone and router importer licence explained",
        description:
          "Kenya's Communications Authority now requires a Communications Equipment Distributor Licence, at KSh250,000, to import phones, routers, and modems. Who needs it and why."
      },
      subhead:
        "The Communications Authority wants every phone, router, and modem importer licensed and type-approved. The aim is fewer counterfeits, but the cost falls on the trade.",
      excerpt:
        "Kenya now requires a KSh250,000 Communications Equipment Distributor Licence to import phones, routers, and modems, part of a crackdown on counterfeit and non-compliant devices.",
      whyItMatters:
        "Device import rules quietly shape what phones reach the market and at what price. A licence this size can clean up counterfeits or squeeze small importers, and often both.",
      body: [
        "Anyone who wants to import or wholesale phones, routers, and modems into Kenya now needs a new, and not cheap, government licence. In a directive dated 21 July 2026, the Communications Authority of Kenya introduced a mandatory Communications Equipment Distributor Licence, priced at 250,000 shillings, for businesses that bring communications hardware into the country. The regulator says the goal is to curb the flood of counterfeit and substandard devices. For the trade that supplies the country's phones and home internet gear, it is a real new cost and a real new hurdle. Here is who it covers, what it costs, and what it could mean for prices on the shelf.",
        "## What the new licence covers",
        "The Communications Equipment Distributor Licence, or CED, applies to any business that imports or wholesales communications equipment: mobile phones, routers, modems, and similar hardware. It covers both new and existing companies, so a shop that has been importing handsets for years cannot simply carry on. Existing telecommunications equipment contractor and vendor licence holders who want to keep distributing devices must also apply for the new CED licence. Alongside the licence, the regulator is tightening the chain that a device must pass through, requiring equipment to be type-approved and cleared through the government's TradeNet system before it enters the market.",
        "## The fees, in full",
        "The headline number is the licence fee, but it is not the only one. Applying costs a non-refundable 5,000 shillings. The initial licence fee is 250,000 shillings, and the licence is valid for 15 years, which spreads that cost over a long horizon. On top of that sits an annual operating levy equal to 0.4 percent of gross annual turnover, with a minimum payment of 120,000 shillings a year. For a large distributor moving serious volume, those numbers are absorbable. For a small trader importing a few dozen handsets a month, the upfront licence plus a minimum annual levy is a meaningful barrier to entry, and that is the part of the policy worth watching.",
        "## Why the Authority is doing this",
        "The stated purpose is to attack a genuine problem. Kenya, like much of the region, has long dealt with counterfeit and substandard phones and networking gear: devices that fail quickly, lack safety approval, dodge taxes, and can undermine network quality. By forcing importers to be licensed, type-approved, and cleared through TradeNet, the Authority wants a paper trail from the port to the shop, making it easier to keep non-compliant hardware out and to hold someone accountable when it slips through. Cleaner devices, safer chargers, and fewer fakes are a legitimate public interest, and a licensing regime is a standard tool for getting there.",
        "The enforcement side has teeth. Operating without the licence, or importing equipment that has not received type approval, can draw fines of up to 1 million shillings, imprisonment for up to three years, or both. That is a serious deterrent, and it signals the Authority intends the rule to bite rather than sit on paper.",
        "## The catch for prices and small traders",
        "Every added cost in an import chain has to go somewhere, and it usually ends up split between margins and shelf prices. A 250,000 shilling licence, a 0.4 percent turnover levy, and the compliance work of type approval and TradeNet clearance raise the cost of doing business, especially for the small and informal importers who supply a large share of budget devices. The optimistic reading is consolidation around compliant, reputable sellers and fewer dangerous fakes. The pessimistic reading is that some small importers exit, competition thins, and entry-level phone and router prices drift up. Both can be true at once, which is the honest tension in most consumer-protection rules. For readers already tracking how policy is nudging tech costs in Kenya, the Finance Act changes to software and cloud costs are a useful companion at [Kenya's new tax rules put software payments under pressure](/business/finance-act-2026-software-cloud-costs-kenya).",
        "## What buyers and traders should do now",
        "If you sell devices, the practical steps are clear: budget for the licence and levy, confirm your suppliers can provide type-approved stock, and get your TradeNet paperwork in order rather than risk the fines. If you are a buyer, the change is mostly invisible day to day, but it is a reason to favour sellers who can show their devices are type-approved, since those are the ones most likely to remain compliant and reachable if something goes wrong. As with any budget device, our advice on checking a phone's approvals and warranty at purchase, as we noted reviewing affordable handsets like the Galaxy A27 at [Samsung's Galaxy A27 5G is starting to show up in Kenya](/news/samsung-galaxy-a27-5g-kenya), applies more than ever."
      ],
      closingLine:
        "A licence like this is a bet that a cleaner, safer device market is worth a higher cost of entry. Whether it protects buyers or just prices out the small trader will show up first on the shelf, in the price of the cheapest honest phone.",
      author: tim,
      publishedAt: published(24, 8),
      updatedAt: published(24, 8),
      readTime: "6 min read",
      image: {
        src: "/articles/kenya-communications-equipment-importer-licence.webp",
        alt: "The CA Centre building in Nairobi with its globe fountain in the foreground.",
        credit: "CAK",
        width: 1040,
        height: 520,
        type: "image/webp"
      },
      tags: [policy, smartphones, connectivity],
      regions: [regions.kenya],
      faq: [
        {
          question: "Who needs the new Kenya importer licence?",
          answer:
            "Any business that imports or wholesales communications equipment, including mobile phones, routers, and modems. It applies to both new and existing companies, and existing contractor and vendor licence holders must also apply for the new Communications Equipment Distributor Licence."
        },
        {
          question: "How much does the licence cost?",
          answer:
            "A non-refundable application fee of KSh5,000, an initial licence fee of KSh250,000 valid for 15 years, and an annual operating levy of 0.4 percent of gross annual turnover with a minimum of KSh120,000 a year."
        },
        {
          question: "Why did the Communications Authority introduce it?",
          answer:
            "To curb counterfeit and substandard telecom devices by requiring importers to be licensed, and by requiring equipment to be type-approved and cleared through the TradeNet system before reaching the market."
        },
        {
          question: "What happens if a business ignores it?",
          answer:
            "Operating without the licence or importing equipment that is not type-approved can attract fines of up to KSh1 million, imprisonment for up to three years, or both."
        }
      ],
      sources: [
        {
          label: "Tech-ish: You now need a KES 250,000 licence to import phones and routers into Kenya",
          url: "https://tech-ish.com/2026/07/21/ca-ced-licence-phone-importers-kenya/"
        },
        {
          label: "Techweez: CA introduces distributor licence for importing ICT equipment",
          url: "https://techweez.com/2026/07/21/communications-equipment-distributor-license-kenya/"
        },
        {
          label: "The Kenyan Wall Street: CA makes new licence mandatory for ICT equipment importers",
          url: "https://kenyanwallstreet.com/ca-licence-ict-importers"
        }
      ]
    },
    {
      id: "africa-july24-nigeria-fintech-cnbc-top-500",
      slug: "nigeria-six-fintechs-cnbc-statista-top-500-2026",
      format: "business",
      title: "Six Nigerian fintechs crack the world's top 500, and it is not luck",
      seo: {
        title: "Six Nigerian fintechs on CNBC's 2026 World's Top 500 list",
        description:
          "Moniepoint, PalmPay, PiggyVest, Redtech, LemFi, and Zone made CNBC and Statista's 2026 top fintech list, over half of Africa's entries. Why Nigeria keeps dominating."
      },
      subhead:
        "Moniepoint, PalmPay, PiggyVest, Redtech, LemFi, and Zone landed on CNBC and Statista's global ranking, more than half of Africa's entire showing.",
      excerpt:
        "Six Nigerian fintechs made CNBC and Statista's 2026 World's Top Fintech Companies list, over half of Africa's 11 entries, cementing Lagos as the continent's fintech capital.",
      whyItMatters:
        "Global rankings are marketing, but they also signal where the money, talent, and trust are pooling. Nigeria's dominance shapes which African fintech products get built and funded next.",
      body: [
        "Nigeria has once again claimed the lion's share of Africa's seats at the global fintech table. Six homegrown companies, Moniepoint, PalmPay, PiggyVest, Redtech, LemFi, and Zone, were named to CNBC and Statista's 2026 World's Top Fintech Companies list. Nigeria supplied six of the 11 African companies on the ranking, more than half of the continent's entire representation. For a sector that has weathered funding winters, tighter regulation, and public scepticism, it is a loud reminder that Lagos remains the beating heart of African financial technology. Here is who made the list, why it matters, and what the mix says about where the industry is heading.",
        "## Who made the list",
        "The ranking, now in its fourth edition, is compiled by CNBC with data partner Statista and recognises 500 fintech companies drawn from more than 3,500 firms evaluated worldwide. Entries are judged across categories including payments, digital lending, wealth technology, enterprise fintech, insurtech, and regtech, so a place on the list is a claim to scale and staying power, not just buzz. Nigeria's six span several of those lanes. Moniepoint and PalmPay carry the payments and banking story that has put cards, terminals, and accounts into millions of hands. PiggyVest represents the savings and investment wave. LemFi speaks to cross-border money movement for the diaspora, Zone to blockchain-based payment infrastructure, and Redtech to the fast-growing merchant and agent economy.",
        "## The standouts",
        "Two names show why the list is more than a popularity contest. PiggyVest was recognised in the wealth technology category for the third consecutive year, a rare run of consistency in a young industry. The savings and investment platform now serves more than six million users and says it has processed over 3 trillion naira in customer payouts, numbers that describe a genuine habit, not a launch spike. Redtech, backed by Heirs Holdings, appears on the list for the first time, and the scale it brings is striking: its RedPay platform has processed roughly 33 billion dollars in transaction value since launch and operates more than 55,000 point-of-sale terminals across Nigeria. A newcomer arriving at that size tells you the merchant-payments race still has room for fresh entrants.",
        "## Why Nigeria keeps dominating",
        "Nigeria's fintech strength is not an accident of any single year. It rests on a large, young, mobile-first population, a long-standing gap in traditional banking coverage that fintechs rushed to fill, deep pools of engineering talent, and a founder culture that has learned to build for hard conditions: patchy connectivity, cash-heavy habits, and demanding regulators. Those constraints forced Nigerian fintechs to solve real problems, agent networks, offline-tolerant payments, cheap remittances, rather than copy Silicon Valley features. The result is products that travel well across the continent, which is why so many of them now expand into Kenya, Ghana, and beyond. It is also why one of them recently planted a flag in Nairobi with a local chief executive, a move we covered at [Moniepoint names Rose Muturi CEO for Kenya](/business/moniepoint-rose-muturi-kenya-ceo).",
        "## The honest caveats",
        "A global ranking is a useful signal, but it should be read with care. Lists like this lean toward scale and visibility, so they can undercount excellent smaller players and they say little about profitability, unit economics, or how a company treats its customers when a transaction fails. Nigerian fintech has also had its harder chapters: fraud pressures, disputes over fees, and regulatory tightening around lending and crypto-adjacent products. Dominance on a list is not the same as a healthy, trusted sector for the ordinary user. The more meaningful test is whether these companies keep lowering the cost and friction of moving money for the people who use them daily.",
        "## What it signals for the rest of Africa",
        "For the wider continent, Nigeria's showing sets both a benchmark and a competitive pressure. It tells investors and talent where the centre of gravity sits, which can pull funding toward Lagos and away from smaller ecosystems. But it also creates a template that founders in Nairobi, Accra, and Cairo are actively racing to match or localise, and it accelerates the pan-African expansion that puts Nigerian rails into other markets. The broader story of a maturing, consolidating African startup scene, where the strongest players scale across borders rather than staying home, is one we explored at [Nigeria's startup scene grows up, and gets stricter](/business/nigeria-startup-market-maturing-2026). This list is another data point in that same direction of travel."
      ],
      closingLine:
        "Six seats out of Africa's eleven is a statement, not a coincidence. Nigeria built its fintech lead by solving hard problems for real users, and the ranking is simply the receipt.",
      author: tim,
      publishedAt: published(24, 10),
      updatedAt: published(24, 10),
      readTime: "6 min read",
      image: {
        src: "/articles/nigeria-six-fintechs-top-500.webp",
        alt: "Flutterwave company signage mounted on the exterior of an office building.",
        credit: "CIO Africa",
        width: 1040,
        height: 520,
        type: "image/webp"
      },
      tags: [fintech, business, startups, banking, moniepoint],
      regions: [regions.nigeria],
      faq: [
        {
          question: "Which Nigerian fintechs made CNBC's 2026 top fintech list?",
          answer:
            "Moniepoint, PalmPay, PiggyVest, Redtech, LemFi, and Zone. Nigeria supplied six of the 11 African companies on CNBC and Statista's 2026 World's Top Fintech Companies list, more than half of the continent's entries."
        },
        {
          question: "How is the CNBC and Statista fintech list compiled?",
          answer:
            "Now in its fourth edition, it recognises 500 companies drawn from more than 3,500 firms evaluated worldwide, judged across categories including payments, digital lending, wealth technology, enterprise fintech, insurtech, and regtech."
        },
        {
          question: "What are the standout Nigerian companies on the list?",
          answer:
            "PiggyVest was recognised in wealth technology for the third year running, serving over six million users with more than 3 trillion naira in payouts. Redtech, backed by Heirs Holdings, is a first-timer whose RedPay platform has processed about 33 billion dollars and runs over 55,000 POS terminals."
        },
        {
          question: "Why does Nigeria dominate African fintech?",
          answer:
            "A large, young, mobile-first population, gaps in traditional banking, deep engineering talent, and a founder culture built for hard conditions. Those constraints produced products that solve real problems and travel well across the continent."
        }
      ],
      sources: [
        {
          label: "Businessday NG: Six Nigerian fintechs make CNBC, Statista's 2026 World's Top Fintech list",
          url: "https://businessday.ng/technology/article/six-nigerian-fintechs-make-cnbc-statistas-2026-worlds-top-fintech-companies-list/"
        },
        {
          label: "Technext: PiggyVest makes CNBC's World Top Fintech 2026 list for the third year",
          url: "https://technext24.com/news/piggyvest-makes-cnbcs-world-top-fintech-2026/"
        },
        {
          label: "CNBC: World's Top Fintech Companies 2026",
          url: "https://www.cnbc.com/worlds-top-fintech-companies-2026/"
        }
      ]
    },
    {
      id: "africa-july24-abuja-atu-cpl26-summit",
      slug: "abuja-african-telecommunications-union-cpl-26-summit",
      format: "news",
      title: "Africa's telecom ministers met in Abuja to write one digital rulebook",
      seo: {
        title: "Abuja ATU CPL-26 summit: Africa's unified digital strategy",
        description:
          "African ICT ministers met in Abuja for the ATU's 7th Conference of Plenipotentiaries, forging a shared line on satellite spectrum, AI, and connectivity ahead of the ITU."
      },
      subhead:
        "At the African Telecommunications Union's Conference of Plenipotentiaries, 52 member states tried to agree a common position on satellite spectrum, AI, and connectivity.",
      excerpt:
        "African ICT ministers gathered in Abuja for the ATU's 7th Conference of Plenipotentiaries, aiming for a unified continental strategy on spectrum, AI, and digital infrastructure.",
      whyItMatters:
        "Africa usually negotiates global tech rules in fragments and loses. A single, coordinated position on spectrum and satellites is how the continent gets a fair deal instead of a leftover one.",
      body: [
        "While individual countries grabbed the tech headlines this week, a quieter but arguably more consequential meeting was under way in Abuja. African ICT ministers gathered for the 7th Ordinary Session of the African Telecommunications Union Conference of Plenipotentiaries, known as CPL-26, held on 23 and 24 July 2026. The goal was less glamorous than a product launch and more important than most: to forge a shared African position on the questions that will shape the continent's digital future, from satellite spectrum to artificial intelligence, before those questions are decided at the global level. Here is what the summit was for and why a meeting of regulators matters to ordinary users.",
        "## What the ATU is and why this session mattered",
        "The African Telecommunications Union is the continent's specialised body for coordinating telecommunications and ICT policy, with 52 member states. A Conference of Plenipotentiaries is its top decision-making event, the moment when member states set the Union's direction, approve its budget, and choose its leadership. This session carried extra weight because it was tasked with strengthening the ATU's governance and financial sustainability and approving its strategic direction and programme of work for the 2027 to 2031 cycle. Delegates also elected the Union's next Secretary General and set the composition of its Administrative Council. In plain terms, the states were deciding how, and how effectively, Africa will speak as one on digital matters for the next five years.",
        "## The agenda: spectrum, satellites, and AI",
        "The substance sat in a handful of high-stakes areas. Spectrum management and satellite connectivity were central, because the airwaves that carry mobile and satellite internet are a finite resource negotiated globally, and Africa has historically arrived at those negotiations divided. The conference pushed for future-ready, technology-neutral licensing and a coordinated line on satellite spectrum, exactly the terrain where services like low-earth-orbit internet are reshaping rural access. Artificial intelligence policy, cybersecurity, digital public infrastructure, digital skills, and meaningful connectivity rounded out the agenda. The throughline is that these are no longer separate files: spectrum decisions affect connectivity, connectivity enables AI and digital services, and all of it needs a security and governance layer.",
        "## Why a unified position is the real prize",
        "The reason a coordination summit deserves attention is what happens without one. Global spectrum and standards are set at forums like the International Telecommunication Union, and a continent that turns up with 54 separate positions gets outmanoeuvred by blocs that turn up with one. By aligning ahead of the ITU's own Plenipotentiary Conference, African states improve their odds of winning spectrum allocations and regulatory terms that fit their realities, cheaper rural coverage, room for satellite operators, and space for local AI and data rules, rather than accepting terms designed elsewhere. A shared position is leverage, and leverage is how a region avoids being a price-taker in the technologies that will define the next decade.",
        "## The signals coming out of Abuja",
        "The summit produced more than speeches. Member states adopted the ATU's strategic direction and approved its budget and programme for the coming cycle, and the meeting was anchored around an Abuja Declaration on meaningful connectivity for Africa, with industry partners including the GSMA, Qualcomm, and ICANN lending support and launching connectivity initiatives alongside it. The presence of both regulators and major industry players matters, because spectrum and infrastructure only move when governments and operators are pointed the same way. As with any declaration, the test is delivery rather than the document, but the direction is a continent trying to negotiate collectively instead of one country at a time.",
        "## What it means beyond the conference hall",
        "For an ordinary user, a regulators' summit feels remote, yet its fingerprints end up on a phone bill and a signal bar. Coordinated spectrum policy influences how much data costs and whether a rural village gets coverage from a mast or a satellite. A shared AI and cybersecurity stance shapes the rules that will govern the apps and services people use daily. And a financially healthier ATU is better placed to defend African interests when the truly binding decisions are taken globally. The stories that dominate a given week are usually the launches and the funding rounds, but the quieter work of setting the rules, as with national efforts like Kenya's national AI policy at [Kenya moves to finalise a national AI policy](/news/kenya-national-ai-policy), is what decides the terrain those products compete on."
      ],
      closingLine:
        "Africa rarely loses because it lacks talent or demand. It loses when it negotiates the rules in fragments. Abuja was an attempt to show up to the table as one, and that is worth more than any single launch.",
      author: tim,
      publishedAt: published(24, 12),
      updatedAt: published(24, 12),
      readTime: "6 min read",
      image: {
        src: "/articles/africa-telecom-ministers-abuja-rulebook.webp",
        alt: "African telecommunications ministers and delegates gathered at the ATU conference in Abuja.",
        credit: "Top Africa News",
        width: 1040,
        height: 520,
        type: "image/webp"
      },
      tags: [policy, connectivity, ai, cybersecurity],
      regions: [regions.nigeria],
      faq: [
        {
          question: "What is the ATU Conference of Plenipotentiaries?",
          answer:
            "It is the top decision-making event of the African Telecommunications Union, where its 52 member states set the Union's strategic direction, approve its budget, and elect its leadership. The 7th session, CPL-26, was held in Abuja on 23 and 24 July 2026."
        },
        {
          question: "What did the Abuja summit focus on?",
          answer:
            "Strengthening the ATU's governance and finances, and forging a unified African position on satellite spectrum, spectrum management, artificial intelligence, cybersecurity, digital public infrastructure, and meaningful connectivity ahead of global negotiations."
        },
        {
          question: "Why does a unified African position matter?",
          answer:
            "Global spectrum and standards are set at forums like the ITU, where a divided continent gets outmanoeuvred. Aligning first improves Africa's chances of winning spectrum and regulatory terms that fit its realities rather than terms designed elsewhere."
        },
        {
          question: "How does this affect ordinary users?",
          answer:
            "Coordinated spectrum policy influences data costs and rural coverage, including satellite internet, while shared AI and cybersecurity rules shape the apps and services people use every day."
        }
      ],
      sources: [
        {
          label: "IT News Africa: Africa's ICT ministers open conference in Abuja",
          url: "https://www.itnewsafrica.com/2026/07/africas-ict-ministers-open-conference-in-abuja-to-decide-telecommunications-unions-future/"
        },
        {
          label: "GSMA: Abuja Declaration on meaningful connectivity for Africa and ATLAS Umoja",
          url: "https://www.gsma.com/newsroom/all-documents/gsma-welcomes-abuja-declaration-on-meaningful-connectivity-for-africa-and-joins-partners-to-launch-atlas-umoja/"
        },
        {
          label: "The Sun Nigeria: 52 African nations converge on Abuja for ICT summit",
          url: "https://thesun.ng/52-african-nations-converge-on-abuja-for-ict-summit/"
        }
      ]
    },
    {
      id: "africa-july24-south-africa-hyperdev-ai-funding",
      slug: "south-africa-hyperdev-ai-coding-startup-funding-ex-openai-google",
      format: "business",
      title: "Ex-OpenAI and Google engineers just funded a South African AI startup",
      seo: {
        title: "South Africa's HyperDev raises pre-seed from ex-OpenAI, Google team",
        description:
          "HyperDev, an AI coding platform founded by former OpenAI and Google engineers, raised over 1 million dollars in pre-seed funding as it nears 100,000 users. Why it matters."
      },
      subhead:
        "HyperDev, an AI software-development platform with an engineering base in South Africa, raised over a million dollars as ex-OpenAI and Google founders scale it.",
      excerpt:
        "South Africa's HyperDev, an AI coding platform founded by former OpenAI and Google engineers, raised over 1 million dollars in pre-seed funding as it approaches 100,000 users.",
      whyItMatters:
        "Deep-tech talent usually leaves Africa. When engineers who built ChatGPT and Gemini choose to base a company in South Africa, it flips that story and signals where AI value can be created locally.",
      body: [
        "The most interesting African tech story of the week was not a payment or a policy. It was a small pre-seed round with an outsized signal attached. HyperDev, a generative-AI software-development platform with its engineering base in South Africa, raised more than 1 million dollars, roughly 15 to 16 million rand, as it approaches 100,000 users. What makes it notable is not the sum, which is modest, but the pedigree behind it: HyperDev was founded by engineers who worked at OpenAI and Google, the two companies that defined the current AI era. When talent like that chooses to build from South Africa, it says something about where deep-tech value can now be created on the continent.",
        "## What HyperDev does",
        "HyperDev sits in the fast-moving category of AI coding tools, but with a specific bet. Rather than just generating snippets, it aims to take AI-written code all the way to a working, deployed application through a proprietary Guided Mode, and it targets both professional developers and non-technical users who want to turn an idea into software without a traditional engineering team. That positioning matters in an African context, where the shortage is not ambition but scarce, expensive developer time. A tool that lets a small business or a solo founder ship a working app is not a novelty here; it is a lever on a real constraint.",
        "## The founders and the funding",
        "The people behind the company are the headline. Co-founder Riaz Moola previously worked at Google on AI methods used in Gemini, and chief technical officer Piotr Sobolewski is a former OpenAI employee who worked on ChatGPT, alongside co-founder Anton Moulder. The company keeps an engineering base in South Africa while running commercial operations across the United Kingdom and Europe, a hybrid shape that is becoming common for globally ambitious African-linked startups. The pre-seed round, backed by investors from Europe and the United Kingdom, is designed to scale the platform as user numbers climb toward six figures. It is early-stage money, but early-stage money attached to that kind of engineering experience tends to attract more.",
        "## Why the talent signal matters more than the cheque",
        "For years the dominant story about African deep-tech talent has been departure: the best engineers leaving for San Francisco, London, or Berlin, and their value being created elsewhere. HyperDev partially inverts that. It keeps serious AI engineering rooted in South Africa, it builds a globally competitive product from there, and it puts people who have worked at the frontier of the field into the local ecosystem where they mentor, hire, and inspire. That is how deep-tech clusters actually form, not through a single funding announcement but through concentrations of experienced people choosing to build in one place. The cheque is small; the precedent is not.",
        "## The wider South African funding picture",
        "HyperDev is not an isolated bright spot. South Africa's venture scene has been showing signs of maturity beyond the headline raise, with pan-African firm Launch Africa Ventures recently returning capital to investors as its first seed fund hit a distributions milestone, a sign that the ecosystem is starting to produce not just startups but returns. Momentum in AI, HR technology, and fintech has continued through the year, and public and corporate investment in local AI and cloud capacity has added to the base, a trend we tracked in Microsoft's South African cloud and AI investment at [Microsoft expands cloud and AI capacity in South Africa](/news/microsoft-south-africa-cloud-ai-investment). A funding round lands differently when it sits on top of that kind of groundwork.",
        "## The honest caveats",
        "Enthusiasm should come with a cold eye. A pre-seed round is the very start of a long and failure-prone journey, and AI coding tools are a crowded, fast-moving field where global giants ship competing features weekly. Founder pedigree improves the odds but guarantees nothing, and user growth toward 100,000 is promising rather than proven as a business. The right way to read this is not as a finished success but as a signal: that world-class AI talent will now build from South Africa, that investors will back it, and that the continent can be a place where frontier software is made and not only consumed. That signal, sustained, is worth far more than any single round."
      ],
      closingLine:
        "The money here is small and the road is long, but the message is large: the people who built the tools everyone else is racing to use are now building from South Africa. That is the kind of story a tech ecosystem grows around.",
      author: lulu,
      publishedAt: published(24, 13),
      updatedAt: published(24, 13),
      readTime: "6 min read",
      image: {
        src: "/articles/south-africa-hyperdev-ai-startup.webp",
        alt: "A HyperDev executive standing in front of the South African AI startup's logo.",
        credit: "HyperDev",
        width: 1040,
        height: 520,
        type: "image/webp"
      },
      tags: [ai, startups, business, openai, google],
      regions: [regions.southAfrica],
      faq: [
        {
          question: "What is HyperDev?",
          answer:
            "HyperDev is a generative-AI software-development platform with an engineering base in South Africa. It uses a Guided Mode to take AI-generated code all the way to a deployed application, targeting both developers and non-technical users."
        },
        {
          question: "Who founded HyperDev?",
          answer:
            "It was founded by Riaz Moola, who worked at Google on AI methods used in Gemini, Piotr Sobolewski, a former OpenAI engineer who worked on ChatGPT, and Anton Moulder. The company keeps engineering in South Africa with commercial operations in the UK and Europe."
        },
        {
          question: "How much did HyperDev raise?",
          answer:
            "More than 1 million dollars, roughly 15 to 16 million rand, in pre-seed funding from investors in Europe and the United Kingdom, as the platform approaches 100,000 users."
        },
        {
          question: "Why does this matter for South Africa?",
          answer:
            "It keeps frontier AI engineering talent rooted locally rather than lost to overseas hubs, and it signals that globally competitive deep-tech products can be built from South Africa, which is how deep-tech clusters form."
        }
      ],
      sources: [
        {
          label: "Disrupt Africa: SA AI coding platform HyperDev raises $1m pre-seed",
          url: "https://disruptafrica.com/2026/07/08/sa-ai-coding-hyperdev-platform-raises-1m-pre-seed-funding/"
        },
        {
          label: "TechBuild Africa: Former OpenAI and Google talent raise $1M for HyperDev",
          url: "https://techbuild.africa/openai-google-talent-1m-sas-ai-coding-hyperdev/"
        },
        {
          label: "Bizcommunity: SA-linked AI coding startup raises R16m in pre-seed",
          url: "https://www.bizcommunity.com/article/sa-linked-ai-coding-startup-raises-r16m-in-pre-seed-funding-953374a"
        }
      ]
    },
    {
      id: "africa-july24-south-africa-nesa-power-solar-ppa",
      slug: "south-africa-nesa-power-solar-ppa-maia-capital-funding",
      format: "business",
      title: "A R150 million solar bet on the grid South Africa cannot rely on",
      seo: {
        title: "Nesa Power raises R150m to expand commercial solar in South Africa",
        description:
          "Nesa Power secured about R150 million, roughly 9 million dollars, from Maia Capital to expand its commercial and industrial solar PPA portfolio amid grid instability."
      },
      subhead:
        "Nesa Power raised roughly 150 million rand to grow its commercial and industrial solar, betting that unreliable municipal power keeps businesses hungry for their own supply.",
      excerpt:
        "Nesa Power secured about 150 million rand, roughly 9 million dollars, in mezzanine debt from Maia Capital to expand commercial and industrial solar under long-term PPAs.",
      whyItMatters:
        "When the public grid is unreliable, private power becomes infrastructure. Deals like this quietly rewire who keeps South African factories and offices running, and on what terms.",
      body: [
        "One of the week's most telling African deals was not a consumer app but a piece of energy plumbing. Nesa Power, a South African commercial and industrial renewable energy company, secured roughly 150 million rand, about 9 million dollars, in mezzanine debt funding from Maia Capital Partners. The money is growth capital to buy solar assets and expand the company's portfolio of long-term power purchase agreements. It is not a flashy number, but it sits at the centre of a bigger South African story: as the public grid stays unreliable, businesses are increasingly buying their electricity from private solar developers instead, and investors are funding the shift.",
        "## What the deal actually funds",
        "Nesa develops integrated renewable energy for commercial and industrial customers, combining solar generation and battery storage under long-term power purchase agreements, or PPAs. Under a PPA, the developer builds and owns the solar system and the customer simply buys the power it produces, usually at a rate designed to beat the grid, with no large upfront cost to the business. The new funding, provided through the Maia Debt Impact Fund I, is meant to acquire more solar photovoltaic assets and grow that PPA book. The company says it has already built more than 46 megawatts of solar capacity and 6.5 megawatt-hours of battery storage, and has raised over 400 million rand through managed funds that own and operate more than 70 commercial and industrial solar assets. This round is fuel for more of the same.",
        "## Why businesses are going solar in South Africa",
        "The driver is not primarily green idealism; it is reliability and cost. South African enterprises have spent years contending with load-shedding and unstable municipal power, which is expensive and unpredictable in a way that punishes anyone trying to run a factory, a cold chain, or a data-heavy office. A solar-plus-storage PPA offers something the grid struggles to promise: power that is cheaper, cleaner, and, crucially, there when you flip the switch. For a commercial customer, escaping even part of that uncertainty is worth a long-term contract. That is why the commercial and industrial solar segment has become one of the most investable corners of South African cleantech, and why a developer with a proven build record can attract debt to scale.",
        "## The mezzanine-debt signal",
        "The structure of the deal is itself a signal worth reading. This is not a speculative equity punt on an idea; it is mezzanine debt, a form of financing that sits between senior loans and equity and typically flows to companies with real assets and predictable cash flows. Investors lend against solar systems that are already generating revenue under signed PPAs. When impact-focused debt funds are willing to back commercial solar at this scale, it means the asset class is maturing from pioneering bet to bankable infrastructure. That maturation is what ultimately lowers the cost of capital, which in turn lets developers offer cheaper power to more customers, a virtuous loop the sector needs.",
        "## Where the risks sit",
        "None of this is risk-free. Commercial solar depends on customers staying solvent and honouring long contracts, on regulatory and grid-connection rules that can shift, and on the economics holding as more developers compete for the same rooftops and industrial parks. Battery costs, currency swings on imported hardware, and municipal politics around who may sell power to whom all shape the returns. And private power, useful as it is, can deepen a two-tier reality in which businesses and wealthier users buy their way off an unreliable grid while everyone else stays on it. Solving the underlying public-grid problem still matters, even as private solar races ahead.",
        "## The bigger picture",
        "Read in the round, the Nesa deal is part of a broader flow of capital into African cleantech and climate-focused infrastructure, the same current that has been backing funds and developers across the southern part of the continent, as we noted with the Holocene climate-tech fund at [Southern Africa gets its first dedicated climate-tech fund](/business/holocene-southern-africa-climate-tech-fund). The pattern is consistent: where public systems fall short, private and blended capital steps in to build the reliable, lower-carbon alternative, one PPA at a time. It is slower and less visible than a product launch, but it is arguably the most durable kind of tech story, the kind that keeps the lights on."
      ],
      closingLine:
        "The most important energy story in South Africa is not a new gadget. It is capital quietly deciding that private solar is now infrastructure, and building it while the public grid keeps everyone guessing.",
      author: tim,
      publishedAt: published(24, 15),
      updatedAt: published(24, 15),
      readTime: "6 min read",
      image: {
        src: unsplash("photo-1509391366360-2e959784a276"),
        alt: "Rows of solar panels under a bright sky. Credit: Unsplash.",
        credit: "Unsplash"
      },
      tags: [climateTech, energy, business, startups],
      regions: [regions.southAfrica],
      faq: [
        {
          question: "How much did Nesa Power raise and from whom?",
          answer:
            "About 150 million rand, roughly 9 million dollars, in mezzanine debt from Maia Capital Partners, provided through the Maia Debt Impact Fund I, as growth capital to acquire solar assets and expand its power purchase agreement portfolio."
        },
        {
          question: "What is a solar power purchase agreement?",
          answer:
            "Under a PPA, a developer builds and owns a solar system and the customer buys the electricity it produces, usually at a rate designed to beat the grid, with little or no upfront cost to the business."
        },
        {
          question: "Why are South African businesses turning to private solar?",
          answer:
            "Because the public grid has been unreliable and expensive due to load-shedding. A solar-plus-storage PPA offers power that is cheaper, cleaner, and more dependable, which is worth a long-term contract to a commercial customer."
        },
        {
          question: "What are the risks of this model?",
          answer:
            "Customer solvency over long contracts, shifting grid and regulatory rules, competition compressing returns, hardware and currency costs, and the risk that private power deepens a two-tier system while the public grid problem remains unsolved."
        }
      ],
      sources: [
        {
          label: "Mercom Capital: Nesa Power secures $9 million debt funding from Maia Capital Partners",
          url: "https://mercomcapital.com/nesa-power-secures-9-million-debt-funding-from-maia-capital-partners/"
        },
        {
          label: "SolarQuarter: Nesa Power secures ZAR 150 million for commercial solar and storage",
          url: "https://solarquarter.com/2026/07/06/nesa-power-secures-zar-150-million-to-accelerate-commercial-solar-and-battery-storage-expansion/"
        },
        {
          label: "Green Building Africa: Maia Capital backs Nesa Power with R150 million mezzanine financing",
          url: "https://www.greenbuildingafrica.co.za/maia-capital-partners-backs-nesa-power-with-r150-million-mezzanine-financing/"
        }
      ]
    },
    {
      id: "africa-july24-uber-glovo-antitrust-africa",
      slug: "uber-glovo-delivery-hero-african-antitrust-reviews",
      format: "business",
      title: "Uber's Glovo deal now faces the part regulators care about: antitrust",
      seo: {
        title: "Uber-Glovo deal faces African antitrust reviews: what to expect",
        description:
          "Uber's 14.8 billion dollar move for Delivery Hero puts Glovo and Uber Eats under one roof. Kenya, Nigeria, and North African regulators are lining up antitrust reviews."
      },
      subhead:
        "Uber's move for Delivery Hero would put Glovo and Uber Eats under one roof across Africa. Now competition regulators from Nairobi to North Africa get their say.",
      excerpt:
        "Uber's 14.8 billion dollar acquisition of Glovo parent Delivery Hero faces antitrust scrutiny across Kenya, Nigeria, and North Africa, where it would merge the top delivery rivals.",
      whyItMatters:
        "When two of the biggest delivery apps merge, riders, restaurants, and shoppers feel it in commissions, fees, and prices. Whether regulators push back decides how much.",
      body: [
        "The headline deal has been announced. Now comes the part that actually shapes what customers pay. Uber's roughly 14.8 billion dollar agreement to acquire Delivery Hero, the German parent of Glovo, would fold Glovo's African operations directly into Uber's delivery network. In several markets that means the leading delivery app and one of its biggest rivals, Uber Eats, ending up under a single corporate roof. That is precisely the situation competition regulators exist to examine, and authorities across Kenya, Nigeria, and North Africa are now preparing antitrust reviews. We explained the deal itself and what it means for Kenyan customers at [Uber is buying Glovo's owner. What it means for Kenya](/business/uber-buys-delivery-hero-glovo-kenya); this is what happens next.",
        "## Why this deal triggers antitrust alarms",
        "Merger review is about market power, and the numbers here are exactly the kind that make regulators lean forward. In Kenya, the Competition Authority's most recent market study put Glovo's share of food delivery at 33 percent and its share of grocery delivery at 46 percent, well ahead of Uber Eats, Jumia Food, and Bolt Food. Combining the leader with a major challenger removes a competitor from a concentrated market in one stroke. The worry is not abstract. Less competition in delivery can translate into higher commissions charged to restaurants and shops, higher fees or prices for customers, and weaker bargaining power for the riders who do the actual work. Those are the pressure points a review will probe.",
        "## The mitigation, and the gap in it",
        "Uber has structured the global deal to soften antitrust concerns, but the fix is uneven. A separate New York investment firm, SSW Partners, will buy 14 mostly European markets where Uber and Delivery Hero overlap most heavily, for about 1.4 billion euros, carving out the places regulators would object to most loudly. The revealing detail for African readers is what was left out: Kenya was not included in that divestment, even though Uber Eats already competes with Glovo there. Under the deal, Uber keeps Delivery Hero's operations across some 50 markets, including Kenya, Uganda, Nigeria, Morocco, and Ivory Coast, a footprint that generated roughly 42 billion dollars in gross merchandise value last year. In other words, the overlaps that were cleaned up in Europe remain live in Africa, which is exactly why local regulators are the ones who now matter.",
        "## What the regulators can actually do",
        "Competition authorities are not limited to a simple yes or no. A body like the Competition Authority of Kenya, and its counterparts in Nigeria and North Africa, can approve the local transaction, block it, or, most commonly, approve it with conditions. Those conditions can include caps or commitments on commission rates, protections for restaurant and rider terms, requirements to keep certain brands or services operating separately, or behavioural undertakings that expire after a set period. The global deal is expected to finalise in the second half of 2027, which gives regulators time to study the local markets and negotiate remedies. The outcome that matters to users is less whether the deal closes and more what strings get attached to it.",
        "## What it means for riders, restaurants, and shoppers",
        "For the people who live inside these apps, the stakes are concrete. Riders worry that a dominant platform has less reason to compete on payouts and incentives. Restaurants and small shops fear higher commissions eating already thin margins, since delivery commissions are one of their largest controllable costs. Shoppers care about delivery fees, service charges, and whether the discounts that came from two apps fighting for them quietly disappear. None of these outcomes is guaranteed, competition can persist through new entrants and other platforms, but consolidation historically shifts leverage toward the platform. That shift is the reason a merger announced in a boardroom ends up being argued over by regulators.",
        "## The bigger pattern",
        "This is the mature phase of a story that began as convenience. Ride-hailing and delivery apps won users by removing uncertainty, then spent years subsidising growth, and are now consolidating into a few large players whose economics have to work without endless discounts, a shift we traced in what changed after the ride-hailing hype faded at [What ride-hailing apps changed after the hype faded](/business/what-ride-hailing-apps-changed-after-the-hype-faded). The Uber and Delivery Hero tie-up is that consolidation reaching quick-commerce and food delivery on a global scale. Whether African markets end up with a healthy, competitive delivery sector or a single dominant gatekeeper will be decided less by the deal's press release and more by how firmly regulators from Nairobi to North Africa use the leverage they still hold."
      ],
      closingLine:
        "The merger grabbed the headlines, but the real story is the review. Whatever conditions Kenyan, Nigerian, and North African regulators attach will decide what riders earn, what restaurants pay, and what a delivery costs long after the ink dries.",
      author: tim,
      publishedAt: published(24, 17),
      updatedAt: published(24, 17),
      readTime: "6 min read",
      image: {
        src: "/articles/uber-glovo-antitrust-africa.webp",
        alt: "Uber and Glovo branding shown alongside a Glovo delivery rider and an Uber car.",
        credit: "MWN",
        width: 1040,
        height: 520,
        type: "image/webp"
      },
      tags: [business, policy, quickCommerce, eCommerce, uber, glovo],
      regions: [regions.kenya, regions.nigeria],
      faq: [
        {
          question: "Why does Uber's Glovo deal face antitrust reviews in Africa?",
          answer:
            "Because it would put the leading delivery app, Glovo, and a major rival, Uber Eats, under one roof in several markets. In Kenya, Glovo held 33 percent of food delivery and 46 percent of grocery delivery, so combining them concentrates the market."
        },
        {
          question: "Was Africa included in Uber's antitrust divestment?",
          answer:
            "No. SSW Partners is buying 14 mostly European markets for about 1.4 billion euros to ease antitrust concerns, but Kenya was left out even though Uber Eats competes with Glovo there. Uber keeps Delivery Hero's operations across about 50 markets, including Kenya, Nigeria, and Morocco."
        },
        {
          question: "What can competition regulators do about the deal?",
          answer:
            "They can approve it, block it, or approve it with conditions such as caps on commissions, protections for riders and restaurants, or requirements to keep certain services separate. The global deal is expected to close in the second half of 2027."
        },
        {
          question: "How could the merger affect customers and riders?",
          answer:
            "Less competition can mean higher commissions for restaurants and shops, higher fees for shoppers, and weaker bargaining power for riders. Outcomes are not guaranteed, but consolidation historically shifts leverage toward the platform."
        }
      ],
      sources: [
        {
          label: "HapaKenya: What the Uber acquisition of Glovo means for Kenyan customers",
          url: "https://hapakenya.com/2026/07/23/what-the-uber-acquisition-of-glovo-means-for-kenyan-customers/"
        },
        {
          label: "Techweez: Uber acquires Glovo, its biggest rival in Kenya's delivery market",
          url: "https://techweez.com/2026/07/17/uber-acquires-glovo-kenya-delivery-hero/"
        },
        {
          label: "Launch Base Africa: Uber to acquire Glovo and Talabat's African operations",
          url: "https://launchbaseafrica.com/2026/07/16/uber-to-acquire-glovo-and-talabats-african-operations-under-delivery-heros-16-9bn-takeover/"
        }
      ]
    }
  ];
}
