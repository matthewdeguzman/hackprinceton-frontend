<script lang="ts">
	export let title: string;
	export let numQuestions: number;
	export let lastStudied: Date | null = null;
</script>

<button
	class="relative flex h-[25vw] max-h-[200px] min-h-[150px] w-[50vw] min-w-[300px] max-w-[400px] flex-col rounded-xl border border-solid border-black p-2"
>
	<div class="grow">
		<h1 class="text-left text-xl font-bold">{title}</h1>
		<p class="text-left text-sm text-gray-500">{numQuestions} Questions</p>
	</div>

	<p class="text-sm text-gray-500">
		Last studied: {lastStudied ? lastStudied.toLocaleDateString() : 'Never'}
	</p>
</button>
