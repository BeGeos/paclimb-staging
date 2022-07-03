<script lang="ts">
	let formActionEmail: string = 'https://www.actionforms.io/e/r/paclim-3d-map';
</script>

<form action={formActionEmail} method="POST" class="flex flex-col gap-6 my-16">
	<h3>Feedback Form - PAClimb</h3>
	<div class="form-row">
		<label for="question-1" class="font-bold">Which feature did you find most useful?</label>

		<select name="question-1" class="border border-black/40 rounded-md p-2">
			<option value="none">-----</option>
			<option value="parkings">Parkings</option>
			<option value="sunlight">Hours of sunlight</option>
			<option value="google-it">Google it</option>
			<option value="pages-to-guides">Pages to guides</option>
		</select>
	</div>
	<div class="form-row">
		<label for="question-2" class="font-bold"
			>Have you tried and use it in Finale to find crags?</label
		>

		<select name="question-2" class="border border-black/40 rounded-md p-2">
			<option value="none">------</option>
			<option value="yes">Yes</option>
			<option value="no">No</option>
		</select>
	</div>
	<div class="form-row">
		<label for="question-3" class="font-bold"
			>Did you find any spelling mistake? if yes, where?</label
		>
		<input
			type="text"
			name="question-3"
			maxlength={250}
			class="border border-black/40 rounded-md p-2"
		/>
	</div>
	<div class="form-row">
		<label for="question-4" class="font-bold"
			>Were you able to find crags you didn't know about?</label
		>
		<select name="question-4" class="border border-black/40 rounded-md p-2">
			<option value="none">-----</option>
			<option value="yes">Yes</option>
			<option value="no">No</option>
		</select>
	</div>
	<div class="form-row">
		<label for="question-5" class="font-bold">What feature would you like to have here?</label>
		<input
			type="text"
			name="question-5"
			maxlength={250}
			class="border border-black/40 rounded-md p-2"
		/>
	</div>
	<div class="form-row">
		<label for="question-feedback" class="font-bold"
			>General feedback - give it a thought and write it in less than 1000 characters</label
		>
		<textarea
			name="question-feedback"
			cols="30"
			rows="10"
			class="border border-black/40 rounded-md p-2 max-h-56"
			placeholder="Write here in English or Scrivi in italiano "
			maxlength={1000}
		/>
	</div>
	<button
		class="bg-sky-blue p-4 font-bold text-white font-base cursor-pointer rounded-md hover:-translate-y-1 hover:shadow-lg transition-all"
		>Send Feedback</button
	>
</form>

<style>
	.form-row {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
</style>
