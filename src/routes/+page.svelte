<script lang="ts">
	import type { PageData } from './$types';
	import Circle from './Circle.svelte';
	import Separator from './Separator.svelte';

	export let data: PageData;

	const progressMinutes = data.document.minutes - 260; // - 25011
	const progressMeters = Math.floor(progressMinutes / 3);

	const progressUnit = progressMeters > 9999 ? 'Km' : 'Meters';
	const progressUnitDistance = progressMeters > 9999 ? progressMeters / 1000 : progressMeters;

	function generateSteps(currentDistance: number, nextDistance: number) {
		const steps = [];

		let i = 0;
		while (currentDistance < nextDistance) {
			i = i % 3;

			steps.push(currentDistance);
			currentDistance += i === 0 ? 19 : i === 1 ? 23 : 31;

			i++;
		}

		return steps;
	}

	let sections: any[] = [
		{
			title: ' Missouri',
			distance: 0
		},
		{
			title: 'Santa Fe',
			distance: 72
		},
		{
			title: 'Mount Oread',
			distance: 185
		},
		{
			title: 'Kansas River',
			distance: 241
		},
		{
			title: 'Fort Kearny',
			distance: 409
		},
		{
			title: 'South Platte',
			distance: 488
		},
		{
			title: 'Ash Hollow',
			distance: 571
		},
		{
			title: 'Jail Rocks',
			distance: 772
		},
		{
			title: 'Chimney Rock',
			distance: 814
		},
		{
			title: 'Scotts Bluff',
			distance: 865
		},
		{
			title: 'Fort Laramie',
			distance: 912
		},
		{
			title: 'Register Cliff',
			distance: 1350
		},
		{
			title: 'Montana',
			distance: 1481
		},
		{
			title: 'Ayres Natural',
			distance: 1578
		},
		{
			title: 'Independence Rock',
			distance: 1723
		},
		{
			title: 'South Pass',
			distance: 1990
		},
		{
			title: 'Salt Lake',
			distance: 2130
		},
		{
			title: 'Green River',
			distance: 2181
		},
		{
			title: 'Names Hill',
			distance: 2287
		},
		{
			title: 'Soda Springs',
			distance: 2405
		},
		{
			title: 'Fort Hall',
			distance: 2473
		},
		{
			title: 'California',
			distance: 2510
		},
		{
			title: 'Fort Boise',
			distance: 2734
		},
		{
			title: 'Snake River',
			distance: 2927
		},
		{
			title: 'Pre-1847 route',
			distance: 3017
		},
		{
			title: 'Whitman Mission',
			distance: 3180
		},
		{
			title: 'Fort Nez Percés',
			distance: 3275
		},
		{
			title: 'The Dalles',
			distance: 3301
		},
		{
			title: 'Oregon City',
			distance: 3378
		}
	];

	sections = sections.map((section: any, index) => {
		return {
			...section,
			steps: generateSteps(section.distance, (sections[index + 1] ?? { distance: 3490 }).distance)
		};
	});

	const currentSection = sections.find((s) => {
		return progressMeters >= s.distance;
	});
	const nextSection = sections.find((s, index) => {
		return progressMeters < s.distance;
	});
</script>

<div class="bg-[#202f36]">
	<div class="max-w-lg mx-auto p-3 text-center py-12">
		<div class="flex flex-row justify-center gap-3">
			<div class="rounded-lg title uppercase font-bold px-6 py-2 bg-[#ffffff] text-[#010434]">
				Season 1
			</div>

			<div class="rounded-lg title uppercase font-bold px-6 py-2 bg-[#37464f] text-[#52656d]">
				Season 2
			</div>
		</div>

		<h1 class="title font-bold text-5xl text-white mt-8">Focus Horizon</h1>

		<h3 class="title font-bold text-2xl text-[#52656d] mt-4">Oregon Trail</h3>

		<div class="flex justify-center items-center gap-2 mt-6">
			<div
				class="rounded-lg title uppercase text-sm font-bold px-3 py-1 bg-[#375e76] text-[#6bbdf3]"
			>
				3 minutes
			</div>
			<p class="font-bold text-[#375e76]">=</p>
			<div
				class="rounded-lg title uppercase text-sm font-bold px-3 py-1 bg-[#375e76] text-[#6bbdf3]"
			>
				1 meter
			</div>
		</div>
	</div>
</div>

<div class="max-w-lg mx-auto p-3 mt-4 flex flex-col gap-12 mb-32">
	{#each sections as section, sectionIndex}
		<Separator title={section.title} />

		{#each section.steps as step, stepIndex}
			<Circle
				mirrored={sectionIndex % 2 !== 0}
				distance={step}
				iterator={stepIndex}
				finished={progressMeters >= step}
				finishedPrevious={progressMeters >= (section.steps[stepIndex - 1] ?? 0)}
			/>
		{/each}
	{/each}
</div>

<footer class="px-3 py-4 fixed bottom-0 left-0 w-full bg-[#131f24] border-t-[2px] border-[#37464f]">
	<div class="max-w-lg mx-auto grid grid-cols-12">
		<div class="col-span-4 text-start">
			<p class="text-[#52656d] font-semibold text-sm">Currently in:</p>
			<p class="text-white">{currentSection.title}</p>
		</div>
		<div class="col-span-4 text-center flex flex-col h-full items-center justify-center">
			<p class="text-md -mt-1 text-[#ffffff] font-bold">Matej Bačo</p>
			<p class="text-[#52656d] font-semibold text-2xl">
				<span class="text-white">{progressUnitDistance}</span>
				{progressUnit}
			</p>
		</div>

		<div class="col-span-4 text-end">
			<p class="text-[#52656d] font-semibold text-sm">Next stop:</p>
			<p class="text-white">{nextSection.title}</p>
		</div>
	</div>
</footer>
