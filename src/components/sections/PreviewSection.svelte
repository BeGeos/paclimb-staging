<script lang="ts">
	import Backdrop from '@components/Backdrop.svelte';

	let previewImage: string = './images/preview-map-to-download.png';
</script>

<Backdrop backdropColor="#CFE4E7" opacity={0.8} />
<div class="max-w-prose mx-auto text-center">
	<h2>Print a Preview of the Map</h2>
	<p>
		With the QR code in your <strong>guides book</strong> you will have the interactive map always at
		hand.
	</p>
	<img src={previewImage} alt="preview of the map" class="mx-auto mb-4 border-8 border-white" />

	<a href="./assets/PACLIMB_A4MAP.pdf" download>
		<button
			class="rounded-lg cursor-pointer py-3 px-8 bg-sky-blue max-w-full text-white transition ease-in-out hover:-translate-y-1 hover:shadow-xl"
			>Download Preview</button
		>
	</a>
</div>
