export default function handler(req, res) {
    const { shop, hmac, code } = req.query;

    // Basic validation that Shopify parameters exist
    if (shop && hmac && code) {
        console.log(`OAuth callback received for shop: ${shop}`);
        // Return 200 OK as requested
        res.status(200).json({ status: "success", shop });
    } else {
        res.status(400).json({
            status: "error",
            message: "Missing required parameters (shop, hmac, code)"
        });
    }
}
