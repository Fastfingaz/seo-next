import { useState, useEffect } from "react";
import { Page, Layout, Card, Select, Button, TextContainer, TextField, Banner, Stack, ButtonGroup } from "@shopify/polaris";

export default function RewritePage() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // Fetch products on load
    useEffect(() => {
        fetch("/api/products", { headers: { Authorization: "Bearer mock_token" } })
            .then(res => res.json())
            .then(data => {
                if (data.products) {
                    setProducts(data.products.map(p => ({ label: p.title, value: p.id.toString(), ...p })));
                    if (data.products.length > 0) setSelectedProductId(data.products[0].id.toString());
                }
            })
            .catch(err => console.error("Failed to load products", err));
    }, []);

    const handleRewrite = async () => {
        setLoading(true);
        setResult(null);
        const product = products.find(p => p.value === selectedProductId);

        try {
            const res = await fetch("/api/rewrite-product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: product.label, body_html: "<p>Mock body content</p>" })
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error("Rewrite failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = () => {
        console.log("Accepted changes:", result);
        alert("Changes accepted! (See console)");
        setResult(null);
    };

    return (
        <Page title="Rewrite Product Content">
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <TextContainer>
                            <Select
                                label="Select Product"
                                options={products}
                                onChange={setSelectedProductId}
                                value={selectedProductId}
                            />
                            <Button primary onClick={handleRewrite} loading={loading} disabled={!selectedProductId}>
                                Rewrite Content
                            </Button>
                        </TextContainer>
                    </Card>

                    {result && (
                        <Card title="AI Verification" sectioned>
                            <TextContainer>
                                <Banner status="success">AI Optimization Complete</Banner>
                                <TextField label="New Title" value={result.title} readOnly autoComplete="off" />
                                <TextField label="Meta Title" value={result.meta_title} readOnly autoComplete="off" />
                                <TextField label="Meta Description" value={result.meta_description} readOnly multiline={2} autoComplete="off" />

                                <div style={{ marginTop: "1rem" }}>
                                    <ButtonGroup>
                                        <Button primary onClick={handleAccept}>Accept</Button>
                                        <Button destructive onClick={() => setResult(null)}>Reject</Button>
                                    </ButtonGroup>
                                </div>
                            </TextContainer>
                        </Card>
                    )}
                </Layout.Section>
            </Layout>
        </Page>
    );
}
