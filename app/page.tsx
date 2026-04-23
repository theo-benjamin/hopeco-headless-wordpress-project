import { EditorialFooter } from "@/components/editorial-footer";
import { EditorialHeader } from "@/components/editorial-header";
import { EditorialHero } from "@/components/editorial-hero";
import { EditorialImpact } from "@/components/editorial-impact";
import { EditorialPathways } from "@/components/editorial-pathways";
import { EditorialUpdates } from "@/components/editorial-updates";
import { fetchHomePageData } from "@/lib/wordpress";

export const revalidate = 60;

export default async function HomePage() {
  const data = await fetchHomePageData();

  return (
    <main className="editorial-shell">
      <EditorialHeader header={data.header} siteTitle={data.siteTitle} />
      <EditorialHero hero={data.hero} />
      <EditorialPathways pathways={data.pathways} />
      <EditorialImpact impact={data.impact} />
      <EditorialUpdates updates={data.updates} />
      <EditorialFooter footer={data.footer} siteTitle={data.siteTitle} />
    </main>
  );
}
