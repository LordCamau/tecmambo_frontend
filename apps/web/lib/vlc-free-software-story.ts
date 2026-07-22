import type { Article, Author, Tag } from "@/lib/types";

type BuildVlcFreeSoftwareArticleArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
};

function getBySlug<T extends { slug: string }>(items: T[], slug: string): T {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) {
    throw new Error(`Missing taxonomy term: ${slug}`);
  }
  return item;
}

export function buildVlcFreeSoftwareArticle({
  authors,
  topics,
  brands
}: BuildVlcFreeSoftwareArticleArgs): Article {
  const tim = getBySlug(authors, "tim-humphreys");
  const apps = getBySlug(topics, "apps");
  const computing = getBySlug(topics, "computing");
  const vlc = getBySlug(brands, "vlc");

  return {
    id: "vlc-free-software-story-money-is-jail",
    slug: "vlc-free-software-story-money-is-jail",
    format: "explainer",
    title:
      "The VLC story: how the traffic cone said no to tens of millions, and why almost nobody else did",
    seo: {
      title: "VLC's story: the free app that refused to sell you out",
      description:
        "VLC has billions of downloads, zero ads, and zero tracking, because its keeper refused tens of millions. The real story, the apps that sold out, and the lessons."
    },
    subhead:
      "The orange traffic cone has been on the world's computers for a quarter of a century without showing an ad, selling a byte of data, or charging a cent. That is not luck. It is a series of refusals, and the man who made them has a three-word philosophy about why.",
    excerpt:
      "Nearly every \"free\" app you use pays for itself with your attention or your data. VLC is the great exception, and understanding why it stayed clean explains what happened to everything else on your phone.",
    whyItMatters:
      "Nearly every \"free\" app you use pays for itself with your attention or your data. VLC is the great exception, and understanding why it stayed clean explains what happened to everything else on your phone.",
    body: [
      "VLC media player has been downloaded billions of times, installed on PCs that barely run, office laptops with locked-down IT policies, old Android phones, new Macs, university lab machines, piracy-era desktops, home-theatre boxes, and that one family computer nobody has upgraded since 2014.",
      "And through all of that, it has done something almost absurd by modern software standards: it has stayed free, useful, quiet, and clean.",
      "No pop-up ads. No premium nag screen. No \"seven-day trial\" trap. No browser toolbar. No hidden crypto miner. No behavioural tracking system quietly watching what files you open.",
      "For a lot of people, VLC is just the orange traffic cone app that plays anything. But the better story is what it refused to become.",
      "At the centre of that story is Jean-Baptiste Kempf, the longtime VideoLAN developer and public face of VLC, who has repeatedly said no to business models that could have made him rich. In one interview, he said he had turned down offers worth tens of millions of euros to bundle advertising and unwanted software into VLC. His explanation was brutally simple: \"Money is jail.\"",
      "That sentence sounds dramatic until you look around at what happened to almost every other piece of free software people used to trust.",
      "## A student project that ate the world",
      "VLC began in the 1990s as a student project at Ecole Centrale Paris. The original goal was not to create one of the world's most beloved apps. It was to stream video across a campus network.",
      "The project became VideoLAN, and VLC eventually turned into a media player that could handle formats other players would choke on. That was its superpower. If Windows Media Player refused a file, QuickTime sulked, or some codec pack made your machine worse, VLC usually just opened it.",
      "That reliability mattered. VLC did not win because it was flashy. It won because it solved an ordinary user problem without making the user feel stupid. It was the app you installed when something else failed.",
      "Then smartphones arrived. Streaming took over. Files became less central. Yet VLC stayed relevant because the basic promise still mattered: your media, your device, your control.",
      "## \"Money is jail\"",
      "Kempf's \"money is jail\" line has become the shorthand for VLC's philosophy, but it is not anti-money in the childish sense. VideoLAN takes donations. Developers need to eat. Servers cost money. Maintenance is real work.",
      "The point is control.",
      "Once a free app accepts a business model built on ads, tracking, bundling, or growth-at-all-costs investment, the product changes. The user stops being the person served and becomes the inventory, the lead, the funnel, or the attention supply.",
      "VLC avoided that trap by being boring in the best possible way. It is run by a non-profit association. It is open-source software. Its code can be inspected. Its core mission is narrow: play media well, on as many devices as possible, without exploiting the people who use it.",
      "That narrowness is not a weakness. It is the reason VLC still feels like software from a parallel internet, one where apps were tools before they became storefronts.",
      "## The dirty trick VLC refused",
      "To understand VLC, you have to understand the era it survived.",
      "For years, the easiest way for free desktop software to make money was bundling. You downloaded a harmless utility, clicked through an installer too quickly, and suddenly your browser search engine changed, a toolbar appeared, or some \"optimizer\" started warning you about problems it conveniently wanted to charge you to fix.",
      "This was not a fringe strategy. It was the business model behind an entire class of free software.",
      "VLC could have joined that world. It had trust, massive distribution, and a user base that installed it because they needed it immediately. That combination is incredibly valuable to advertisers and installers. A VLC setup wizard with bundled junk would have made serious money.",
      "Instead, VLC kept saying no.",
      "That refusal is why the app still carries an unusually clean emotional signal. People recommend VLC without feeling they are tricking anyone. That is rare.",
      "## The internet did not follow VLC",
      "The sad part is that VLC's example did not become the norm.",
      "Plenty of free apps chose a different path. Some added ads. Some pushed subscriptions. Some were bought by larger companies and slowly changed incentives. Some became distribution pipes for software users never asked for.",
      "Even security software, browser extensions, weather apps, VPNs, flashlight apps, keyboard apps, and file tools have had their trust scandals. The pattern is familiar: first the app is useful, then it grows, then someone asks how to monetise the audience, then the product becomes a little less on the user's side.",
      "Sometimes the shift is subtle. A home screen gets crowded. A notification becomes promotional. A privacy setting gets harder to find. A free tier becomes a trapdoor into a subscription.",
      "Sometimes it is not subtle at all.",
      "## Then came the really ugly phase",
      "The lowest version of this story was not advertising. It was abuse.",
      "Some software and browser extensions were caught injecting ads, harvesting browsing data, selling user information, or using machines for hidden crypto mining. The details varied, but the logic was the same: if millions of people install your free tool, their devices and attention become resources someone can extract from.",
      "That is why VLC matters beyond nostalgia. It is proof that scale does not automatically require exploitation. A massively popular app can choose not to treat users as a mine.",
      "That does not mean VLC is perfect. No software is. But its incentives are unusually legible. It does not need to learn everything about you to survive. It does not need to keep you inside an engagement loop. It does not need to upsell you every Tuesday.",
      "It just needs to play the file.",
      "## So why did VLC survive clean?",
      "There are a few reasons.",
      "First, VLC's mission is clear. It is a media player, not a lifestyle platform. Clear missions resist bloat better than vague ones.",
      "Second, VideoLAN's non-profit structure matters. It does not remove all financial pressure, but it makes certain compromises easier to reject.",
      "Third, open-source culture gives users and developers a way to inspect, fork, criticise, and preserve the project if it drifts too far.",
      "Fourth, VLC benefits from trust built slowly over decades. That trust is more valuable than any one monetisation deal, even if it is harder to put in a spreadsheet.",
      "Finally, there is leadership. Institutions matter, but people still make choices. Kempf and the VideoLAN community chose the harder road often enough that VLC became a symbol of something bigger than media playback.",
      "## Why this matters now",
      "The timing of VLC's story feels sharper in 2026 because users are surrounded by \"free\" products that are not really free.",
      "Social platforms are free, but they are paid for with attention and behaviour. Many AI tools offer free tiers, but the real bill may arrive through data lock-in, paid upgrades, or dependency. Mobile games are free until they become economies of friction. Productivity tools start generous, then narrow the free plan once teams are trapped.",
      "That does not make every monetised app evil. Developers deserve to be paid. Servers cost money. Good software cannot run on vibes forever.",
      "But VLC reminds us to ask a better question: free for whom, and paid for by what?",
      "A free app funded by donations and community labour is not the same as a free app funded by surveillance. A free app that respects your device is not the same as a free app that quietly changes your browser, drains your battery, or sells your behaviour.",
      "The price tag is only one part of the deal.",
      "## A fair question: can free software still win?",
      "Yes, but not everywhere.",
      "VLC works because the job is concrete, the user need is durable, and the project does not require endless cloud infrastructure to function. That is different from running a global social network, a large AI model, or a video platform with enormous hosting costs.",
      "Still, VLC's lesson travels.",
      "Users reward tools that respect them. Trust compounds. Simple products can outlive noisy ones. Open standards matter. Ownership matters. And sometimes the most radical product decision is to refuse the obvious money.",
      "So no, the days of user-respecting free software are not gone. They are just harder to notice because the louder internet is optimised for extraction.",
      "VLC is a reminder that another kind of software can still exist.",
      "## MAMBO Take",
      "VLC is not just the app that plays the weird video file. It is one of the clearest examples of software restraint in an industry addicted to monetising every surface.",
      "The important part is not that VLC never charged money. The important part is that it never pretended the user was the customer while quietly serving someone else.",
      "That is the line many apps crossed. VLC did not."
    ],
    closingLine:
      "The point is not that every free app must become VLC. The point is that users notice when a product's incentives are aligned with them, and that trust is still one of the rarest technologies on the internet.",
    author: tim,
    publishedAt: "2026-07-22",
    updatedAt: "2026-07-22",
    readTime: "9 min read",
    image: {
      src: "/articles/vlc-media-player-king-of-open-source-software.jpg",
      alt: "A crowned VLC traffic cone, credited to tecMAMBO Publication.",
      credit: "tecMAMBO Publication",
      width: 1200,
      height: 675,
      type: "image/jpeg"
    },
    tags: [apps, computing, vlc],
    faq: [
      {
        question: "Is VLC media player really free?",
        answer:
          "Yes. VLC is free and open-source software from the VideoLAN project. It does not charge for playback, show ads, or require a subscription."
      },
      {
        question: "How does VLC make money?",
        answer:
          "VLC is supported through donations, community work, and the non-profit structure around VideoLAN. It does not rely on advertising, tracking, bundled toolbars, or selling user data."
      },
      {
        question: "Did the VLC creator go to jail?",
        answer:
          "No. The famous phrase \"Money is jail\" is a philosophy, not a legal story. Jean-Baptiste Kempf used it to explain why taking certain kinds of money can trap a product and change its incentives."
      },
      {
        question: "Who created VLC?",
        answer:
          "VLC began as a student project at Ecole Centrale Paris and later became part of the VideoLAN project. Jean-Baptiste Kempf is one of its best-known developers and public advocates."
      },
      {
        question: "Which free apps became adware or miners?",
        answer:
          "Over the years, some free utilities, browser extensions, and installers have been criticised or caught for bundling unwanted software, injecting ads, harvesting data, or abusing device resources. VLC matters because it refused those incentives despite having the scale to profit from them."
      }
    ],
    sources: [
      { label: "VideoLAN", url: "https://www.videolan.org/" },
      { label: "VLC media player", url: "https://www.videolan.org/vlc/" },
      { label: "VideoLAN Foundation", url: "https://www.videolan.org/videolan/" },
      {
        label: "Free Software Foundation Europe",
        url: "https://fsfe.org/news/2025/news-20251126-01.en.html"
      }
    ]
  };
}
