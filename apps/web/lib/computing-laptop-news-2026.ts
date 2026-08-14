import type { Article, Author, Tag } from "@/lib/types";

type BuildComputingLaptopNewsArticlesArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
};

function getTag(tags: Tag[], slug: string) {
  const tag = tags.find((candidate) => candidate.slug === slug);
  if (!tag) throw new Error(`Missing tag: ${slug}`);
  return tag;
}

function publishedAt(day: number, hour: number, minute = 0) {
  return new Date(Date.UTC(2026, 6, day, hour, minute, 0)).toISOString();
}

const imageMeta = {
  width: 1040,
  height: 520,
  type: "image/jpeg"
};

export function buildComputingLaptopNewsArticles({ authors, topics, brands }: BuildComputingLaptopNewsArticlesArgs): Article[] {
  const tim = authors.find((author) => author.slug === "tim-humphreys") ?? authors[0]!;
  const lulu = authors.find((author) => author.slug === "lulu-camau") ?? tim;
  const computing = getTag(topics, "computing");
  const cybersecurity = getTag(topics, "cybersecurity");
  const ai = getTag(topics, "ai");
  const business = getTag(topics, "business");

  const microsoft = getTag(brands, "microsoft");
  const windows = getTag(brands, "windows");
  const dell = getTag(brands, "dell");
  const intel = getTag(brands, "intel");
  const amd = getTag(brands, "amd");
  const nvidia = getTag(brands, "nvidia");
  const lenovo = getTag(brands, "lenovo");
  const apple = getTag(brands, "apple");

  return [
    {
      id: "computing-news-microsoft-patch-tuesday-570",
      slug: "microsoft-july-2026-patch-tuesday-record-570-flaws",
      format: "news",
      title: "Microsoft just patched a record 570 flaws. Update now",
      seo: {
        title: "Microsoft just patched a record 570 flaws. Update now",
        description:
          "July's Patch Tuesday fixed a record 570 vulnerabilities including two under active attack, and AI is why. Also: why some Dell PCs are blocked from installing it."
      },
      subhead:
        "The biggest Patch Tuesday in Microsoft's history is not a fluke. It is the first clear sign of what happens when AI is pointed at decades-old code, and the pace is not slowing.",
      excerpt:
        "Microsoft's July 2026 Patch Tuesday fixed a record 570 flaws, including two already being used in attacks. The boring advice is now urgent: update quickly.",
      whyItMatters:
        "Two of these flaws are already being used in real attacks, and AI finding bugs faster than humans ever could is about to change how often you need to update everything you own.",
      body: [
        "Microsoft released fixes for a record 570 security vulnerabilities on July 14, the largest Patch Tuesday in the company's history, and if you run Windows you should install it now rather than later. Two of the flaws were already being exploited in real attacks before the patch existed.",
        "The scale matters because it is not simply a big month. The previous record, set only last month, was 206. Counting everything Microsoft shipped across the month, the total passes 620, and security researchers tracking the release say the year-to-date CVE count already exceeds every previous full year on record. Roughly 1,380 vulnerabilities have been patched so far in 2026, and we are barely halfway through the year.",
        "Fifty-nine of the July flaws are rated Critical. Around 250 are elevation-of-privilege bugs, the kind that turn a small foothold into full control. More than 400 affect Windows itself.",
        "Three are zero-days, meaning they were publicly known or under attack before a fix existed. Two are confirmed as actively exploited: CVE-2026-56155, an Active Directory Federation Services flaw that hands an attacker administrator rights, and CVE-2026-56164, a SharePoint Server bug that lets an unauthenticated attacker elevate privileges over a network. CVE-2026-50661 is a publicly disclosed BitLocker bypass that matters most if a laptop is lost or stolen. CVE-2026-48561, a remote code execution bug in Microsoft Copilot, also carries a severe score.",
        "## Why there are suddenly so many",
        "The explanation is not that Windows suddenly became worse. The tools for finding bugs became dramatically better. Microsoft has been open about this: advances in AI make it possible to find more issues, faster, across more code. The company is now running AI-powered scanning across the Windows codebase, surfacing years of latent flaws that human researchers never had the time to find.",
        "The uncomfortable implication is symmetrical. If Microsoft's AI can find these bugs, so can an attacker's. That is why Microsoft now recommends installing Windows 11 quality updates within three days, and why organisations should shorten their update deferral windows.",
        "## The catch for some Dell PCs",
        "In an awkward twist, Microsoft has blocked the July update on some Dell machines because affected devices can suffer unexpected shutdowns, poor performance, increased heat, and battery drain.",
        "The root cause traces to an optional preview update from June 23 that introduced a new Windows USB-C Connection Manager. That component can conflict with the Intel Innovation Platform Framework Processor Participant driver, which manages processor power and thermals on many Intel laptops. When the two clash, power management breaks down. Dell caught it during testing and Microsoft applied a compatibility hold.",
        "If you own a Dell, open Device Manager and look for a warning next to that Intel driver. Do not force the update from the Microsoft Update Catalog to bypass the hold. The hold exists to protect you.",
        "## The Kenyan angle",
        "In Kenya, many people run older Windows laptops for school, office work, cyber cafes, small business bookkeeping, church media desks, and side hustles. Those machines often sit behind weak backup habits and shared USB drives. A record Windows patch month is not abstract. It is the difference between a machine that stays useful and one that becomes a recovery job.",
        "If you are on Windows 10, free Extended Security Updates for consumers are still available through October 12, 2027 for enrolled machines. That matters because many working laptops here are not ready for Windows 11.",
        "The bigger lesson is the one to take forward. A record patch is not a one-off crisis. It is the new baseline, and the habit that protects you is boring and unglamorous: update quickly, every time."
      ],
      closingLine:
        "When AI finds bugs faster, the responsible response is not panic. It is faster patching.",
      author: tim,
      publishedAt: publishedAt(16, 6, 5),
      updatedAt: publishedAt(16, 6, 5),
      readTime: "8 min read",
      image: {
        src: "/articles/windows-update-570-patched-fixes.jpg",
        alt: "A Windows update screen on a laptop.",
        credit: "Microsoft",
        ...imageMeta
      },
      tags: [cybersecurity, computing, microsoft, windows, dell, intel],
      faq: [
        {
          question: "How many vulnerabilities did Microsoft fix in July 2026?",
          answer: "Microsoft fixed a record 570 vulnerabilities on Patch Tuesday itself, with the wider July total passing 620 depending on how monthly advisories are counted."
        },
        {
          question: "Why are there so many Windows vulnerabilities now?",
          answer: "Microsoft is using AI-powered scanning to find more flaws across the Windows codebase, which means more bugs are being found and patched faster."
        },
        {
          question: "Which July 2026 flaws are being exploited?",
          answer: "CVE-2026-56155 in Active Directory Federation Services and CVE-2026-56164 in SharePoint Server are confirmed as actively exploited."
        },
        {
          question: "Why can some Dell PCs not install the July update?",
          answer: "Microsoft placed a compatibility hold because of a conflict between a new Windows USB-C component and an Intel power and thermal driver on some Dell PCs."
        },
        {
          question: "Should I install the update immediately?",
          answer: "Yes, unless your PC is under a compatibility hold. Microsoft recommends installing Windows quality updates within three days."
        }
      ],
      sources: [
        { label: "Microsoft Security Update Guide", url: "https://msrc.microsoft.com/update-guide" },
        { label: "Zero Day Initiative", url: "https://www.zerodayinitiative.com/blog" },
        { label: "Microsoft Windows release health", url: "https://learn.microsoft.com/windows/release-health/" }
      ]
    },
    {
      id: "computing-news-copilot-pc-insights",
      slug: "copilot-pc-insights-windows-diagnostics",
      format: "news",
      title: "Copilot can now tell you why your PC is slow",
      seo: {
        title: "Copilot can now tell you why your PC is slow",
        description:
          "Microsoft is testing PC Insights, letting you ask Copilot plain-English questions about your PC's health. The irony: the Copilot app itself reportedly uses up to 1GB of RAM."
      },
      subhead:
        "The feature is exactly the kind of translation layer Windows has needed. Independent testing just found the tool doing the diagnosing is itself one of the hungrier things on your machine.",
      excerpt:
        "Microsoft is testing PC Insights for Copilot, a plain-English way to ask why your laptop feels slow, whether your storage is full, or why your battery is fading.",
      whyItMatters:
        "Task Manager has been intimidating people for twenty years. An AI that answers why is my laptop slow in plain English is genuinely useful, if it does not become part of the problem.",
      body: [
        "Microsoft is testing a Copilot feature called PC Insights that lets you ask your computer, in plain English, why it is misbehaving. Instead of opening Task Manager and interpreting a wall of numbers, you can ask questions like why is my laptop running slow or do I have enough storage to install a 100GB game.",
        "With permission, the feature reads hardware signals: processor and memory load, storage space, battery health, and what is plugged into your USB ports. It is opt-in, lives inside the Copilot app, and is rolling out gradually to a limited subset of users.",
        "## Why this is useful",
        "Windows has always been bad at explaining itself. Task Manager tells you a process is using 87 percent of your CPU. It does not tell you whether that matters, whether the app is broken, or what you should do next. Event Viewer is even less friendly. A tool that translates your disk is at 99 percent because a background indexer is running into a clear sentence is exactly the kind of translation layer ordinary users need.",
        "Microsoft has also drawn useful boundaries. PC Insights is not pitched as an enterprise diagnostic tool or a replacement for Event Viewer. It is aimed at consumer-style questions. Microsoft says it does not access work email, Teams chats, calendars, or Microsoft 365 documents. Conversation activity may still be used for product improvement depending on settings, so the privacy screen is worth reading before switching it on.",
        "## The irony worth naming",
        "Independent testing by Windows Latest found the Copilot app consuming roughly 800MB to 1GB of memory while idle on a machine with 32GB of RAM. The tool built to tell you what is eating your resources can itself be one of the heavier things running.",
        "The reason is architectural. Copilot is built on WebView2, which runs a stripped-down Edge browser in the background. That is why the process may show up in Task Manager as Browser. This is not a fatal flaw, but it matters because the feature's entire selling point is performance diagnostics.",
        "## The Kenyan reality",
        "On a 32GB workstation, a gigabyte of idle RAM is a shrug. On the machines many people actually own here, 8GB refurbished business laptops, entry-level student notebooks, and older family PCs, that is an eighth of the whole memory budget.",
        "That creates a real tension. The person most likely to need a plain-English explanation for a slow laptop is also the person least able to spare the memory cost of the explainer. Microsoft should make this feature light enough to help older hardware, not only premium machines.",
        "## Should you care?",
        "Yes, if it reaches you, but treat it as a first-pass explainer, not a technician. It can tell you storage is nearly full, memory is under pressure, or battery health has dropped. It will not diagnose every failing drive, obscure driver conflict, or malware problem. The best diagnostic tool is still the one that helps without needing to run all the time."
      ],
      closingLine:
        "Plain-English diagnostics are a good idea. They just need to be light enough for the people who need them most.",
      author: tim,
      publishedAt: publishedAt(16, 6, 25),
      updatedAt: publishedAt(16, 6, 25),
      readTime: "6 min read",
      image: {
        src: "/articles/microsoft-copilot-pc-insights.jpg",
        alt: "Microsoft Copilot Plus PC presentation on a stage.",
        credit: "Andrej Sokolow",
        ...imageMeta
      },
      tags: [ai, computing, microsoft, windows],
      faq: [
        {
          question: "What is Copilot PC Insights?",
          answer: "It is an opt-in Copilot feature that answers plain-English questions about your PC's health using hardware signals like CPU load, memory, storage, battery health, and connected USB devices."
        },
        {
          question: "Is PC Insights available everywhere?",
          answer: "No. It is rolling out gradually and may be limited by region and account eligibility."
        },
        {
          question: "Does PC Insights read my work files?",
          answer: "Microsoft says it does not access work email, Teams chats, calendars, or Microsoft 365 documents."
        },
        {
          question: "How much memory does Copilot use?",
          answer: "Independent testing reported roughly 800MB to 1GB while idle, though this can vary by device and version."
        }
      ],
      sources: [
        { label: "Microsoft Copilot", url: "https://www.microsoft.com/microsoft-copilot" },
        { label: "Windows Insider Blog", url: "https://blogs.windows.com/windows-insider/" },
        { label: "Windows Latest", url: "https://www.windowslatest.com/" }
      ]
    },
    {
      id: "computing-explainer-ddr4-legacy-cpus",
      slug: "ddr4-legacy-cpus-ram-price-crisis",
      format: "explainer",
      title: "Why old CPUs are suddenly the smart buy again",
      seo: {
        title: "Why old CPUs are suddenly the smart buy again",
        description:
          "A memory price crisis has made older DDR4 platforms and legacy CPUs genuinely competitive again. What is driving the RAMpocalypse, and what it means for your next build."
      },
      subhead:
        "Legacy chips are having a strange renaissance, older Ryzen X3D parts are being scalped, and Intel is restarting production of chips it had moved on from. Here is the chain of cause and effect.",
      excerpt:
        "Older DDR4 platforms are back in the conversation because AI demand is squeezing memory supply and changing the real cost of a PC build.",
      whyItMatters:
        "The cheapest good PC you can build right now may be built from last generation's parts, and the reason is a memory shortage caused by AI data centres you will never see.",
      body: [
        "Something unusual is happening in PC building: older, supposedly obsolete processors are becoming sensible again. Legacy and mid-range chips are holding value, older AMD X3D parts are being resold above list price, and Intel has restarted production of 13th and 14th generation Raptor Lake CPUs for the Chinese market.",
        "The chain of cause behind this runs back to AI, and understanding it can save you money.",
        "## Start with memory",
        "The dominant force in PC pricing right now is not processors or graphics cards. It is RAM. Memory prices have been climbing hard enough that hardware communities have started calling the period the RAMpocalypse, and buyers are hunting bundle deals to make builds affordable.",
        "The reason is AI infrastructure. Data centres building for AI consume enormous quantities of memory, and memory manufacturers have redirected capacity toward the customers paying the most. Consumer DRAM is competing against buyers with far deeper pockets. Consumer loses.",
        "## Why that revives old hardware",
        "Newer platforms use DDR5 memory. Older platforms use DDR4. When DDR5 prices spike, the total cost of a modern build rises beyond the price of the CPU itself. Suddenly, a previous-generation motherboard paired with cheaper DDR4 memory becomes the better value proposition, even if the chip is slower on paper.",
        "That is why AMD's Ryzen 7 5800X3D, a DDR4-era part, keeps coming back into serious comparisons. It is why Intel restarting Raptor Lake production for a market where DDR4 demand stays strong is rational rather than nostalgic. The useful question for a builder in 2026 is not only which CPU is fastest. It is what the whole platform costs, including memory.",
        "## What this means if you are buying",
        "Price the platform, not the chip. A cheaper CPU on an expensive memory standard can cost more than a pricier CPU on a cheap one. Add up motherboard, memory, and processor together before deciding.",
        "Older is not automatically worse. For gaming especially, cache matters enormously, which is why AMD's X3D parts punch above their generation. A last-generation X3D chip on DDR4 can outperform a newer and more expensive configuration in the workloads most people actually care about.",
        "Secondhand is having a moment, carefully. In Nairobi, where imported components already carry a premium and the secondhand market is deep, a well-chosen used DDR4 platform can be genuinely competitive. Just buy from someone who will let you test the board, memory, and CPU.",
        "## The bigger idea",
        "This is one of those moments where a distant industry force reaches all the way into your desk. Nobody building a gaming PC in Kasarani made a decision about AI data centre capacity, and yet that decision is part of why their RAM costs what it costs.",
        "Consumer technology is downstream of industrial priorities. When the industry finds a richer customer, consumers do not get told. They get quietly outbid.",
        "The silver lining is real. For once, the sensible advice is not to buy the newest thing. It is to look carefully at last generation, price the whole platform, and let the scarcity premium pass you by. Patience is a spec."
      ],
      closingLine:
        "The smart build is not always the newest build. In 2026, it might be the one that avoids the memory tax.",
      author: lulu,
      publishedAt: publishedAt(16, 6, 45),
      updatedAt: publishedAt(16, 6, 45),
      readTime: "7 min read",
      image: {
        src: "/articles/intel-old-cpus-comeback.jpg",
        alt: "An Intel Core i5 processor box.",
        credit: "Intel",
        ...imageMeta
      },
      tags: [computing, intel, amd],
      faq: [
        {
          question: "Why are RAM prices rising in 2026?",
          answer: "AI data centre demand is absorbing memory manufacturing capacity, tightening supply for consumer RAM and pushing prices up."
        },
        {
          question: "Are older CPUs worth buying now?",
          answer: "Often yes. DDR4 platforms can offer better total value than newer DDR5 systems once memory, motherboard, and CPU pricing are counted together."
        },
        {
          question: "Why are AMD X3D chips still popular?",
          answer: "Their extra cache helps gaming performance, so some older X3D chips remain competitive even against newer CPUs."
        },
        {
          question: "What should I check before buying used PC parts?",
          answer: "Test the motherboard, memory, CPU, storage slots, and ports, and buy from a seller who allows verification before payment."
        }
      ],
      sources: [
        { label: "Tom's Hardware", url: "https://www.tomshardware.com/" },
        { label: "TechPowerUp", url: "https://www.techpowerup.com/" },
        { label: "Wccftech", url: "https://wccftech.com/" }
      ]
    },
    {
      id: "computing-business-intel-cpu-prices",
      slug: "intel-cpu-price-increases-2026",
      format: "business",
      title: "Intel raises CPU prices, and AMD looks better for it",
      seo: {
        title: "Intel raises CPU prices, and AMD looks better for it",
        description:
          "Intel confirmed price hikes on select desktop and server chips, with some Xeons up over $1,000. What rose, what did not, and why AMD's X3D parts now look like the value play."
      },
      subhead:
        "The increases are narrower than the headlines suggest, and that precision is the story: Intel raised prices exactly where it knew buyers would pay.",
      excerpt:
        "Intel's 2026 CPU price increases are narrow but revealing: desktop bumps are modest, server hikes are steep, and AMD gets a value opening.",
      whyItMatters:
        "Component prices are climbing across the board, and every increase in Nairobi lands on top of import costs and exchange rates. Knowing exactly what went up protects your budget.",
      body: [
        "Intel has confirmed price increases on selected desktop and server processors, citing rising supply costs and demand, and the shape of those increases tells you more than the fact of them.",
        "On the desktop side, the adjustment targets Arrow Lake-S Core Ultra 200S Plus processors introduced earlier this year, with reported increases in the region of 30 to 50 dollars per chip. The flagship Core Ultra 9 285K reportedly holds its existing price, and many entry-level parts are unchanged. The larger moves are in the data centre, where several Xeon processors have risen by well over a thousand dollars.",
        "## Read the pattern",
        "Intel raised prices where demand is strong, street prices already exceeded official pricing, buyers are relatively insensitive to price, and inventory is tight. It left the halo flagship and budget parts alone. This is not a company passing on costs evenly. It is a company optimising margin on the segments that can absorb it.",
        "The Xeon increases point at the same force driving the memory squeeze: AI. Every AI server needs host processors, and that demand has tightened supply for high-core-count chips to the point where availability itself is more valuable to buyers than discounts.",
        "## Why AMD looks better by comparison",
        "Intel's timing is awkward. Its Core Ultra 200S Plus line already sat at a premium against AMD's competing parts, and AMD has not moved on Ryzen 9000 pricing in direct response. That leaves Intel asking more while AMD's cache-heavy X3D chips continue to look strong for gaming and workstation buyers who care about value.",
        "Two caveats keep this honest. First, broader CPU price pressure is affecting both vendors, with server demand and memory costs shaping the whole market. Second, Intel is also restarting cheaper older chips for specific markets, which shows it is defending both ends of its business at once.",
        "## The Kenyan reality",
        "For buyers here, a 30 to 50 dollar increase on a chip is never just 30 to 50 dollars. It arrives with shipping, duty, VAT, retailer margin, and exchange-rate risk. By the time a Core Ultra sits on a shelf in Nairobi, the increase has compounded.",
        "Layer that on top of the memory price crisis squeezing the same builds, and the practical advice is simple: if you were already committed to an affected Intel platform, buying sooner may be cheaper than buying later. If you were undecided, price a full AMD X3D build and compare honestly.",
        "The broader point is worth internalising. Consumer computing is being priced as a byproduct of an AI infrastructure boom. The chips are not more expensive only because they got better. They are more expensive because someone with a bigger budget wants the same factory."
      ],
      closingLine:
        "Intel's increases are narrow, but they show where power has moved: toward AI buyers and away from ordinary PC budgets.",
      author: tim,
      publishedAt: publishedAt(16, 7, 5),
      updatedAt: publishedAt(16, 7, 5),
      readTime: "6 min read",
      image: {
        src: "/articles/intel-raises-cpu-prices.jpg",
        alt: "An Intel Core Ultra processor render.",
        credit: "Intel",
        ...imageMeta
      },
      tags: [computing, business, intel, amd],
      faq: [
        {
          question: "Which Intel CPUs went up in price?",
          answer: "Selected Arrow Lake-S Core Ultra 200S Plus desktop chips and several Xeon server processors rose, while some flagship and entry-level parts reportedly stayed unchanged."
        },
        {
          question: "Why is Intel raising prices?",
          answer: "Intel cites supply costs and demand, while the pattern suggests price pressure is strongest where AI and server buyers are least sensitive to increases."
        },
        {
          question: "Does this make AMD a better buy?",
          answer: "For some buyers, yes. AMD's X3D chips can look stronger on value when Intel's affected parts rise, but full platform cost still matters."
        },
        {
          question: "Should Kenyan PC builders wait?",
          answer: "Waiting may not help if memory and processor prices keep rising. Compare the full local platform price before choosing."
        }
      ],
      sources: [
        { label: "Intel newsroom", url: "https://www.intel.com/content/www/us/en/newsroom/home.html" },
        { label: "Tom's Hardware", url: "https://www.tomshardware.com/" },
        { label: "TrendForce", url: "https://www.trendforce.com/" }
      ]
    },
    {
      id: "computing-business-nvidia-rtx-spark",
      slug: "nvidia-rtx-spark-windows-arm-ai-pc",
      format: "business",
      title: "NVIDIA's RTX Spark wants to reinvent the Windows PC",
      seo: {
        title: "NVIDIA's RTX Spark wants to reinvent the Windows PC",
        description:
          "NVIDIA's Arm-based RTX Spark superchip brings 1 petaflop and 128GB of unified memory to Windows laptops this fall. The ambition is huge. So is the reason to be sceptical."
      },
      subhead:
        "A 20-core Arm CPU, a Blackwell GPU, and 128GB of shared memory in a thin laptop. Also: NVIDIA has tried this before, and it ended in a billion-dollar write-off.",
      excerpt:
        "NVIDIA's RTX Spark platform is a direct challenge to Intel and AMD in Windows PCs, built around local AI, Arm, Blackwell graphics, and huge shared memory.",
      whyItMatters:
        "For forty years the Windows PC has been an Intel or AMD machine. NVIDIA is trying to change that, and if it works, everything about what a laptop is gets rewritten.",
      body: [
        "NVIDIA has declared war on the Windows PC processor market. At Computex in Taipei, chief executive Jensen Huang unveiled RTX Spark, an Arm-based superchip that pairs a 20-core NVIDIA Grace CPU, co-developed with MediaTek, with a Blackwell RTX GPU carrying 6,144 CUDA cores, joined by NVIDIA's NVLink chip-to-chip interconnect.",
        "NVIDIA claims up to one petaflop of AI compute and up to 128GB of unified memory shared across CPU and GPU. One correction to the hype matters immediately: these machines are not shipping yet. NVIDIA says the first RTX Spark laptops and compact desktops arrive in fall 2026, from partners including ASUS, Dell, HP, Lenovo, Microsoft Surface, and MSI.",
        "## The pitch",
        "The argument is about where AI runs. Today, serious AI work usually happens in a data centre, with subscriptions, latency, and privacy trade-offs attached. NVIDIA's bet is that more of that work should happen on your own machine. It claims RTX Spark can run large local models, handle demanding video workflows, and still play games well.",
        "The differentiator is memory. No integrated neural processor in a conventional laptop chip competes with thousands of CUDA cores for local generative work, and 128GB of shared memory changes what a laptop can attempt.",
        "Microsoft is part of the story too, with new operating-system security primitives and agent permission work designed so on-device AI agents touch only the data and tools a user permits. That is necessary because an AI agent with unrestricted access to your PC is not convenience. It is a security incident waiting for a calendar invite.",
        "## Why scepticism is fair",
        "NVIDIA has been here before. Windows RT ran on NVIDIA Tegra chips in 2012 and collapsed because it could not run the x86 desktop software that defined Windows. Microsoft wrote down Surface RT heavily, and NVIDIA left the Windows PC processor fight for years.",
        "Two things are different now. Microsoft's x86-to-Arm emulation is much better, and the software ecosystem has spent years adapting because of Qualcomm's Windows on Arm push. RTX Spark inherits a world that did not exist in 2012. But compatibility remains the issue to check before buying any Arm Windows machine.",
        "## Price and Kenya",
        "NVIDIA has not announced pricing. Analyst notes have suggested premium configurations could sit far above mainstream laptop budgets. At that level, this is not a product for most Kenyan buyers in 2026.",
        "Still, the direction matters. If local AI becomes the thing premium laptops compete on, that logic eventually flows downmarket. A machine that runs capable models locally needs less cloud subscription, less latency, and less reliable connectivity. In a market with expensive data and uneven connections, that is genuinely interesting.",
        "The caution is equally real. The same memory demand fuelling local-AI machines is part of what is raising ordinary PC costs. The AI PC boom may make everyday laptops more expensive before it makes them smarter."
      ],
      closingLine:
        "RTX Spark is not just another laptop chip. It is a test of whether Windows can survive a post-x86 identity crisis.",
      author: tim,
      publishedAt: publishedAt(16, 7, 25),
      updatedAt: publishedAt(16, 7, 25),
      readTime: "7 min read",
      image: {
        src: "/articles/nvidia-jensen-huang-rtx-spark.jpg",
        alt: "NVIDIA CEO Jensen Huang holding two laptops on stage.",
        credit: "Nvidia",
        ...imageMeta
      },
      tags: [computing, ai, business, nvidia, microsoft, intel, amd],
      faq: [
        {
          question: "What is NVIDIA RTX Spark?",
          answer: "It is an Arm-based Windows PC platform combining an NVIDIA Grace CPU, Blackwell RTX graphics, and large shared memory for local AI workloads."
        },
        {
          question: "When do RTX Spark laptops arrive?",
          answer: "NVIDIA says the first systems arrive in fall 2026, with several major PC makers named as partners."
        },
        {
          question: "Can RTX Spark run normal Windows apps?",
          answer: "It is Arm-based, so apps run natively or through emulation. Compatibility is much better than the Windows RT era, but buyers should still check critical apps and drivers."
        },
        {
          question: "Why does RTX Spark matter?",
          answer: "It challenges the Intel and AMD foundation of Windows PCs and shifts the premium laptop fight toward local AI performance."
        }
      ],
      sources: [
        { label: "NVIDIA newsroom", url: "https://nvidianews.nvidia.com/" },
        { label: "NVIDIA GeForce", url: "https://www.nvidia.com/en-us/geforce/" },
        { label: "Microsoft Windows Blog", url: "https://blogs.windows.com/" }
      ]
    },
    {
      id: "computing-news-thinkpad-x1-carbon-gen-14",
      slug: "thinkpad-x1-carbon-gen-14-aura-repairability",
      format: "news",
      title: "The ThinkPad X1 Carbon Gen 14 makes repairability premium",
      seo: {
        title: "The ThinkPad X1 Carbon Gen 14 makes repairability premium",
        description:
          "Lenovo's X1 Carbon Gen 14 Aura Edition rebuilds its insides around serviceability without adding bulk. Why that matters more than the spec sheet, especially here."
      },
      subhead:
        "The reviews are in, and the interesting story is not performance. It is that Lenovo treated internal serviceability as a premium feature rather than a compromise.",
      excerpt:
        "Lenovo's latest ThinkPad X1 Carbon is being praised not just for performance, but because its redesigned internals make common repairs easier.",
      whyItMatters:
        "A laptop you can repair is a laptop that lasts, and in a market with few authorised service centres and high import costs, longevity is worth more than benchmarks.",
      body: [
        "Lenovo's ThinkPad X1 Carbon Gen 14 Aura Edition has been landing in reviewers' hands, and the detail worth pulling out of the praise is not the benchmark chart. It is what Lenovo did to the inside of the machine.",
        "## The Space Frame idea",
        "The Gen 14 uses a redesigned internal layout Lenovo calls Space Frame. The claim is that it improves cooling while making components including the battery, keyboard, speakers, fans, and individual USB port assemblies more accessible to replace, without making the laptop thicker or heavier.",
        "That combination matters. The industry's standard trade-off has been that thin means glued, soldered, and disposable. Lenovo is arguing that this trade-off was partly a design choice rather than a law of physics. Individually replaceable USB ports, historically a common failure point, can coexist with an ultraportable chassis.",
        "## The rest of the machine",
        "The Gen 14 moves to Intel's Core Ultra Series 3 processors, with Intel Arc integrated graphics. Buyers choose between an efficient WUXGA IPS panel or a sharper 2.8K OLED with a 120Hz variable refresh rate. Ports are unusually generous for the class: three Thunderbolt 4, one USB-A, full-size HDMI 2.1, and a headphone jack.",
        "Honest limits: the RAM is soldered and caps at 32GB, so the repairability story has an asterisk. Battery life is good rather than class-leading, depending on screen configuration, and the price is premium. This is not a cheap way to buy repairability.",
        "## Why repairability matters more here",
        "In markets with dense authorised service networks and cheap replacement machines, repairability is a nice ethical bonus. In Kenya, it is economics. Importing a replacement laptop is expensive, warranty service can be slow, and business laptops often live through several owners.",
        "The failure that kills many laptops is rarely the processor. It is a port, fan, keyboard, or battery. A machine whose common failure points can be swapped by a competent local technician is materially more valuable over its life than a sealed machine with a faster benchmark.",
        "That is why this launch is worth noticing even if most buyers here will never buy the Gen 14 new. If serviceability becomes a feature premium buyers demand, rather than an inconvenience manufacturers tolerate, that expectation can eventually reach cheaper machines.",
        "The best thing about the Gen 14 is not that it is fast. It is that Lenovo bet its most prestigious laptop on the idea that lasting is a luxury feature."
      ],
      closingLine:
        "Premium should not mean disposable. Lenovo seems to have remembered that.",
      author: tim,
      publishedAt: publishedAt(16, 7, 45),
      updatedAt: publishedAt(16, 7, 45),
      readTime: "6 min read",
      image: {
        src: "/articles/lenovo-thinkpad-x1-carbon-repairability.jpg",
        alt: "An opened Lenovo ThinkPad X1 Carbon showing internal components.",
        credit: "Joseph Maldonado",
        ...imageMeta
      },
      tags: [computing, lenovo, intel],
      faq: [
        {
          question: "What is new in the ThinkPad X1 Carbon Gen 14 Aura Edition?",
          answer: "Its redesigned Space Frame internal layout improves serviceability and cooling while keeping the laptop thin and light."
        },
        {
          question: "Can you upgrade the RAM?",
          answer: "No. Memory is soldered and caps at 32GB, which is the main limitation in its long-term repairability story."
        },
        {
          question: "Why does repairability matter in Kenya?",
          answer: "High import costs, thinner warranty networks, and long laptop lifespans make replaceable batteries, fans, keyboards, and ports more valuable."
        },
        {
          question: "Is the X1 Carbon Gen 14 newly announced?",
          answer: "No. It launched earlier in 2026 and is now widely reviewed and shipping in more markets."
        }
      ],
      sources: [
        { label: "Lenovo ThinkPad", url: "https://www.lenovo.com/us/en/thinkpad/" },
        { label: "Tom's Hardware", url: "https://www.tomshardware.com/" },
        { label: "XDA", url: "https://www.xda-developers.com/" }
      ]
    },
    {
      id: "computing-news-m5-macbook-air",
      slug: "m5-macbook-air-value-ultraportable",
      format: "news",
      title: "Is the M5 MacBook Air the best value laptop right now?",
      seo: {
        title: "Is the M5 MacBook Air the best value laptop right now?",
        description:
          "The M5 MacBook Air keeps the same design and gets a much stronger chip. Why reviewers keep landing on it as the value pick, and what to check before you buy in Kenya."
      },
      subhead:
        "Apple changed almost nothing about how it looks and quite a lot about what is inside. In a year of rising component prices, that combination is landing differently.",
      excerpt:
        "The M5 MacBook Air is not exciting on the outside, but its mix of speed, silence, battery life, and support makes it difficult to ignore.",
      whyItMatters:
        "Most people do not need a workstation. They need a light laptop that is fast enough, lasts all day, and does not need replacing in three years.",
      body: [
        "The M5 MacBook Air arrived earlier this year with what looks, from the outside, like the least interesting update Apple could ship: the same design, the same silhouette, and the same familiar Air pitch. The argument for it is entirely inside.",
        "The M5 chip is the story. Across industry testing, Apple's M5 has become the benchmark Windows ultraportables are measured against, especially in single-core performance and efficiency. That is the chip family Apple now puts in its cheapest and lightest laptop body.",
        "## Why boring design is doing work",
        "There is a version of this story where Apple keeping the same chassis is a criticism, and there is a version where it is the point. The Air's design was already excellent: light, silent, familiar, and long-lasting. Redesigning it would risk all three. What buyers wanted was more speed inside the same object.",
        "The trade-offs remain. The display is 60Hz, which is less smooth than the 120Hz panels on premium Windows laptops and Apple's own Pro models. There is no fan, so sustained heavy workloads throttle in a way a MacBook Pro would not. Ports are minimal. If you edit video for hours or compile large projects all day, the Air remains the wrong Mac.",
        "## The value argument",
        "The case for the Air is cost-per-year-of-use. A light laptop with strong performance, fanless silence, all-day battery, and a long software life is genuinely hard to beat if you keep machines for years. The case against is configuration. Apple's upgrade pricing remains steep, and a machine that looks like a bargain at base can stop looking like one two clicks up the configurator.",
        "Before calling it the best value laptop, price the configuration you would actually buy, not the one in the headline.",
        "## Buying it in Kenya",
        "Two things matter here more than a benchmark. First, price it locally rather than trusting the US figure, because by the time an Air reaches Nairobi it carries duty, VAT, shipping, and margin. Second, think about service. Apple's repair network here is thinner than its retail visibility, and a sealed, soldered, fanless laptop is not something every technician can fix.",
        "That is the counterweight to everything the ThinkPad X1 Carbon's repairability story argues for. The MacBook Air is probably the sensible laptop for many people. It is not automatically the sensible laptop for people who need cheap local repair.",
        "The honest verdict: for most people who want a light, quiet, fast laptop that will still feel fine in five years, the M5 Air is difficult to argue against, provided you buy the configuration you need and go in clear-eyed about repair."
      ],
      closingLine:
        "The M5 Air is not the most exciting laptop of the year. It might be the most sensible.",
      author: tim,
      publishedAt: publishedAt(16, 8, 5),
      updatedAt: publishedAt(16, 8, 5),
      readTime: "6 min read",
      image: {
        src: "/articles/apple-macbook-air-m5.jpg",
        alt: "Two Apple MacBook Air laptops with patterned wallpapers.",
        credit: "Apple",
        ...imageMeta
      },
      tags: [computing, apple],
      faq: [
        {
          question: "Is the M5 MacBook Air fast?",
          answer: "Yes. Apple's M5 family is strong in single-core performance and efficiency, which is exactly what many ultraportable buyers feel day to day."
        },
        {
          question: "What are the M5 MacBook Air's weaknesses?",
          answer: "A 60Hz display, no fan for sustained heavy workloads, minimal ports, and expensive memory and storage upgrades."
        },
        {
          question: "Should I buy the Air or a MacBook Pro?",
          answer: "Choose the Air for everyday work and portability. Choose the Pro for sustained heavy workloads like long video exports, large compiles, or advanced creative work."
        },
        {
          question: "Is the M5 MacBook Air good value in Kenya?",
          answer: "It can be, but compare the exact local configuration price and factor in repair options before buying."
        }
      ],
      sources: [
        { label: "Apple MacBook Air", url: "https://www.apple.com/macbook-air/" },
        { label: "Tom's Hardware", url: "https://www.tomshardware.com/" },
        { label: "Apple Support", url: "https://support.apple.com/mac" }
      ]
    }
  ];
}
