import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

createInertiaApp({
    title: (title) => {
        const currentPage = document.getElementById('app')?.getAttribute('data-page');
        let appName = import.meta.env.VITE_APP_NAME || 'Laravel';

        if (currentPage) {
            try {
                const pageData = JSON.parse(currentPage);
                if (pageData.props?.siteSettings?.site_title) {
                    appName = pageData.props.siteSettings.site_title;
                }
            } catch (e) {
                // Fallback to env variable if parsing fails
            }
        }

        return `${title} - ${appName}`;
    },
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <I18nextProvider i18n={i18n}>
                <App {...props} />
            </I18nextProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
