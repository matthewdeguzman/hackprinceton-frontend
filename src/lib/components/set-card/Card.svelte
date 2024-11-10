<script lang="ts">
	export let title: string;
	export let numQuestions: number;
	export let lastStudied: Date | null = null;
	export let id: string;
	import { Trash } from 'lucide-svelte';

	function deleteSet(e: Event) {
		e.preventDefault();
		console.log('Deleting set');
	}
</script>

<a
	class="group relative flex h-[25vw] max-h-[200px] min-h-[150px] w-[50vw] min-w-[300px] max-w-[400px] flex-col rounded-xl border-2 border-solid border-transparent p-4 shadow transition-all hover:border-blue"
	href={`/set/${id}`}
>
	<div class="grow">
		<h1 class="text-left text-xl font-bold">{title}</h1>
		<p class="text-left text-sm text-gray-500">{numQuestions} Questions</p>
	</div>

	<div class="flex items-end">
		<p class="grow text-sm text-gray-500">
			Last studied: {lastStudied ? lastStudied.toLocaleDateString() : 'Never'}
		</p>

		<div class="mb-[-4px] flex h-8 w-8 flex-col items-center">
			<button
				onclick={deleteSet}
				class="flex h-full items-center transition-all hover:text-red-600"
			>
				<Trash size={18} strokeWidth={1.5} />
			</button>
		</div>
	</div>
</a>
