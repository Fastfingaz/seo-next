import Head from 'next/head';
import { createClient } from "next-sanity";
import { useState, useEffect } from 'react';

// --- Sanity Configuration ---
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2023-05-03",
    useCdn: false
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

// --- Mock AI Logic ---
function generateMockSEO(input) {
    const term = input.toLowerCase();
    let text = "Transform your daily routine with this premium product. Built for durability and style, it meets the highest standards of quality.";
    let emoji = "✨";

    if (term.includes("watch") || term.includes("clock") || term.includes("time")) {
        text = "Elevate your style with this masterpiece of engineering. Featuring scratch-resistant sapphire crystal and a genuine leather strap, this timepiece defines modern elegance.";
        emoji = "⌚";
    } else if (term.includes("boot") || term.includes("shoe") || term.includes("sneaker")) {
        text = "Command attention with these military-grade leather boots. Featuring triple-stitched seams and a slip-resistant sole, these are built for urban exploration.";
        emoji = "👢";
    } else if (term.includes("coffee") || term.includes("mug") || term.includes("cup")) {
        text = "Start your morning right with our artisanal ceramic mug. Heat-retentive glaze and an ergonomic handle make every sip a moment of pure bliss.";
        emoji = "☕";
    } else if (term.includes("bag") || term.includes("backpack") || term.includes("purse")) {
        text = "Carry your essentials in style. Crafted from sustainable canvas with reinforced stitching, this bag combines vintage aesthetics with modern utility.";
        emoji = "🎒";
    } else if (term.includes("phone") || term.includes("tech") || term.includes("gadget")) {
        text = "Experience next-gen performance. With sleek aluminum casing and rapid-response sensors, this device keeps you connected when it matters most.";
        emoji = "📱";
    }

    return {
        title: `[Premium] ${input} - Handcrafted Excellence`,
        description: text,
        icon: emoji
    };
}

export async function getStaticProps() {
    const data = await client.fetch(landingPageQuery);
    return {
        props: { data: data || null },
        revalidate: 60
    };
}

