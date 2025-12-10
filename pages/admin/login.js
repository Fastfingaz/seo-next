import { Page, Card, FormLayout, TextField, Button, TextContainer, Text } from "@shopify/polaris";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        // Mock Auth: accept any email, password 'admin'
        if (password === 'admin') {
            localStorage.setItem('admin_token', 'mock_admin_token');
            router.push('/admin');
        } else {
            alert('Invalid credentials (try password: admin)');
        }
    };

    return (
        <div style={{ padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
            <Page title="Internal Admin Login">
                <Card sectioned>
                    <FormLayout>
                        <TextContainer>
                            <Text>Please sign in to access the operator dashboard.</Text>
                        </TextContainer>
                        <TextField label="Email" value={email} onChange={setEmail} autoComplete="email" />
                        <TextField label="Password" value={password} onChange={setPassword} type="password" autoComplete="current-password" />
                        <Button primary onClick={handleLogin}>Login</Button>
                    </FormLayout>
                </Card>
            </Page>
        </div>
    );
}
