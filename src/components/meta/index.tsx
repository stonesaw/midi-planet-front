import Head from "next/head";

import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE } from "@/constants/site";
import { CustomPageProps } from "@/types/page";

type MetaProps = Pick<
  CustomPageProps,
  "title" | "description" | "keywords" | "isIndex"
>;

const generateTitle = (title?: string) => {
  if (title) {
    return `${title} | ${SITE_TITLE}`;
  }
  return SITE_TITLE;
};

// const DEFAULT_OG_IMAGE = `${SITE_URL}/midipra.png`;

export default function Meta({
  title,
  description,
  keywords,
  isIndex,
}: MetaProps) {
  const insertTitle = generateTitle(title);
  const insertDescription = description || SITE_DESCRIPTION;
  const insertKeywords = keywords || SITE_KEYWORDS.join(",");

  return (
    <Head>
      <title>{insertTitle}</title>
      <meta name="description" content={insertDescription} />
      <meta name="keywords" content={insertKeywords} />
      <meta property="og:title" content={insertTitle} />
      <meta property="og:description" content={insertDescription} />
      {/* <meta property="og:image" content={image || DEFAULT_OG_IMAGE} /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="robots"
        content={isIndex ? "index, follow" : "noindex, nofollow"}
      />
      {/* <MetaIcon /> */}
    </Head>
  );
}
