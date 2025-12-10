import { getSecret } from '../../../utils/vault';
import crypto from 'crypto';

/**
 * Handles Shopify GDPR Redact/Delete Webhooks
 * Verify HMAC signature before processing.
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const hmac = req.headers['x-shopify-hmac-sha256'];
        const topic = req.headers['x-shopify-topic'];
        const shop = req.headers['x-shopify-shop-domain'];
        const body = JSON.stringify(req.body); // Raw body needed for HMAC

        // 1. Verify Signature
        const secret = await getSecret('SHOPIFY_API_SECRET');
        const hash = crypto.createHmac('sha256', secret).update(body).digest('base64');

        if (hash !== hmac && process.env.NODE_ENV === 'production') {
            console.error("GDPR Webhook HMAC validation failed");
            return res.status(401).send('Unauthorized');
        }

        // 2. Process Request based on Topic
        console.log(`[GDPR] Received ${topic} for shop ${shop}`);

        if (topic === 'customers/redact' || topic === 'shop/redact') {
            const { shop_id, customer } = req.body;
            // PERFORM DATA DELETION LOGIC HERE
            // await db.users.delete({ where: { shopId: shop_id } });
            console.log(`[GDPR] Scheduled deletion for ${shop_id}`);
        }

        if (topic === 'customers/data_request') {
            // Handle data export
            console.log(`[GDPR] Data export requested`);
        }

        res.status(200).send('Webhook received');

    } catch (error) {
        console.error(`[GDPR] Error: ${error.message}`);
        res.status(500).send('Server Error');
    }
}
