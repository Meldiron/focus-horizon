<script lang="ts">
	export let distance: number;
	export let finished: boolean;
	export let finishedPrevious: boolean;
	export let iterator: number;
	export let mirrored: boolean;

	const isFirst = iterator === 0;

	const steps = [0, 1, 2, 1, 0, -1, 0, 1, 0, -1, -2, -1, 0, 1, 2, 1];

	const step = iterator % steps.length;
	const stepValue = steps[step] * (mirrored ? -1 : 1);

	const previousStepValue = (steps[step - 1] ?? steps[steps.length - 1]) * (mirrored ? -1 : 1);

	const stepSize = 60;

	let translateX = stepSize * stepValue;

	const unit = distance > 9999 ? 'Km' : 'Meters';
	const unitedDistance = distance > 9999 ? distance / 1000 : distance;
</script>

<div class="w-full flex justify-center">
	<div
		style={`transform: translateX(${translateX}px)`}
		class={`${finished ? 'bg-[#58cc02] text-[#ffffff] shadow-green' : 'text-[#52656d] bg-[#37464f] shadow-gray'} relative w-20 h-20 rounded-full flex items-center justify-center`}
	>
		<div class="text-center flex flex-col">
			<p class="font-bold text-2xl">{unitedDistance}</p>
			<p class="font-bold text-sm opacity-50 -mt-2">{unit}</p>
		</div>

		{#if !isFirst}
			{#if previousStepValue < stepValue}
				<div
					class={`${finishedPrevious ? 'bg-[#46a301]' : 'bg-[#37464f]'} absolute bottom-[calc(100%+20px)] -left-1 w-8 h-1 rounded-full transform rotate-[60deg]`}
				></div>
			{:else if previousStepValue > stepValue}
				<div
					class={`${finishedPrevious ? 'bg-[#46a301]' : 'bg-[#37464f]'} absolute bottom-[calc(100%+20px)] -right-1 w-8 h-1 rounded-full transform rotate-[-60deg]`}
				></div>
			{/if}
		{/if}
	</div>
</div>
