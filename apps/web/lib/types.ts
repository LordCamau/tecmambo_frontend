export type Format =
  | "explainer"
  | "review"
  | "wallet-watch"
  | "real-life"
  | "news"
  | "opinion"
  | "business";

export type Tag = {
  name: string;
  slug: string;
  kind: "topic" | "brand";
};

export type RegionTerm = {
  name: string;
  slug: string;
  group: "Africa" | "Global";
  description: string;
  flag?: string;
  icon?: string;
  heroImage?: {
    src: string;
    alt: string;
    credit: string;
  };
};

export type Author = {
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
  sameAs?: string[];
};

export type ArticleCorrection = {
  date: string;
  description: string;
};

export type SpecRow = {
  label: string;
  value: string;
};

export type Deal = {
  productName: string;
  retailer: string;
  priceCurrent: number;
  priceWas?: number;
  currency: "KSh" | "USD";
  affiliateUrl: string;
  expiry?: string;
  bestUnderThreshold?: number;
  verified: boolean;
};

export type ArticleMediaSlot = {
  id: string;
  type: "image" | "infographic" | "youtube";
  status: "ready" | "placeholder";
  placement: string;
  caption: string;
  title?: string;
  alt?: string;
  credit?: string;
  licensingNote?: string;
  aspectRatio?: string;
  src?: string;
  url?: string;
  width?: number;
  height?: number;
};

export type ArticleComparisonTable = {
  id: string;
  caption: string;
  columns: string[];
  rows: Array<{
    label: string;
    values: string[];
  }>;
};

export type Article = {
  id: string;
  slug: string;
  format: Format;
  title: string;
  cardHeadline?: string;
  seo?: {
    title: string;
    description: string;
  };
  subhead: string;
  excerpt: string;
  whyItMatters: string;
  quickAnswer?: string;
  body: string[];
  goDeeper?: {
    intro: string;
    specs: SpecRow[];
  };
  closingLine?: string;
  verdict?: {
    score: string;
    summary: string;
    pros: string[];
    cons: string[];
  };
  itemReviewed?: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  image: {
    src: string;
    alt: string;
    caption?: string;
    credit: string;
    creditOmitted?: boolean;
    width?: number;
    height?: number;
    type?: string;
  };
  inlineImages?: Array<{
    id: string;
    src: string;
    alt: string;
    credit: string;
    width?: number;
    height?: number;
    type?: string;
  }>;
  mediaSlots?: ArticleMediaSlot[];
  comparisonTables?: ArticleComparisonTable[];
  tags: Tag[];
  regions?: RegionTerm[];
  faq?: Array<{ question: string; answer: string }>;
  corrections?: ArticleCorrection[];
  sources?: Array<{ label: string; url: string }>;
  itemList?: string[];
  sponsored?: boolean;
  googleAdsEligible?: boolean;
  deal?: Deal;
  publicationStatus?: "publish" | "draft" | "in_review" | "private" | "scheduled" | "archived";
  editorialStatus?: "draft" | "draft_quarantine" | "editorial_review" | "fact_check" | "ready" | "published" | "needs_revision" | "archived";
  indexingStatus?: "index" | "noindex" | "inherit";
  contentFormat?: "news" | "analysis" | "explainer" | "buying_guide" | "hands_on_review" | "research_based_review" | "opinion" | "glossary" | "interview" | "field_test";
  isNewsworthy?: boolean;
  reviewMethod?: "hands_on" | "research_based" | "unknown";
  hasOriginalTesting?: boolean;
  hasOriginalPhotography?: boolean;
  testingMethodology?: string;
  productSource?: string;
  testingPeriod?: string;
  sourceDisclosure?: string;
  excludeFromDiscovery?: boolean;
  workflowVersion?: "legacy" | "gated";
  sourceChecked?: boolean;
  humanEditorApproved?: boolean;
  editor?: string;
  reviewedAt?: string;
  originalValueType?: "original_reporting" | "original_analysis" | "first_hand_testing" | "data_analysis" | "practical_guide" | "curated_context";
  testEvidence?: string[];
  testStartedAt?: string;
  testCompletedAt?: string;
  pricingCheckedAt?: string;
  legalReviewedAt?: string;
};

export type GlossaryTerm = {
  term: string;
  slug: string;
  oneLiner: string;
  pronunciation?: string;
  aliases: string[];
  analogy?: string;
  fullExplanation: string;
  whyItMatters?: string;
  notToConfuseWith?: string[];
  relatedTerms: string[];
  topics: string[];
  difficulty: "Everyday" | "Getting technical" | "Deep cut";
  faqs?: Array<{ question: string; answer: string }>;
  featured?: boolean;
  termOfDay?: string;
  sources?: Array<{ label: string; url: string }>;
  publishedAt: string;
  updatedAt: string;
  trendingScore?: number;
};
