<script lang="ts">
	import { onMount } from 'svelte';

	import Card from '$lib/components/set-card/Card.svelte';
	import { token as tokenStore, user as userStore } from '$lib/stores/auth';
	import { API_HOST } from '$lib/vars';

	let fetchSetsLoading = false;
	let sets: any[] = [];

	onMount(async () => {
		fetchSetsLoading = true;
		try {
			const response = await fetch(`${API_HOST}/sets`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${$tokenStore}`,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				sets = await response.json();
			} else {
				console.error('Login failed', response.statusText);
			}
		} catch (error) {
			console.error('Error during fetch', error);
		} finally {
			fetchSetsLoading = false;
		}
	});
</script>

<div class="flex flex-col items-center">
	<div class="w-full max-w-[1300px]">
		<div class="mt-8 flex flex-col gap-2">
			<h1 class="text-3xl font-bold">Welcome back{$userStore ? ` ${$userStore.name}.` : '.'}</h1>
			<h2 class="text-lg font-medium">What will you study today?</h2>
		</div>

		<h1 class="mt-32 text-lg">Your sets</h1>
		<div class="h-[1px] w-full border border-solid border-black"></div>

		<div class="mt-8 flex w-full flex-col items-center">
			<div class="flex max-w-[1300px] flex-wrap gap-x-8 gap-y-8">
				{#if fetchSetsLoading}
					<div class="flex h-96 w-full flex-col items-center justify-center">
						<div
							class="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"
						></div>
					</div>
				{:else if sets.length === 0}
					<div class="flex w-full flex-col items-center justify-center">
						<p class="text-lg">You don't have any sets yet.</p>
					</div>
				{:else}
					{#each sets as set}
						<Card title={set.title} numQuestions={set.cardCount} lastStudied={new Date()} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
