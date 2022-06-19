import adapter from '@sveltejs/adapter-auto';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'@components': path.resolve('./src/components'),
					'@utils': path.resolve('./src/utils'),
					'@stores': path.resolve('./src/stores'),
					'@http': path.resolve('./src/http')
				}
			}
		}
	}
};

export default config;
