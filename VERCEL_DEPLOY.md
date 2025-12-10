# Vercel Deployment Steps

*   **Push to Git**: Commit your code and push to GitHub, GitLab, or Bitbucket.
*   **Import Project**: Go to Vercel Dashboard > "Add New..." > Project > Import your repo.
*   **Configure Build**:
    *   Framework Preset: `Next.js` (detected automatically)
    *   Root Directory: `./seo-next` (Important: since app is in subdirectory)
    *   Build Command: `npm run build`
    *   Output Directory: `.next`
*   **Environment Variables**: Add the following in Vercel Project Settings > Environment Variables:
    *   `SHOPIFY_API_KEY`: (Your Client ID)
    *   `SHOPIFY_API_SECRET`: (Your Client Secret)
    *   `HOST`: `https://your-project-name.vercel.app`
    *   `SCOPES`: `read_products,write_products`
*   **Custom Domain**: Go to Settings > Domains > Add your custom domain (e.g., `app.example.com`). Follow DNS content instructions.
