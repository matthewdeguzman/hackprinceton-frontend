<script lang="ts">
	import type { Card } from '$lib/types/sets';

	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let {
		card,
		isFlipped = $bindable(false),
		goLeft = $bindable(false)
	}: { card: Card; isFlipped: boolean; goLeft: boolean } = $props();
</script>

<button
	class="flashcard"
	onclick={() => {
		isFlipped = !isFlipped;
		console.log(isFlipped);
	}}
>
	<div
		out:fly={{
			x: goLeft ? -300 : 300,
			duration: 300,
			easing: cubicOut
		}}
		in:fly={{
			x: goLeft ? 300 : -300,
			duration: 300,
			easing: cubicOut
		}}
		class="flashcard-inner"
		class:flipped={isFlipped}
	>
		<div class="flashcard-front">
			<p>{card.front}</p>
		</div>
		<div class="flashcard-back">
			<p>{card.back}</p>
		</div>
	</div>
</button>

<style lang="postcss">
	.flashcard {
		@apply absolute h-[300px] w-[600px] cursor-pointer;
		perspective: 1000px;
	}
	.flashcard-inner {
		@apply relative h-full w-full;
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}
	.flashcard-inner.flipped {
		transform: rotateX(180deg);
	}

	.flashcard-front,
	.flashcard-back {
		@apply absolute flex h-full w-full items-center justify-center rounded-xl;
		backface-visibility: hidden;
	}
	.flashcard-front {
		background-color: #f8f9fa;
	}
	.flashcard-back {
		background-color: #343a40;
		color: white;
		transform: rotateX(180deg);
	}
</style>
