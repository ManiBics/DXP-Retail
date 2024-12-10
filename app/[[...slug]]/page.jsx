import DynamicComp from "@/components/common/DynamicComp";
import { getLocale } from "@/utils";
import { getPageFromSlug } from "@/utils/content";

export default async function ComposablePage({ params }) {
  const { locale = "en-US" } = getLocale(params?.slug);
  const slug =
    "/" +
    (params?.slug ?? [""])
      .filter((slug) => !slug.includes(locale))
      .join("/")
      .replace("index", "");
  const pageData = await getPageFromSlug(slug, locale);
  return <DynamicComp pageData={pageData} params={params} />;
}
