import type { Article, Author, Tag } from "@/lib/types";

type ArticleFactoryInput = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
};

function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  const item = items.find((candidate) => candidate.slug === slug);
  if (!item) throw new Error(`Missing tag or author: ${slug}`);
  return item;
}

function readTime(body: string[]) {
  const words = body.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 180))} min read`;
}

function iso(day: number, hour = 7) {
  return new Date(Date.UTC(2026, 5, day, hour, 0, 0)).toISOString();
}

function isoJuly(day: number, hour = 7) {
  return new Date(Date.UTC(2026, 6, day, hour, 0, 0)).toISOString();
}

const images = {
  dataCentre: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1800&auto=format&fit=crop",
    alt: "Rows of servers in a data centre.",
    credit: "Unsplash"
  },
  teamChat: {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1800&auto=format&fit=crop",
    alt: "A person using a team chat app on a laptop.",
    credit: "Unsplash"
  },
  assistantPhone: {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1800&auto=format&fit=crop",
    alt: "A smartphone showing an AI assistant app.",
    credit: "Unsplash"
  },
  meter: {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1800&auto=format&fit=crop",
    alt: "A metered dial suggesting usage being measured.",
    credit: "Unsplash"
  },
  nodes: {
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1800&auto=format&fit=crop",
    alt: "An abstract illustration of connected nodes.",
    credit: "Unsplash"
  },
  mirage: {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop",
    alt: "An abstract image suggesting something not quite real.",
    credit: "Unsplash"
  },
  aiHallucination: {
    src: "/articles/why-ai-hallucinates-and-how-to-catch-it.jpg",
    alt: "AI hallucination graphic attributed to mongmong_Studio on shutterstock.com.",
    credit: "mongmong_Studio - shutterstock.com"
  },
  textTiles: {
    src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1800&auto=format&fit=crop",
    alt: "An abstract of small text tiles.",
    credit: "Unsplash"
  },
  nairobi: {
    src: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?q=80&w=1800&auto=format&fit=crop",
    alt: "A view of Nairobi.",
    credit: "Unsplash"
  },
  priceTag: {
    src: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1800&auto=format&fit=crop",
    alt: "A simple price tag illustration.",
    credit: "Unsplash"
  },
  nairobiPhone: {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1800&auto=format&fit=crop",
    alt: "A person using a phone on a busy Nairobi street.",
    credit: "Unsplash"
  },
  taskPhone: {
    src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1800&auto=format&fit=crop",
    alt: "A phone showing a personal assistant managing tasks.",
    credit: "Unsplash"
  },
  geminiSpark: {
    src: "/articles/gemini-spark-review.jpg",
    alt: "Gemini Spark shown during the Google I/O 2026 Keynote.",
    credit: "Google I/O 2026 Keynote"
  },
  moneyPhone: {
    src: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1800&auto=format&fit=crop",
    alt: "Shilling notes beside a smartphone.",
    credit: "Unsplash"
  },
  frontierAi: {
    src: "/articles/anthropic-redeploys-fable-5.jpg",
    alt: "Claude shown on a phone in front of Anthropic signage. Credit: Claude Security.",
    credit: "Claude Security",
    width: 1040,
    height: 520,
    type: "image/jpeg"
  }
} satisfies Record<string, Article["image"]>;

export function buildAiArticles({ authors, topics, brands }: ArticleFactoryInput): Article[] {
  const tim = bySlug(authors, "tim-humphreys");
  const lulu = bySlug(authors, "lulu-kiritu");
  const ai = bySlug(topics, "ai");
  const anthropic = bySlug(brands, "anthropic");
  const amazon = bySlug(brands, "amazon");
  const microsoft = bySlug(brands, "microsoft");
  const openai = bySlug(brands, "openai");
  const google = bySlug(brands, "google");

  const articles: Array<Omit<Article, "readTime"> & { readTime?: string }> = [
    {
      id: "ai-1",
      slug: "anthropic-mythos-models-export-control",
      format: "news",
      title: "Anthropic's top AI models pulled over a US export order",
      seo: {
        title: "Anthropic's top AI models pulled over a US export order",
        description:
          "Anthropic suspended its most capable Claude models after a US export-control directive. Here is what happened and why it matters for you."
      },
      subhead:
        "A US export-control order forced Anthropic to switch off its two most capable models. The everyday Claude tools are untouched, but the precedent is the real story.",
      excerpt:
        "Anthropic has suspended access to Claude Fable 5 and Claude Mythos 5 after a United States export-control directive.",
      whyItMatters:
        "Most people will never touch these specific models, but the reason they were switched off, governments deciding who may use the most powerful AI, will shape which tools reach Kenya next.",
      body: [
        "Anthropic has suspended access to its two most capable models, Claude Fable 5 and Claude Mythos 5, after the United States government issued an export-control directive. According to Anthropic's own statement, complying with the order meant turning the two Mythos-class models off for customers while other models, including Opus, Sonnet, and Haiku, kept working normally.",
        "Here is the plain version of what these models were. In early June, Anthropic introduced a new top tier that sits above its established Opus line, with Fable 5 as the widely released version and Mythos 5 offered only to a small set of organisations. Days later, the export-control order arrived, and the most powerful options came off the table.",
        "If you use Claude through the app or through everyday tools, this most likely does not change your day. The models ordinary users reach are unaffected. So why pay attention?",
        "Because it tells you how governments now see frontier AI. The most capable models are being treated less like ordinary software and more like strategic technology, in the same bracket as advanced chips, where a single policy decision can switch off access overnight. That logic does not stop at one company or one country.",
        "For anyone building on AI in Kenya, there is a quiet lesson in here. If a tool can be switched off by a decision made far away, it is risky to wire your most important work to one top-tier model from one provider. The teams that cope best will be the ones that can swap models without rebuilding everything, and that keep a sensible fallback.",
        "This is a developing story, and the exact access status for the top models may continue to change. The bigger point is already clear: frontier AI is now part product, part policy question.",
        "Update: Anthropic later said the export controls were lifted and that Claude Fable 5 would return worldwide on July 1, 2026. Read the follow-up at /news/anthropic-redeploys-fable-5."
      ],
      author: tim,
      publishedAt: iso(27, 6),
      updatedAt: isoJuly(1, 11),
      image: images.dataCentre,
      tags: [ai, anthropic],
      sources: [
        {
          label: "Follow-up: Claude Fable 5 returns after export controls lifted",
          url: "/news/anthropic-redeploys-fable-5"
        }
      ]
    },
    {
      id: "ai-13",
      slug: "anthropic-redeploys-fable-5",
      format: "news",
      title: "Claude's most powerful model is back, and the saga says a lot about who controls AI",
      seo: {
        title: "Claude Fable 5 returns after export controls lifted",
        description:
          "Anthropic is redeploying Claude Fable 5 on July 1 after the US lifted export controls. Here is the full story, and why it matters for anyone relying on AI."
      },
      subhead:
        "The United States has lifted the export controls that forced Anthropic to pull Claude Fable 5 and Mythos 5. The model returns on July 1 with new safeguards. The whole episode is a lesson in how fragile access to frontier AI has become.",
      excerpt:
        "Anthropic says Claude Fable 5 returns worldwide on July 1 after the United States lifted export controls that had forced the company to suspend its top models.",
      whyItMatters:
        "For nearly three weeks, the most powerful AI models on the market could be switched off worldwide by a single government order. That is the real story here, and it is bigger than one model.",
      body: [
        "Anthropic is bringing back Claude Fable 5, its most capable model, on Wednesday, July 1, after the United States government lifted the export controls that had forced the company to switch it off. The move ends a suspension that lasted nearly three weeks and, along the way, offered a rare public look at how governments, AI companies, and cybersecurity fears now collide at the frontier of the technology.",
        "Here is the short version of what happened before we get into why it matters.",
        "On June 9, Anthropic released two new top-tier models, Fable 5 and Mythos 5, sitting above its established Opus line. According to Anthropic, the two share the same underlying model, but Fable 5 shipped with heavy safety measures for general use, while Mythos 5, which has fewer guardrails, went only to a small set of trusted partners for defensive cybersecurity work.",
        "Three days later, on June 12, the US government applied export controls to both models. Export controls are rules that restrict who, by nationality or country, can access a technology, the same tool governments use for things like advanced weapons and cutting-edge chips. Because the order took effect immediately and Anthropic said it had no way to check every user's nationality in real time, the company suspended both models for everyone. On June 30, the controls were lifted, and Fable 5 returns the next day.",
        "So why did a single AI model trigger a national-security response? Anthropic says the trigger was a report from Amazon researchers who found a way to get around Fable 5's safety systems. In plain terms, they found a jailbreak, a prompt trick that coaxes an AI into doing something it is built to refuse. In this case, Anthropic says the trick got the model to identify software vulnerabilities and, in one instance, to produce code showing how a vulnerability could be exploited. To a government worried about AI supercharging cyberattacks, that reads like an alarm bell.",
        "The interesting part is what Anthropic says it found when it dug in. Its testing showed that plenty of weaker, widely available models could identify the same vulnerabilities, and that every model it tested, including older Claude versions and rival systems, could produce the same exploit demonstration. In other words, Anthropic argues that the technique did not unlock a unique frontier-level cyber capability. It was a borderline case involving routine defensive security work, the kind of thing Fable 5's cautious safeguards were blocking anyway just to be safe.",
        "To understand that claim, it helps to know how these safety systems work. Anthropic uses what it calls defense in depth, several overlapping layers rather than one wall. A key layer is a set of classifiers, smaller AI systems that watch each request and block anything that looks like it could help with a dangerous cyber task. To stay on the safe side, the company deliberately sets these classifiers to also block some requests that are probably harmless, a cushion it calls a safety margin. Fable 5 launched with a bigger safety margin than any model before it, which is why users sometimes found it refusing reasonable coding requests.",
        "In response to the Amazon report, Anthropic says it trained a new classifier that blocks the specific technique in more than 99% of cases, and now reroutes blocked requests to its Opus 4.8 model instead. Researchers at the US Department of Commerce's Center for AI Standards and Innovation independently tested the old and new safeguards and, according to Anthropic, found them extraordinarily strong. The tradeoff, which the company admits, is more false alarms during ordinary coding and debugging, a real cost to developers that it says it will keep tuning.",
        "On availability, Fable 5 returns July 1 for users worldwide across Anthropic's apps and developer platform, with generous access for paying plans through July 7 and usage credits after that. Mythos 5, the less-restricted sibling, has been restored to a set of US organisations following government approval on June 26, with wider access to come.",
        "Now, the bigger picture, which is where this story earns its place beyond the AI-industry bubble.",
        "The first lesson is fragility. For nearly three weeks, the most powerful commercial AI models on earth were unavailable to everyone, everywhere, because of one government order. If you are a business, a developer, or a researcher anywhere in the world, that is a sharp reminder that access to frontier AI can be switched off overnight by decisions made far from you. For anyone outside the United States, including here in Kenya, the lesson from our earlier coverage still stands: it is risky to wire your most important work to a single top-tier model from a single provider you might suddenly lose. Read that earlier piece at /news/anthropic-mythos-models-export-control.",
        "The second lesson is that the industry is quietly building new rules of the road. Anthropic says it is working with Amazon, Microsoft, Google, and other partners on a shared framework for scoring how serious an AI jailbreak actually is, judged on things like how much new capability it unlocks and how easy it is to pull off. It is also deepening its cooperation with the US government, including giving officials early access to test powerful models before release, under a new executive order on AI security signed on June 2.",
        "That deeper government involvement cuts both ways, and it is worth watching with clear eyes. On one hand, independent testing and shared standards could make powerful AI safer and its release less chaotic. On the other, a handful of large companies helping to write the standards they will be judged by, with governments deciding who gets access to the best models, raises real questions about competition, transparency, and who ends up in control of the most consequential technology of the decade.",
        "Anthropic, to its credit, was unusually open about the timeline and even argued the original control may have been an overreaction to a borderline case. But the episode makes one thing plain: frontier AI is now treated as strategic infrastructure, and the rules for who may use it are being written in real time."
      ],
      faq: [
        {
          question: "What is Claude Fable 5?",
          answer: "It is one of Anthropic's most capable AI models, part of a new top tier released in June 2026, built for general use with heavy safety measures."
        },
        {
          question: "Why was Claude Fable 5 suspended?",
          answer: "On June 12, the US government applied export controls after a report showed a way to bypass its safeguards. Anthropic said it could not verify users' nationality in real time, so it switched the model off for everyone."
        },
        {
          question: "What is an AI jailbreak?",
          answer: "A jailbreak is a prompt trick that gets an AI model to bypass its safety rules and do something it is designed to refuse."
        },
        {
          question: "Is Claude Fable 5 available now?",
          answer: "Yes. Anthropic says Fable 5 returns on July 1, 2026 for users worldwide across its apps and developer platform."
        },
        {
          question: "What changed before Claude Fable 5 came back?",
          answer: "Anthropic says it added a new safeguard that blocks the reported technique in more than 99% of cases and reroutes blocked requests to Opus 4.8."
        }
      ],
      author: tim,
      publishedAt: isoJuly(1, 12),
      updatedAt: isoJuly(1, 12),
      readTime: "7 min read",
      image: images.frontierAi,
      tags: [ai, anthropic, amazon, microsoft, google],
      sources: [
        {
          label: "Anthropic: Redeploying Fable 5",
          url: "https://www.anthropic.com/news/redeploying-fable-5"
        },
        {
          label: "Earlier tecMAMBO coverage: Anthropic's top AI models pulled over a US export order",
          url: "/news/anthropic-mythos-models-export-control"
        }
      ]
    },
    {
      id: "ai-2",
      slug: "claude-tag-slack-ai-colleague",
      format: "news",
      title: "You can now tag an AI in Slack like a colleague",
      seo: {
        title: "You can now tag an AI in Slack like a colleague",
        description:
          "Anthropic's new Claude Tag lets teams @mention an AI in Slack and hand it tasks. Here is what it does and whether it matters to you."
      },
      subhead: "Anthropic wants you to delegate to Claude the way you delegate to a coworker. It is starting in Slack, for now.",
      excerpt: "Anthropic has launched Claude Tag, a way to bring its AI into Slack so a team can mention it in a channel and hand it tasks.",
      whyItMatters:
        "Tagging an assistant to do a job and then walking away while it works is a very different habit from chatting with one. If it sticks, it changes what using AI at work even means.",
      body: [
        "Anthropic has launched Claude Tag, a way to bring its AI into Slack so a team can mention it in a channel and hand it tasks. You type @Claude, describe what you need, and it works in the background while you get on with something else. It can remember relevant context from the channels it sits in, and it can plan and carry out tasks over time rather than only answering in the moment.",
        "The shift here is subtle but real. Most people still use AI like a very fast search box: you ask, it answers, you move on. Claude Tag pushes a different habit, closer to handing a job to a colleague and trusting them to come back when it is done.",
        "Should you care? If you work in a small team, this is the more interesting half of the AI story. The promise is that a few people can take on work that used to need more hands, by delegating routine tasks to an assistant that runs while they sleep. For a lean Nairobi startup, that is the kind of leverage that actually matters.",
        "The caveats are worth stating plainly. Claude Tag is aimed at Team and Enterprise customers, not casual free users. And because you are granting an assistant access to channels and tools, who can see what, and what the assistant is allowed to touch, becomes a real decision, not an afterthought. Anthropic lets administrators scope that access tightly, which you should use.",
        "The takeaway is less about Slack and more about direction. AI is moving from a thing you talk to toward a thing you delegate to. This is an early, visible step in that move."
      ],
      author: tim,
      publishedAt: iso(27, 7),
      updatedAt: iso(27, 7),
      image: images.teamChat,
      tags: [ai, anthropic]
    },
    {
      id: "ai-3",
      slug: "google-gemini-agent-video-daily-brief",
      format: "news",
      title: "Google's Gemini gets an agent, a video maker, and a brief",
      seo: {
        title: "Google's Gemini gets an agent, a video maker, and a brief",
        description:
          "At I/O 2026 Google gave Gemini a personal agent, a video model, and a daily digest. Here is what is new and why it reaches you by default."
      },
      subhead:
        "Google is turning Gemini from a chatbot into a hub that can act on your behalf. Because it ships inside Android and Google apps, you will meet it whether you ask to or not.",
      excerpt: "At I/O 2026, Google announced a wave of Gemini updates aimed at turning the app from a chatbot into an all-purpose assistant.",
      whyItMatters:
        "Gemini is built into the phones and apps millions of people already use, so when it gains an agent that acts for you, that power arrives by default, not because you went looking for it.",
      body: [
        "At its I/O 2026 event, Google announced a wave of Gemini updates aimed at turning the app from a chatbot into an all-purpose assistant that can act for you. The headline additions: Gemini Spark, described as a personal agent that keeps working in the background; Gemini Omni, a video model that turns prompts and media into generated video; and Daily Brief, which pulls your inbox, calendar, and key tasks into one morning digest.",
        "Google also rebuilt the app's look and changed how answers are shown: instead of a wall of text, the key point appears at the top, with detail below. Readers of tecMAMBO will find that familiar, because leading with the point is the whole idea behind plain-English tech.",
        "The reason this matters more than a typical product update is distribution. Gemini is becoming the default assistant across Android and Google's apps. When an agent and a video generator are built into tools you already use, you do not have to adopt them. They simply show up.",
        "Two things are worth watching. First, Spark is an agent, meaning it takes actions, not just answers, so the questions of trust and oversight that come with any agent apply here too. Second, Google is expanding its content-labelling tools, including SynthID and Content Credentials, to flag AI-generated content across more places. In a year when telling real from generated is getting harder, that labelling may end up being the most useful announcement of the lot."
      ],
      author: tim,
      publishedAt: iso(27, 8),
      updatedAt: iso(27, 8),
      image: images.assistantPhone,
      tags: [ai, google]
    },
    {
      id: "ai-4",
      slug: "end-of-all-you-can-eat-ai-subscriptions",
      format: "news",
      title: "The quiet change ending all-you-can-eat AI",
      seo: {
        title: "The quiet change ending all-you-can-eat AI",
        description:
          "Anthropic moved automated AI usage onto a metered credit on June 15. Here is why flat-fee AI is cracking and what it means for your bill."
      },
      subhead: "A billing tweak most people missed signals a bigger shift: as AI moves from you typing to agents running, flat fees give way to meters.",
      excerpt: "Anthropic changed how it charges for automated Claude usage, a signal that flat-fee AI is starting to crack.",
      whyItMatters:
        "If you pay a flat monthly fee for an AI tool, the economics that made that possible are starting to crack, and the way you are billed for AI is about to look more like a utility.",
      body: [
        "Anthropic has changed how it charges for one kind of Claude usage: automated, programmatic work, the sort that powers coding agents and scripts rather than a person typing in a chat. The important distinction is between interactive use, where a human is actually using the tool, and headless or automated use, where software can keep calling the model on its own.",
        "The reason is simple arithmetic. A person using AI sends maybe dozens of prompts a day. An autonomous agent can fire off thousands, run tests, and call the model again and again, burning far more compute than a flat monthly fee was ever designed to cover. That is why all-you-can-eat AI subscriptions may not survive the agent era.",
        "Should you care, even if you are not a developer? Yes, because it is a preview of where AI pricing is heading for everyone. As AI shifts from a thing you type into toward agents that run jobs on your behalf, billing shifts with it: away from a tidy flat fee and toward something metered, like data bundles or electricity, where heavy use costs more.",
        "The practical advice is to know which kind of user you are. If you chat with AI a few times a day, flat plans still suit you fine. If you start handing tasks to agents that run on their own, watch the meter, because that is where the real cost now lives."
      ],
      author: tim,
      publishedAt: iso(27, 9),
      updatedAt: iso(27, 9),
      image: images.meter,
      tags: [ai, anthropic, openai]
    },
    {
      id: "ai-5",
      slug: "what-is-an-ai-agent-really",
      format: "explainer",
      title: "What is an AI agent, really?",
      seo: {
        title: "What is an AI agent, really? A plain-English guide",
        description:
          "Agent is the word of 2026 in tech. Here is what an AI agent actually is, how it differs from a chatbot, and how to spot the hype."
      },
      subhead: "Everyone in tech is saying \"agent\" this year. Here is the honest version, with a clear test for telling the real thing from the marketing.",
      excerpt: "An AI agent is software that does not just answer you, it takes actions to reach a goal you set.",
      whyItMatters:
        "Agent is being stamped on products you will soon be asked to pay for. Knowing what it means protects you from buying a chatbot wearing a fancier name.",
      body: [
        "An AI agent is software that does not just answer you, it takes actions to reach a goal you set, with some independence along the way. That is the whole idea in one sentence. Everything else is detail.",
        "Here is an analogy that holds up well. A chatbot is like a knowledgeable friend you ask a question: you get a good answer, and then it is back to you to do something with it. An agent is more like an intern you hand a task to. You say what you want, and it goes off, makes a plan, uses the tools it has, checks its own work, and comes back when the job is done. The difference is not how clever the answer sounds. It is whether the thing acts.",
        "In 2026 you are meeting agents whether you sought them out or not. Google's Gemini Spark is pitched as a personal agent that runs tasks in the background. Anthropic lets teams hand tasks to Claude and walk away while it works. Coding tools now run as agents that write, test, and fix code on their own. The pattern under all of them is the same.",
        "## What actually makes something an agent",
        "Strip away the branding and a real agent usually has four things working together: a goal you give it, some autonomy to decide the steps, tools it can use, and a loop where it plans, acts, checks the result, and tries again if something went wrong.",
        "If a product can plan a multi-step task, use tools, and recover when a step fails, it is fair to call it an agent. If it just answers questions in a chat window, it is a chatbot, no matter what the launch slides say.",
        "## Why the excitement, and why the caution",
        "The excitement is real. An agent that can quietly handle the boring, repetitive parts of your digital life is genuinely useful, and for a small team it can feel like extra hands. That is why every big company is racing to ship one.",
        "The caution is just as real, and it is the part the marketing skips. An agent acts, which means it can act wrongly, at speed, and at scale. To be useful it usually needs access to your accounts, your files, or your tools, and the more it can touch, the more a mistake can cost. The sensible posture in 2026 is to let agents handle low-stakes, reversible chores, and to keep a human hand on anything that spends money, sends messages on your behalf, or cannot be easily undone.",
        "## The one-question test",
        "Next time something is sold to you as an AI agent, ask one thing: can it take a multi-step action on its own and recover when a step fails? If yes, it is an agent, and you should think about trust and access before you switch it on. If no, it is a chatbot with a new sticker, and you should not pay agent prices for it."
      ],
      goDeeper: {
        intro:
          "Under the hood, an agent runs a loop. It turns your goal into a plan, picks a tool, calls it, reads the result, and decides the next step, repeating until it is done or stuck. The tools are often connected through standard interfaces. You may see the term Model Context Protocol, a common way to plug tools and data into an assistant. The model is the brain that reasons; the tools are the hands that act; the loop is what makes it an agent rather than a single clever reply.",
        specs: []
      },
      faq: [
        { question: "Is an AI agent the same as a chatbot?", answer: "No. A chatbot answers. An agent takes actions toward a goal, using tools and multiple steps." },
        {
          question: "Are AI agents safe to use?",
          answer: "They can be, for low-stakes tasks. Because they act on your behalf, give them limited access and keep a human check on anything costly or hard to undo."
        },
        {
          question: "Do I need an AI agent?",
          answer: "Only if you have repetitive, multi-step digital chores worth handing off. For quick questions, a normal assistant is enough."
        }
      ],
      author: lulu,
      publishedAt: iso(26, 6),
      updatedAt: iso(26, 6),
      image: images.nodes,
      tags: [ai, google, anthropic]
    },
    {
      id: "ai-6",
      slug: "why-ai-hallucinates-and-how-to-catch-it",
      format: "explainer",
      title: "Why AI hallucinates, and how to catch it",
      seo: {
        title: "Why AI hallucinates, and how to catch it",
        description:
          "AI chatbots state false things with total confidence. Here is why it happens, in plain English, and simple habits to catch it before you get burned."
      },
      subhead: "Your chatbot is not lying to you on purpose. Understanding why it invents things is the best protection against being caught out by it.",
      excerpt: "An AI hallucination is when a chatbot states something false as if it were true, fluently and with total confidence.",
      whyItMatters:
        "AI does not know when it is wrong, and it is most convincing exactly when it is making something up. A few habits keep you from being the person who repeated a fake fact in a meeting.",
      body: [
        "An AI hallucination is when a chatbot states something false as if it were true, fluently and with total confidence. The unsettling part is not that it gets things wrong. It is that it gets them wrong in the same calm, polished voice it uses when it is right.",
        "To see why this happens, it helps to know what these tools actually do. A chatbot is not looking up answers in a database. It is predicting likely next words, one after another, based on patterns it learned from enormous amounts of text. Most of the time those patterns line up with reality, so the answer is correct. But when it hits a gap, a fact it does not have, a source that does not exist, a number it never saw, it does not stop and say so. It fills the gap with the most plausible-sounding words, because that is what it was built to do.",
        "## Where it bites hardest",
        "A few situations produce hallucinations again and again: made-up sources, confident numbers, invented quotes, and hyper-local detail. Ask about a specific Nairobi street, a local law, or a small company, and the odds of a smooth, wrong answer go up, because the model has seen less reliable text about it.",
        "## How to catch it before it catches you",
        "You do not need to be technical to stay safe. Ask for sources, then actually check them. Be most suspicious of exact figures, dates, names, and quotes. Cross-check anything you will rely on. Prefer tools that ground their answers in search and cite real pages. Treat AI as a fast first draft, not the final word.",
        "This, by the way, is why tecMAMBO does not let AI invent facts in our work, and why a person checks everything we publish. The same standard serves you well: let AI speed you up, but keep the judgement human."
      ],
      faq: [
        {
          question: "Why does AI make things up?",
          answer: "It predicts likely text rather than looking up facts, so when it lacks information it produces plausible-sounding words instead of admitting the gap."
        },
        {
          question: "Can hallucinations be fixed completely?",
          answer: "Not yet. Grounding answers in search and good prompting reduces them, but no current chatbot is guaranteed accurate."
        },
        {
          question: "Which questions are riskiest?",
          answer: "Specific figures, sources, quotes, and hyper-local details, where a smooth wrong answer is most likely and hardest to spot."
        }
      ],
      author: lulu,
      publishedAt: iso(26, 7),
      updatedAt: iso(26, 7),
      image: images.aiHallucination,
      tags: [ai]
    },
    {
      id: "ai-7",
      slug: "tokens-context-windows-why-ai-forgets",
      format: "explainer",
      title: "Tokens and context windows, why AI forgets",
      seo: {
        title: "Tokens and context windows, why AI forgets",
        description:
          "Why does your chatbot lose the thread in a long chat? A plain-English guide to tokens and context windows, and how to get better answers."
      },
      subhead: "Two pieces of jargon explain most of your chatbot frustrations. Here they are, without the maths.",
      excerpt: "A token is a chunk of text an AI reads and writes, and a context window is how much of that text it can hold in mind at once.",
      whyItMatters:
        "Understanding why an AI loses the thread halfway through a long chat helps you get better answers, and stops you blaming yourself when it forgets what you said.",
      body: [
        "A token is a chunk of text an AI reads and writes, and a context window is how much of that text it can hold in mind at once. Get those two ideas and a lot of confusing chatbot behaviour suddenly makes sense.",
        "Start with tokens. AI does not read whole words the way we do. It breaks text into small pieces called tokens, which are often words or parts of words. A short message is a handful of tokens. A long document is thousands. Everything the model reads from you, and everything it writes back, is counted in tokens. That counting is also how most AI tools bill: you pay per token in, and per token out.",
        "Now the context window. This is the amount of text, measured in tokens, that the model can pay attention to at one time. Picture a desk. The context window is how much paper fits on it. While your conversation is small, everything sits on the desk and the model can see it all. As the chat grows, the desk fills up, and to make room, the oldest papers slide off the edge. That is the moment your chatbot forgets what you said at the start.",
        "In 2026 these desks have become enormous. Top models advertise context windows of a million tokens or more, enough to hold whole books. That is genuinely useful. But bigger is not automatically better. A huge window costs more to use, and stuffing it with everything can actually make a model less focused, the way a cluttered desk makes it harder to find the one page that matters.",
        "## How to get better answers",
        "Put the important bit close to your question. Summarise long threads. Start fresh for a new topic. Do not over-stuff the prompt with the entire folder unless the task truly needs all of it."
      ],
      goDeeper: {
        intro:
          "Tokenisation is why AI sometimes miscounts letters or mishandles unusual words: it sees tokens, not characters. As a rough guide, one token is around three-quarters of an English word, so a thousand tokens is roughly 750 words. When a tool quotes a price per million tokens, that is the unit being counted, both your input and the model's output. Knowing this makes pricing pages far less mysterious.",
        specs: []
      },
      author: lulu,
      publishedAt: iso(26, 8),
      updatedAt: iso(26, 8),
      image: images.textTiles,
      tags: [ai]
    },
    {
      id: "ai-8",
      slug: "kenya-ai-rules-quiet-advantage",
      format: "opinion",
      title: "Kenya is writing AI rules early. That is an edge.",
      seo: {
        title: "Kenya is writing AI rules early. That is an edge.",
        description:
          "While the EU and US argue over AI rules, Kenya has a national strategy and a bill in the Senate. Why getting the rules roughly right early could matter most."
      },
      subhead:
        "The world's two big AI rulebooks are a heavy one and a missing one. Kenya has a chance to write a pragmatic third, and to own its own AI future while doing it.",
      excerpt: "Kenya has quietly been doing something most countries have not: writing down what it actually wants from artificial intelligence.",
      whyItMatters:
        "While the EU fights over enforcement and the US leaves it to individual states, Kenya has a national AI strategy and a bill moving through the Senate. Getting the rules roughly right, early, could matter more than any single startup.",
      body: [
        "While the loudest AI debates happen elsewhere, Kenya has quietly been doing something most countries have not: writing down what it actually wants from artificial intelligence. The National Artificial Intelligence Strategy 2025 to 2030 lays out a government-led plan across infrastructure, data and research, talent, governance, investment, and ethics. And in early 2026, a Senate bill proposed a legal framework for AI, including the creation of an Office of the Kenya Artificial Intelligence Commissioner.",
        "To see why this is an advantage, look at the two dominant approaches in the world right now. The European Union has built a heavy, detailed rulebook, the kind that offers strong protections but leaves companies scrambling to comply before each deadline. The United States has largely left it to individual states, producing a patchwork where the rules change as you cross a border. One approach is a thick manual nobody has finished reading. The other is a map with half the roads missing.",
        "Kenya has the chance to write a sensible third version: clear enough to give people protection and businesses confidence, light enough not to smother a young industry before it can stand. Doing that early, while the technology and the global norms are still forming, is worth more than it looks, because the countries that set workable rules first tend to attract the builders who need certainty.",
        "But here is the part I care about most, and it is bigger than regulation. The real prize is sovereignty. Kenya is often called the Silicon Savannah, and the temptation is to measure success by how many foreign AI tools we adopt. That is the wrong scoreboard. Genuine progress looks like owning more of the stack: local data we control, local talent we train, local companies building for local problems, from precision farming to credit scoring for people the banks ignore. A nation that only consumes AI is a customer. A nation that shapes its own rules, data, and talent is a participant.",
        "I am not starry-eyed about this. A strategy on paper is not the same as capacity on the ground. The gaps are real: rural communities lag behind cities, skilled people are scarce, and a new commissioner's office could just as easily become a bottleneck as a safeguard, depending entirely on how it is run. Rules written well and enforced badly help no one. And there is a fine line between protecting people and protecting incumbents from competition.",
        "So my take is cautious optimism, with the emphasis on cautious. The instinct is right. Deciding, on purpose and early, what we want AI to do for Kenyans, rather than waiting to inherit someone else's defaults, is exactly the move a confident country makes. What matters now is execution: funding the talent pipeline, closing the rural gap, and keeping the rules pragmatic enough that the next great African AI company has a reason to build here rather than leave. Get that right, and the quiet work being done today will look, in a few years, like a head start."
      ],
      author: lulu,
      publishedAt: iso(25, 6),
      updatedAt: iso(25, 6),
      image: images.nairobi,
      tags: [ai]
    },
    {
      id: "ai-9",
      slug: "end-of-free-ai-not-a-disaster",
      format: "opinion",
      title: "The free AI era is ending. That is okay.",
      seo: {
        title: "The free AI era is ending. That is okay.",
        description:
          "AI tools have been heavily subsidised, and the bill is arriving. Why paying a fair price might get you better, more honest tools, with a caveat for Kenya."
      },
      subhead: "Free was never the plan. It was the bait. The end of all-you-can-eat AI is uncomfortable, but it might be healthier than what came before.",
      excerpt: "For two or three years, using powerful AI has felt almost free, but in 2026 that is changing.",
      whyItMatters:
        "The big AI tools have been quietly subsidised, and the bill is starting to arrive. Paying a fair price might actually get you better, more honest tools, as long as a real free option survives.",
      body: [
        "For two or three years, using powerful AI has felt almost free. Generous chatbots, unlimited-feeling plans, top models for the price of a streaming subscription. In 2026, that is changing. Anthropic has moved heavy automated usage onto metered pricing. Google is selling Gemini access at tiered prices. The phrase doing the rounds is that all-you-can-eat AI may not survive the era of agents, where software can burn through computing power far faster than any human typing.",
        "I want to make an argument that sounds counterintuitive: this is mostly good news.",
        "Free was never a gift. It was a land grab, paid for by investors betting that if they gave the tools away long enough, we would all become dependent and someone would figure out the money later. We have seen this film before, in social media and cheap ride-hailing, and we know how it ends. When something powerful is free, the price is usually hidden: in your data, in your attention, or in a future bill you did not agree to.",
        "Honest pricing is healthier. When you pay something close to the real cost of running a model, a few good things happen. The companies have a reason to make the tools genuinely useful rather than merely addictive. You start asking the right question, not what can I get for free, but what is this actually worth to me. And the market stops being a contest of who can lose the most money fastest, which is a contest that only billionaires can play.",
        "Now the caveat I am not going to skip, because it matters most here. For users in Kenya, a lot of AI is priced in dollars, and a fair price in San Francisco can be a steep one in Nairobi. If the end of free meant the end of access, that would not be progress, it would be a new digital divide. So the real test is not whether the unlimited free buffet survives. It will not, and that is fine. The test is whether good-enough affordable options survive alongside the premium ones.",
        "The early signs are reassuring. Capable free tiers still exist and keep improving. Cheap tiers are appearing at a few dollars a month. And open models you can run or self-host, the Gemmas and Qwens of the world, keep getting better, which puts a ceiling on how much anyone can charge for the basics. The floor is not disappearing. It is just no longer pretending to be the whole building.",
        "So here is my advice, and my take in one line. Stop mourning free AI. Work out the two or three tasks where AI genuinely saves you time or money, pay for those if a paid tool clearly earns it, and lean on free and open tools for everything else. Treat AI like any other tool you buy: on merit, against the price."
      ],
      author: lulu,
      publishedAt: iso(25, 7),
      updatedAt: iso(25, 7),
      image: images.priceTag,
      tags: [ai, anthropic, google, openai]
    },
    {
      id: "ai-10",
      slug: "three-ai-assistants-real-nairobi-week",
      format: "real-life",
      title: "We ran 3 AI assistants through a Nairobi week",
      seo: {
        title: "We ran 3 AI assistants through a Nairobi week",
        description:
          "The demos always work. We used ChatGPT, Gemini, and Claude for a real week in Nairobi to see how they cope with local life, data, and the messy bits."
      },
      subhead: "A launch stage is a perfect world. A Nairobi week is not. Here is how three popular AI assistants held up away from the slideshow.",
      excerpt: "The demos always work, so we used ChatGPT, Gemini, and Claude for ordinary Nairobi tasks instead of trusting the stage.",
      whyItMatters:
        "The demos always work. We wanted to know how the big AI assistants cope with patchy data, local context, and the messy way people actually ask things.",
      body: [
        "The demos always work. That is their job. So instead of trusting the stage, I spent a normal week in Nairobi leaning on three of the most popular AI assistants, ChatGPT, Gemini, and Claude, for the ordinary tasks I would have done anyway. Drafting messages, working out a budget, getting directions, checking facts, switching between English and Kiswahili the way people actually talk. I was less interested in which is smartest on a benchmark and more interested in which is least annoying when life is normal and the connection is not.",
        "A note before the findings: this is a field test, not a lab. I used each assistant as a regular person would, on a phone, on regular data, over one week. Your mileage will vary with the version, the day, and your questions. With that said, here is what held up and what did not.",
        "## Everyday writing and thinking",
        "For drafting and tidying up text, all three were genuinely good, and honestly close enough that preference came down to tone. Each could turn a rough WhatsApp rant into a polite message, summarise a long document, and rough out a plan. If your main use is writing help, you almost cannot go wrong, and the free tiers are already strong enough for most of it.",
        "## Local knowledge, the weak spot",
        "This is where the gap between the stage and the street showed. Ask about a global topic and the answers were solid. Ask about a specific Nairobi neighbourhood, a local fee, a small Kenyan company, or a current matatu route, and the confident wrong answers crept in. None of them should be trusted on hyper-local detail without a check. They are world-class generalists and shaky locals.",
        "## Language and code-switching",
        "Kiswahili was handled better than I expected, and basic code-switching between English and Kiswahili mostly worked. Sheng and very colloquial phrasing were hit and miss. For formal Kiswahili they were useful; for the way people actually text, results wobbled.",
        "## The unglamorous bit: data and connection",
        "Here is the part no launch mentions. These tools live in the cloud, so they eat data and they need a signal. On a strong connection they felt instant. On a weak one, or when the network dropped, they stalled, and a long back-and-forth quietly chews through a bundle. If you are on a tight data plan, that is a real cost, and it shaped how I used them: shorter exchanges, fewer giant pastes.",
        "## So, the verdict",
        "Treat any of the three as a sharp, fast assistant for thinking, writing, and getting started, and treat all three as unreliable witnesses on local specifics. Use them to draft and to reason, then verify anything local or anything that matters before you act on it. Pick the one whose tone you like, because on the everyday stuff they are closer than the marketing suggests."
      ],
      goDeeper: {
        intro:
          "Over seven days I used each assistant for the same real tasks as they came up, on a mobile phone and ordinary mobile data, without special prompting tricks, and noted where each was strong, weak, or wrong. I did not run controlled benchmarks, time responses with a stopwatch, or test paid enterprise features. This is meant to reflect a normal person's week, not a laboratory. Versions and behaviour change often, so treat the specifics as a snapshot.",
        specs: []
      },
      author: lulu,
      publishedAt: iso(25, 8),
      updatedAt: iso(25, 8),
      image: images.nairobiPhone,
      tags: [ai, openai, google, anthropic]
    },
    {
      id: "ai-11",
      slug: "gemini-spark-review",
      format: "review",
      title: "Gemini Spark review: promising, not quite ready",
      seo: {
        title: "Gemini Spark review: promising, not quite ready",
        description:
          "Google's Gemini Spark is one of the first mainstream personal AI agents. Our verdict on what it does well, where it stumbles, and who it is for."
      },
      subhead: "A genuine glimpse of the agent future, sold at a premium and shipped a little early.",
      excerpt: "Gemini Spark is one of the first personal AI agents built for ordinary people rather than developers.",
      whyItMatters:
        "Spark is one of the first mainstream agents that acts on your behalf in the background. It shows where this is all going, and why you should not hand it the keys just yet.",
      body: [
        "Gemini Spark is one of the first personal AI agents built for ordinary people rather than developers, and it is genuinely useful for routine digital chores. But it asks for trust it has not fully earned yet, it costs premium money, and it still needs supervision. Promising, worth watching, not yet worth relying on.",
        "Google introduced Spark as a personal agent inside the Gemini app: a tool that does not just answer you but goes off and does things, building custom workflows and continuing to work in the cloud even when your phone is locked. After spending time with it, the short story is that the idea is right and the execution is early.",
        "## What it does well",
        "The core promise lands more often than I expected. For routine, low-stakes tasks, organising and triaging, drafting and queuing things up, pulling together information from across your day, Spark can genuinely take work off your plate and keep going in the background. When it works, it feels less like using an app and more like having handed something to a capable assistant. That is a real shift, and at consumer scale it is new.",
        "## Where it stumbles",
        "The trouble is the same trouble every agent has: it acts, and acting means it can act wrongly. A few times it confidently did the not-quite-right thing, which meant I could never fully stop watching, and an agent you have to supervise constantly is only half an agent. It is also early in obvious ways, with rough edges and behaviour that varies. And it sits behind Google's premium subscription, so you are paying top prices to use something that still asks for your patience.",
        "## Price and value",
        "Gemini Spark sits inside Google's AI Ultra tier rather than the cheaper Pro plan. Internationally, Google lists AI Ultra from 99.99 US dollars a month, with a higher-allowance tier in some markets at 219.99 dollars a month. For Kenyan readers, that works out to roughly KSh12,930 to KSh28,450 a month before card fees and taxes, using the Central Bank of Kenya's 2 July 2026 indicative dollar rate of 129.30. One important caveat: Google currently describes Spark as coming to AI Ultra subscribers in the US, so Kenya pricing is a conversion guide for now, not a local availability promise.",
        "## Who it is for",
        "Spark is for the curious and the comfortable: people who enjoy being early, already pay for Google's top AI tier, and have low-stakes tasks they are happy to delegate and double-check. If you want something dependable that you can set and forget, wait. This is a first chapter, and a promising one, but it is not the finished book."
      ],
      verdict: {
        score: "3.5/5",
        summary: "A useful early personal agent that still needs too much supervision to become invisible help.",
        pros: ["A real personal agent for non-developers", "Works in the background", "Useful for routine, repetitive chores", "A clear look at where assistants are heading"],
        cons: ["Needs supervision", "Occasional wrong actions", "Premium pricing", "Early and inconsistent"]
      },
      goDeeper: {
        intro:
          "Spark runs as a cloud-based agent in the Gemini app and is offered to Google's top-tier AI subscribers. Because it acts on your behalf, it needs access to the apps and data it works with, so treat its permissions as a real decision and start it on low-stakes tasks. As with any agent, keep a human check on anything that sends messages, spends money, or cannot be undone.",
        specs: [
          {
            label: "Pricing",
            value:
              "Google AI Ultra starts at 99.99 US dollars a month internationally, about KSh12,930 at the 2 July 2026 CBK rate. Higher-allowance Ultra tiers can reach 219.99 dollars, about KSh28,450."
          }
        ]
      },
      author: lulu,
      publishedAt: iso(25, 9),
      updatedAt: iso(25, 9),
      image: images.geminiSpark,
      tags: [ai, google],
      sources: [
        { label: "Google AI plans", url: "https://one.google.com/intl/en_us/about/google-ai-plans/" },
        { label: "Google One Help: Google AI Ultra benefits", url: "https://support.google.com/googleone/answer/16286513?hl=en" },
        { label: "Central Bank of Kenya exchange rates", url: "https://www.centralbank.go.ke/category/exchange-rates/" }
      ]
    },
    {
      id: "ai-12",
      slug: "best-ai-subscription-value-2026",
      format: "wallet-watch",
      title: "Best AI subscription for your money in 2026",
      seo: {
        title: "Best AI subscription for your money in 2026",
        description:
          "AI subscriptions add up fast, often in dollars. Here is when free is genuinely enough, what a few dollars buys, and who should pay premium."
      },
      subhead: "A clear-eyed look at what to pay for AI in 2026, with the hype, and the unused features, taken out.",
      excerpt: "For a lot of people, the free tiers are already enough, but daily users may benefit from a cheap mid-tier.",
      whyItMatters:
        "AI subscriptions add up fast, often billed in dollars. Most people are either paying for power they never use, or paying nothing and missing tools that would save real time.",
      body: [
        "The honest starting point for AI subscriptions in 2026 is this: for a lot of people, the free tiers are already enough. The big assistants give away a genuinely capable version, and unless you are using AI hard every day, you may be about to pay for power you will never touch. So before any recommendation, here is the question to answer: how often do you actually use this, and for what?",
        "Let us break the market into three tiers and match them to real people.",
        "## Free: enough for most casual users",
        "The free versions of the major assistants now handle everyday writing, summarising, brainstorming, and quick questions well. Cost: nothing. If you reach for AI a few times a week to draft a message, tidy some text, or get unstuck, stay free. You are not missing much, and you are spending nothing.",
        "## Cheap mid-tiers: for daily users on a budget",
        "A new layer has appeared at the low end, with at least one major assistant offering a paid tier at around USD 4.99 a month. For someone who uses AI most days but does not need the absolute top models, this is the sweet spot: more capacity and fewer limits, without the premium price. Best value pick for a daily user who wants more than free but does not want to spend like a professional.",
        "## Premium: only if AI is core to your work",
        "The flagship plans, commonly around USD 20 a month and up, unlock the most capable models and the highest limits. These earn their keep only if AI is genuinely central to how you work, a writer, coder, analyst, or builder who would feel the difference every day. If that is you, the cost is easy to justify. If it is not, you are paying for a professional tool to do occasional chores.",
        "## The money math people forget",
        "Two things matter especially in Kenya. First, most of these prices are in dollars, so the real cost in shillings moves with the exchange rate, and a cheap plan abroad is less cheap here. Second, these are cloud tools, so on mobile they also cost you data. Factor both in before you subscribe. A useful trick: add up what a year of any plan costs in shillings, then ask whether the tool clearly saves you more than that in time or money. If you cannot answer yes quickly, stay on the tier below.",
        "## One more option for the technically inclined",
        "If you are comfortable with a bit of setup, open models such as Gemma and Qwen can be used at low or no cost, and they keep getting better. They will not always match the top paid models, but for many everyday tasks they are more than good enough, and they put a sensible ceiling on how much anyone should pay for the basics.",
        "## The bottom line",
        "Best free: stick with a major assistant's free tier if you use AI occasionally. Best value: a cheap mid-tier around five dollars a month if you use AI most days. Premium: only if AI is core to your work and you feel the difference daily. Buy the tier that matches how you actually use it, not the one the marketing says you need.",
        "Disclosure: tecMAMBO may earn a commission from some links, which never affects our recommendations. Prices and plans change often."
      ],
      itemList: ["Free tier for occasional use", "Cheap mid-tier for daily use", "Premium plan for work-critical use"],
      author: lulu,
      publishedAt: iso(25, 10),
      updatedAt: iso(25, 10),
      image: images.moneyPhone,
      tags: [ai, openai, google, anthropic]
    }
  ];

  return articles.map((article) => ({
    ...article,
    readTime: article.readTime ?? readTime([article.title, article.subhead, article.whyItMatters, ...article.body, article.goDeeper?.intro ?? ""])
  }));
}
