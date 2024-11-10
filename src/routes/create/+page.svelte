<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import FormButton from '$lib/components/ui/form/form-button.svelte';
	import { slide } from 'svelte/transition';

	let autoDistribution = true;
</script>

<div class="flex w-full flex-col items-center">
	<div class="w-full max-w-[1000px]">
		<div class="mt-10 flex flex-col items-center">
			<h1 class="text-3xl font-bold">Create the perfect study set.</h1>
		</div>

		<form class="mt-16 flex flex-col items-center">
			<div class="grid w-full max-w-sm items-center gap-2">
				<Label for="title">Title</Label>
				<Input id="title" placeholder="Complexity Theory" type="text" />
			</div>

			<div class="mt-10 grid w-full max-w-sm items-center gap-2">
				<Label for="files">Files</Label>
				<Input on:change={(e) => console.log(e)} id="files" type="file" />
			</div>

			<div class="my-10 grid w-full max-w-sm items-center gap-2">
				<Label>Auto Distribution</Label>
				<div class="flex items-center space-x-2">
					<Switch required={true} id="auto-distribution" bind:checked={autoDistribution} />
					<p class="text-sm leading-4 text-gray-500">
						Let our AI choose the optimal distribution of questions.
					</p>
				</div>
			</div>

			{#if !autoDistribution}
				<div class="grid w-full max-w-sm items-center gap-2" transition:slide>
					<Label>Manual Distribution</Label>
					<p class="text-sm leading-4 text-gray-500">Select your own distribution of questions.</p>

					<div class="grid grid-cols-3 gap-2">
						<div>
							<p class="mb-1 text-sm leading-4">Multiple Choice</p>
							<Input type="number" placeholder="0" max="99" />
						</div>

						<div>
							<p class="mb-1 text-sm leading-4">True/False</p>
							<Input type="number" placeholder="0" max="99" />
						</div>

						<div>
							<p class="mb-1 text-sm leading-4">Free Response</p>
							<Input type="number" placeholder="0" max="99" />
						</div>
					</div>
				</div>
			{/if}

			<div class="mt-10">
				<FormButton>Generate Set</FormButton>
			</div>
		</form>
	</div>
</div>
