<script context="module">
	import { http_404 } from '@http/status';

	/** @type {import('./__types/[...path]').Load} */
	export function load({ params }) {
		return {
			status: http_404.status,
			error: new Error(`Not found: /${params.path}`)
		};
	}
</script>
