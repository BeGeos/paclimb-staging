import fs from 'fs';
import path from 'path';

const sitemap = path.join('src', 'sitemap.xml');

export async function get() {
	try {
		const data = fs.readFileSync(sitemap, 'utf8');
		const headers = {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		};
		return {
			headers,
			body: data
		};
	} catch (e) {
		return {
			body: 'Error'
		};
	}
}
