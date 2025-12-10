export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { title, body_html } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Missing title' });
    }

    // Mock AI Rewriting Logic with length constraints
    const cleanBody = body_html ? body_html.replace(/<[^>]*>/g, '') : '';

    const responseData = {
        title: `[SEO] ${title} - Premium Quality`,
        short_description: `Discover the best ${title}. High quality and durable.`,
        long_description: `<p><strong>${title}</strong> is an excellent choice for your needs.</p><p>${cleanBody.substring(0, 100)}...</p><p>Features include premium materials and modern design.</p>`,
        meta_title: `${title} | Shop Now`, // keep under 60
        meta_description: `Buy ${title} today. Top rated quality and free shipping available on all orders.` // keep under 160
    };

    // Enforce rigid length checks for demonstration/testing
    if (responseData.meta_title.length > 60) responseData.meta_title = responseData.meta_title.substring(0, 57) + "...";
    if (responseData.meta_description.length > 160) responseData.meta_description = responseData.meta_description.substring(0, 157) + "...";

    res.status(200).json(responseData);
}
