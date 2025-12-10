/**
 * Checks text for policy violations.
 * Rules:
 * 1. Medical Claims: Flags words like 'cure', 'treat', 'heal'.
 * 2. Copyright: Flags if text is > 25 words (Simple heuristic for this demo).
 * 
 * @param {string} text 
 * @returns {Object} { safe: boolean, violations: string[] }
 */
export function checkSafety(text) {
    const violations = [];

    // 1. Medical Claims Check
    const medicalKeywords = ['cure', 'treat', 'heal', 'prevent', 'doctor', 'tested'];
    const lowerText = text.toLowerCase();

    const foundMedical = medicalKeywords.filter(word => lowerText.includes(word));
    if (foundMedical.length > 0) {
        violations.push(`Medical claims detected: ${foundMedical.join(', ')}`);
    }

    // 2. Copyright Risk (Length > 25 words heuristic)
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 25) {
        violations.push(`Copyright risk: Text exceeds 25 words (${wordCount} words).`);
    }

    return {
        safe: violations.length === 0,
        violations
    };
}

// --- EXAMPLES ---

console.log("--- Example 1: Safe ---");
console.log(checkSafety("Vintage wooden clock."));

console.log("\n--- Example 2: Medical Violation ---");
console.log(checkSafety("This magical tea will cure your headache instantly."));

console.log("\n--- Example 3: Copyright/Length Violation ---");
console.log(checkSafety("This is a very long description that goes on and on about the product details specifically to trigger the twenty-five word limit which we have set as a safety rule for copyright."));
