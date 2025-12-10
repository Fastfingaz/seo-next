# Sanity Webhook & Preview Setup

## 1. Vercel Deploy Webhook
*   Go to **Vercel Dashboard** > Settings > Git > Deploy Hooks.
*   Create new hook: Name `Sanity Publish`, Branch `main`.
*   Copy the URL (e.g., `https://api.vercel.com/v1/integrations/deploy/prj_...`).

## 2. Sanity Webhook Config
*   Go to **Sanity Manage** (manage.sanity.io) > Settings > API > Webhooks.
*   Create Webhook:
    *   **Name**: `Vercel Rebuild`
    *   **URL**: Paste Vercel Hook URL.
    *   **Trigger**: Create, Update, Delete.
    *   **Filter**: `_type == "landingPage"`

## 3. Next.js Preview Mode Route
Create `pages/api/preview.js`:

```javascript
export default function handler(req, res) {
  // 1. Check secret to prevent open access
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // 2. Enable Preview Mode
  res.setPreviewData({});

  // 3. Redirect to the path to preview
  res.writeHead(307, { Location: '/' });
  res.end();
}
```

## 4. Exit Preview Route
Create `pages/api/exit-preview.js`:

```javascript
export default function handler(req, res) {
  res.clearPreviewData();
  res.writeHead(307, { Location: '/' });
  res.end();
}
```
