import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - TwitDown",
  description: "Technical articles and updates about TwitDown",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-amber-50/30">
      <main className="container mx-auto px-4 py-12">
        <div className="prose prose-amber lg:prose-lg mx-auto max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
