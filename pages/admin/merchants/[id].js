import AdminLayout from "../../../components/admin/AdminLayout";
import { Page, Layout, Card, BlockStack, Text, DescriptionList, Badge, Banner } from "@shopify/polaris";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MerchantDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [merchant, setMerchant] = useState(null);

    useEffect(() => {
        if (!id) return;
        fetch('/api/admin/data').then(res => res.json()).then(data => {
            const found = data.merchants.find(m => m.id === id);
            setMerchant(found);
        });
    }, [id]);

    if (!merchant) return <AdminLayout><Page title="Details">Loading...</Page></AdminLayout>;

    return (
        <AdminLayout>
            <Page
                title={merchant.name}
                breadcrumbs={[{ content: 'Merchants', url: '/admin/merchants' }]}
                badge={<Badge tone="info">{merchant.plan}</Badge>}
            >
                <Layout>
                    <Layout.Section>
                        <Card title="Store Information" sectioned>
                            <DescriptionList
                                items={[
                                    { term: 'Domain', description: merchant.domain },
                                    { term: 'Plan Tier', description: merchant.plan },
                                    { term: 'Current Usage', description: `${merchant.usage} requests` },
                                    { term: 'Last Active', description: merchant.last_active }
                                ]}
                            />
                        </Card>
                        <div style={{ marginTop: '20px' }}></div>
                        <Card title="Recent Activity" sectioned>
                            <Banner status="info">No recent errors found for this merchant.</Banner>
                            <div style={{ marginTop: '10px' }}>
                                <Text>Showing last 5 jobs...</Text>
                            </div>
                        </Card>
                    </Layout.Section>
                    <Layout.Section variant="oneThird">
                        <Card title="Actions" sectioned>
                            <p>Manage subscription or ban store.</p>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </AdminLayout>
    );
}
