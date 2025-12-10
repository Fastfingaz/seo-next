export default function handler(req, res) {
    if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    res.setPreviewData({});
    res.writeHead(307, { Location: '/' });
    res.end();
}
