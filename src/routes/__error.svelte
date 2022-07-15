<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }) {
		return {
			props: {
				error,
				status
			}
		};
	}
</script>

<script>
	export let error;
	export let status;

	let debug = import.meta.env.VITE_DEBUG === 'true';
</script>

<div class="min-w-full min-h-full flex flex-col gap-2 p-12">
	{#if debug}
		<h4>Status: {status}</h4>
		<h4>Error: {error.message}</h4>
		<h4>Stack: {error.stack}</h4>
	{:else}
		<h1 class="text-4xl font-bold text-center">{status} - {error.message}</h1>
	{/if}
</div>
