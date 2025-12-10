import Head from 'next/head';
import { useState } from 'react';

export default function MarketingPage() {
    const [demoInput, setDemoInput] = useState("");
    const [demoResult, setDemoResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDemoGenerate = () => {
        setLoading(true);
        // Mock simulation
        setTimeout(() => {
            setDemoResult({
                title: `[Optimized] ${demoInput || "Product"} - Premium Quality`,
                description: "Experience the best quality with our verified authentic product. Designed for durability and style."
            });
            setLoading(false);
        }, 1000);
    };

    const features = [
        { title: "Smart AI Rewrites", desc: "Automatically transform bland product descriptions into engaging, SEO-optimized copy that converts." },
        { title: "Bulk Processing", desc: "Update thousands of products simultaneously with our high-throughput job queue system." },
        { title: "Keyword Scoring", desc: "Get instant feedback on keyword density and placement to maximize your search rankings." },
        { title: "Compliance Safety Checks", desc: "Built-in filters automatically flag prohibited medical claims and potential copyright risks." },
        { title: "Comprehensive Admin Dashboard", desc: "Monitor usage, track job status, and manage subscription limits from a central control panel." },
        { title: "Developer API Access", desc: "Integrate our optimization engine directly into your custom workflows with fully documented API endpoints." }
    ];

    const faqs = [
        { q: "What permissions does the app require?", a: "We strictly require only `read_products` and `write_products` access scopes. This allows our AI to analyze your current product details and update them with the optimized versions you approve." },
        { q: "Is my store data secure?", a: "Yes. We use industry-standard encryption for all data transmission and storage. We adhere to GDPR compliance and never share your store's proprietary data." },
        { q: "Do you offer a free trial?", a: "Absolutely. All paid plans come with a 7-day free trial so you can test the AI quality and see the results on your store before being charged." },
        { q: "How accurate are the AI rewrites?", a: "Our specialized AI models are tuned specifically for eCommerce SEO. We always recommend a quick human review before publishing." },
        { q: "How does billing work?", a: "Billing is handled directly through Shopify. You will see the subscription charge appear on your regular monthly Shopify invoice." }
    ];

    return (
        <div className="font-sans text-gray-900 bg-white">
            <Head>
                <title>SEO Optimizer - AI Powered Metadata</title>
                <meta name="description" content="Dominate Search Results with AI-Powered SEO." />
            </Head>

            {/* 1. HERO SECTION */}
            <section className="bg-indigo-900 text-white pt-24 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Dominate Search Results with AI-Powered SEO
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-indigo-100 max-w-2xl mx-auto">
                        Instantly optimize thousands of product descriptions and titles. Drive more traffic and boost conversions with the smarter way to manage Shopify SEO.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                            Start Free
                        </button>
                        <button className="bg-transparent border-2 border-indigo-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-800 transition">
                            See Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. BEFORE/AFTER SECTION */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Transform Your Product Data</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* Before Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-bl-lg">BEFORE</div>
                            <h3 className="font-bold text-lg text-gray-400 mb-4">Vintage Wooden Wall Clock</h3>
                            <p className="text-gray-500 mb-4">Good condition. Works well. 12 inches wide. Hand made.</p>
                            <div className="text-xs text-red-400 font-mono mt-auto">SEO Score: 15/100</div>
                        </div>

                        {/* After Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-100 relative overflow-hidden transform md:-translate-y-2">
                            <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-lg">AFTER (AI OPTIMIZED)</div>
                            <h3 className="font-bold text-xl text-indigo-900 mb-2">Handcrafted Vintage Wooden Wall Clock | Rustic Walnut Home Decor - 12 Inch</h3>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Transform your living space with this exquisite Handcrafted Vintage Wooden Wall Clock. Featuring a silent quartz movement and a rich walnut finish, this 12-inch timepiece blends classic charm with modern reliability.
                            </p>
                            <div className="p-3 bg-gray-50 rounded text-sm text-gray-600 mb-4 font-mono border border-gray-100">
                                <span className="font-bold text-gray-400">Meta:</span> Shop this 12-inch Vintage Wooden Wall Clock. Silent quartz movement, walnut finish, and rustic design. Fast shipping & satisfaction guaranteed.
                            </div>
                            <div className="text-xs text-green-600 font-bold flex items-center gap-1">
                                <span>SEO Score: 98/100</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FEATURES/BENEFITS */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Top Merchants Choose Us</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Scalable technology designed for modern e-commerce teams.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition">
                                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 text-xl">✨</div>
                                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. DEMO SECTION */}
            <section className="py-24 px-6 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold mb-2">Try it yourself</h2>
                        <p className="text-gray-400">Enter a product name to see instant AI optimization.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-0 md:gap-12 items-center bg-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700">
                        {/* Input */}
                        <div className="border-b md:border-b-0 md:border-r border-gray-700 pb-8 md:pb-0 md:pr-12">
                            <label className="block text-sm font-bold mb-2 text-indigo-300">Product Name</label>
                            <input
                                type="text"
                                placeholder="e.g., Men's Leather Shoes"
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white mb-6 focus:outline-none focus:border-indigo-500 transition"
                                value={demoInput}
                                onChange={(e) => setDemoInput(e.target.value)}
                            />
                            <button
                                onClick={handleDemoGenerate}
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                            >
                                {loading ? "Generating..." : "Generate Optimized Content"}
                            </button>
                        </div>

                        {/* Output */}
                        <div className="pt-8 md:pt-0 pl-0 md:pl-4">
                            {demoResult ? (
                                <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg animate-fade-in">
                                    <div className="mb-4">
                                        <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Optimized Title</div>
                                        <div className="font-bold text-lg leading-tight">{demoResult.title}</div>
                                    </div>
                                    <div className="mb-6">
                                        <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Optimized Description</div>
                                        <div className="text-sm text-gray-700">{demoResult.description}</div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex-1 border border-gray-300 py-2 rounded text-sm font-semibold hover:bg-gray-50">Copy Suggestion</button>
                                        <button className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-semibold hover:bg-green-700">Edit & Publish</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-600 py-12 border-2 border-dashed border-gray-700 rounded-xl">
                                    <span className="text-4xl mb-2">⚡</span>
                                    <p>AI result will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. PRICING */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">Simple Pricing</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Starter */}
                        <div className="border border-gray-200 rounded-xl p-8 hover:border-indigo-200 transition">
                            <h3 className="text-xl font-bold mb-2">Starter</h3>
                            <p className="text-sm text-gray-500 mb-6">Perfect for new stores starting SEO.</p>
                            <div className="text-4xl font-bold mb-6">$19<span className="text-base font-normal text-gray-400">/mo</span></div>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex gap-2">✓ 100 products/month</li>
                                <li className="flex gap-2">✓ Core AI rewrites</li>
                                <li className="flex gap-2">✓ Manual optimization</li>
                            </ul>
                            <button className="w-full py-2 border border-indigo-600 text-indigo-600 font-bold rounded hover:bg-indigo-50 transition">Choose Starter</button>
                        </div>

                        {/* Growth */}
                        <div className="border-2 border-indigo-600 rounded-xl p-8 shadow-xl relative transform scale-105 bg-white z-10">
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                            <h3 className="text-xl font-bold mb-2 text-indigo-900">Growth</h3>
                            <p className="text-sm text-gray-500 mb-6">Accelerate growth with automation.</p>
                            <div className="text-4xl font-bold mb-6">$49<span className="text-base font-normal text-gray-400">/mo</span></div>
                            <ul className="space-y-3 mb-8 text-sm font-medium">
                                <li className="flex gap-2">✓ 1,000 products/month</li>
                                <li className="flex gap-2">✓ Bulk rewrite & scoring</li>
                                <li className="flex gap-2">✓ Auto-sync changes</li>
                                <li className="flex gap-2">✓ 1 user seat</li>
                            </ul>
                            <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded shadow-lg hover:bg-indigo-700 transition">Choose Growth</button>
                        </div>

                        {/* Scale */}
                        <div className="border border-gray-200 rounded-xl p-8 hover:border-indigo-200 transition">
                            <h3 className="text-xl font-bold mb-2">Scale</h3>
                            <p className="text-sm text-gray-500 mb-6">Enterprise-grade power.</p>
                            <div className="text-4xl font-bold mb-6">$99<span className="text-base font-normal text-gray-400">/mo</span></div>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex gap-2">✓ Unlimited products</li>
                                <li className="flex gap-2">✓ Daily optimization</li>
                                <li className="flex gap-2">✓ Keyword clustering</li>
                                <li className="flex gap-2">✓ Multi-store & API</li>
                                <li className="flex gap-2">✓ 5 user seats</li>
                            </ul>
                            <button className="w-full py-2 border border-gray-300 text-gray-600 font-bold rounded hover:bg-gray-50 transition">Choose Scale</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FAQ */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((f, i) => (
                            <details key={i} className="bg-white p-6 rounded-lg shadow-sm group">
                                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                                    {f.q}
                                    <span className="transform group-open:rotate-180 transition text-indigo-500">▼</span>
                                </summary>
                                <p className="mt-4 text-gray-600 leading-relaxed text-sm">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FOOTER */}
            <footer className="bg-gray-900 text-gray-400 py-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-sm">
                    <div>
                        <div className="text-white font-bold text-lg mb-4">SEO Optimizer</div>
                        <p className="max-w-xs">Making eCommerce SEO simple, automated, and powerful for merchants worldwide.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="text-white font-bold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Changelog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">GDPR</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs">
                    © {new Date().getFullYear()} SEO Optimizer App. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
