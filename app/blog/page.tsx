import Link from "next/link";

const posts = [
  {
    slug: "techstack",
    title: "TwitDown Technical Stack",
    description: "Deep dive into our technical architecture and decisions",
    date: "2024-01-15",
  },
  {
    slug: "about",
    title: "About TwitDown",
    description: "The story behind TwitDown development",
    date: "2024-01-10",
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-amber-900">TwitDown Blog</h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`}>
              <div className="p-6 rounded-lg bg-white/50 hover:bg-white/80 transition-colors duration-200">
                <h2 className="text-2xl font-semibold text-amber-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-amber-800/80 mb-4">{post.description}</p>
                <time className="text-sm text-amber-600">{post.date}</time>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
