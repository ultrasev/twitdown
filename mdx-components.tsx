import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 自定义组件
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-8 text-amber-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-4 text-amber-800">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-amber-900/90 leading-relaxed">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || ""}
        className="text-amber-600 hover:text-amber-700 underline decoration-amber-200"
      >
        {children}
      </Link>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={800}
        height={400}
        className="rounded-lg shadow-lg"
      />
    ),
    ...components,
  };
}
