import AdminLayout from "../../components/admin/AdminLayout";
import { Page, Layout, Card, TextContainer, DisplayText, Grid } from "@shopify/polaris";
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
                                    <DisplayText size="medium">{data.stats.total_merchants}</DisplayText>
                                </Card>
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                                <Card sectioned title="Active Merchants">
                                    <DisplayText size="medium">{data.stats.active_merchants}</DisplayText>
                                </Card>
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                                <Card sectioned title="Jobs Today">
                                    <DisplayText size="medium">{data.stats.jobs_today}</DisplayText>
                                </Card>
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                                <Card sectioned title="System Health">
                                    <DisplayText size="medium" tone="success">{data.stats.system_health}</DisplayText>
                                </Card>
                            </Grid.Cell>
                        </Grid>
                    </Layout.Section>
                </Layout>
            </Page>
        </AdminLayout>
    );
}
