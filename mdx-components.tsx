import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 自定义组件
    h1: ({ children }) => (
      <h1 className="mt-8 text-4xl font-bold mb-8 text-amber-900">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-4 text-2xl font-semibold mb-4 text-amber-800">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-4 text-xl font-semibold mb-4 text-amber-800">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 mb-4 text-amber-900/90 leading-relaxed">{children}</p>
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
    code: ({ children }) => (
      <code className="font-courier bg-amber-50 px-1 py-0.5 rounded text-amber-900">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="font-courier bg-amber-50/50 p-4 rounded-lg overflow-x-auto">
        {children}
      </pre>
    ),
    ul: ({ children }) => (
      <ul className="space-y-2 my-4 list-none pl-0">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="flex items-start space-x-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mt-2"></span>
        <span className="flex-1"> &gt; {children}</span>
      </li>
    ),
    ...components,
  };
}
