/**
 * SECRETS VAULT ABSTRACTION
 * In production, replace `process.env` with a call to a real secrets manager 
 * (e.g., AWS Secrets Manager, HashiCorp Vault, Google Secret Manager).
 */

export async function getSecret(key) {
    // 1. Try environment variable
    const value = process.env[key];

    if (value) return value;

    // 2. (Optional) Fail safe or throw error if critical
    const defaults = {
        'SHOPIFY_API_SECRET': 'mock_secret_for_dev_only', // WARN: Never mock in prod
        'AES_ENCRYPTION_KEY': 'mock_key_32_chars_long___________'
    };

    if (process.env.NODE_ENV !== 'production' && defaults[key]) {
        console.warn(`[Vault] Warning: Using insecure default for ${key}`);
        return defaults[key];
    }

    throw new Error(`[Vault] Secret ${key} not found.`);
}
