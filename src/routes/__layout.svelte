<script context="module">
	export const load = async () => {
		return {
			props: {
				env: import.meta.env.VITE_ENVIRONMENT
			}
		};
	};
</script>

<script>
	import '../app.css';
	import Nav from '@components/Nav.svelte';

	export let env;
</script>

<svelte:head>
	<meta
		name="description"
		content="PaClimb is a 3D interactive map that enable you to explore all the crags in Finale Ligure in a more detailed way, and give a precise and easier overview of the area."
	/>
	<meta property="og:title" content="PaClimb 3D Map" />
	<meta
		property="og:description"
		content="Leave us a feedback. As climbers we feel the need to find crags in the easiest way. PaClimb 3D Map enables you to get at the crags thanks to its powerful 3D map and interactivity which really brings you into Finale Ligure crag climbing"
	/>
	<meta property="og:url" content="/" />
	<meta property="og:type" content="website" />
	<meta property="og:image" itemprop="image" content="./images/blue-preview-link.png" />

	{#if env === 'prod'}
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-KME9KDHHJB"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'G-KME9KDHHJB');
		</script>
	{/if}
</svelte:head>

<Nav />
<slot />
