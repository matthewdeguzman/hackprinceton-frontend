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

	const cardJson: Record<string, string | string[]> = JSON.parse(card.front);

	let front = '';

	switch (cardJson['type']) {
		case 'normal':
			front = cardJson['content'] as string;
			break;
		case 'tf':
			front = cardJson['content'] as string;
			front = `True or False: <br />${front}`;
			break;
		case 'mc':
			let options = cardJson['content'] as string[];

			front = `${options[0]}<br/><br/>`;
			options.slice(1).map((option, idx) => {
				const choice = String.fromCharCode(97 + idx);
				front += `${choice}) ${option}<br/>`;
			});
			break;
		default:
			front = 'Unknown card type';
			break;
	}
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
			<p>{@html front}</p>
		</div>
		<div class="flashcard-back shadow">
			<p>{@html card.back}</p>
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
		@apply absolute flex h-full w-full items-center justify-center rounded-xl p-6 text-left font-medium;
		backface-visibility: hidden;
	}
	.flashcard-front {
		@apply border-2 border-solid border-gray-400;
		background-color: white;
	}
	.flashcard-back {
		@apply border-2 border-solid border-blue;
		background-color: #dbdbdb;
		opacity: 0.8;
		color: black;
		transform: rotateX(180deg);
	}
</style>
