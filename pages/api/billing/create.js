/**
 * TEST FLOW DESCRIPTION:
 * 1. Ensure your app is installed on a Development Store (Test Charge: true).
 * 2. Send a POST request to /api/billing/create from your app frontend.
 * 3. The response will contain a `confirmationUrl`.
 * 4. Redirect the user's browser window to this `confirmationUrl`.
 * 5. The user will see a Shopify page to approve the $19 charge.
 * 6. After approval, Shopify redirects back to your app's return_url (usually / or /api/billing/callback).
 */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 1. Get the current shop and access token (In real app, get from session)
    // For this standalone example, we assume they are passed in headers or body
    const shop = req.headers['x-shopify-shop'];
    const accessToken = req.headers['x-shopify-access-token'];

    if (!shop || !accessToken) {
        return res.status(401).json({ error: 'Missing shop or access token' });
    }

    // 2. Define the GraphQL Mutation for Recurring Charge
    const query = `
    mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!) {
      appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: true) {
        userErrors {
          field
          message
        }
        confirmationUrl
        appSubscription {
          id
        }
      }
    }
  `;

    const variables = {
        name: "Starter Plan",
        returnUrl: `https://${shop}/admin/apps/seo-optimizer`, // Adjust to your actual app URL
        lineItems: [{
            plan: {
                appRecurringPricingDetails: {
                    price: { amount: 19.00, currencyCode: "USD" },
                    interval: "EVERY_30_DAYS"
                }
            }
        }]
    };

    try {
        // 3. Execute request to Shopify Admin API
        const response = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": accessToken
            },
            body: JSON.stringify({ query, variables })
        });

        const responseJson = await response.json();
        const result = responseJson.data?.appSubscriptionCreate;

        if (result?.userErrors?.length > 0) {
            return res.status(400).json({ error: result.userErrors });
        }

        // 4. Return the confirmation URL for frontend redirect
        return res.status(200).json({
            confirmationUrl: result.confirmationUrl,
            message: "Redirect user to confirmationUrl to approve charge"
        });

    } catch (error) {
        console.error("Billing Error:", error);
        return res.status(500).json({ error: "Failed to create charge" });
    }
}
