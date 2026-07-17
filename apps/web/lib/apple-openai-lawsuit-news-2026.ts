import type { Article, Author, Tag } from "@/lib/types";

type BuildAppleOpenAiLawsuitNewsArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
};

function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  const match = items.find((item) => item.slug === slug);
  if (!match) throw new Error(`Missing slug: ${slug}`);
  return match;
}

const publishedAt = new Date(Date.UTC(2026, 6, 17, 7, 0, 0)).toISOString();

export function buildAppleOpenAiLawsuitNewsArticles({ authors, topics, brands }: BuildAppleOpenAiLawsuitNewsArgs): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const ai = bySlug(topics, "ai");
  const business = bySlug(topics, "business");
  const apple = bySlug(brands, "apple");
  const openai = bySlug(brands, "openai");
  const google = bySlug(brands, "google");

  return [
    {
      id: "apple-openai-lawsuit-trade-secrets",
      slug: "apple-sues-openai-trade-secrets",
      format: "news",
      title: "Apple sues OpenAI, and the age of polite AI partnerships is over",
      seo: {
        title: "Apple sues OpenAI over alleged trade secret theft",
        description:
          "Apple has filed a blockbuster lawsuit accusing OpenAI of a coordinated campaign to steal hardware secrets for its AI devices. The allegations, the denial, and what it means."
      },
      subhead:
        "Apple says OpenAI built part of its hardware push on stolen secrets. OpenAI denies the allegations. The dispute shows how fragile AI partnerships become once hardware, talent, and platform control collide.",
      excerpt:
        "Apple's lawsuit against OpenAI turns a friendly AI partnership into a fight over hardware, trade secrets, talent, and who gets to define the next computing device.",
      whyItMatters:
        "The case is not only about one lawsuit. It is about whether AI companies can hire their way into hardware, whether phone makers can protect years of device knowledge, and how quickly today's AI partners can become tomorrow's platform rivals.",
      body: [
        "Apple has sued OpenAI in federal court, accusing the AI company of using former Apple employees and confidential hardware information to accelerate its own device ambitions. OpenAI denies the allegations and says it has no interest in misappropriating competitors' trade secrets.",
        "That denial matters. At this stage, Apple's claims are allegations in a lawsuit, not findings of fact. No court has ruled that OpenAI, its staff, or former Apple employees stole trade secrets. The case is now a legal fight over what Apple can prove, what OpenAI can refute, and where the line sits between hiring experienced people and misusing confidential knowledge.",
        "Still, the lawsuit is already important because of what it reveals about the AI industry's next phase. AI is moving from chat windows into phones, wearables, glasses, speakers, home devices, and ambient assistants. Once that happens, software companies need hardware knowledge. Hardware companies need AI talent. The old handshake between platform owners and AI labs starts to look less friendly.",
        "Apple and OpenAI were supposed to be one of the cleaner examples of that handshake. Apple added ChatGPT integration to its devices as part of its broader Apple Intelligence push. OpenAI gained access to the most valuable consumer computing surface in the world: the iPhone. For users, the partnership looked practical. For the industry, it looked like a temporary truce between a hardware empire and an AI company that wanted to reach ordinary people.",
        "Apple's lawsuit says the truce hid a deeper conflict. According to Apple's complaint, OpenAI allegedly pursued a coordinated effort to obtain confidential hardware information through people who had worked at Apple or who still had access to Apple systems. Apple claims the alleged information involved unreleased product plans, device materials, manufacturing methods, component knowledge, and supplier relationships.",
        "OpenAI rejects that framing. Its position, according to public reporting around the dispute, is that it does not want or need Apple's trade secrets. That is the core question the court will eventually need to test: whether this was a lawful talent migration in a competitive industry, or whether protected information moved with people in ways the law does not allow.",
        "## The claim Apple is making",
        "The heart of Apple's case is not simply that OpenAI hired former Apple employees. Tech companies hire from one another constantly. People carry experience, taste, judgment, habits, and technical instincts from one job to another. That is allowed. Trade secret law generally does not prevent a person from changing jobs or using general skill and knowledge.",
        "Apple's argument is narrower and more serious. It alleges that OpenAI went beyond hiring and into improper access, transfer, or use of protected information. In Apple's telling, the issue is not whether former Apple staff knew how Apple builds products. The issue is whether confidential materials, internal files, supplier know-how, or unreleased design information allegedly crossed the line into OpenAI's hardware work.",
        "That distinction is why the lawsuit matters beyond Apple. Many AI companies are trying to build physical products quickly. They can hire great designers, engineers, supply-chain specialists, and operations people. But if the fastest way to compete is to recruit people from a hardware incumbent, courts may be asked more often to decide what counts as experience and what counts as protected company property.",
        "For Apple, the stakes are obvious. Its advantage is not only the iPhone's operating system or chip design. It is also the quieter machinery behind products: industrial design, materials, supplier relationships, reliability testing, manufacturing tolerances, thermal design, camera packaging, antenna placement, battery trade-offs, and the thousand small choices that make a product feel finished.",
        "Those details are especially valuable now because AI hardware is hard. A good AI device needs microphones, cameras, batteries, heat management, always-on sensing, privacy controls, a durable body, a usable interface, and a reason to exist when everyone already owns a phone. That is not a simple software problem. It is exactly the kind of problem Apple has spent decades learning to solve.",
        "## OpenAI's hardware ambition changes the relationship",
        "OpenAI's move toward hardware is the backdrop. The company has made clear that it does not want to live only inside other companies' apps and operating systems. A lab that depends on Apple, Google, Microsoft, and Samsung for distribution is powerful, but still constrained. A lab with its own device has a different kind of leverage.",
        "That is why Apple's complaint lands so loudly. Apple can tolerate an AI partner that improves Siri-adjacent experiences. It is harder to tolerate an AI partner that may be building a device meant to replace some phone habits. If OpenAI can make a personal AI product that people use instead of opening apps, Apple loses more than a feature war. It loses attention, defaults, and perhaps a piece of the relationship with the user.",
        "This is the same broader tension that has been building across the industry. Google wants Gemini everywhere but also controls Android. Microsoft wants Copilot everywhere but also owns Windows. Meta wants AI glasses and social distribution. OpenAI wants to be a consumer platform without borrowing every surface from someone else. Each company says partnership. Each company also sees a future in which the partner becomes the chokepoint.",
        "That is why this lawsuit should be read alongside other recent AI platform fights. Our coverage of [Claude Fable 5 returning under tighter controls](/news/anthropic-redeploys-fable-5) showed how government policy can reshape a model after launch. Our look at [Apple's rumored foldable iPhone Ultra](/business/apple-foldable-iphone-ultra-2500-luxury) showed how hardware scarcity can become strategy. And our essay on [America inventing, China perfecting, and Europe writing rules](/opinion/america-innovates-china-replicates-europe-regulates) argued that tech power increasingly sits at the intersection of invention, manufacturing, and regulation.",
        "The Apple v OpenAI fight sits exactly there. It is about invention, because AI companies want new device categories. It is about manufacturing, because Apple says its product knowledge is being targeted. It is about regulation and law, because courts may now decide how much of Silicon Valley's talent flow is fair competition and how much becomes misappropriation.",
        "## The partnership problem",
        "One reason the lawsuit feels strange is that Apple and OpenAI were not obvious enemies. Apple needed a credible AI answer quickly, and OpenAI had the brand recognition to help. OpenAI benefited from being close to the iPhone without needing to build a phone on day one. Both sides had a reason to smile in public.",
        "But platform partnerships are often temporary. They work while both sides need something from each other. They strain when one side begins moving up or down the stack. If OpenAI stays a service inside iOS, Apple can manage the relationship. If OpenAI builds hardware that competes for daily attention, the relationship turns into a risk calculation.",
        "Apple has lived this before. Spotify was a partner until Apple Music made music a platform fight. Google was a partner on maps and search until Android became a direct strategic rival. Meta was a distribution partner until privacy, ads, and app tracking became a war over who controls the user relationship.",
        "OpenAI may now be entering that same category. It is not just an app provider. It is a company trying to own a layer of computing that sits between the user and everything else. If that layer becomes strong enough, the phone becomes less central. Apple cannot ignore that.",
        "## What Apple has to prove",
        "Apple's public claims sound dramatic, but lawsuits are won on evidence, not atmosphere. The company will need to show that specific information qualifies as a trade secret, that Apple took reasonable steps to protect it, and that the defendants improperly acquired, disclosed, or used it.",
        "That can be difficult. A hardware engineer's knowledge does not become unusable just because it was learned at Apple. Courts often have to separate general expertise from specific protected material. A person can know how premium devices are usually designed without carrying Apple's secret files. A person can understand supply-chain problems without disclosing Apple's vendor playbook.",
        "OpenAI's defense is likely to lean on that distinction. It can argue that it hired experienced people lawfully, built products independently, and did not need Apple's confidential information to pursue hardware. It can also challenge whether Apple's alleged secrets were actually secret, whether the information was used, and whether Apple is trying to slow a competitor rather than protect legitimate company property.",
        "For readers, that means caution is important. The allegations are serious, but they are still allegations. The useful question is not whether OpenAI is guilty because Apple filed a lawsuit. The useful question is what this dispute reveals about the incentives around AI hardware.",
        "## Why this matters to ordinary users",
        "At first glance, a trade secrets lawsuit between Apple and OpenAI sounds like a boardroom story. It is not. The outcome could shape the devices people buy, the assistants they use, and how quickly AI hardware reaches the market.",
        "If Apple succeeds, AI companies may become more cautious when hiring from hardware giants. They may spend more time documenting clean-room development, proving independent work, and separating teams from potentially sensitive information. That could slow some products, but it could also make the industry more disciplined.",
        "If OpenAI defeats the claims, AI companies may feel more confident hiring aggressively from Apple, Google, Meta, Samsung, and other device makers. That could speed up competition. It could also make incumbents even more defensive about employee exits, contractor access, and supplier relationships.",
        "Either way, users should expect less innocence around AI partnerships. The company that powers a feature today may want to own the device tomorrow. The company that offers distribution today may want to block a rival tomorrow. AI is becoming infrastructure, and infrastructure fights are rarely polite.",
        "## The bigger shift",
        "The lawsuit is also a signal that AI has entered the expensive, physical, legally messy phase. Demos are easy compared with devices. Devices require materials, factories, logistics, repairs, accessories, retail, support, safety, and years of trust. That is Apple's territory.",
        "OpenAI's challenge is that the best AI experience may need more than an app. It may need a new object, or at least a new kind of interface. Apple's challenge is that the best AI assistant may not respect old device boundaries. The fight was probably inevitable once both companies began reaching toward the same user.",
        "For now, the cleanest reading is this: Apple is accusing OpenAI of crossing a line, OpenAI denies it, and the court has not decided who is right. But the friendly phase of consumer AI is ending. The companies that used to announce integrations together are now preparing to argue over secrets, devices, and control."
      ],
      closingLine:
        "The lawsuit may take years to resolve, but the message has already landed: in AI, the next platform fight will not stay inside software.",
      author: tim,
      publishedAt,
      updatedAt: publishedAt,
      readTime: "7 min read",
      image: {
        src: "/articles/apple-sues-openai-trade-secrets.jpg",
        alt: "Apple and OpenAI logos separated by a crack, illustrating a trade secrets dispute. Credit: tecMAMBO.",
        credit: "tecMAMBO",
        width: 1040,
        height: 520,
        type: "image/jpeg"
      },
      tags: [ai, business, apple, openai, google],
      faq: [
        {
          question: "Did Apple prove that OpenAI stole trade secrets?",
          answer:
            "No. Apple has filed allegations in court, but no court has ruled that OpenAI or any defendant stole trade secrets. OpenAI denies the claims."
        },
        {
          question: "Why would Apple sue an AI partner?",
          answer:
            "The partnership around ChatGPT integration does not remove competition. If OpenAI is building consumer AI hardware, Apple may see it as a future rival for user attention and device control."
        },
        {
          question: "What does OpenAI say about the lawsuit?",
          answer:
            "OpenAI denies the allegations and says it has no interest in misappropriating competitors' trade secrets."
        },
        {
          question: "Could this affect future AI devices?",
          answer:
            "Yes. The case could make AI companies more careful about hiring from hardware firms and more deliberate about documenting independent product development."
        },
        {
          question: "Why does this matter if I only use an iPhone or ChatGPT?",
          answer:
            "Because AI is moving from apps into devices. The companies that control hardware, assistants, and distribution may shape what features you get and which products reach you first."
        }
      ],
      sources: [
        {
          label: "TechCrunch: Apple sues OpenAI over alleged trade secret theft",
          url: "https://techcrunch.com/2026/07/10/apple-sues-openai-over-alleged-trade-secret-theft/"
        },
        {
          label: "Axios: Apple sues OpenAI over trade secrets",
          url: "https://www.axios.com/2026/07/10/apple-sues-openai-trade-secret-theft"
        },
        {
          label: "WIRED: Apple sued OpenAI discussion",
          url: "https://www.wired.com/story/uncanny-valley-podcase-apple-sued-openai-new-york-data-center-moratorium-cyclosporiasis-outbreak"
        },
        {
          label: "Yahoo Finance: Apple sues OpenAI for trade secret theft",
          url: "https://finance.yahoo.com/technology/ai/articles/apple-sues-openai-trade-secret-203040047.html"
        },
        {
          label: "CNBC: Apple and OpenAI lawsuit coverage",
          url: "https://www.cnbc.com/technology/"
        },
        {
          label: "Bloomberg technology coverage",
          url: "https://www.bloomberg.com/technology"
        }
      ]
    }
  ];
}
