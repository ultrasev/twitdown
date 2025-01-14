import React from "react";

interface ContentSectionProps {
  howToSteps: string[];
  features: string[];
  faqs: { q: string; a: string }[];
}

export default function ContentSection({ howToSteps, features, faqs }: ContentSectionProps) {
  return (
    <div className="max-w-3xl mx-auto mt-20 space-y-16">
      {/* How-to Section */}
      <section className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-6">
        <h2 className="text-2xl font-bold mb-6">How to Download Twitter Videos</h2>
        <ol className="space-y-4">
          {howToSteps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="font-semibold">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Features Section */}
      <section className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-6">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-6">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}