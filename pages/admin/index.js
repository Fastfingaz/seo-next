import AdminLayout from "../../components/admin/AdminLayout";
import { Page, Layout, Card, TextContainer, Text, Grid } from "@shopify/polaris";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/admin/data').then(res => res.json()).then(setData);
    }, []);

    if (!data) return <AdminLayout><Page title="Overview">Loading...</Page></AdminLayout>;

    return (
        <AdminLayout>
            <Page title="Admin Overview">
                <Layout>
                    <Layout.Section>
                        <Grid>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                                <Card sectioned title="Total Merchants">
                                    <Text variant="headingLg" as="p">{data.stats.total_merchants}</Text>
                                </Card>
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                                <Card sectioned title="Active Merchants">
                                    <Text variant="headingLg" as="p">{data.stats.active_merchants}</Text>
                                </Card>
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                                <Card sectioned title="Jobs Today">
                                    <Text variant="headingLg" as="p">{data.stats.jobs_today}</Text>
                                </Card>
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                                <Card sectioned title="System Health">
                                    <Text variant="headingLg" as="p" tone="success">{data.stats.system_health}</Text>
                                </Card>
                            </Grid.Cell>
                        </Grid>
                    </Layout.Section>
                </Layout>
            </Page>
        </AdminLayout>
    );
}
