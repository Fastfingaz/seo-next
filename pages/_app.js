import { AppProvider } from "@shopify/polaris";
import "../styles.css";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";

export default function App({ Component, pageProps }) {
    return (
        <AppProvider i18n={translations}>
            <Component {...pageProps} />
        </AppProvider>
    );
}
