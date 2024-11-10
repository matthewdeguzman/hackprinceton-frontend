<script lang="ts">
	import Card from '$lib/components/set-card/Card.svelte';
</script>

<div class="flex flex-col items-center">
	<div class="w-full max-w-[1300px]">
		<div class="mt-8 flex flex-col gap-2">
			<h1 class="text-3xl font-bold">Welcome back.</h1>
			<h2 class="text-lg font-medium">What will you learn today?</h2>
		</div>

		<h1 class="mt-32 text-lg">Your sets</h1>
		<div class="h-[1px] w-full border border-solid border-black"></div>

		<div class="mt-8 flex w-full flex-col items-center">
			<div class="flex max-w-[1300px] flex-wrap gap-x-8 gap-y-8">
				<Card title="Study set 1" numQuestions={10} lastStudied={new Date()} />
				<Card title="Study set 2" numQuestions={10} lastStudied={new Date()} />
				<Card title="Study set 3" numQuestions={10} lastStudied={new Date()} />
				<Card title="Study set 4" numQuestions={10} lastStudied={new Date()} />
				<Card title="Study set 5" numQuestions={10} lastStudied={new Date()} />
				<Card title="Study set 6" numQuestions={10} lastStudied={new Date()} />
				<Card title="Study set 7" numQuestions={10} lastStudied={new Date()} />
			</div>
		</div>
	</div>
</div>
