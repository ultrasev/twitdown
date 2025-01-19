import React from "react";
import { Crimson_Pro, Inter } from "next/font/google";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["500", "600"], // 500用来做常规显示，600用来加重
  style: ["normal", "italic"], // 支持斜体，以防后续需要
});
const inter = Inter({ subsets: ["latin"] });

interface ContentSectionProps {
  howToSteps: string[];
  features: string[];
  faqs: { q: string; a: string }[];
}

export default function ContentSection({
  howToSteps,
  features,
  faqs,
}: ContentSectionProps) {
  return (
    <div className="max-w-3xl mx-auto mt-16 space-y-16 px-2">
      {/* How-to Section */}
      <section>
        <h2
          className={`${crimsonPro.className} text-3xl sm:text-4xl text-amber-950 mb-8 font-semibold`}
        >
          How to Download Twitter Videos
        </h2>
        <ol className={`${inter.className} space-y-3`}>
          {howToSteps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-amber-800 font-medium">{index + 1}.</span>
              <span className="text-amber-900/90 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Features Section */}
      <section>
        <h2
          className={`${crimsonPro.className} text-3xl sm:text-4xl text-amber-950 mb-8 font-semibold`}
        >
          Why TwitDown
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span className="text-amber-700">✦</span>
              <span className={`${inter.className} text-amber-900/90`}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2
          className={`${crimsonPro.className} text-3xl sm:text-4xl text-amber-950 mb-8 font-semibold`}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3
                className={`${inter.className} text-lg font-medium text-amber-900`}
              >
                {faq.q}
              </h3>
              <p
                className={`${inter.className} text-amber-800/90 leading-relaxed`}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
