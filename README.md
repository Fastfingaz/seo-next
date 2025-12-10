# SEO Optimizer (Next.js)

## Installation
1. Run `npm install next react react-dom @shopify/polaris`
2. Run `npm run dev`

## Configuration
Add your API keys to a `.env.local` file:
`SHOPIFY_API_KEY=your_key_here`
`SHOPIFY_API_SECRET=your_secret_here`

## Sanity Test
Run this command to verify the file structure:

## Deploy Checklist (Shopify App Store)

1. **Hosting**: Deploy this Next.js app to a provider (e.g., Vercel, Heroku, or Fly.io).
2. **Environment Variables**: Set `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `HOST` (your deployed URL), and `SCOPES` on your production server.
3. **App Configuration**: Update your "App URL" and "Allowed redirection URL(s)" in the Shopify Partner Dashboard to match your deployed domain (replace `localhost:3000`).
4. **GDPR Webhooks**: Ensure you have implemented the mandatory `customers/data_request`, `customers/redact`, and `shop/redact` webhooks (required for public apps).
5. **Listing & Submission**: Complete your App Listing in the Partner Dashboard (Assets, Description, Pricing) and click "Submit for Review".

## Compliance & Privacy
- **GDPR**: This app exposes `/api/gdpr/redact` to handle `customers/redact` and `shop/redact` webhooks.
- **Data Export**: The same endpoint handles `customers/data_request`. Ensure you email the data to the merchant payload email.
