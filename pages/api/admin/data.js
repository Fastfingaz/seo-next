export default function handler(req, res) {
    // Mock Data
    const stats = {
        total_merchants: 125,
        active_merchants: 98,
        jobs_today: 450,
        failed_jobs: 2,
        system_health: "Healthy"
    };

    const merchants = [
        { id: "1", name: "Cool Store", domain: "cool-store.myshopify.com", plan: "Growth", usage: 850, last_active: "2 mins ago" },
        { id: "2", name: "Vintage Shop", domain: "vintage-shop.myshopify.com", plan: "Starter", usage: 120, last_active: "1 hour ago" },
        { id: "3", name: "Tech Gadgets", domain: "tech-gadgets.myshopify.com", plan: "Scale", usage: 2500, last_active: "5 mins ago" },
    ];

    const jobs = [
        { id: "j_101", store: "Cool Store", type: "rewrite", status: "completed", created_at: "2025-12-10T10:00:00Z" },
        { id: "j_102", store: "Vintage Shop", type: "bulk_rewrite", status: "processing", created_at: "2025-12-10T10:05:00Z" },
        { id: "j_103", store: "Tech Gadgets", type: "rewrite", status: "failed", error: "Timeout", created_at: "2025-12-10T10:10:00Z" },
    ];

    res.status(200).json({ stats, merchants, jobs });
}
