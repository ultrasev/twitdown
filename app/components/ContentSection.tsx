import React from "react";

interface ContentSectionProps {
  howToSteps: string[];
  features: string[];
  faqs: { q: string; a: string }[];
}

const howToSteps = [
  "Copy the Twitter/X video URL you want to download",
  "Paste the URL in the input box above",
  "Click the Download button",
  "Choose your preferred video quality",
  "Download your video",
];

// const features = [
//   "Free to use - no registration required",
//   "High-quality video downloads",
//   "Mobile-friendly interface",
//   "Fast and easy to use",
//   "Works with all Twitter/X videos",
//   "Multiple format options",
// ];

export default function ContentSection() {
  const faqs = [
    {
      q: "Can I download videos from private accounts?",
      a: "No. For privacy and security reasons, our service only works with public Twitter/X videos. We respect user privacy and copyright laws.",
    },
    {
      q: "Is there a limit on downloads?",
      a: "To ensure fair usage and optimal service performance, there's a rate limit of 10 downloads per 10 seconds. This helps us maintain service quality and availability for all users.",
    },
    {
      q: "How to download X/Twitter videos on iPhone?",
      a: "It's simple! Copy the tweet URL from Twitter app, paste it in our downloader, and click Download. For iOS 13+, downloads work directly in Safari. For older iOS versions, you'll need to use a file manager app.",
    },
    {
      q: "How to download X/Twitter videos on Android?",
      a: "The process is straightforward: copy the tweet URL, paste it in our downloader, and tap Download. The video will be saved to your device's storage automatically.",
    },
    {
      q: "What about video quality and formats?",
      a: "Our service supports downloading videos in MP4 format, which is compatible with all modern devices and platforms. You can choose between different quality options when available.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-16 px-2">
      {/* How-to Section */}
      <section>
        <h2
          className={`text-3xl sm:text-4xl text-amber-950 mb-8 font-semibold`}
        >
          How to Download Twitter Videos
        </h2>
        <ol className={`space-y-3`}>
          {howToSteps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="font-medium">{index + 1}.</span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Features Section */}
      {/* <section>
        <h2
          className={`text-3xl sm:text-4xl text-amber-950 mb-8 font-semibold`}
        >
          Why TwitDown
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span className="text-amber-700">✦</span>
              <span className={`text-amber-900/90`}>{feature}</span>
            </div>
          ))}
        </div>
      </section> */}

      {/* FAQ Section */}
      <section>
        <h2
          className={`text-3xl sm:text-4xl text-amber-950 mb-8 font-semibold`}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className={`text-lg font-medium text-amber-900`}>
                Q: {faq.q}
              </h3>
              <p className={`leading-relaxed`}>A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
