import fs from 'fs';
import path from 'path';

const robotsTxtPath = path.join('src', 'robots.txt');

export async function get() {
	try {
		const data = fs.readFileSync(robotsTxtPath, 'utf-8');
		const headers = {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'text/plain'
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
