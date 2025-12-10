import AdminLayout from "../../../components/admin/AdminLayout";
import { Page, Layout, Card, IndexTable, useIndexResourceState, Text, Badge } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MerchantsList() {
    const [merchants, setMerchants] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/admin/data').then(res => res.json()).then(data => setMerchants(data.merchants));
    }, []);

    const resourceName = { singular: 'merchant', plural: 'merchants' };
    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(merchants);

    const rowMarkup = merchants.map(
        ({ id, name, domain, plan, usage, last_active }, index) => (
            <IndexTable.Row key={id} id={id} position={index} selected={selectedResources.includes(id)}>
                <IndexTable.Cell>
                    <Text fontWeight="bold" as="span"><a onClick={() => router.push(`/admin/merchants/${id}`)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{name}</a></Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{domain}</IndexTable.Cell>
                <IndexTable.Cell><Badge tone="info">{plan}</Badge></IndexTable.Cell>
                <IndexTable.Cell>{usage}</IndexTable.Cell>
                <IndexTable.Cell>{last_active}</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    return (
        <AdminLayout>
            <Page title="Merchants">
                <Layout>
                    <Layout.Section>
                        <Card>
                            <IndexTable
                                resourceName={resourceName}
                                itemCount={merchants.length}
                                selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                                onSelectionChange={handleSelectionChange}
                                headings={[
                                    { title: 'Store Name' },
                                    { title: 'Domain' },
                                    { title: 'Plan' },
                                    { title: 'Usage' },
                                    { title: 'Last Activity' },
                                ]}
                            >
                                {rowMarkup}
                            </IndexTable>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </AdminLayout>
    );
}
