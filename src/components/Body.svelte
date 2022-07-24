<script lang="ts">
	import Footer from '@components/Footer.svelte';
	import Hero from '@components/Hero.svelte';
	import HowToSection from '@components/sections/howToSection.svelte';
	import Map from '@components/Map.svelte';
	import PreviewSection from '@components/sections/PreviewSection.svelte';
	import Section from '@components/Section.svelte';

	let visible: boolean = false;

	const handleOpenMap = () => {
		visible = !visible;
	};
</script>

<!-- TODO modular system for maps, provide config files to init map -->
<Map
	lat={44.178981}
	lon={8.34119}
	zoom={11.4}
	pitch={51.01}
	bearing={-19.18}
	{visible}
	on:returnHome={handleOpenMap}
/>

<Hero on:openMap={handleOpenMap} visible={!visible} />
<Section id="how-to" position={'relative'}>
	<HowToSection />
</Section>
<Section id="print-preview" position={'relative'}>
	<PreviewSection />
</Section>
<Footer />
