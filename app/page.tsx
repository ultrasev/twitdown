import PageHeader from "@/components/PageHeader";
import SectionDownloader from "@/components/SectionDownloader";
import FooterMain from "@/components/FooterMain";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <SectionDownloader />
      </main>
      <FooterMain />
    </div>
  );
}
