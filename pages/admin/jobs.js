import AdminLayout from "../../components/admin/AdminLayout";
import { Page, Layout, Card, IndexTable, useIndexResourceState, Badge, Button, Filters, TextField } from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";

export default function JobsExplorer() {
    const [jobs, setJobs] = useState([]);
    const [queryValue, setQueryValue] = useState('');

    useEffect(() => {
        fetch('/api/admin/data').then(res => res.json()).then(data => setJobs(data.jobs));
    }, []);

    const resourceName = { singular: 'job', plural: 'jobs' };

    // Filter Logic
    const filteredJobs = jobs.filter((job) => {
        return job.store.toLowerCase().includes(queryValue.toLowerCase()) || job.id.includes(queryValue);
    });

    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(filteredJobs);

    const handleRerun = (id) => {
        alert(`Rerunning job ${id}...`);
        // In real app: POST /api/admin/jobs/rerun { id }
    };

    const rowMarkup = filteredJobs.map(
        ({ id, store, type, status, error, created_at }, index) => (
            <IndexTable.Row key={id} id={id} position={index} selected={selectedResources.includes(id)}>
                <IndexTable.Cell>{id}</IndexTable.Cell>
                <IndexTable.Cell>{store}</IndexTable.Cell>
                <IndexTable.Cell>{type}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Badge tone={status === 'completed' ? 'success' : status === 'failed' ? 'critical' : 'attention'}>
                        {status}
                    </Badge>
                </IndexTable.Cell>
                <IndexTable.Cell>{error || '-'}</IndexTable.Cell>
                <IndexTable.Cell>{new Date(created_at).toLocaleTimeString()}</IndexTable.Cell>
                <IndexTable.Cell>
                    {status === 'failed' && <Button size="slim" onClick={() => handleRerun(id)}>Rerun</Button>}
                </IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    const handleQueryValueChange = useCallback((value) => setQueryValue(value), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
    const handleClearAll = useCallback(() => { handleQueryValueRemove(); }, [handleQueryValueRemove]);

    const filters = [
        {
            key: 'query',
            label: 'Search',
            filter: (
                <TextField
                    label="Search"
                    value={queryValue}
                    onChange={handleQueryValueChange}
                    autoComplete="off"
                    labelHidden
                    placeholder="Search by store or job ID"
                />
            ),
            shortcut: true,
        }
    ];

    return (
        <AdminLayout>
            <Page title="Jobs Explorer">
                <Layout>
                    <Layout.Section>
                        <Card>
                            <Filters
                                queryValue={queryValue}
                                filters={[]}
                                appliedFilters={[]}
                                onQueryChange={handleQueryValueChange}
                                onQueryClear={handleQueryValueRemove}
                                onClearAll={handleClearAll}
                            />
                            <IndexTable
                                resourceName={resourceName}
                                itemCount={filteredJobs.length}
                                selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                                onSelectionChange={handleSelectionChange}
                                headings={[
                                    { title: 'Job ID' },
                                    { title: 'Store' },
                                    { title: 'Type' },
                                    { title: 'Status' },
                                    { title: 'Error' },
                                    { title: 'Created At' },
                                    { title: 'Actions' },
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