export default function LandingPage({ data }) {
    // State
    const [scrolled, setScrolled] = useState(false);
    const [demoInput, setDemoInput] = useState("");
    const [demoResult, setDemoResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Scroll listener for sticky header
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- Content Defaults (Premium Copy) ---
    const meta = data?.siteMeta || {
        title: "SEO Optimizer | #1 AI SEO App for Shopify",
        description: "Automate your product SEO with advanced AI. Boost rankings, drive traffic, and increase sales instantly."
    };

    const hero = data?.hero || {
        headline: "Skyrocket Your Shopify Sales with AI-Driven SEO",
        subheadline: "Stop writing boring manual descriptions. Instantly generate high-converting titles, descriptions, and meta tags that rank on Google.",
        ctaPrimary: "Start Free Trial",
        ctaSecondary: "View Live Demo"
    };

    const features = data?.features || [
        { title: "AI Rewrite Engine", description: "Our proprietary AI analyzes your product variants and writes compelling, keyword-rich copy in seconds.", icon: "⚡" },
        { title: "Bulk Optimization", description: "Processing 10 or 10,000 products? Our bulk engine handles your entire catalog without breaking a sweat.", icon: "🚀" },
        { title: "Rank Tracker", description: "Visualize your SEO health with real-time scoring. See exactly what to fix to hit rank #1.", icon: "📈" },
        { title: "Smart Compliance", description: "Automatically flag and remove risky medical claims or copyright violations before you publish.", icon: "🛡️" },
        { title: "Multi-Language", description: "Expand globally. Automatically translate and optimize your content for 30+ languages.", icon: "🌍" },
        { title: "24/7 Automation", description: "Set rules to auto-optimize new products as soon as you add them to your store.", icon: "🤖" },
    ];

    const plans = data?.pricing || [
        { tier: "Starter", price: "$19", desc: "For new stores", features: ["100 Product Credits", "Basic SEO Analysis", "Email Support"] },
        { tier: "Growth", price: "$49", desc: "For scaling brands", features: ["1,000 Product Credits", "Bulk Operations", "Priority Support", "Rank Tracking"], popular: true },
        { tier: "Scale", price: "$99", desc: "For high volume", features: ["Unlimited Products", "API Access", "Dedicated Manager", "Custom Models"] }
    ];

    const faqList = data?.faq || [
        { question: "Does this replace my existing SEO app?", answer: "Yes! We combine keyword research, content generation, and technical SEO storage into one seamless workflow." },
        { question: "Is it safe for my store data?", answer: "Absolutely. We use Shopify's official APIs and never modify products without your explicit approval." },
        { question: "Can I cancel anytime?", answer: "Yes, all plans are month-to-month. You can cancel directly from your Shopify admin dashboard." }
    ];

    // Helper for Demo
    const handleDemoGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            const result = generateMockSEO(demoInput || "Luxury Watch");
            setDemoResult(result);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="font-sans text-slate-900 bg-white selection:bg-indigo-100 selection:text-indigo-900">
            <Head>
                <title>{meta.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={meta.description} />
            </Head>

            {/* --- HEADER --- */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">S</div>
                        <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900 md:text-white'}`}>SEO Optimizer</span>
                    </div>

                    <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
                        {/* Text color conditional based on hero bg visibility */}
                        <a href="#features" className={`hover:text-indigo-500 transition ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>Features</a>
                        <a href="#demo" className={`hover:text-indigo-500 transition ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>Live Demo</a>
                        <a href="#pricing" className={`hover:text-indigo-500 transition ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>Pricing</a>
                        <a href="#faq" className={`hover:text-indigo-500 transition ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>FAQ</a>
                    </nav>

                    <div className="flex gap-4">
                        <a href="https://shopify.com/login" className={`hidden md:block px-5 py-2 rounded-full font-semibold transition ${scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}>Login</a>
                        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5">
                            Get Started
                        </button>
                    </div>
                </div>
            </header>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-900/50 border border-indigo-700 text-indigo-300 text-sm font-semibold mb-8 animate-fade-in-up">
                        ✨ Validated by 10,000+ Merchants
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight max-w-5xl mx-auto">
                        {hero.headline}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        {hero.subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <button className="w-full sm:w-auto bg-white text-indigo-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            {hero.ctaPrimary}
                        </button>
                        <a href="#demo" className="w-full sm:w-auto flex items-center justify-center gap-2 text-white px-10 py-4 rounded-full font-bold text-lg border border-slate-700 hover:bg-white/10 transition">
                            {/* Play Icon */}
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                            {hero.ctaSecondary}
                        </a>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row gap-8 justify-center items-center text-slate-500 text-sm font-semibold uppercase tracking-widest">
                        <span>Trusted By Leading Brands</span>
                        <div className="flex gap-8 opacity-60 grayscale">
                            {/* Placeholder Logos */}
                            <span className="text-xl font-bold font-serif">VOGUE</span>
                            <span className="text-xl font-bold font-sans">TechCrunch</span>
                            <span className="text-xl font-bold font-mono">ShopifyPlus</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES GRID --- */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">Powerful Features</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Everything you need to rank #1</h3>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Our toolkit replaces 5 different apps. Get analysis, writing, and compliance in one.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                    {f.icon || "✨"}
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h4>
                                <p className="text-slate-600 leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- LIVE DEMO SECTION --- */}
            <section id="demo" className="py-24 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Live Interactive Demo
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Experience the magic before you install.</h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Don't just take our word for it. Enter a basic product name below and watch our AI transform it into a high-converting, SEO-optimized listing in real-time.
                            </p>

                            {/* Before/After Stats */}
                            <div className="flex gap-8 mb-8">
                                <div>
                                    <div className="text-3xl font-extrabold text-slate-900 mb-1">300%</div>
                                    <div className="text-sm text-slate-500 font-medium">Click-Through Rate</div>
                                </div>
                                <div className="w-px bg-slate-300"></div>
                                <div>
                                    <div className="text-3xl font-extrabold text-slate-900 mb-1">5.4x</div>
                                    <div className="text-sm text-slate-500 font-medium">Organic Traffic</div>
                                </div>
                            </div>
                        </div>

                        {/* APP MOCKUP INTERFACE */}
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-2 md:p-8 relative">
                            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Input</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={demoInput}
                                            onChange={(e) => setDemoInput(e.target.value)}
                                            placeholder="e.g. Leather Boots"
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <button
                                            onClick={handleDemoGenerate}
                                            disabled={loading}
                                            className="bg-indigo-600 text-white px-6 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2"
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : "Generate"}
                                        </button>
                                    </div>
                                </div>

                                {/* Result Card */}
                                <div className={`transition-all duration-500 ${demoResult || loading ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 blur-sm grayscale'}`}>
                                    <div className="border border-indigo-100 bg-indigo-50/50 rounded-xl p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-indigo-900 text-lg">{demoResult ? demoResult.title : "Premium Leather Combat Boots - Waterproof"}</h4>
                                                <div className="text-xs text-indigo-400 font-mono mt-1">SEO Score: 98/100</div>
                                            </div>
                                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                                <span className="text-2xl">{demoResult ? demoResult.icon : "👢"}</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {demoResult ? demoResult.description : "Command attention with these military-grade leather boots. Featuring triple-stitched seams and a slip-resistant sole, these are built for urban exploration."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRICING --- */}
            <section id="pricing" className="py-24 bg-white relative">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-slate-500">No hidden fees. 7-day free trial on all plans.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {plans.map((plan, i) => (
                            <div key={i} className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${plan.popular ? 'bg-slate-900 text-white shadow-2xl scale-105 border-slate-900 z-10' : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300 hover:shadow-xl'}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-2 opacity-90">{plan.tier}</h3>
                                    <p className={`text-sm ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                                </div>
                                <div className="text-5xl font-extrabold mb-8">{plan.price}<span className="text-lg font-normal opacity-60">/mo</span></div>

                                <ul className="flex-1 space-y-4 mb-8">
                                    {plan.features?.map((feat, k) => (
                                        <li key={k} className="flex gap-3 text-sm font-medium">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>✓</div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 rounded-xl font-bold transition ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
                                    Choose {plan.tier}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FAQ --- */}
            <section id="faq" className="py-24 bg-slate-50">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqList.map((f, i) => (
                            <details key={i} className="group bg-white rounded-2xl shadow-sm border border-slate-200 open:shadow-md transition">
                                <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-slate-800 list-none">
                                    {f.question}
                                    <span className="transition-transform group-open:rotate-180 text-indigo-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                    {f.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-24 bg-slate-900 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Ready to dominate your niche?</h2>
                    <p className="text-xl text-slate-400 mb-10">Join 10,000+ merchants growing their organic traffic today.</p>
                    <button className="bg-white text-indigo-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-indigo-50 transition shadow-2xl hover:scale-105 transform duration-200">
                        Start Your Free Trial
                    </button>
                    <p className="mt-6 text-sm text-slate-500">No credit card required • Cancel anytime</p>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6 text-white">
                            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-xs font-bold">S</div>
                            <span className="font-bold text-lg">SEO Optimizer</span>
                        </div>
                        <p className="leading-relaxed mb-6 opacity-80">
                            The #1 AI-powered SEO suite for Shopify. We help brands automate growth and save hundreds of hours.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons */}
                            <a href="#" className="hover:text-white transition">Twitter</a>
                            <a href="#" className="hover:text-white transition">LinkedIn</a>
                            <a href="#" className="hover:text-white transition">GitHub</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-3">
                            <li><a href="#features" className="hover:text-indigo-400 transition">Features</a></li>
                            <li><a href="#pricing" className="hover:text-indigo-400 transition">Pricing</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Changelog</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Integrations</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-indigo-400 transition">SEO Guide 2024</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Help Center</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">API Documentation</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Community</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition">GDPR Compliance</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium opacity-60">
                    <div>&copy; {new Date().getFullYear()} SEO Optimizer App. All rights reserved.</div>
                    <div className="flex gap-6">
                        <span>Made with ❤️ in San Francisco</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
