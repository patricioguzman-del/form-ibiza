import { PlaceholderPage } from "@/components/PlaceholderPage";
import { placeholderMetadata, readLang, type LangParams } from "@/lib/page";

export const generateMetadata = placeholderMetadata("contact");

export default async function Page({ params }: LangParams) {
  return <PlaceholderPage lang={await readLang(params)} page="contact" />;
}
