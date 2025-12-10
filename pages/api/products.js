export default function handler(req, res) {
    // 1. Verify Request (Mock Auth Check)
    // In production, validate session/token using @shopify/shopify-api
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Unauthorized: Missing access token" });
    }

    // 2. Mock Product Data (Simulating Shopify Admin API response)
    const products = [
        {
            id: 632910392,
            title: "Wooden Vintage Wall Clock",
            status: "active",
            variants: [{ price: "29.00", sku: "W-CLOCK-001" }]
        },
        {
            id: 792019283,
            title: "Industrial Desk Lamp",
            status: "draft",
            variants: [{ price: "45.00", sku: "I-LAMP-002" }]
        }
    ];

    // 3. Return JSON
    res.status(200).json({ products });
}
