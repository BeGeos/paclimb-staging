<script>
	import Backdrop from '@components/Backdrop.svelte';

	let cardPreview = './images/hd-card-walls.svg';
</script>

<Backdrop backdropColor="#CFE4E7" opacity={0.8} />
<div class="my-16 max-w-prose mx-auto">
	<h2 class="text-center">How to Use the MAP</h2>
	<p>
		This map is in 3D. With two fingers you can explore all crags of Finale Ligure from all point of
		view. Clicking on the Climbing logo a popup will show and you can:
	</p>
	<div class="flex flex-col md:flex-row gap-4 my-8 justify-center items-center">
		<img
			src={cardPreview}
			alt="card preview about the crag"
			class="max-w-[70%] md:w-1/2 md:-translate-x-10"
		/>
		<ul class="leading-loose">
			<li class="list-none md:list-disc mb-4">
				Discover the <span class="font-bold">parking</span> to reach the crags and how to get there with
				your car
			</li>
			<li class="list-none md:list-disc mb-4">
				Find the page of the crag in the two main <span class="font-bold">guide book</span>, FINALE
				51 and FINALE climbing (VERSANTE SUD).
			</li>
			<li class="list-none md:list-disc mb-4">
				<span class="font-bold">Google the crag</span> to search for all routes and grades on different
				website
			</li>
			<li class="list-none md:list-disc mb-4">
				Discover the <span class="font-bold">hours of sunlinght on the wall</span> during all seasons.
				The calcolation was made using a 3D model of the terrain, therfore it takes in account both the
				sun position and the terrain obstacles.
			</li>
		</ul>
	</div>
	<p>
		Turning on the position you can discover where you are on the map and orient yourself in
		Satellite or Topographic map.
	</p>
	<h3 class="text-center mt-8">What about the colored roads?!</h3>
	<p>
		Like an underground all crags of FInale Ligure are reachable by seven line “Climbing Roads” and
		every stop is a parking that allow you to reach the crags on foot.
	</p>
</div>
