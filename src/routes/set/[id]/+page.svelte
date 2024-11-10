<script lang="ts">
	import type { PageData } from './$types';
	import type { Card } from '$lib/types/sets';

	import { ChevronRight } from 'lucide-svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import { Shuffle } from 'lucide-svelte';
	import { Repeat } from 'lucide-svelte';

	import FlashCard from '$lib/components/cards/FlashCard.svelte';

	let { data }: { data: PageData } = $props();
	const cards: Card[] = data.cards;
	let activeCardIdx = $state(0);
	let isLooping = $state(false);
	let isFlipped: boolean = $state(false);
	let goLeft: boolean = $state(false);

	function resetFlip(fn: () => void) {
		if (isFlipped) {
			isFlipped = false;
			setTimeout(fn, 600);
		} else {
			fn();
		}
	}

	function nextCardHelper() {
		let newIdx;
		if (isLooping) {
			newIdx = (activeCardIdx + 1) % cards.length;
		} else {
			newIdx = Math.min(activeCardIdx + 1, cards.length - 1);
		}

		if (newIdx !== activeCardIdx) {
			goLeft = true;
			activeCardIdx = newIdx;
		}
	}
	function nextCard() {
		resetFlip(nextCardHelper);
	}

	function previousCardHelper() {
		let newIdx;
		if (isLooping) {
			newIdx = (activeCardIdx - 1 + cards.length) % cards.length;
		} else {
			newIdx = Math.max(activeCardIdx - 1, 0);
		}

		if (newIdx !== activeCardIdx) {
			goLeft = false;
			activeCardIdx = newIdx;
		}
	}

	function previousCard() {
		resetFlip(previousCardHelper);
	}

	function shuffle() {
		activeCardIdx = 0;
		cards.sort(() => Math.random() - 0.5);
		console.log(cards);
	}
</script>

<div class="flex min-h-[800px] items-center">
	<div class="flex h-full w-full max-w-[1200px] flex-col items-center">
		<div class="flex flex-col items-center">
			<p class="mb-4">{activeCardIdx + 1} / {cards.length}</p>

			<div class="relative h-[300px] w-[600px]">
				{#each cards as card, i (card)}
					{#if i === activeCardIdx}
						<FlashCard bind:isFlipped bind:goLeft {card} />
					{/if}
				{/each}
			</div>

			<div class="mt-4 flex gap-x-4">
				<button onclick={shuffle}><Shuffle strokeWidth={1.5} /></button>

				<button class:disabled={!isLooping && activeCardIdx === 0} onclick={previousCard}
					><ChevronLeft size={30} strokeWidth={1.5} /></button
				>

				<button class:disabled={!isLooping && activeCardIdx === cards.length - 1} onclick={nextCard}
					><ChevronRight size={30} strokeWidth={1.5} /></button
				>

				<button class:text-green-600={isLooping} onclick={() => (isLooping = !isLooping)}
					><Repeat strokeWidth={1.5} /></button
				>
			</div>
		</div>
	</div>
</div>

<style>
	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
