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

const features = [
  "Free to use - no registration required",
  "High-quality video downloads",
  "Mobile-friendly interface",
  "Fast and easy to use",
  "Works with all Twitter/X videos",
  "Multiple format options",
];

export default function ContentSection() {
  const faqs = [
    {
      q: "Can I download private videos from Twitter?",
      a: "No. For privacy and security reasons, our service only works with public Twitter/X videos. We respect user privacy and copyright laws.",
    },
    {
      q: "How to download Twitter videos on iPhone?",
      a: "It's simple! Copy the tweet URL from Twitter app, paste it in our downloader, and click Download. For iOS 13+, downloads work directly in Safari. For older iOS versions, you'll need to use a file manager app.",
    },
    {
      q: "Are there any download limits?",
      a: "No limits on the number of downloads! However, there's a brief 10-second cooldown between downloads to ensure optimal service performance for all users.",
    },
    {
      q: "How to download Twitter videos on Android?",
      a: "The process is straightforward: copy the tweet URL, paste it in our downloader, and tap Download. The video will be saved to your device's storage automatically.",
    },
    {
      q: "What video formats are supported?",
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
