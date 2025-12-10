const jobs = {};

export default function handler(req, res) {
    // POST: Enqueue a new job
    if (req.method === 'POST') {
        const { productIds } = req.body;

        if (!productIds || !Array.isArray(productIds)) {
            return res.status(400).json({ error: "Missing or invalid productIds array" });
        }

        const jobId = "job_" + Date.now();
        jobs[jobId] = { status: "queued", progress: 0, total: productIds.length, created_at: new Date() };

        // Simulate async processing
        setTimeout(() => { jobs[jobId].status = "processing"; jobs[jobId].progress = Math.floor(productIds.length / 2); }, 3000);
        setTimeout(() => { jobs[jobId].status = "completed"; jobs[jobId].progress = productIds.length; }, 6000);

        return res.status(202).json({
            success: true,
            jobId,
            message: `Enqueued ${productIds.length} products`,
            statusUrl: `/api/bulk-rewrite?jobId=${jobId}`
        });
    }

    // GET: Check job status
    if (req.method === 'GET') {
        const { jobId } = req.query;
        const job = jobs[jobId];

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        return res.status(200).json({ jobId, ...job });
    }

    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
