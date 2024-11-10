<script lang="ts">
	import type { PageData } from './$types';
	import type { Card } from '$lib/types/sets';

	import { ChevronRight } from 'lucide-svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import { Shuffle } from 'lucide-svelte';
	import { Repeat } from 'lucide-svelte';

	import FlashCard from '$lib/components/cards/FlashCard.svelte';

	let { data }: { data: PageData } = $props();
	let cards: Card[] = $state(data.cards ?? []);
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
		cards = cards.sort(() => Math.random() - 0.5);
		activeCardIdx = 0;
	}

	function handleKeyClick(event: KeyboardEvent) {
		event.preventDefault();
		if (event.key === 'ArrowRight') {
			nextCard();
		} else if (event.key === 'ArrowLeft') {
			previousCard();
		} else if (event.key === ' ') {
			isFlipped = !isFlipped;
		}
	}
</script>

<svelte:window onkeyup={handleKeyClick} />
<div class="mt-48 flex items-center">
	<div class="flex w-full flex-col items-center">
		<div class="flex max-w-[1200px] flex-col items-center">
			<p class="mb-4">{activeCardIdx + 1} / {cards.length}</p>

			{#key cards}
				<div class="relative h-[300px] w-[600px]">
					{#each cards as card, i (card.id)}
						{#if i === activeCardIdx}
							<FlashCard bind:isFlipped bind:goLeft {card} />
						{/if}
					{/each}
				</div>
			{/key}

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
