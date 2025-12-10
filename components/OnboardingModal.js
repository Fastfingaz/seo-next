import { Modal, TextContainer, Card, BlockStack, Text, Button, InlineStack, Divider } from "@shopify/polaris";
import { useState } from "react";

export default function OnboardingModal({ open, onClose }) {
    // Example Placeholder Data
    const exampleData = {
        before: "Vintage wooden clock. Good condition.",
        after: "Handcrafted Vintage Wooden Wall Clock - Premium Rustic Home Decor. Excellent condition with restoration."
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Welcome to SEO Optimizer!"
            primaryAction={{
                content: "Get Started",
                onAction: onClose,
            }}
            secondaryActions={[
                {
                    content: "Help",
                    url: "mailto:support@example.com",
                    external: true
                }
            ]}
        >
            <Modal.Section>
                <BlockStack gap="500">
                    <TextContainer>
                        <Text variant="headingMd" as="h3">How it works</Text>
                        <ol>
                            <li>Select products from your dashboard and click <strong>"Rewrite"</strong>.</li>
                            <li>Review the AI-generated titles, descriptions, and meta tags.</li>
                            <li>Click <strong>"Publish"</strong> to instantly update your store.</li>
                        </ol>
                    </TextContainer>

                    <Card background="bg-surface-secondary">
                        <BlockStack gap="300">
                            <Text variant="headingSm" as="h4">See the difference:</Text>
                            <InlineStack gap="400" align="start">
                                <div style={{ flex: 1 }}>
                                    <Text fontWeight="bold" tone="critical">Before</Text>
                                    <Text variant="bodySm">{exampleData.before}</Text>
                                </div>
                                <Divider vertical />
                                <div style={{ flex: 1 }}>
                                    <Text fontWeight="bold" tone="success">After (AI Optimized)</Text>
                                    <Text variant="bodySm">{exampleData.after}</Text>
                                </div>
                            </InlineStack>
                        </BlockStack>
                    </Card>
                </BlockStack>
            </Modal.Section>
        </Modal>
    );
}
