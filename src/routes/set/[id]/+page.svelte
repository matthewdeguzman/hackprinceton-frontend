<script lang="ts">
	import type { PageData } from './$types';
	import type { Card } from '$lib/types/sets';

	import { ChevronRight } from 'lucide-svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import { Shuffle } from 'lucide-svelte';
	import { Repeat } from 'lucide-svelte';

	import FlashCard from '$lib/components/cards/FlashCard.svelte';

	let { data }: { data: PageData } = $props();
	const title = data.title;
	const ogCards: Card[] = data.cards ?? [];

	let cards: Card[] = $state(ogCards ?? []);
	let activeCardIdx = $state(0);
	let isLooping = $state(false);
	let isFlipped: boolean = $state(false);
	let goLeft: boolean = $state(false);
	let shuffled: boolean = $state(false);

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
		shuffled = true;
		cards = cards.sort(() => Math.random() - 0.5);
		activeCardIdx = 0;
	}

	function unshuffle() {
		shuffled = false;
		cards = ogCards;
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
<div class="mt-20 flex items-center">
	<div class="flex w-full flex-col items-center">
		<div class="flex max-w-[1200px] flex-col items-center">
			<div class="mb-36 flex flex-col items-center">
				<h1 class="text-3xl font-bold">{title}</h1>
			</div>
			<p class="mb-4">{activeCardIdx + 1} / {cards.length}</p>

			{#key cards}
				<div class="relative h-[300px] w-[500px]">
					{#each cards as card, i (card.id)}
						{#if i === activeCardIdx}
							<FlashCard bind:isFlipped bind:goLeft {card} />
						{/if}
					{/each}
				</div>
			{/key}

			<div class="mt-4 flex gap-x-4">
				<button
					class:text-green-600={shuffled}
					class="transition-all hover:text-green-600"
					onclick={() => (shuffled ? unshuffle() : shuffle())}><Shuffle strokeWidth={1.5} /></button
				>

				<button
					class={!isLooping && activeCardIdx === 0 ? 'disabled' : 'enabled'}
					onclick={previousCard}><ChevronLeft size={30} strokeWidth={1.5} /></button
				>

				<button
					class={!isLooping && activeCardIdx === cards.length - 1 ? 'disabled' : 'enabled'}
					onclick={nextCard}><ChevronRight size={30} strokeWidth={1.5} /></button
				>

				<button
					class:text-green-600={isLooping}
					class="transition-all hover:text-green-600"
					onclick={() => (isLooping = !isLooping)}><Repeat strokeWidth={1.5} /></button
				>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.disabled {
		@apply cursor-not-allowed opacity-50;
	}

	.enabled {
		@apply cursor-pointer opacity-100 transition-all hover:text-blue;
	}
</style>
