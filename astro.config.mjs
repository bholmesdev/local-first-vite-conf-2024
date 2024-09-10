// @ts-check
import { defineConfig } from 'astro/config';
import icons from 'unplugin-icons/vite';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind()],
	vite: {
		plugins: [
			icons({
				compiler: 'astro'
			}),
			{
				name: 'configure-response-headers',
				configureServer: (server) => {
					server.middlewares.use((_req, res, next) => {
						res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
						res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
						next();
					});
				}
			}
		],
		optimizeDeps: {
			exclude: ['sqlocal']
		}
	}
});
