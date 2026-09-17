export type ArticleShareLinks = {
  facebook: string;
  linkedin: string;
  x: string;
  whatsapp: string;
};

export function articleShareLinks(canonicalUrl: string, title: string): ArticleShareLinks {
  const facebook = new URL("https://www.facebook.com/sharer/sharer.php");
  facebook.searchParams.set("u", canonicalUrl);

  const linkedin = new URL("https://www.linkedin.com/sharing/share-offsite/");
  linkedin.searchParams.set("url", canonicalUrl);

  const x = new URL("https://twitter.com/intent/tweet");
  x.searchParams.set("url", canonicalUrl);
  x.searchParams.set("text", title);

  const whatsapp = new URL("https://wa.me/");
  whatsapp.searchParams.set("text", `${title}\n${canonicalUrl}`);

  return {
    facebook: facebook.toString(),
    linkedin: linkedin.toString(),
    x: x.toString(),
    whatsapp: whatsapp.toString()
  };
}
