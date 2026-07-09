import type { Article, Author, RegionTerm, Tag } from "@/lib/types";

type BuildKenyaJuly9NewsArgs = {
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
  return new Date(Date.UTC(2026, 6, 9, hour, 0, 0)).toISOString();
}

export function buildKenyaJuly9NewsArticles({ authors, topics, brands, kenya }: BuildKenyaJuly9NewsArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const apps = bySlug(topics, "apps");
  const business = bySlug(topics, "business");
  const connectivity = bySlug(topics, "connectivity");
  const cybersecurity = bySlug(topics, "cybersecurity");
  const fintech = bySlug(topics, "fintech");
  const startups = bySlug(topics, "startups");
  const safaricom = bySlug(brands, "safaricom");
  const starlink = bySlug(brands, "starlink");
  const vodacom = bySlug(brands, "vodacom");

  return [
    {
      id: "kenya-news-starlink-signup-freeze",
      slug: "starlink-kenya-signup-freeze-seven-counties",
      format: "news",
      title: "Starlink freezes new signups in 7 Kenyan counties",
      seo: {
        title: "Starlink freezes new signups in 7 Kenyan counties",
        description:
          "Starlink has stopped new orders in Nairobi, Mombasa and five more counties after tripling its Kenyan subscribers in nine months. Why satellite hit a ceiling."
      },
      subhead:
        "New customers in Nairobi, Kiambu, Mombasa, Machakos, Murang'a, Kirinyaga and Kwale now land on a waitlist with no reopening date. The freeze is a case study in satellite economics.",
      excerpt:
        "Starlink has paused new signups in seven Kenyan counties after rapid subscriber growth filled the network capacity available in those areas.",
      whyItMatters:
        "Starlink was meant to connect the places fibre forgot. In Kenya it became an urban favourite too, and it has just discovered the hard physics of success: satellites cannot lay more cable.",
      body: [
        "Starlink has stopped accepting new customers in Nairobi, Kiambu, Mombasa, Machakos, Murang'a, Kirinyaga and Kwale because demand has outgrown the network capacity available in those areas. New buyers are sent to a deposit waitlist with no published reopening date. Existing subscribers keep their service.",
        "The seven-county list is the one consistently reported by TechCabal, Tech-ish, Techpoint Africa and Business Daily. A separate television report named a partly different set around Nairobi, so buyers should still confirm their exact address on Starlink's live availability map before paying a deposit.",
        "The freeze follows a remarkable run. Communications Authority data put Starlink at 24,999 Kenyan subscriptions by the end of March 2026, more than three times the 8,063 recorded nine months earlier. That is still under 1 percent of the fixed-internet market, but it makes Starlink one of the country's fastest-growing licensed providers.",
        "Price cuts helped. The standard kit fell from KSh89,000 at launch in 2023 to KSh49,900, while rental and smaller data plans lowered the cost of trying satellite broadband. The offer reached farms, lodges and rural schools that fibre had missed, but it also became an urban alternative for households tired of unreliable home internet.",
        "That urban success exposes satellite internet's physical limit. A fibre provider can add cable and local equipment as a neighbourhood grows. Starlink must launch satellites, build ground infrastructure or reassign capacity. Every satellite beam can serve only so many users in one area before congestion reduces performance.",
        "Kenya has seen this pattern before. Starlink paused Nairobi orders after a late-2024 surge, then reopened after adding capacity. The cycle is straightforward: lower prices bring a rush of demand, the network reaches its local ceiling, and orders pause while infrastructure catches up.",
        "If you live in one of the affected counties, compare available fibre and 5G home plans instead of assuming the wait will be short. If you are elsewhere, ordering remains subject to the live capacity shown for your address.",
        "The broader lesson is useful for the market. Satellite can transform broadband where terrestrial networks are absent, but dense cities still reward fibre's ability to add capacity street by street. In urban Kenya, the ground still has an important advantage over the sky."
      ],
      closingLine:
        "Starlink's next move will show whether this is a short capacity pause or the beginning of a more disciplined approach to Kenyan growth.",
      faq: [
        {
          question: "Which Kenyan counties has Starlink frozen?",
          answer:
            "Nairobi, Kiambu, Mombasa, Machakos, Murang'a, Kirinyaga and Kwale. New customers there are directed to a waitlist."
        },
        {
          question: "Why did Starlink stop new signups in Kenya?",
          answer:
            "Subscriber growth exceeded the satellite capacity available in the affected areas. Kenya had nearly 25,000 Starlink subscriptions by March 2026."
        },
        {
          question: "Are existing Starlink customers affected?",
          answer: "No. Existing subscriptions continue. The restriction applies to new activations in capacity-limited areas."
        }
      ],
      author: tim,
      publishedAt: published(11),
      updatedAt: published(11),
      readTime: "5 min read",
      image: {
        src: "/articles/starlink-kenya-signup-freeze-seven-counties.jpg",
        alt: "A Starlink satellite internet dish mounted on a Kenyan rooftop. Credit: Starlink.",
        credit: "Starlink",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [connectivity, starlink],
      regions: [kenya],
      sources: [
        {
          label: "TechCabal: Starlink limits new signups as Kenya network reaches capacity",
          url: "https://techcabal.com/2026/07/07/starlink-stops-new-orders-in-7-parts-of-kenya/"
        },
        {
          label: "Tech-ish: Starlink freezes new signups in seven Kenyan counties",
          url: "https://tech-ish.com/2026/07/07/starlink-sign-ups-frozen-seven-counties/"
        },
        {
          label: "Communications Authority of Kenya sector statistics",
          url: "https://www.ca.go.ke/increased-adoption-smartphones-and-expansion-mobile-network-infrastructure-drive-surge-kenya"
        }
      ]
    },
    {
      id: "kenya-business-safaricom-agm-control",
      slug: "safaricom-agm-vodafone-kenya-control",
      format: "business",
      title: "The AGM that formalises Vodafone's grip on Safaricom",
      seo: {
        title: "The AGM that formalises Vodafone's grip on Safaricom",
        description:
          "Fourteen special resolutions at Safaricom's July 31 AGM would let majority owner Vodafone Kenya nominate the CEO and reshape the board. What changes, explained."
      },
      subhead:
        "A month after the state sold its stake, shareholders vote on CEO nomination rights, board formulas and the protections that keep Safaricom's brand and expansion tied to Kenya.",
      excerpt:
        "Safaricom shareholders will vote on fourteen resolutions that turn Vodafone Kenya's 55 percent stake into formal boardroom control.",
      whyItMatters:
        "Owning 55 percent of a company and controlling it are different things. The July 31 vote is where the ownership becomes control, deciding who Safaricom's next CEO answers to.",
      body: [
        "Safaricom shareholders will vote on July 31, 2026 on fourteen special resolutions that would convert Vodafone Kenya Limited's 55 percent stake into formal control of Kenya's most valuable company. The proposals cover CEO nominations, board appointments, deadlock rules, electronic voting and the rights that remain with the Kenyan government.",
        "The vote follows the June 30 completion of the government's sale of a 15 percent stake to Vodafone Kenya Limited, the Vodacom-owned holding company. Vodafone Kenya now owns 55 percent, the government holds 20 percent, and public investors retain 25 percent.",
        "The headline proposal concerns the chief executive. While Vodafone Kenya owns more than half of Safaricom, the board would appoint the CEO from nominees supplied by Vodafone Kenya. The chief financial officer would act as the CEO's alternate director. A shareholding formula would allocate one director for every complete 10 percent stake, giving Vodafone Kenya five nominees and the government two.",
        "The expansion clause produced conflicting early reports. TechCabal reported that the government approval requirement would be removed. Business Daily, Reuters-based coverage and a detailed reading published by Tech-ish report the opposite: government consent would remain necessary for material brand changes and expansion beyond Kenya and Ethiopia. That retained veto is the more strongly corroborated reading of the AGM proposal.",
        "That distinction matters because Safaricom's next regional move could require billions of shillings and years of losses before returning a profit. Keeping a state consent right means expansion remains partly a national-interest decision, even after commercial control moves to Johannesburg.",
        "Other proposed changes modernise meeting procedure, recognise electronic participation and written resolutions, and create a mechanism for boardroom deadlocks. Shareholders will also vote on a final dividend of KSh1.15 per share.",
        "Customers should not expect an overnight change. M-Pesa keeps working, Safaricom remains listed in Nairobi, and day-to-day service continues. The important shift is the chain of command above those services and the person who will shape the company's next strategy.",
        "This AGM is the next chapter in a transaction tecMAMBO has followed from the transfer of majority control to the government's reported KSh244.5 billion proceeds. A court challenge to the original sale remains active, but the corporate machinery is already moving."
      ],
      closingLine:
        "The vote will not change the Safaricom app on August 1. It will change who has the strongest hand when the next major decision reaches the boardroom.",
      faq: [
        {
          question: "What is being voted on at Safaricom's AGM?",
          answer:
            "Fourteen special resolutions on July 31, 2026 that would rewrite Safaricom's Articles of Association to reflect Vodafone Kenya Limited's 55 percent majority."
        },
        {
          question: "Who will choose Safaricom's next CEO?",
          answer:
            "The board would make the formal appointment from nominees supplied by Vodafone Kenya Limited while it owns more than 50 percent."
        },
        {
          question: "Does the Kenyan government still have a say?",
          answer:
            "Yes. It retains a 20 percent stake, board representation and, under the reported AGM proposals, consent rights over material brand changes and expansion beyond Kenya and Ethiopia."
        }
      ],
      author: tim,
      publishedAt: published(10),
      updatedAt: published(10),
      readTime: "6 min read",
      image: {
        src: "/articles/safaricom-agm-vodafone-kenya-control.jpg",
        alt: "Vodafone Kenya branding being installed above Safaricom branding on a Nairobi office building. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [business, fintech, safaricom, vodacom],
      regions: [kenya],
      sources: [
        {
          label: "Business Daily: Government to have final say on Safaricom's regional expansion",
          url: "https://www.businessdailyafrica.com/bd/corporate/companies/government-to-have-final-say-on-safaricom-s-new-regional-expansion-5521080"
        },
        {
          label: "Tech-ish: After the takeover, Vodacom moves to change Safaricom's constitution",
          url: "https://tech-ish.com/2026/07/08/safaricom-agm-2026-vodacom-articles/"
        },
        {
          label: "tecMAMBO: Vodacom takes majority control of Safaricom",
          url: "/business/vodacom-safaricom-majority-control"
        },
        {
          label: "tecMAMBO: Government banks KSh244.5 billion from the Safaricom sale",
          url: "/business/safaricom-sale-244-billion-infrastructure-fund"
        }
      ]
    },
    {
      id: "kenya-news-internet-metering-bill",
      slug: "kenya-internet-metering-bill-explained",
      format: "news",
      title: "Inside Kenya's controversial internet metering bill",
      seo: {
        title: "Inside Kenya's controversial internet metering bill",
        description:
          "A bill before Parliament would give every internet subscriber a unique meter number and track usage. Fair billing or a privacy risk? Explained."
      },
      subhead:
        "The Kenya Information and Communications Amendment Bill would meter internet use more like a utility. Supporters call it fair billing. Digital-rights advocates see a permanent identifier with too few safeguards.",
      excerpt:
        "Kenya's internet metering bill would give every subscriber a unique meter number and require providers to turn usage into verifiable bills.",
      whyItMatters:
        "A permanent meter number tied to your internet account is a fundamentally different billing model. The bill is still at a stage where parliamentary scrutiny and public input can change it.",
      body: [
        "Kenya's Information and Communications Amendment Bill, 2025 would require every internet provider to assign each customer a unique and identifiable meter number, monitor usage, convert it into readable details, create invoices based on consumption and let customers verify those invoices. The bill is not law.",
        "Parliament's Hansard confirms that the bill received its First Reading on July 1, 2026 and was referred to the relevant committee. The published bill also requires providers to submit information about their billing systems, including meter numbers issued to subscribers, to the Communications Authority at least once every financial year.",
        "The consumer-protection case is easy to understand. A customer who buys a capped plan should be able to see where the allowance went and challenge an inaccurate bill. Clear, verifiable statements could reduce the familiar argument between subscribers and providers over unexplained data use.",
        "The privacy concern begins with the word identifiable. A fixed account number is not the same thing as a public record of every website someone visits, and the bill does not explicitly require providers to send browsing histories to the regulator. But it does create a durable identifier around usage and requires regular reporting without spelling out detailed retention, security and access safeguards.",
        "Those omissions matter in a country governed by the Data Protection Act and with a recent history of internet disruptions during political tension. Any law that expands the collection or exchange of communications data should say exactly what is collected, why it is needed, how long it is kept and who may access it.",
        "The billing argument also needs care. The text requires consumption-based invoices, but it does not explicitly abolish unlimited home fibre packages. Providers could still meter usage for transparency while selling an unlimited plan. The real commercial effect will depend on regulations, provider pricing and any amendments Parliament adopts.",
        "For remote workers, streaming households and gamers, that distinction is crucial. Transparent usage data can be useful. A forced move from unlimited service to pay-per-gigabyte pricing would be a much larger economic change.",
        "The best version of this proposal would separate billing transparency from unnecessary personal tracking, minimise the information sent to the regulator and preserve commercial choice in how plans are sold. Parliament now has the job of making those safeguards explicit."
      ],
      closingLine:
        "This is still a bill, not a finished system. The questions being asked now are exactly the questions that should be answered before it becomes law.",
      faq: [
        {
          question: "What does Kenya's internet metering bill propose?",
          answer:
            "It would require a unique meter number for every customer, provider monitoring of usage, readable consumption details, usage-based invoices and annual billing-system reporting to the Communications Authority."
        },
        {
          question: "Why are privacy advocates concerned?",
          answer:
            "The proposal creates a durable identifier and reporting duties without setting out detailed rules for data minimisation, retention, security or access."
        },
        {
          question: "Is the internet metering bill law yet?",
          answer:
            "No. It received its First Reading on July 1, 2026 and was referred to a parliamentary committee."
        }
      ],
      author: tim,
      publishedAt: published(9),
      updatedAt: published(9),
      readTime: "6 min read",
      image: {
        src: "/articles/kenya-internet-metering-bill-explained.jpg",
        alt: "A home internet router beside a digital utility meter. Credit: Generated for tecMAMBO.",
        credit: "Generated for tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [connectivity, cybersecurity],
      regions: [kenya],
      sources: [
        {
          label: "Parliament of Kenya: Information and Communications Amendment Bill, 2025",
          url: "https://www.parliament.go.ke/sites/default/files/2025-05/The%20Kenya%20Information%20and%20Communications%20%28amendment%29%20Bill%2C%202025.pdf"
        },
        {
          label: "National Assembly Hansard, July 1, 2026",
          url: "https://www.parliament.go.ke/sites/default/files/2026-07/The%20Hansard%20-%20Wednesday%2C%201%20July%202026%20%28A%29.pdf"
        }
      ]
    },
    {
      id: "kenya-business-finance-act-software",
      slug: "finance-act-2026-software-cloud-costs-kenya",
      format: "business",
      title: "Kenya's new tax rules put software payments under pressure",
      seo: {
        title: "Kenya's Finance Act 2026 changes software tax",
        description:
          "Kenya's Finance Act 2026 expands royalty rules to software and digital platforms while extending tax amnesty to December. What businesses need to check."
      },
      subhead:
        "The Finance Act now treats a wider range of software and platform payments as royalties, creating new withholding-tax questions for Kenyan businesses. It is not a blanket 25 percent cloud-price increase.",
      excerpt:
        "Kenya's Finance Act 2026 expands the definition of royalty to cover software and digital-platform payments, changing the tax treatment of many cross-border contracts.",
      whyItMatters:
        "Cloud bills are often priced in dollars and paid from Nairobi. A new withholding obligation can shorten a startup's runway, but the real cost depends on the contract rather than one universal percentage.",
      body: [
        "Kenya's Finance Act 2026 has expanded the definition of a royalty to include payments for proprietary and off-the-shelf software, software licences, development, training, maintenance, support and certain digital-platform rights. The change took effect on July 1 and may bring more payments to non-resident technology vendors into the withholding-tax net.",
        "That is the precise change. Claims that every Kenyan SaaS or cloud bill has automatically risen by 25 percent are not supported by the enacted summaries and tax analyses tecMAMBO reviewed. The effect depends on who receives the payment, whether the contract is a licence or service, the applicable withholding rate, any tax treaty and whether the supplier makes the Kenyan customer gross up the price.",
        "For a startup, the practical question is contractual. If a foreign vendor expects to receive its invoice amount in full and the Kenyan customer must also remit withholding tax, the customer's total cost can rise. If the vendor absorbs the withholding or treaty relief applies, the effect will be different.",
        "Cloud infrastructure also needs careful classification. The expanded wording clearly names software and platform access, but businesses should not assume that every hosting, storage or infrastructure charge receives identical treatment. Bundled contracts may contain several components with different tax consequences.",
        "The sensible response is a contract audit, not panic. List every foreign software and platform vendor, identify the legal entity being paid, separate licence fees from support and infrastructure, check gross-up clauses and ask a qualified tax adviser whether withholding or treaty relief applies.",
        "There is a second change worth acting on. The Finance Act extends tax amnesty to qualifying liabilities up to December 31, 2025. Where principal tax remains unpaid, it must be settled by December 31, 2026 for the related penalties, interest and fines to be waived, subject to the statutory exclusions.",
        "That amnesty does not erase principal tax, and it is not a general promise that every penalty disappears. Companies should reconcile iTax, withholding records, PAYE, VAT and eTIMS data before applying rather than discovering a mismatch after the deadline.",
        "The broader signal is clear. Kenya is bringing more of the digital economy into established tax categories and giving KRA stronger data-led enforcement tools. Founders planning for 2027 should treat tax review as part of cloud architecture and procurement, not as paperwork added after the product ships."
      ],
      closingLine:
        "The Finance Act changes the questions a business must ask before paying a software invoice. It does not support one dramatic percentage pasted onto every cloud bill.",
      faq: [
        {
          question: "What changed for software payments in Kenya?",
          answer:
            "The Finance Act 2026 expanded the definition of royalty to cover a wider range of software, licence, support and digital-platform payments."
        },
        {
          question: "Did every cloud and SaaS bill rise by 25 percent?",
          answer:
            "No. The actual cost depends on the contract, vendor residence, withholding treatment, treaty relief and whether the customer must gross up the payment."
        },
        {
          question: "What is the 2026 KRA tax amnesty deadline?",
          answer:
            "Qualifying outstanding principal tax must be settled by December 31, 2026 for related penalties, interest and fines to receive amnesty, subject to the law's conditions."
        }
      ],
      author: tim,
      publishedAt: published(8),
      updatedAt: published(8),
      readTime: "6 min read",
      image: {
        src: "/articles/finance-act-2026-software-cloud-costs-kenya.jpg",
        alt: "Visitors at Times Tower in Nairobi, the headquarters of the Kenya Revenue Authority. Credit: Google.",
        credit: "Google",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [business, fintech],
      regions: [kenya],
      sources: [
        {
          label: "KPMG: Kenya Finance Act 2026 tax measures",
          url: "https://kpmg.com/us/en/taxnewsflash/news/2026/07/kenya-tax-measures-finance-act-2026-cbc-reporting.html"
        },
        {
          label: "KPMG Kenya: Finance Bill 2026 analysis",
          url: "https://assets.kpmg.com/content/dam/kpmgsites/ke/pdf/thought_leaderships/tax/2026/Finance_Bill_2026_KPMG_Analysis.pdf"
        },
        {
          label: "SmartFlex 360: Kenya Finance Act 2026 structured analysis",
          url: "https://smartflex360.co.ke/api/public/downloads/finance-act-2026-analysis?source=home-page"
        }
      ]
    },
    {
      id: "kenya-business-koko-networks-sale",
      slug: "koko-networks-collapse-assets-sale-carbon-credits",
      format: "business",
      title: "KOKO's empire goes on sale, and carbon is the lesson",
      seo: {
        title: "KOKO's assets go on sale after carbon-credit collapse",
        description:
          "PwC administrators are selling KOKO Networks' ethanol technology after the clean-cooking company collapsed over carbon-credit authorisation."
      },
      subhead:
        "PwC administrators are marketing KOKO's core ethanol technology, intellectual property and manufacturing platform, with expressions of interest due July 17.",
      excerpt:
        "KOKO Networks' clean-cooking technology is being marketed to buyers after the company lost the carbon-credit approval that supported its fuel subsidy.",
      whyItMatters:
        "KOKO served more than one million Kenyan households and still collapsed when one government approval did not arrive. Every climate startup dependent on carbon revenue should study why.",
      body: [
        "Administrators are selling KOKO Networks' integrated ethanol cooking technology, intellectual property and manufacturing platform after the Kenyan clean-cooking company collapsed in January. PwC is seeking expressions of interest by July 17 from buyers able to complete transactions worth more than 15 million US dollars.",
        "The sequence matters. KOKO did not collapse because the stoves stopped working or customers stopped using the network. It shut Kenyan operations on January 31, laid off more than 700 employees and entered administration after the government declined to issue the Letter of Authorisation required for international carbon-credit sales.",
        "Those credits funded the model. KOKO sold bioethanol below its full cost through more than 3,000 automated fuel stations, making cleaner cooking affordable to more than one million households. Revenue from verified emissions reductions was meant to cover the subsidy.",
        "Without export authorisation, that revenue line disappeared. A business with working hardware, customers and distribution could not survive the loss of the approval on which its unit economics depended.",
        "The assets now being marketed include patents, hardware designs, software, the fuel distribution and retail platform, and a stove and canister manufacturing plant in Sanand, India. PwC is administering the UK company while related Indian entities are being wound up separately.",
        "The Kenyan government's position was that KOKO's requested carbon-credit volume could consume too much of the country's available share and crowd out other projects. Government advisers also questioned aspects of cookstove-credit verification. Those claims remain attributed positions, not a finding that KOKO's credits were invalid.",
        "The company was backed by a 179.6 million US dollar political-risk guarantee from the World Bank's Multilateral Investment Guarantee Agency. Reporting has said a claim is expected, but tecMAMBO has not seen confirmation that a final claim has been filed or accepted.",
        "The lesson for African climate tech is structural. If one sovereign approval determines whether revenue exists, political risk is not a footnote. It is part of the product, the financing plan and the survival model. Revenue, markets and regulatory dependencies need diversification before the system reaches scale.",
        "The quietest cost sits with households. Families who had moved from charcoal and kerosene lost access to subsidised ethanol. A climate-finance dispute ended as a daily cooking problem."
      ],
      closingLine:
        "KOKO's technology may find a buyer. Rebuilding the trust, fuel network and financing model around it will be the harder transaction.",
      faq: [
        {
          question: "Why did KOKO Networks collapse?",
          answer:
            "The Kenyan government did not issue the authorisation KOKO needed to sell carbon credits internationally, cutting off revenue that subsidised its ethanol fuel."
        },
        {
          question: "What KOKO Networks assets are being sold?",
          answer:
            "The sale covers ethanol cooking technology, intellectual property, software, distribution systems and a manufacturing plant in India."
        },
        {
          question: "When are expressions of interest due?",
          answer: "The administrator's sale notice set July 17, 2026 as the expression-of-interest deadline."
        }
      ],
      author: tim,
      publishedAt: published(7),
      updatedAt: published(7),
      readTime: "6 min read",
      image: {
        src: "/articles/koko-networks-collapse-assets-sale-carbon-credits.jpg",
        alt: "A KOKO Networks fuel delivery truck in a Nairobi neighbourhood. Credit: KOKO Networks.",
        credit: "KOKO Networks",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [startups, business],
      regions: [kenya],
      sources: [
        {
          label: "TechCabal: KOKO Networks administrators begin asset sale",
          url: "https://techcabal.com/2026/07/08/administrators-seek-buyers-for-collapsed-koko-networks/"
        },
        {
          label: "PwC: KOKO Networks UK administration FAQs",
          url: "https://www.pwc.co.uk/services/business-restructuring/administrations/koko-networks--uk--limited/faqs.html"
        }
      ]
    },
    {
      id: "kenya-news-family-betting-exclusion",
      slug: "kenya-betting-rules-family-exclusion-grak",
      format: "news",
      title: "Kenya's proposed rules let families seek betting bans",
      seo: {
        title: "Kenya's draft betting rules allow family exclusions",
        description:
          "Kenya's draft gambling regulations would let relatives ask the regulator to exclude someone from licensed betting. How the safeguards and technology work."
      },
      subhead:
        "Draft regulations would let a family member or interested party ask the gambling regulator to exclude a person where betting threatens finances, dependants or informed decision-making.",
      excerpt:
        "Kenya's draft gambling regulations create a family-initiated exclusion process and require licensed operators to check a central register every day.",
      whyItMatters:
        "Compulsive gambling can damage an entire household, while the person affected may be the last to seek help. A family application creates another route to protection, but it needs strong due process and data safeguards.",
      body: [
        "Kenya's draft Gambling Control Conduct of Gambling Operations Regulations, 2026 would allow a family member or other interested party to apply to the Gambling Regulatory Authority for a person's exclusion from licensed gambling. The Authority must assess the request and, where practical, give the affected person an opportunity to be heard.",
        "This is a proposal in published draft regulations, not yet a claim that every betting app has already switched the system on. The final commencement and implementation timetable will depend on gazettement and regulatory rollout.",
        "The draft sets three grounds for a family application: serious financial hardship caused or likely to be caused by gambling, risk to dependants or family welfare, or an inability to make informed decisions because of gambling-related harm. The Authority may issue an exclusion for a period it considers appropriate.",
        "The enforcement design is more concrete than early reports suggested. The draft requires the Authority to establish and maintain a national self-exclusion register. Licensed operators must connect to it within six months of commencement, automatically block gambling by excluded people and run daily verification checks.",
        "That makes the system broader than a setting inside one app. An exclusion order can follow a person across licensed operators. The draft also allows exclusions initiated by operators and courts, alongside voluntary self-exclusion.",
        "The safeguards matter because a family request can be protective or abusive. The right to be heard, documented reasons and regulatory review help reduce false or malicious applications. The final system will still need a clear appeals route, reliable identity matching and careful handling of sensitive health and financial information.",
        "Licensed operators will probably match the register against the identity details used to create accounts, but the draft text tecMAMBO reviewed does not justify assuming one universal national-ID-and-phone implementation. The regulator should publish the technical standard before launch.",
        "The largest practical limit is jurisdiction. A Kenyan exclusion register can bind licensed Kenyan operators. It cannot automatically block an offshore or unlicensed platform, so enforcement against illegal services remains part of the consumer-protection job.",
        "Done well, the system gives families and gamblers a meaningful pause button while respecting due process. Done badly, it becomes a sensitive database with weak matching and easy workarounds. The engineering and governance will decide which version Kenya gets."
      ],
      closingLine:
        "The protective idea is sound. The test is whether the final register is secure, appealable and difficult for licensed operators to ignore.",
      faq: [
        {
          question: "Can a family ban a relative from betting apps in Kenya?",
          answer:
            "Under the published draft regulations, a family member or interested party may apply to the Authority for an exclusion. The Authority decides after assessment and should hear the affected person where practical."
        },
        {
          question: "How would a betting exclusion work across apps?",
          answer:
            "The draft requires a national register, automated blocking by licensed operators and daily checks against that register."
        },
        {
          question: "Do the rules cover unlicensed betting sites?",
          answer:
            "The register binds licensed operators. Offshore or illegal platforms remain an enforcement gap."
        }
      ],
      author: tim,
      publishedAt: published(6),
      updatedAt: published(6),
      readTime: "6 min read",
      image: {
        src: "/articles/kenya-betting-rules-family-exclusion-grak.jpg",
        alt: "A concerned family member sits beside a man using a phone while betting brand names appear around him. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [apps, business],
      regions: [kenya],
      sources: [
        {
          label: "Gambling Regulatory Authority: draft Conduct of Gambling Operations Regulations, 2026",
          url: "https://gra.go.ke/wp-content/uploads/2026/03/18.03.26-GRA-THE-GAMBLING-CONTROL-CONDUCT-OF-GAMBLING-OPERATIONS-REGULATIONS-2026.pdf"
        },
        {
          label: "Kenya Law: Gambling Control Act, 2025",
          url: "https://new.kenyalaw.org/akn/ke/act/2025/14/eng@2025-08-12"
        },
        {
          label: "Kenya News Agency: gambling reforms move closer to implementation",
          url: "https://www.kenyanews.go.ke/gambling-control-act-reforms-move-closer-to-implementation/"
        }
      ]
    }
  ];
}
