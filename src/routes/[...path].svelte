<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { http_404 } from '@http/status';

	export const load: Load = ({ params }) => {
		return {
			status: http_404.status,
			error: new Error(`Not found: /${params.path}`)
		};
	};
</script>
