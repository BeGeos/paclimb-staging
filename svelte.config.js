import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		files: {
			hooks: 'src/http/hooks'
		},
		vite: {
			resolve: {
				alias: {
					'@components': path.resolve('./src/components'),
					'@utils': path.resolve('./src/utils'),
					'@stores': path.resolve('./src/stores'),
					'@http': path.resolve('./src/http'),
					'@log': path.resolve('./src/logger'),
					'@redis': path.resolve('./src/http/redis'),
					'@hooks': path.resolve('./src/http/hooks'),
					'@types': path.resolve('./src/types')
				}
			}
		}
	}
};

export default config;
