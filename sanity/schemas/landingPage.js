export default {
    name: "landingPage",
    title: "Landing Page",
    type: "document",
    fields: [
        {
            name: "siteMeta",
            title: "Site Metadata",
            type: "object",
            fields: [
                { name: "title", title: "Page Title", type: "string" },
                { name: "description", title: "Meta Description", type: "text" },
                { name: "ogImage", title: "OG Image", type: "image" }
            ]
        },
        {
            name: "hero",
            title: "Hero Section",
            type: "object",
            fields: [
                { name: "headline", title: "Headline", type: "string" },
                { name: "subheadline", title: "Subheadline", type: "text" },
                { name: "ctaPrimary", title: "Primary CTA Label", type: "string" },
                { name: "ctaSecondary", title: "Secondary CTA Label", type: "string" },
                { name: "heroImage", title: "Hero Image", type: "image" }
            ]
        },
        {
            name: "features",
            title: "Features / Benefits",
            type: "array",
            of: [{
                type: "object",
                fields: [
                    { name: "title", title: "Title", type: "string" },
                    { name: "description", title: "Description", type: "text" },
                    { name: "icon", title: "Icon (Emoji or SVG Name)", type: "string" }
                ]
            }]
        },
        {
            name: "beforeAfter",
            title: "Before & After Example",
            type: "object",
            fields: [
                { name: "productName", title: "Product Name", type: "string" },
                { name: "beforeText", title: "Before Text", type: "text" },
                { name: "afterTitle", title: "After Title", type: "string" },
                { name: "afterDescription", title: "After Description", type: "text" },
                { name: "afterMeta", title: "After Meta", type: "string" }
            ]
        },
        {
            name: "pricing",
            title: "Pricing Plans",
            type: "array",
            of: [{
                type: "object",
                fields: [
                    { name: "tier", title: "Tier Name", type: "string" },
                    { name: "price", title: "Price", type: "string" },
                    { name: "features", title: "Feature List", type: "array", of: [{ type: "string" }] },
                    { name: "popular", title: "Is Popular?", type: "boolean" }
                ]
            }]
        },
        {
            name: "faq",
            title: "Frequently Asked Questions",
            type: "array",
            of: [{
                type: "object",
                fields: [
                    { name: "question", title: "Question", type: "string" },
                    { name: "answer", title: "Answer", type: "text" }
                ]
            }]
        },
        {
            name: "screenshots",
            title: "App Screenshots",
            type: "array",
            of: [{ type: "image" }]
        }
    ]
}
