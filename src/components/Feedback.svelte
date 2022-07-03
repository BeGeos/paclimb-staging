<script lang="ts">
	import FeedbackForm from '@components/FeedbackForm.svelte';
	import Footer from '@components/Footer.svelte';
	let illustration: string = './images/reviews_illustration.svg';
</script>

<main class="my-8">
	<h2>Let us know what you think</h2>
	<div class="flex gap-6 flex-wrap-reverse">
		<div class="opacity-60 flex-1">
			<p>
				This is a collaborative project made by climbers for climbers and we would love to have your
				feedback as to what you think about this website.
			</p>
			<p>
				It's still a work in progress so with your comments you can help us improve this even more.
			</p>
			<p>
				Make sure to fill the form below, it just takes a couple of minutes, but most importantly
				keep on rocking
			</p>
		</div>
		<img src={illustration} alt="fill the feedback form, illustration" />
	</div>
	<FeedbackForm />
</main>
<Footer />
