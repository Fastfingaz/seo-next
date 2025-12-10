import Head from 'next/head';
import { createClient } from "next-sanity";
import { useState } from 'react';

// --- Sanity Configuration ---
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2023-05-03",
    useCdn: false // set to `true` for production
});

// --- GROQ Query ---
const landingPageQuery = `*[_type == "landingPage"][0]{
  siteMeta,
  hero,
  features,
  beforeAfter,
  pricing,
  faq
}`;

export async function getStaticProps() {
    const data = await client.fetch(landingPageQuery);

    return {
        props: {
            data: data || null // Fallback if no content exists yet
        },
        revalidate: 60 // ISR: Revalidate every 60 seconds
    };
}

export default function LandingPage({ data }) {
    // Demo state
    const [demoInput, setDemoInput] = useState("");
    const [demoResult, setDemoResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fallback / Defaults if Sanity data is missing
    const meta = data?.siteMeta || { title: "SEO Optimizer", description: "AI Powered Metadata" };
    const hero = data?.hero || {
        headline: "Dominate Search Results with AI-Powered SEO",
        subheadline: "Instantly optimize titles and descriptions.",
        ctaPrimary: "Start Free",
        ctaSecondary: "See Demo"
    };
    const features = data?.features || [
        { title: "Smart AI Rewrites", description: "Transform bland descriptions." },
        { title: "Bulk Processing", description: "Update thousands of products." },
        // ... add more defaults if needed
    ];
    const demo = data?.beforeAfter || {
        beforeText: "Good condition. Works well.",
        afterTitle: "Optimized Product Title",
        afterDescription: "Optimized description content here.",
        afterMeta: "Meta tag content."
    };
    const plans = data?.pricing || [
        { tier: "Starter", price: "$19", features: ["100 products"] },
        { tier: "Growth", price: "$49", features: ["1000 products"], popular: true },
        { tier: "Scale", price: "$99", features: ["Unlimited"] }
    ];
    const faqList = data?.faq || [
        { question: "Is this free?", answer: "We offer a 7-day trial." }
    ];

    const handleDemoGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            setDemoResult({
                title: `[Optimized] ${demoInput || "Product"} - Premium Quality`,
                description: "Experience the best quality with our verified authentic product."
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="font-sans text-gray-900 bg-white">
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
                {meta.ogImage && <meta property="og:image" content={meta.ogImage.asset?._ref} />}
            </Head>

            {/* HERO SECTION */}
            <section className="bg-indigo-900 text-white pt-24 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">{hero.headline}</h1>
                    <p className="text-xl md:text-2xl mb-10 text-indigo-100 max-w-2xl mx-auto">{hero.subheadline}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                            {hero.ctaPrimary}
                        </button>
                        <button className="border-2 border-indigo-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-800 transition">
                            {hero.ctaSecondary}
                        </button>
                    </div>
                </div>
            </section>

            {/* BEFORE/AFTER SECTION */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Transform Your Product Data</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 relative">
                            <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-bl-lg">BEFORE</div>
                            <p className="text-gray-500 mb-4">{demo.beforeText}</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-100 relative">
                            <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-lg">AFTER</div>
                            <h3 className="font-bold text-xl text-indigo-900 mb-2">{demo.afterTitle}</h3>
                            <p className="text-gray-700 mb-4">{demo.afterDescription}</p>
                            <div className="p-3 bg-gray-50 rounded text-sm text-gray-600 font-mono border border-gray-100">
                                <span className="font-bold text-gray-400">Meta:</span> {demo.afterMeta}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-10">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition">
                                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 text-xl">✨</div>
                                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                                <p className="text-gray-600 text-sm">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">Simple Pricing</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <div key={i} className={`rounded-xl p-8 border ${plan.popular ? 'border-2 border-indigo-600 shadow-xl bg-white scale-105' : 'border-gray-200 hover:border-indigo-200'}`}>
                                {plan.popular && <div className="text-xs font-bold text-indigo-600 mb-2">POPULAR</div>}
                                <h3 className="text-xl font-bold mb-2">{plan.tier}</h3>
                                <div className="text-4xl font-bold mb-6">{plan.price}</div>
                                <ul className="space-y-3 mb-8 text-sm">
                                    {plan.features?.map((feat, k) => <li key={k}>✓ {feat}</li>)}
                                </ul>
                                <button className={`w-full py-2 font-bold rounded ${plan.popular ? 'bg-indigo-600 text-white' : 'border border-indigo-600 text-indigo-600'}`}>Choose {plan.tier}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
                    <div className="space-y-4">
                        {faqList.map((f, i) => (
                            <details key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <summary className="font-semibold cursor-pointer">{f.question}</summary>
                                <p className="mt-4 text-gray-600 text-sm">{f.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEMO & FOOTER OMITTED FOR BREVITY, SIMILAR STRUCTURE */}
        </div>
    );
}
