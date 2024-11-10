<script lang="ts">
	import { onMount } from 'svelte';

	import FlashCard from '$lib/components/cards/FlashCard.svelte';
	import type { Card } from '$lib/types/sets';

	import { token as tokenStore } from '$lib/stores/auth';

	const informationalCards: Card[] = [
		{
			id: '1',
			front: 'What is Saiki?',
			back: 'Saiki is a generative AI solution that creates flash cards for you.',
			set_id: '1'
		},
		{
			id: '2',
			front: 'Who can use Saiki?',
			back: 'Anyone! Saiki is designed to help you study smarter, not harder.',
			set_id: '1'
		},
		{
			id: '3',
			front: 'How does Saiki work?',
			back: 'Saiki uses generative AI to create flash cards from your notes.',
			set_id: '1'
		},
		{
			id: '4',
			front: 'What does Saiki mean?',
			back: 'Saiki is Japanese for "talent" or "genius" which you will become after using it!',
			set_id: '1'
		}
	];

	let isFlipped = $state(false);
	let activeCardIdx = $state(0);
	let goLeft = $state(true);

	function flipForward(moveToNext: boolean) {
		isFlipped = false;
		if (moveToNext) {
			setTimeout(nextCard, 600);
		} else {
			setTimeout(flipBackward, 600);
		}
	}

	function flipBackward() {
		isFlipped = true;
		setTimeout(() => flipForward(true), 3500);
	}

	function nextCard() {
		activeCardIdx = (activeCardIdx + 1) % informationalCards.length;
		setTimeout(() => flipForward(false), 1500);
	}

	onMount(() => {
		setTimeout(() => flipForward(false), 1500);
	});
</script>

<div class="flex flex-col items-center">
	<div class="w-full max-w-[1200px]">
		<div class="flex flex-col items-center">
			<h1 class="mt-16 pl-6 text-center text-4xl font-semibold">
				Use S<span class="text-blue">ai</span>ki to study smarter, <br />not harder.
			</h1>
		</div>

		<div class="mt-28 flex w-full flex-col items-center">
			<div class="flex h-[300px] w-[500px] flex-col items-center">
				<div class="relative h-[300px] w-[500px]">
					{#each informationalCards as card, i (card.id)}
						{#if i === activeCardIdx}
							<FlashCard bind:isFlipped bind:goLeft {card} disabled={true} />
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-20 flex w-full flex-col items-center">
			<a
				href={$tokenStore ? `/sets` : `/signup`}
				class="rounded-full border border-solid border-blue px-6 py-2 text-blue">Get Started</a
			>
		</div>
	</div>
</div>
