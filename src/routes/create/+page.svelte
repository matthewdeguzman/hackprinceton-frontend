<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import FormButton from '$lib/components/ui/form/form-button.svelte';
	import { slide } from 'svelte/transition';

	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import { goto } from '$app/navigation';
	import { token as tokenStore } from '$lib/stores/auth';
	import { API_HOST } from '$lib/vars';

	let autoDistribution = true;
	let createLoading = false;

	let name = '';
	let description = '';
	let file: File | null = null;

	let mcCount = 5;
	let tfCount = 5;
	let normalCount = 5;

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		if (!file) return;
		createLoading = true;

		const formData = new FormData();

		formData.append('file', file);

		let metadata = {
			name,
			description,
			options: {
				tfCount: autoDistribution ? -1 : tfCount,
				mcCount: autoDistribution ? -1 : mcCount,
				normalCount: autoDistribution ? -1 : normalCount
			}
		};

		formData.append('metadata', JSON.stringify(metadata));

		try {
			const response = await fetch(`${API_HOST}/sets`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${$tokenStore}`
				},
				body: formData
			});

			if (response.ok) {
				const result = await response.json();
				const { setId } = result;
				goto(`/set/${setId}`);
			} else {
				console.error('Login failed', response.statusText);
			}
		} catch (error) {
			console.error('Error during fetch', error);
		} finally {
			createLoading = false;
		}
	};
</script>

<div class="flex w-full flex-col items-center">
	<div class="w-full max-w-[1000px]">
		<div class="mt-10 flex flex-col items-center">
			<h1 class="text-3xl font-bold">Create the perfect study set.</h1>
		</div>

		<form class="mt-16 flex flex-col items-center" on:submit={handleSubmit}>
			<div class="grid w-full max-w-sm items-center gap-2">
				<Label for="name">Title</Label>
				<Input bind:value={name} id="name" placeholder="Complexity Theory" type="text" />
			</div>

			<div class="mt-10 grid w-full max-w-sm items-center gap-2">
				<Label for="description">Description</Label>
				<Input
					bind:value={description}
					id="description"
					placeholder="Complex Problems in Computer Science"
					type="text"
				/>
			</div>

			<div class="mt-10 grid w-full max-w-sm items-center gap-2">
				<Label for="files">Files</Label>
				<Input
					class="pt-1.5"
					id="files"
					type="file"
					on:change={(e) => (file = e.target.files[0])}
				/>
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
							<Input bind:value={mcCount} type="number" placeholder="0" max="99" />
						</div>

						<div>
							<p class="mb-1 text-sm leading-4">True/False</p>
							<Input bind:value={tfCount} type="number" placeholder="0" max="99" />
						</div>

						<div>
							<p class="mb-1 text-sm leading-4">Free Response</p>
							<Input bind:value={normalCount} type="number" placeholder="0" max="99" />
						</div>
					</div>
				</div>
			{/if}

			<div class="mt-10">
				<FormButton type="submit">
					<div class="flex items-center gap-2">
						{#if createLoading}
							<p>Generating...</p>
							<LoaderCircle class="h-4 w-4 animate-spin text-white" />
						{:else}
							<p>Generate Set</p>
						{/if}
					</div>
				</FormButton>
			</div>
		</form>
	</div>
</div>
