import { fetchHomePageData } from "@/lib/wordpress";

export const revalidate = 60;

export default async function HomePage() {
  const data = await fetchHomePageData();

  return (
    <main className="editorial-shell cms-homepage">
      {data.blocks.map((block) => (
        <div
          className="cms-block"
          dangerouslySetInnerHTML={{ __html: block.renderedHtml }}
          key={block.id}
        />
      ))}
    </main>
  );
}
