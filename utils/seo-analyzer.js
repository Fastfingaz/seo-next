/**
 * Analyzes a Shopify product for SEO quality.
 * @param {Object} product - { title, body_html }
 * @returns {Object} { keywords: string[], keyword_score: number, recommendations: string[] }
 */
export function analyzeSEO(product) {
    const { title, body_html } = product;
    const description = body_html ? body_html.replace(/<[^>]*>/g, '') : '';

    const keywords = [];
    const recommendations = [];
    let score = 100;

    // 1. Title Analysis
    if (!title) {
        score -= 50;
        recommendations.push("Add a product title.");
    } else {
        if (title.length < 10) {
            score -= 10;
            recommendations.push("Title is too short (aim for 10-60 chars).");
        }
        if (title.length > 70) {
            score -= 10;
            recommendations.push("Title is too long (keep under 70 chars).");
        }
        // Extract potential keywords (naïve approach: words > 4 chars)
        const titleWords = title.toLowerCase().match(/\b\w{5,}\b/g) || [];
        titleWords.forEach(w => { if (!keywords.includes(w)) keywords.push(w); });
    }

    // 2. Description Analysis
    if (!description) {
        score -= 30;
        recommendations.push("Add a product description.");
    } else {
        if (description.length < 50) {
            score -= 10;
            recommendations.push("Description is too thin (aim for 150+ chars).");
        }
        // Check if title keywords appear in description
        const missingKeywords = keywords.filter(k => !description.toLowerCase().includes(k));
        if (missingKeywords.length > 0) {
            score -= 5 * missingKeywords.length;
            recommendations.push(`Include keywords in description: ${missingKeywords.join(', ')}`);
        }
    }

    return {
        keywords,
        keyword_score: Math.max(0, score), // Ensure no negative score
        recommendations
    };
}

// --- EXAMPLES ---

console.log("--- Example 1: Good Product ---");
console.log(analyzeSEO({
    title: "Premium Vintage Leather Backpack",
    body_html: "<p>This premium vintage leather backpack is perfect for daily travel. Made from high-quality materials.</p>"
}));

console.log("\n--- Example 2: Missing Description ---");
console.log(analyzeSEO({
    title: "Red T-Shirt",
    body_html: ""
}));

console.log("\n--- Example 3: Short Title & Thin Content ---");
console.log(analyzeSEO({
    title: "Bag",
    body_html: "<p>It is a bag.</p>"
}));
