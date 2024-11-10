<script lang="ts">
	import type { Card } from '$lib/types/sets';

	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let {
		card,
		isFlipped = $bindable(false),
		goLeft = $bindable(false),
		disabled = false
	}: { card: Card; isFlipped: boolean; goLeft: boolean; disabled: boolean } = $props();
</script>

<button
	class="flashcard"
	class:cursor-default={disabled}
	{disabled}
	onclick={() => {
		isFlipped = !isFlipped;
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
		<div class="flashcard-front shadow">
			<p>{card.front}</p>
		</div>
		<div class="flashcard-back shadow">
			<p>{card.back}</p>
		</div>
	</div>
</button>

<style lang="postcss">
	.flashcard {
		@apply absolute h-[300px] w-[500px];
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
		@apply absolute flex h-full w-full items-center justify-center rounded-xl p-6 font-medium;
		backface-visibility: hidden;
	}
	.flashcard-front {
		@apply border border-solid border-gray-400;
		background-color: white;
	}
	.flashcard-back {
		@apply border border-solid border-gray-500;
		background-color: #afafaf;
		color: black;
		transform: rotateX(180deg);
	}
</style>
