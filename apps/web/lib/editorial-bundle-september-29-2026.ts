import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type BuildArgs = { authors: Author[]; topics: Tag[]; brands: Tag[]; regions: RegionTerm[] };

type Story = {
  slug: string;
  format: Article["format"];
  title: string;
  seoTitle: string;
  description: string;
  focusKeyphrase: string;
  secondaryKeywords: string[];
  whyItMatters: string;
  body: string[];
  image: Article["image"];
  topicSlugs: string[];
  brandSlugs: string[];
  regionSlugs?: string[];
  sources: NonNullable<Article["sources"]>;
};

const publishedAt = [
  "2026-09-29T07:10:00+03:00",
  "2026-09-29T07:35:00+03:00",
  "2026-09-29T08:00:00+03:00",
  "2026-09-29T08:25:00+03:00",
  "2026-09-29T08:50:00+03:00",
  "2026-09-29T09:15:00+03:00",
  "2026-09-29T09:40:00+03:00",
  "2026-09-29T10:05:00+03:00",
  "2026-09-29T10:30:00+03:00",
  "2026-09-29T10:55:00+03:00",
  "2026-09-29T11:20:00+03:00"
];

const reviewedAt = "2026-09-29T12:00:00+03:00";

const stories: Story[] = [
  {
    slug: "nio-geely-battery-swap-deal-30-percent-nio-power",
    format: "business",
    title: "Geely Is Buying 30% of NIO Power, but the Battery-Swap Networks Are Not Simply Merging",
    seoTitle: "NIO and Geely Battery Swap Deal: What the 30% Stake Means",
    description: "Geely will contribute Yiyi Power and RMB640 million for 30% of NIO Power, while NIO takes 10% of Haohan Energy. Here is what the deal does and does not combine.",
    focusKeyphrase: "NIO Geely battery swap deal",
    secondaryKeywords: ["NIO Power 30 percent stake", "Geely Yiyi Power", "Haohan Energy", "battery swapping China"],
    whyItMatters: "The transaction gives two major Chinese automotive groups shared financial incentives around charging and swapping, without instantly turning their different networks into one universal system.",
    body: [
      "NIO and Geely Holding have signed a pair of linked transactions that could reshape battery swapping in China. Geely will contribute all of Yiyi Internet Technology, its commercial battery-swap operator, plus RMB640 million in cash for newly issued shares in NIO Power. If the deal clears its regulatory and closing conditions, Geely will own 30% of NIO Power. NIO China will remain in control with 63.6%, while an existing Wuhan investor will hold the remaining 6.4%.",
      "The headline is easy to compress into a network merger, but that description goes further than the companies have announced. This is an equity investment and asset contribution, backed by preliminary plans for wider technology adoption and service cooperation. It is not a promise that every Geely vehicle will immediately work at every NIO swap station, or that every station will move onto a single operating platform on day one.",
      "## What Geely is putting into NIO Power",
      "Yiyi Internet Technology serves commercial mobility customers, a market that includes vehicles that travel far more frequently than a typical private car. That operating experience matters because commercial fleets judge a swap network by uptime, location, battery availability and cost per kilometre. Geely is transferring the entire business and adding cash, while receiving a stake in a much larger NIO Power platform valued at about RMB16 billion after the transaction.",
      "The 30% figure is not necessarily permanent. NIO's announcement says Geely's holding can be adjusted downward if specified operational milestones are missed, although it cannot fall below 20%. Geely also receives an option to invest another RMB640 million within a defined period. Without a post-closing adjustment, that second investment would raise its holding to 34% and leave NIO China with 60%.",
      "## Why the Haohan Energy investment is separate",
      "At the same time, NIO China plans to subscribe for a 10% stake in Geely's Haohan Energy charging business. The cash from that subscription is intended to help Haohan buy certain charging assets from NIO. The structure therefore creates cross-ownership around both swapping and charging, but it does not place Haohan inside NIO Power or establish a single combined company for every energy asset.",
      "That distinction matters to drivers. Charging can be opened across brands with familiar connectors and software integration. Battery swapping demands agreement on pack dimensions, mounting points, high-voltage architecture, thermal systems, communications and safety validation. The companies say they have preliminary plans to extend swap technology and related services to Geely-linked consumer and commercial vehicles. The final vehicle programmes still require more discussion.",
      "## What changes for the battery-swap business",
      "NIO gains cash, a commercial-fleet swapping operator and a large strategic shareholder. Geely gains exposure to an established network without having to duplicate every site, operations team and software layer. Both sides also gain a reason to develop shared technical standards. That could improve station utilisation, which is central to the economics of any capital-intensive energy network.",
      "The transaction also places a market value on NIO Power. A post-money valuation of roughly RMB16 billion gives investors a clearer reference point for an operation that has often been discussed as strategic infrastructure rather than as a standalone business. It does not, by itself, prove profitability. Station construction, land access, battery inventory and maintenance remain expensive, and utilisation varies by location.",
      "For consumers, the practical test will come later: which Geely models support the system, how many stations accept them, whether booking and payment work across brands, and whether swap availability remains reliable at busy times. Until those details are published, the most accurate description is a deep strategic transaction with plans for interoperability, not a completed universal merger of China's swapping networks."
    ],
    image: {
      src: "/articles/nio-battery-swap-4000.webp",
      alt: "A NIO battery swap station representing the infrastructure involved in the NIO and Geely transaction.",
      caption: "NIO and Geely are creating cross-holdings around battery swapping and charging, while the technical rollout across vehicle brands remains subject to further agreements.",
      credit: "NIO",
      width: 1040,
      height: 520,
      type: "image/webp"
    },
    topicSlugs: ["evs-mobility", "battery-swap", "ev-infrastructure", "china", "business"],
    brandSlugs: ["nio"],
    sources: [
      { label: "NIO: definitive agreements with Geely in battery swapping and charging", url: "https://ir.nio.com/node/12051/pdf" },
      { label: "HKEX: NIO company announcements", url: "https://www1.hkexnews.hk/search/titlesearch.xhtml?lang=en" }
    ]
  },
  {
    slug: "kenya-ev-duty-free-incentives-local-assembly-kam",
    format: "business",
    title: "Kenya's Manufacturers Want Duty-Free EV Incentives to Reward Local Assembly",
    seoTitle: "KAM Wants Kenya EV Duty-Free Rules Tied to Local Assembly",
    description: "KAM says Kenya's planned duty-free EV programme should favour locally assembled models where domestic production already exists. The job and industrial-policy stakes are substantial.",
    focusKeyphrase: "Kenya EV duty-free local assembly",
    secondaryKeywords: ["Kenya Association of Manufacturers EV", "KAM local assembly", "Kenya electric vehicles", "100000 duty-free EVs"],
    whyItMatters: "Kenya can use rising electric-vehicle demand either mainly to import finished products or to build assembly, component and service capacity that keeps more value in the local economy.",
    body: [
      "The Kenya Association of Manufacturers is asking the government to connect planned electric-vehicle tax incentives to domestic production. In a September 24 position article, KAM chief executive Tobias Alando argued that duty-free treatment for the first 100,000 imported EVs should support locally assembled vehicles in categories where Kenyan factories already have capacity. The proposal is narrower than a blanket ban on finished imports, but it would make industrial participation part of the incentive design.",
      "KAM's concern is straightforward. Removing import duty can lower the price of electric vehicles and accelerate adoption. If the benefit applies equally to fully built vehicles and locally assembled models, however, the immediate price signal may reward overseas production more than Kenyan investment. An importer can avoid the time, capital and supplier development required to assemble vehicles locally, while still receiving the same tax advantage.",
      "## What KAM is proposing",
      "The manufacturers' group says Kenya should encourage domestic assembly wherever production is already viable. Electric motorcycles are currently being assembled with 15% to 30% local content, according to KAM. Electric buses are being assembled from completely knocked down kits, and passenger-vehicle assembly is beginning to develop. A targeted framework could use eligibility rules, local-content milestones and job commitments to favour businesses that deepen those operations.",
      "KAM estimates that assembling 100,000 vehicles locally could support about 6,300 jobs in the early years and roughly 12,500 jobs as the industry matures. Its preliminary analysis says local assembly could retain about KES12.2 billion in value each year. Under a fully built import model, KAM estimates about 400 jobs and KES6.9 billion in retained local value. Those are advocacy estimates, not guaranteed outcomes, but they clarify the trade-off the group wants policymakers to address.",
      "## The affordability problem cannot be ignored",
      "An assembly condition can support factories, but a poorly designed rule can also raise prices or reduce choice. Local plants need sufficient volume to spread equipment, quality-control and training costs across many vehicles. If qualifying models are too expensive, buyers may postpone the switch from petrol. If requirements rise faster than suppliers can respond, firms may satisfy paperwork without creating meaningful domestic value.",
      "The strongest version of the policy would therefore be staged and transparent. Vehicle categories with existing Kenyan capacity could receive a higher benefit for local assembly. New categories could receive a transition period. Published definitions would need to distinguish basic assembly from deeper manufacturing, while predictable milestones would give investors time to build battery, wiring, software, plastics and maintenance capabilities.",
      "## Why electric motorcycles and buses matter first",
      "Kenya's most immediate e-mobility opportunity is not limited to private cars. Motorcycles cover high daily distances, making energy savings more visible and supporting frequent use of battery-swap networks. Buses offer another high-utilisation segment where local body building, fleet maintenance and depot charging can create jobs. These categories can generate demand for technicians and suppliers before mass-market electric passenger cars reach similar scale.",
      "KAM says more than $400 million has already been invested across vehicle assembly, batteries, charging infrastructure and related services. The next policy decision can either reinforce that base or expose it to a wave of subsidised finished imports. Buyers still need safe vehicles, warranties, spare parts and competitive prices, so local production should be treated as a means to build a durable market rather than an end in itself.",
      "The central question is not whether Kenya should welcome electric vehicles. It is how much of the value created by that transition should remain in the country. Linking some incentives to verifiable production, without closing the market or making clean mobility unaffordable, is the balance the government now has to design."
    ],
    image: {
      src: "/articles/september24/epra-ev-charging-tariffs.webp",
      alt: "An electric vehicle connected to a Kenya Power charging station in Kenya.",
      caption: "Kenya's planned EV incentives are prompting a debate over how to balance lower vehicle prices with domestic assembly and job creation.",
      credit: "Kenya Power",
      width: 1040,
      height: 520,
      type: "image/webp"
    },
    topicSlugs: ["evs-mobility", "manufacturing", "policy", "kenya", "business"],
    brandSlugs: [],
    regionSlugs: ["kenya"],
    sources: [
      { label: "Kenya Association of Manufacturers: Kenya's opportunity to build the e-mobility sector is now", url: "https://kam.co.ke/opinion-pieces/kenya-opportunity-e-mobility-sector" },
      { label: "KAM: Powering Kenya's Electric Mobility Future", url: "https://kam.co.ke/reports/Powering-Kenyas-Electric-Mobility-Future-2025-Wins-Challenges-and-Strategic-Priorities.pdf" }
    ]
  },
  {
    slug: "ramp-accounts-receivable-pagaya-460-million-facility",
    format: "business",
    title: "Ramp Is Expanding Into Accounts Receivable as Pagaya Secures a Separate $460 Million Facility",
    seoTitle: "Ramp Launches Accounts Receivable as Pagaya Closes $460M Facility",
    description: "Ramp has launched software for invoicing, follow-ups and payment matching. Separately, Pagaya closed a $460 million revolving personal-loan facility. Here is why both moves matter.",
    focusKeyphrase: "Ramp Accounts Receivable",
    secondaryKeywords: ["Ramp AR launch", "Pagaya 460 million facility", "finance automation", "accounts receivable software"],
    whyItMatters: "The two announcements show different sides of the same fintech shift: software companies want to automate more of a business's cash cycle, while credit platforms need durable capital structures behind their models.",
    body: [
      "Ramp has moved beyond managing money that companies spend. Its new Accounts Receivable product is designed to handle the work between a signed customer agreement and cash arriving in the bank. The software can turn contracts and purchase orders into draft invoices, prepare payment follow-ups, match deposits to open invoices and keep accounting records aligned with an enterprise resource planning system.",
      "On the same date, September 22, Pagaya announced a separate $460 million revolving personal-loan facility. The timing connects the two stories as a view of modern financial infrastructure, but the companies did not announce a joint transaction. Ramp's release concerns business software for collecting invoices. Pagaya's release concerns committed institutional capital backing consumer loans originated through its network.",
      "## What Ramp AR actually automates",
      "Accounts receivable is often described as sending an invoice and waiting for payment. In practice, finance teams must copy terms from contracts, confirm purchase orders, apply negotiated prices, chase missing approvals, identify deposits and post the correct entry in an accounting system. The work becomes harder when one customer has several invoices, partial payments or unusual billing schedules.",
      "Ramp says its product reads source documents and prepares an invoice draft for review. It then gives finance staff the context needed to edit and send follow-ups, rather than automatically contacting customers without oversight. When money arrives, the system attempts to match the deposit to an open invoice and synchronise the result with the company's records. The value is less about a new dashboard and more about removing repeated data entry across several tools.",
      "Ramp is entering a crowded market that includes billing platforms, enterprise accounting suites and specialist collections products. Its advantage is that many customers already use Ramp for cards, expenses, procurement, accounts payable, travel and banking. Adding receivables can give a finance team one operating layer for both outgoing and incoming cash. The risk is that an all-in-one platform must be as dependable at each job as focused products are.",
      "## Pagaya's $460 million facility is a different kind of infrastructure",
      "Pagaya's PAID 2026-REV1 facility starts at $460 million and has a 24-month revolving period. The company says the structure can deploy about $850 million in total capital because excess cash can be reinvested in new eligible collateral during that period. The facility is backed by consumer loans originated through Pagaya's network, not by unpaid Ramp invoices.",
      "For an AI credit platform, committed funding is as important as its underwriting models. A model can identify borrowers or price risk, but loans still require capital. Revolving structures can provide longer-duration capacity and reduce the need to arrange a completely new funding transaction for every pool of originations. Institutional investors, meanwhile, receive defined exposure to a portfolio governed by the facility's eligibility and performance rules.",
      "## Why the announcements belong in one conversation",
      "Both companies are trying to control friction between a financial decision and the movement of money. Ramp is reducing the manual work after a business sale. Pagaya is expanding the capital mechanism behind consumer lending. Neither announcement eliminates credit risk, disputes, fraud or human review. Automation changes where staff spend time, but finance teams remain responsible for approvals, exceptions and the accuracy of the underlying documents.",
      "The broader direction is clear. Business fintech is moving from single-purpose products toward systems that coordinate an entire workflow. The winners will not be determined by how many features appear on a product page. They will be determined by reliable integrations, accurate matching, audit trails, security and whether finance teams can understand and correct the software's decisions."
    ],
    image: {
      src: "/articles/african-fintech-mergers-acquisitions-consolidation.jpg",
      alt: "A fintech exhibition scene used to illustrate financial software and capital-market infrastructure.",
      caption: "Ramp's receivables software and Pagaya's revolving facility address different parts of the modern finance stack.",
      credit: "tecMAMBO",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    topicSlugs: ["fintech", "business", "banking", "ai"],
    brandSlugs: [],
    sources: [
      { label: "Ramp: Introducing Ramp Accounts Receivable", url: "https://ramp.com/blog/introducing-accounts-receivable" },
      { label: "Pagaya: $460 million revolving personal-loan facility", url: "https://investor.pagaya.com/static-files/36b0264c-c594-4253-83c9-5a8c6bdad6b0" }
    ]
  },
  {
    slug: "ps5-update-26-06-14-00-00-pssr-community-widget",
    format: "news",
    title: "PS5 Update 26.06 Makes Enhanced PSSR the Default on PS5 Pro and Adds Better Voice-Chat Cues",
    seoTitle: "PS5 Update 26.06: PSSR Default, Voice Chat and Community Widget",
    description: "Sony's PS5 firmware 26.06-14.00.00 turns on enhanced PSSR by default on PS5 Pro, adds speaker indicators and expands the Welcome Hub with community activity.",
    focusKeyphrase: "PS5 update 26.06-14.00.00",
    secondaryKeywords: ["enhanced PSSR default", "PS5 Pro update", "PS5 voice chat speaker indicator", "Community Activity widget"],
    whyItMatters: "Sony is using a system update to make its upgraded AI upscaler the normal experience on PS5 Pro, while adding practical interface features for multiplayer users.",
    body: [
      "Sony's PlayStation 5 system software version 26.06-14.00.00 is more substantial than a routine stability patch. On PS5 Pro, the update switches on Enhance PSSR Image Quality by default. It also adds an on-screen indicator for the person speaking in voice chat and introduces a Community Activity widget in the Welcome Hub. The update began reaching consoles on September 16, 2026.",
      "The PSSR change applies only to PS5 Pro. Standard PS5 owners receive the interface and system improvements but do not gain the Pro console's AI upscaling hardware feature. Sony also keeps a manual off switch under Settings, Screen and Video, Video Output, so players can compare the enhanced mode with the previous behaviour if a game produces an unwanted result.",
      "## What the default PSSR setting changes",
      "PlayStation Spectral Super Resolution analyses game frames and reconstructs a higher-resolution image from a lower internal resolution. That can let a developer target a higher frame rate while presenting a sharper output. Sony released its upgraded version in March 2026 and allowed owners to enable it for supported games, including titles originally built around the earlier PSSR implementation.",
      "Version 26.06 changes the starting point. Once the system software is installed, Enhance PSSR Image Quality is on by default. Games that supported the previous version can therefore use the enhanced reconstruction without every owner finding the setting first. This does not mean PSSR is forced onto all software, and it does not turn an unpatched standard PS5 game into a native PS5 Pro title.",
      "Image reconstruction can improve fine edges, distant detail and stability in motion, but results still depend on the source image and a game's rendering pipeline. Fast particles, transparent effects and rapidly moving thin objects are difficult cases for any temporal upscaler. Making the option default gives Sony a more consistent PS5 Pro experience, while the off switch recognises that individual games may behave differently.",
      "## Voice chat now shows who is speaking",
      "Players can display the active speaker's name while they are in a voice chat. The control is available from the voice-chat card in the control centre, where users can turn on Display Names and choose the indicator's screen position. It is a small feature, but it helps in larger parties where several voices are unfamiliar or where a player joins a group without knowing every participant.",
      "The update also adds Community Activity to the Welcome Hub. Trending Now shows ten multiplayer games or modes gaining momentum. Top 10 shows the most popular games in a user's country or region over the previous week. These lists are discovery tools rather than global sales charts, and their value will depend on the local player population and how Sony defines activity.",
      "Sony also provides controls related to Bluetooth accessories and tournament environments in the full release notes. Competitive organisers often need predictable wireless conditions and fast access to device settings, while ordinary users benefit from clearer status and fewer steps. The significance is practical rather than transformative: the console is becoming easier to manage in social and organised play.",
      "## Why Sony is making PSSR automatic now",
      "PS5 Pro's value depends heavily on visible image-quality improvements. Hardware specifications matter, but owners experience the console through the way games look and run. A default enhanced upscaler increases the chance that a supported title shows the newer reconstruction method without manual setup. It also lets Sony improve part of the graphics pipeline after launch through software.",
      "Players should still judge the result game by game. The update is not a universal resolution boost, and it cannot replace developer work where a title needs a specific patch. What it does is remove one setup step, broaden use of the upgraded PSSR path and make party communication clearer across the PS5 family."
    ],
    image: {
      src: "/articles/sony-ending-new-playstation-game-discs-2028.jpg",
      alt: "Two PlayStation 5 consoles used to illustrate the PS5 system software update.",
      caption: "PS5 system software 26.06 makes enhanced PSSR the default on PS5 Pro and adds new social interface controls.",
      credit: "tecMAMBO",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    topicSlugs: ["gaming", "system-updates", "ai", "consumer-tech"],
    brandSlugs: ["sony", "playstation"],
    sources: [
      { label: "PlayStation: PS5 system software update information", url: "https://www.playstation.com/en-us/support/hardware/ps5/system-software-info/" },
      { label: "PlayStation Blog: upgraded PSSR support and system update", url: "https://blog.playstation.com/2026/03/16/upgraded-pssr-rolling-out-to-silent-hill-f-monster-hunter-wilds-final-fantasy-vii-rebirth-crimson-desert-and-more/" }
    ]
  },
  {
    slug: "five-million-industrial-robots-world-robotics-2026",
    format: "news",
    title: "Factories Now Operate 5 Million Robots, and China Installed 59% of Last Year's New Units",
    seoTitle: "World Robotics 2026: Factory Robot Stock Reaches 5 Million",
    description: "IFR's World Robotics 2026 report says the global industrial-robot stock reached 5 million in 2025, with more than 600,000 new installations and China taking 59%.",
    focusKeyphrase: "World Robotics 2026 five million robots",
    secondaryKeywords: ["industrial robot installations 2025", "China robot installations 59 percent", "IFR factory robots", "global automation"],
    whyItMatters: "Industrial automation is no longer concentrated in a handful of experimental factories, but the geographic imbalance in new installations shows where manufacturing capacity and automation expertise are compounding fastest.",
    body: [
      "The number of industrial robots operating in factories worldwide reached 5 million in 2025, according to the International Federation of Robotics. The operational stock grew 9% from the previous year and is now more than twice the level recorded seven years earlier. Factories installed more than 600,000 new robots during 2025, an 11% annual increase and another sign that automation spending remains resilient.",
      "China accounted for 59% of all new installations. Its factories installed 354,000 industrial robots, up 20% year on year. The scale matters because every installation adds not only a machine, but also demand for systems integration, software, maintenance, sensors, safety equipment and trained operators. Those surrounding capabilities can make the next deployment easier and cheaper.",
      "## China is also changing who supplies the robots",
      "Chinese robot manufacturers sold more units than foreign suppliers in their home market. Domestic manufacturers installed 195,000 units in 2025, according to IFR, equal to a 55% local market share. The share was 57% in 2024, so it slipped slightly even as the absolute number of Chinese-supplied installations increased by 15%.",
      "This is important for the global automation market. China is not only the largest buyer of industrial robots. It is building suppliers that can use the home market to increase production, improve products and compete abroad. The same scale that helped Chinese companies in batteries, solar panels and electric vehicles could create cost and capability advantages in robotics components and complete systems.",
      "Japan installed 36,219 industrial robots in 2025, a 19% decrease, and moved behind the United States to become the third-largest market by annual installations. South Korea installed about 30,000 units, down 1%, continuing a pattern close to 31,000 units a year since 2019. India installed almost 10,500 units, up 15%, and reached sixth place globally.",
      "## What counts as an industrial robot",
      "The IFR figures cover industrial robots used in manufacturing, not every automated machine, warehouse cart or software bot. A typical unit is a programmable, multipurpose manipulator used for tasks such as welding, painting, assembly, handling, packaging or machine tending. The operational stock is the estimated number still in active use, while annual installations measure units newly deployed during the year.",
      "That definition helps explain why the 5 million figure is both large and limited. The number shows deep adoption in factories, but it does not mean 5 million humanoid robots are walking around production floors. Most industrial robots are specialised machines designed to repeat a controlled task safely and accurately. Collaborative robots can operate closer to people, but they are also commonly built for a defined job.",
      "## AI helps, but deployment economics decide",
      "Improved computer vision, easier programming and better simulation can reduce the engineering effort needed to automate variable tasks. AI can help a robot locate objects, inspect products or adapt a motion plan. Yet the business case still depends on production volume, cycle time, quality, worker safety, maintenance and the cost of integrating the robot with existing equipment.",
      "Small and medium manufacturers face the hardest version of that calculation. They may run shorter production batches and have less engineering capacity than global manufacturers. Lower-cost robots and no-code programming can help, but a supplier must still prove that a system can be supported locally and repurposed when a product line changes.",
      "The 2026 report therefore describes more than a milestone. It shows automation becoming a core part of manufacturing strategy, while Asia, and China in particular, increases its lead. The next question is not whether factory robots will grow beyond 5 million. It is which countries can build the skills, suppliers and electricity infrastructure needed to turn more robots into higher productivity."
    ],
    image: {
      src: "/articles/september13/UC_Berkeley_Stanford_Humanoid_BeyondMimic.jpg",
      alt: "A humanoid robot in a robotics laboratory, illustrating the wider advances surrounding industrial automation.",
      caption: "Industrial robots in the IFR count are mainly specialised factory machines, not humanoids, although advances in control and perception are expanding what robots can do.",
      credit: "Hybrid Robotics / YouTube",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    topicSlugs: ["robotics", "manufacturing", "ai", "global", "china"],
    brandSlugs: [],
    sources: [
      { label: "International Federation of Robotics: Five million robots now operate in factories globally", url: "https://ifr.org/ifr-press-releases/news/five-million-robots-now-operate-in-factories-globally" },
      { label: "IFR: World Robotics reports", url: "https://ifr.org/worldrobotics/" }
    ]
  },
  {
    slug: "dacia-spring-17900-europe-slovenia-250-km-range",
    format: "news",
    title: "The New Dacia Spring Starts at EUR17,900, Is Built in Slovenia and Targets 250 km of Range",
    seoTitle: "New Dacia Spring: EUR17,900 Price, 250 km Range, Slovenia Build",
    description: "Dacia's redesigned Spring moves European production to Novo Mesto, uses a 27.5 kWh LFP battery and starts at EUR17,900 as Europe searches for more affordable EVs.",
    focusKeyphrase: "new Dacia Spring 17900",
    secondaryKeywords: ["Dacia Spring 250 km range", "Slovenia electric car", "affordable European EV", "LFP battery"],
    whyItMatters: "A genuinely European-built EV below EUR20,000 tests whether local production, modest battery size and focused design can compete with low-cost imports without depending on premium-car margins.",
    body: [
      "Dacia has revealed a completely redesigned Spring electric car with a starting price of EUR17,900 before market-specific options. The small EV will be made at Renault Group's Novo Mesto plant in Slovenia rather than imported from China. It uses the group's RG-EV-Small platform, a 27.5 kWh lithium-iron-phosphate battery and targets up to 250 kilometres of combined WLTP range.",
      "The name is familiar, but Dacia says the vehicle is new beneath it. The body is 18 centimetres wider than the previous Spring and sits on a European platform shared within Renault Group. Local production is central to the pitch because European incentives are increasingly designed around environmental and industrial criteria, not only whether a vehicle has a tailpipe.",
      "## How Dacia keeps the price below EUR20,000",
      "Battery size is one of the biggest cost decisions in an electric car. Instead of chasing 500 kilometres of range, Dacia is using a relatively small LFP pack for urban and regional trips. LFP chemistry generally avoids nickel and cobalt, can offer long cycle life and has become a common choice for lower-cost EVs. The trade-off is lower energy density than some nickel-rich chemistries.",
      "A 250-kilometre WLTP rating is not a promise that every driver will travel exactly that distance. Speed, temperature, heating, load, terrain and driving style affect real-world range. For a city car that returns home regularly, a smaller battery can reduce purchase price, weight and resource use. For drivers who frequently cover long motorway distances, the same decision creates more charging stops.",
      "Dacia's approach also limits complexity. Affordable cars become expensive when manufacturers add large wheels, oversized screens, high-output powertrains and features that are rarely used. The Spring competes by defining a narrower job: everyday transport at a price closer to popular combustion-engine cars. The product still has to meet European safety, software and warranty expectations, so the final value will depend on equipment by trim.",
      "## Why building in Slovenia matters",
      "Novo Mesto already builds the electric Renault Twingo E-Tech. Producing the Spring there can let Renault Group share suppliers, workforce skills and plant investment across several compact EVs. It also places manufacturing inside the European Union, which can help the model qualify under national subsidy rules that consider where and how a car is produced.",
      "This is part of a wider policy argument. European manufacturers say they face high energy, labour and regulatory costs while Chinese brands benefit from scale and mature battery supply chains. Tariffs can slow imports, but they do not automatically create an affordable European car. A model at EUR17,900 is a more direct response because it competes in the showroom rather than relying only on border measures.",
      "## The number to watch is the price after incentives",
      "Dacia's headline price is a recommended starting point and can vary by country. Registration charges, delivery fees, trim levels and incentives will determine what a buyer actually pays. Some subsidy programmes apply only to households below an income threshold, while others reward vehicles that meet production or carbon criteria. Buyers should compare the final on-road price and charging costs in their own market.",
      "The Spring also arrives as Renault Group works on several low-cost urban EVs. Sharing a platform across models can improve purchasing power and make a European supply chain viable at greater volume. That strategy will be tested by battery prices, demand and how aggressively competitors price imported models.",
      "The new Spring does not solve every electric-car barrier. Apartment residents still need reliable charging, resale values remain uncertain and a small battery is not suited to every journey. It does, however, put a concrete number on Europe's affordability debate: a locally built electric car starting below EUR18,000, with design choices focused on the trips many city drivers make most often."
    ],
    image: {
      src: "/articles/bnef-ev-outlook-2026-record-sales.jpg",
      alt: "Compact electric cars on a production line, illustrating Europe's push for affordable locally built EVs.",
      caption: "Dacia is betting that European production and a modest LFP battery can make the new Spring competitive at a starting price of EUR17,900.",
      credit: "Valeria Mongelli / Bloomberg",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    topicSlugs: ["evs-mobility", "manufacturing", "european-union", "consumer-tech"],
    brandSlugs: [],
    sources: [
      { label: "Dacia: the new Spring is electric and made in Europe", url: "https://blog.dacia.de/der-neue-dacia-spring-100-elektrisch-made-in-europe/" },
      { label: "Renault Group: Novo Mesto manufacturing site", url: "https://www.renaultgroup.com/en/our-company/locations/novo-mesto-plant-2/" }
    ]
  },
  {
    slug: "openai-gpt-live-1-realtime-voice-vision-api-explained",
    format: "explainer",
    title: "OpenAI's New GPT-Live-1 API Handles Full-Duplex Voice, but Vision Still Uses a Separate Path",
    seoTitle: "OpenAI GPT-Live-1 API: Realtime Voice, Vision and Enterprise Use",
    description: "GPT-Live-1 can listen and speak at the same time while delegating deeper work. Image understanding is supported through Realtime models or a vision-capable backend, not raw vision inside Live audio.",
    focusKeyphrase: "OpenAI GPT-Live-1 API",
    secondaryKeywords: ["OpenAI realtime voice API", "full duplex voice AI", "OpenAI vision voice agent", "enterprise voice agents"],
    whyItMatters: "The architecture can make voice agents feel more natural without pretending that latency is zero or that one model directly handles every audio, visual and business-system task.",
    body: [
      "OpenAI launched GPT-Live-1 in its API on September 10, giving developers a model designed for full-duplex voice conversations. Full duplex means the system can listen while it is speaking, which helps it handle interruptions, pauses and short acknowledgements more naturally. The model can also delegate deeper reasoning and tool work to a backend model or an external system while the live conversation continues.",
      "That is more precise than saying OpenAI has switched on one zero-latency voice-and-vision model for every enterprise API customer. No internet service has literally zero latency, access can still depend on account and policy requirements, and GPT-Live's audio frontend does not directly accept images. Developers can add visual context through a vision-capable backend, while OpenAI's Realtime conversation models support image input in their own sessions.",
      "## Why direct audio processing feels different",
      "Traditional voice agents often run a chain of services. Speech is transcribed into text, a language model produces a text answer, and a speech engine reads it aloud. That architecture can work well, but each stage adds delay and can discard information such as timing, hesitation, emphasis or a user's attempt to interrupt.",
      "A speech-to-speech model handles the live audio interaction more directly. GPT-Live-1 is designed to maintain the conversational rhythm while a backend does slower work. A travel assistant, for example, can acknowledge that it is checking a booking, continue listening if the customer adds a constraint and then speak the result returned by a tool. The business action still requires authenticated systems and explicit rules.",
      "OpenAI reports a turn-taking latency of 0.798 seconds for GPT-Live-1 in its published evaluation, compared with 1.41 seconds for GPT-Realtime-2.1. Those are test results, not a guarantee for every application. Network distance, audio hardware, server load, tool calls and the developer's own code all affect how quickly a user hears a response.",
      "## How vision fits into a voice agent",
      "A developer who wants a caller to discuss a photo or screen can send the image to a backend model that supports vision. That model interprets the image and returns useful text or structured context to the Live conversation. OpenAI's documentation explicitly tells developers to keep backend image input separate from the Live session input.",
      "The Realtime API provides another route. GPT-Realtime-2 and GPT-Realtime can accept image content as part of a conversation message. That makes it possible to build a multimodal session, but it remains important to distinguish product names and architectures. Sharing a transport such as WebRTC does not make Live and Realtime session formats interchangeable.",
      "## What enterprises still have to build",
      "A natural voice is only the front end of an enterprise workflow. A customer-service system needs identity checks, permission boundaries, approved tools, escalation rules, logs and a way for staff to review failures. It must also tell people when they are interacting with AI when that is not obvious. Sensitive uses may require data-retention controls, regional processing and legal review.",
      "Voice agents can be useful in support, translation, accessibility and hands-free field work, but they can also make mistakes with names, numbers and dates. OpenAI's guidance recommends confirming important details when intent is uncertain. Companies should test accents, background noise, interruptions and failure recovery with the people who will actually use the service.",
      "The meaningful advance is architectural. GPT-Live-1 separates the fast social work of a conversation from deeper reasoning and tool execution, allowing both to proceed without turning every pause into dead air. Vision can be added, but through an explicitly designed path. That clarity matters more than a sweeping claim that voice and vision have become instant or effortless."
    ],
    image: {
      src: "/articles/september15/OpenAI_CEO_Sam_Altman.jpg",
      alt: "OpenAI chief executive Sam Altman speaking in front of the OpenAI logo.",
      caption: "OpenAI's GPT-Live-1 API is designed for natural full-duplex voice, with deeper reasoning, tools and image context handled through connected systems.",
      credit: "Getty Images",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    topicSlugs: ["ai", "audio", "software", "business"],
    brandSlugs: ["openai"],
    sources: [
      { label: "OpenAI: Build more natural voice experiences with GPT-Live-1", url: "https://openai.com/index/introducing-gpt-live-1-in-the-api/" },
      { label: "OpenAI API: Delegation and visual context in GPT-Live", url: "https://developers.openai.com/api/docs/guides/live-delegation" },
      { label: "OpenAI API: Realtime conversations and image input", url: "https://developers.openai.com/api/docs/guides/realtime-conversations" }
    ]
  },
  {
    slug: "direct-drive-tech-hong-kong-ipo-robotics-actuators",
    format: "business",
    title: "Direct Drive Tech Lists in Hong Kong After Pricing a 50 Million-Share Robotics IPO",
    seoTitle: "Direct Drive Tech Hong Kong IPO: Robotics Supplier Lists as 06731",
    description: "Direct Drive Tech priced 50 million shares at HKD21.60 and is scheduled to begin Hong Kong trading as 06731, raising capital for robotics research, production and sales.",
    focusKeyphrase: "Direct Drive Tech Hong Kong IPO",
    secondaryKeywords: ["Benmo Power IPO", "Hong Kong robotics listing 06731", "direct drive actuator modules", "humanoid robot components"],
    whyItMatters: "The listing gives investors exposure to a supplier of motion components and robots, while showing how China's robotics supply chain is using public markets to fund research and manufacturing capacity.",
    body: [
      "Direct Drive Tech, also known through its Benmo Power business, is scheduled to begin trading on the Hong Kong Stock Exchange under code 06731 on September 29. The company offered 50 million shares at HKD21.60 each. At that price, the gross offer size is HKD1.08 billion, roughly $138 million at recent exchange rates, while expected net proceeds are lower after fees and expenses.",
      "The distinction between gross and net proceeds explains why different summaries attach different dollar figures to the deal. The company says net proceeds are expected to be about HKD982.5 million, before any effect from the over-allotment option. Calling the offering a completed $130.5 million cash raise without stating which measure is being used can therefore be misleading.",
      "## What Direct Drive Tech sells",
      "The company describes itself as a robotics technology business built around direct-drive capability. Its largest activity is selling robotic actuator modules, with a smaller contribution from complete robots. Actuators turn electrical energy and control commands into movement. They sit inside joints, wheels and other mechanisms that must position a robot accurately and repeatedly.",
      "A direct-drive system connects a motor more directly to the moving load and can reduce reliance on conventional gear trains. Fewer transmission components can reduce backlash, noise and maintenance in some designs. The trade-offs depend on torque requirements, motor size, thermal management, control electronics and cost. Direct drive is a design choice, not a universal replacement for every geared actuator.",
      "Direct Drive Tech says its technology has been used in more than 7.5 million robots across consumer, industrial, commercial and embodied-intelligence applications from inception through June 30, 2026. That figure covers products enabled by its technology and should not be read as 7.5 million humanoid robots sold by the company.",
      "## Where the IPO money is meant to go",
      "The company's announced allocation puts about half of net proceeds toward research and development in key robotics technologies. Around 20% is intended for partnerships and sales expansion, another 20% for production capability and efficiency, and the remaining 10% for working capital and general corporate purposes.",
      "That split reflects the two challenges facing a component supplier. It must improve performance quickly enough to serve emerging robot designs, and it must manufacture with consistent quality at scale. A sophisticated prototype actuator is not enough if units vary across a production run or if customers cannot obtain service and replacements.",
      "## Why robotics suppliers are reaching public markets",
      "Interest in humanoid and embodied AI has increased demand for motors, sensors, bearings, reducers, controllers and joint modules. Many of the companies building complete robots will change designs or fail. Component suppliers can potentially sell across several platforms, but they also face price pressure and the risk that large customers bring critical parts in-house.",
      "A Hong Kong listing gives Direct Drive Tech capital and a public valuation, but it also brings reporting obligations and quarterly market scrutiny. Investors will need to distinguish growth in established consumer and industrial applications from expectations attached to humanoid robots, a market where shipment forecasts remain uncertain.",
      "Customers will make a similarly practical distinction. A robot maker evaluates torque, response time, efficiency, weight, heat, durability, control software and unit cost before choosing an actuator. It also needs confidence that the supplier can deliver thousands of consistent modules on schedule. Public excitement around embodied AI may open the door, but production data and repeat orders will determine whether the component business earns durable margins.",
      "The opening share price will attract attention, yet the longer test is operational. Direct Drive Tech must convert research spending into products, win repeat orders and expand production without weakening quality. The IPO makes it a public-market participant in the robotics boom. It does not remove the technical and commercial risks that come with that position."
    ],
    image: {
      src: "/articles/september13/UC_Berkeley_Stanford_Humanoid_BeyondMimic.jpg",
      alt: "A humanoid robot in a laboratory, illustrating demand for motors and actuator modules.",
      caption: "Direct Drive Tech supplies actuator modules and robotics systems used across consumer, industrial and emerging embodied-intelligence applications.",
      credit: "Hybrid Robotics / YouTube",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    topicSlugs: ["robotics", "business", "manufacturing", "china", "markets"],
    brandSlugs: [],
    sources: [
      { label: "HKEX: Direct Drive Tech global offering documents", url: "https://www.hkexnews.hk/listedco/listconews/sehk/2026/0921/2026092100140.htm" },
      { label: "HKEX: Newly listed securities", url: "https://www.hkex.com.hk/Services/Trading/Securities/Trading-News/Newly-Listed-Securities?sc_lang=en" },
      { label: "Direct Drive Tech: offer price and use of proceeds announcement", url: "https://www.tradingview.com/news/reuters.com%2C2026-09-21%3Anewsml_ACN110233%3A0-direct-drive-tech-limited-the-robotics-technology-company-with-direct-drive-technology-as-core-capability-announces-its-plan-to-list-on-the-main-board-of-the-hong-kong-stock-exchange-offer-price-of-hk-21-60-per-share/" }
    ]
  },
  {
    slug: "kenya-draft-ai-emerging-technologies-policy-2026",
    format: "explainer",
    title: "Kenya's Draft AI Policy Proposes a New Regulator, Risk Rules and a National Technology Stack",
    seoTitle: "Kenya Draft AI Policy 2026: Council, Risk Rules and Sovereignty",
    description: "Kenya's draft AI and Emerging Technologies Policy proposes a statutory council, risk classification, sandboxes and stronger local infrastructure. It is a proposal, not final law.",
    focusKeyphrase: "Kenya draft AI policy 2026",
    secondaryKeywords: ["Kenya AI and Emerging Technologies Council", "AI regulation Kenya", "data sovereignty Kenya", "Kenya AI policy public participation"],
    whyItMatters: "The draft could shape who sets AI rules, how high-risk systems are tested and how the Kenyan state buys and deploys emerging technology, but public consultation and legislation still stand between the proposal and enforcement.",
    body: [
      "Kenya's Ministry of Information, Communications and the Digital Economy has published a draft Artificial Intelligence and Other Emerging Technologies Policy for public participation. The document proposes a national framework for developing, governing and using AI and related technologies. It also proposes a statutory council with powers over standards, risk classification, regulatory sandboxes, safety and compliance.",
      "The word draft is essential. The document is not a final Act of Parliament, and its proposed institutions do not yet have every power described in the policy. The ministry invited comments through August 4, 2026. Public feedback, Cabinet decisions, legislation, budgets and implementation rules can all change how the final system works.",
      "## What the proposed council would do",
      "The draft says a National AI and Other Emerging Technologies Council would become the central regulatory authority. It would be led by a director and supported by a governing board, a technical advisory forum and directorates covering policy and standards, compliance and risk, regulatory sandboxes, advisory and capacity building, and safety and security.",
      "Its proposed functions include issuing binding guidelines and standards, overseeing the testing and evaluation of frontier models, managing national AI risk classification and running sandbox programmes. Those are broad responsibilities. A future law would need to define jurisdiction, appeals, enforcement powers and how the council coordinates with existing regulators responsible for data protection, competition, communications, finance, health and other sectors.",
      "## Data sovereignty is broader than server location",
      "The policy places emphasis on strategic autonomy, digital infrastructure and national resilience. Data sovereignty is sometimes reduced to storing every dataset inside a country's borders. In practice, control also depends on contractual rights, encryption keys, cloud access, technical skills, procurement terms, model transparency and the ability to change suppliers without losing critical public services.",
      "Kenya can strengthen sovereignty by building interoperable public infrastructure and clear rules for sensitive data, while still using international cloud and research partnerships where they offer value. A rigid localisation rule can increase cost or reduce access to advanced services. A weak rule can leave public institutions dependent on vendors they cannot audit or replace. The draft creates a policy direction, but detailed safeguards will determine the balance.",
      "## What state compliance could mean",
      "The draft seeks coordinated public-sector adoption rather than isolated experiments in every ministry. That can support common procurement standards, risk assessments, staff training and shared infrastructure. It should not be interpreted as a finished mandate requiring every agency to deploy AI. Some public services may benefit from automation, while others need a slower approach because errors can affect benefits, health, policing, education or legal rights.",
      "High-impact systems need documented purposes, lawful data, human review, security testing and a way for people to challenge an automated decision. Procurement rules should require agencies to know what a system does, how it was evaluated, which data crosses borders, who can access logs and what happens when the vendor relationship ends.",
      "## The implementation challenge",
      "A new council can create coherence, but it can also duplicate existing regulators if mandates are vague. Kenya will need technical staff who understand models, cybersecurity, procurement, competition and sector-specific harms. Funding a credible testing function is more difficult than publishing general principles, especially when frontier systems change faster than a normal rule-making cycle.",
      "The draft is therefore best read as a blueprint for institution building. Its strongest outcome would combine support for local research and businesses with enforceable protections for people affected by AI systems. The immediate task is not compliance with a finished regime. It is careful public scrutiny of the proposed council, its powers and the practical tools Kenya will use to govern emerging technology."
    ],
    image: {
      src: "/articles/kenya-ai-policy-connecting-codes-conference.jpg",
      alt: "Participants at a Kenyan technology policy conference discussing digital and AI governance.",
      caption: "Kenya's draft policy proposes a statutory AI and Emerging Technologies Council, but the framework still requires consultation and implementation through law and institutions.",
      credit: "KNLS / Facebook",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    topicSlugs: ["ai", "policy", "regulation", "kenya", "ai-ethics"],
    brandSlugs: [],
    regionSlugs: ["kenya"],
    sources: [
      { label: "Kenya ICT Ministry: public participation on the draft AI and Emerging Technologies Policy", url: "https://ict.go.ke/sites/default/files/AI%20Policy%20Doc/index.html" },
      { label: "Kenya ICT Ministry: Building Kenya's AI Future", url: "https://www.ict.go.ke/index.php/building-kenyas-ai-future-consensus-action" }
    ]
  },
  {
    slug: "samsung-flex-titanium-foldable-display-durability-crease",
    format: "explainer",
    title: "Samsung's Foldable Display Breakthrough Is Called Flex Titanium, Not IronFold",
    seoTitle: "Samsung Flex Titanium: Foldable Durability and Crease Explained",
    description: "Samsung's verified foldable display technology uses a titanium-alloy film and micro-patterned titanium plate to improve durability and reduce crease visibility. It is called Flex Titanium.",
    focusKeyphrase: "Samsung Flex Titanium foldable display",
    secondaryKeywords: ["Samsung foldable crease", "foldable OLED durability", "Galaxy Z Fold8 display", "500000 fold test"],
    whyItMatters: "Correcting the product name matters because Samsung's real engineering claims are significant on their own, and buyers need to distinguish verified durability tests from unsupported launch language.",
    body: [
      "Samsung's latest verified foldable-display technology is called Flex Titanium. Samsung Electronics introduced it in July 2026 for its next generation of Galaxy foldable devices. There is no official Samsung announcement for a technology named IronFold, and the company has not published the claimed 50% structural-durability increase under that name. Publishing the unverified label would make a genuine hardware story less reliable.",
      "Flex Titanium combines two titanium-based components beneath the foldable OLED: a titanium-alloy film and a titanium plate. Samsung says the structure improves durability, keeps the display slim and reduces the visibility of the centre crease. The company uses micro-patterned holes in the plate's folding section so a strong material can still flex repeatedly.",
      "## Why a foldable display forms a crease",
      "A foldable screen bends through the same region thousands of times. The OLED layers, adhesive, ultra-thin glass, support plate and hinge must move together without separating or concentrating too much stress in one line. Small air gaps or uneven support can allow the panel to sag, making the crease more visible and increasing local stress.",
      "Samsung's design aims to create a tighter bond and distribute force more evenly around the fold. The titanium-alloy film helps connect layers, while the patterned support plate provides rigidity without turning the folding area into a solid, immovable sheet. The hinge remains part of the system because its radius and motion determine how sharply the display bends.",
      "Reduced crease visibility does not mean the screen becomes a rigid slab of glass. Lighting angle, reflections and touch can still reveal the folding region. A better description is that Samsung has made the crease less visually intrusive while strengthening the structure that supports it. Independent long-term use will determine how the improvement ages outside controlled demonstrations.",
      "## What the 500,000-fold test proves",
      "Samsung Display previously said its latest foldable OLED remained functional after a Bureau Veritas test involving 500,000 folds at room temperature. The company compared that with more than ten years of use at roughly 100 folds a day, or more than six years at 200 folds a day. It also reported tests at high and low temperatures.",
      "A laboratory cycle test is useful because it applies a repeatable load and allows comparison between generations. It does not reproduce every real-world hazard. Dust, grit, drops, pressure from a hard object, liquid exposure and a damaged hinge can create failures that a clean folding machine does not model. Buyers should still follow the device maker's care guidance and warranty terms.",
      "Samsung Display's earlier durability work increased the thickness of the outer ultra-thin glass layer by 50% and used a more elastic adhesive. That is likely the origin of some confusing summaries about a 50% improvement. A 50% thicker material layer is not the same as a certified 50% increase in the entire panel's structural durability.",
      "Temperature matters too because display layers and adhesives expand, contract and change stiffness. Samsung's testing at different temperatures provides useful evidence that the panel can keep folding outside a comfortable laboratory room. It still cannot predict every climate, impact or ageing pattern, which is why repairability and warranty coverage remain part of the buying decision.",
      "## Why this matters beyond one Galaxy phone",
      "Foldable adoption depends on more than novelty. People compare a high-priced folding phone with slab phones that have fewer moving parts and a long history of durability. A less visible crease improves daily use, while a stronger support structure reduces one of the category's most persistent objections.",
      "Flex Titanium does not make foldables indestructible, and Samsung's claims should continue to be tested independently. It does show where the engineering is going: materials, adhesives, support geometry and hinge movement are being designed as one system. That verified advance is a stronger story than an invented product name or an unsupported percentage."
    ],
    image: {
      src: "/articles/september11/samsung-galaxy-z-fold8-unfolded.webp",
      alt: "A Samsung Galaxy Z Fold8 shown open with its flexible inner display visible.",
      caption: "Samsung's Flex Titanium display structure combines a titanium-alloy film and patterned titanium plate to reduce crease visibility and improve support.",
      credit: "Samsung",
      width: 1040,
      height: 520,
      type: "image/webp"
    },
    topicSlugs: ["smartphones", "display-technology", "hardware-durability", "consumer-tech"],
    brandSlugs: ["samsung"],
    sources: [
      { label: "Samsung: Flex Titanium technology for foldable displays", url: "https://news.samsung.com/us/samsung-introduces-flex-titanium-technology-advance-foldable-displays/" },
      { label: "Samsung Display: 500,000-fold durability test", url: "https://global.samsungdisplay.com/31384?page=1&search=samsungdisplay&search_edate=2026-04-08&search_sdate=2026-04-08&search_term=0&search_type=tag&type=search" }
    ]
  },
  {
    slug: "india-entry-level-electric-cars-gst-5-percent-fact-check",
    format: "explainer",
    title: "India's Entry-Level EV Market Is Growing, but There Is No New Central GST Cut Behind It",
    seoTitle: "India Entry-Level EVs: GST Is Still 5%, So What Is Driving Sales?",
    description: "India still applies 5% GST to electric vehicles. Affordable models, manufacturer discounts, finance options and charging growth matter more than an unconfirmed new tax realignment.",
    focusKeyphrase: "India entry-level EV GST 5 percent",
    secondaryKeywords: ["India affordable electric cars", "Tata Punch EV price", "Mahindra electric cars", "India EV tax policy"],
    whyItMatters: "Buyers and investors need to separate a long-standing national tax advantage from new model pricing and temporary discounts, because the explanation changes how durable any sales increase is likely to be.",
    body: [
      "India's national Goods and Services Tax on electric vehicles remains 5%. The GST Council reduced the rate from 12% in 2019 and also cut GST on EV chargers and charging stations to 5%. Official material published in 2026 continues to describe that concessional 5% rate across electric cars, two-wheelers and three-wheelers. There is no verified new central tax tier for sub-INR1 million electric cars driving a September comeback.",
      "That correction does not mean affordable EVs are standing still. Tata launched the updated Punch.ev in June 2026 at an introductory ex-showroom price of INR969,000, with a Battery-as-a-Service option advertising a lower vehicle entry price plus a per-kilometre battery payment. Manufacturers and dealers have also used discounts, finance plans and warranty offers to narrow the gap with petrol cars.",
      "## The tax advantage is real, but it is not new",
      "A 5% GST rate gives battery-electric vehicles a meaningful advantage over many combustion-engine cars, which can face higher GST and compensation cess depending on size and engine. Because the EV rate applies broadly, it does not explain a sudden change limited to entry-level models in late 2026. Analysts should look for model launches, price changes, dealer inventory and state-level road-tax policies before attributing a monthly sales movement to tax.",
      "State incentives can vary. Registration fees, road tax, electricity tariffs and local charging programmes change the ownership calculation from one state to another. A national headline can therefore hide very different on-road prices. Buyers should check the final invoice and the current policy in their registration state rather than relying on a single ex-showroom number.",
      "## What is making smaller EVs more accessible",
      "Vehicle design is one factor. A compact car can use a smaller battery than a large SUV and still deliver useful city range. LFP chemistry, local assembly and greater component scale can reduce cost. Manufacturers are also separating the battery cost through subscription or pay-per-kilometre plans, although those plans should be compared over the full expected ownership period.",
      "Tata says the updated Punch.ev offers about 355 kilometres of real-world range, express charging and a lifetime battery warranty under stated conditions. The model's INR969,000 starting price places it below the INR1 million threshold highlighted in the original brief. That is a product and pricing decision within the existing tax framework, not evidence of a new GST category.",
      "Mahindra's current electric-car push is concentrated higher in the market than the cheapest Tata models. It has used discounts on outgoing inventory and expanded its newer electric SUV range. Grouping Tata and Mahindra together as leaders of a fresh sub-INR1 million order surge therefore oversimplifies their different product positions.",
      "## Discounts can boost sales without changing the long-term market",
      "September promotional offers have included large benefits on some older or pre-update EVs. Discounts can move inventory before a festive season or a model replacement, but they are not the same as a permanent reduction in manufacturing cost. A buyer should ask which benefit requires an exchange vehicle, corporate eligibility, dealer finance or a specific production year.",
      "Charging availability is improving, yet home access remains decisive for many private buyers. A public fast-charging hub helps with longer trips, while regular overnight charging determines convenience and cost for daily use. Apartment residents and people without assigned parking can face a harder transition even when the car itself is affordable.",
      "India's entry-level EV story is therefore about several forces working together: a long-standing 5% GST rate, more capable compact models, local production, financing, discounts and gradual charging expansion. Presenting it as a new tax-driven comeback creates a clean headline but a weak explanation. The market is better understood by tracking actual on-road prices, model-level registrations and the cost of charging over time."
    ],
    image: {
      src: "/articles/bnef-ev-outlook-2026-record-sales.jpg",
      alt: "Compact electric cars on a production line, illustrating affordable EV manufacturing and sales in Asia.",
      caption: "India's entry-level EV market is being shaped by vehicle pricing, finance and charging access within a national 5% GST rate that has applied since 2019.",
      credit: "Valeria Mongelli / Bloomberg",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    },
    topicSlugs: ["evs-mobility", "tax", "consumer-tech", "manufacturing", "policy"],
    brandSlugs: [],
    sources: [
      { label: "GST Council: GST on electric vehicles reduced to 5%", url: "https://www.gstcouncil.gov.in/en/gst-rate-all-electric-vehicles-reduced-12-5-and-charger-or-charging-stations-evs-18-5" },
      { label: "Government of India: 2026 EV tax and market overview", url: "https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=159436&lang=1&reg=1" },
      { label: "Tata.ev: 2026 Punch.ev launch and pricing", url: "https://ev.tata.cars/articles/press-releases/tata-ev-accelerates-mainstream-ev-adoption-with-the-new-punch-ev.html" }
    ]
  }
];

function required<T extends { slug: string }>(items: T[], slug: string, kind: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing September 29 ${kind}: ${slug}`);
  return item;
}

function firstParagraph(body: string[]) {
  const paragraph = body.find((part) => !part.startsWith("#"));
  if (!paragraph) throw new Error("September 29 article is missing an opening paragraph.");
  return paragraph;
}

function firstSentence(text: string) {
  return text.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim() ?? text;
}

export function buildEditorialSeptember29Articles({ authors, topics, brands, regions }: BuildArgs): Article[] {
  return stories.map((story, index) => {
    const allText = [story.title, ...story.body].join(" ");
    if (/\u2014|&mdash;|&#8212;|&#x2014;/i.test(allText)) {
      throw new Error(`September 29 article contains a prohibited em dash: ${story.slug}`);
    }
    const words = allText.split(/\s+/).filter(Boolean).length;
    if (words < 600) throw new Error(`September 29 article is too short (${words} words): ${story.slug}`);
    const opening = firstParagraph(story.body);

    return {
      id: `editorial-september29-${index + 1}`,
      slug: story.slug,
      format: story.format,
      contentFormat: story.format === "news" ? "news" : story.format === "business" ? "analysis" : "explainer",
      isNewsworthy: true,
      title: story.title,
      seo: {
        title: story.seoTitle,
        description: story.description,
        focusKeyphrase: story.focusKeyphrase,
        secondaryKeywords: story.secondaryKeywords
      },
      subhead: story.description,
      excerpt: firstSentence(opening),
      quickAnswer: firstSentence(opening),
      whyItMatters: story.whyItMatters,
      body: story.body,
      author: required(authors, "tim-humphreys", "author"),
      publishedAt: publishedAt[index]!,
      updatedAt: publishedAt[index]!,
      readTime: `${Math.max(4, Math.ceil(words / 220))} min read`,
      image: story.image,
      tags: [
        ...story.topicSlugs.map((slug) => required(topics, slug, "topic")),
        ...story.brandSlugs.map((slug) => required(brands, slug, "brand"))
      ],
      regions: story.regionSlugs?.map((slug) => required(regions, slug, "region")),
      sources: story.sources,
      sourceDisclosure: "Claims and source URLs were checked against the linked primary or authoritative sources on September 29, 2026. tecMAMBO corrected unsupported wording in the supplied brief where the verified record differed.",
      googleAdsEligible: true,
      workflowVersion: "gated",
      publicationStatus: "publish",
      editorialStatus: "published",
      indexingStatus: "index",
      excludeFromDiscovery: false,
      sourceChecked: true,
      humanEditorApproved: true,
      editor: "tecMAMBO Editorial Desk",
      reviewedAt,
      hasOriginalPhotography: false,
      originalValueType: story.format === "explainer" ? "practical_guide" : "curated_context"
    };
  });
}
