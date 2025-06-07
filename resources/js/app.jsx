import '../css/app.css';
import './bootstrap';
import { Ziggy } from "./ziggy";
import { route } from 'ziggy-js';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Pass route and Ziggy as props so they are available in all pages/components
        root.render(<App {...props} route={route} ziggy={Ziggy} />);
    },
    progress: {
        color: '#4B5563',
    },
});
