import { Frame, Navigation, TopBar } from "@shopify/polaris";
import { HomeIcon, PersonIcon, WorkIcon, ExitIcon } from "@shopify/polaris-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

    useEffect(() => {
        // Simple mock auth check
        if (!typeof window !== 'undefined' && !localStorage.getItem('admin_token')) {
            router.push('/admin/login');
        }
    }, []);

    const toggleMobileNavigationActive = () =>
        setMobileNavigationActive((active) => !active);

    const navigationMarkup = (
        <Navigation location={router.pathname}>
            <Navigation.Section
                items={[
                    {
                        label: 'Overview',
                        icon: HomeIcon,
                        onClick: () => router.push('/admin'),
                        selected: router.pathname === '/admin',
                    },
                    {
                        label: 'Merchants',
                        icon: PersonIcon,
                        onClick: () => router.push('/admin/merchants'),
                        selected: router.pathname.startsWith('/admin/merchants'),
                    },
                    {
                        label: 'Jobs Explorer',
                        icon: WorkIcon,
                        onClick: () => router.push('/admin/jobs'),
                        selected: router.pathname === '/admin/jobs',
                    },
                    {
                        label: 'Logout',
                        icon: ExitIcon,
                        onClick: () => {
                            localStorage.removeItem('admin_token');
                            router.push('/admin/login');
                        },
                    }
                ]}
            />
        </Navigation>
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            onNavigationToggle={toggleMobileNavigationActive}
        />
    );

    return (
        <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
        >
            {children}
        </Frame>
    );
}
