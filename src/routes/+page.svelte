<script lang="ts">
	import type { PageData } from './$types';
	import Circle from './Circle.svelte';
	import Separator from './Separator.svelte';

	export let data: PageData;

	const progressMeters = data.document.meters;

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
			distance: 0,
			color: 'green'
		},
		{
			title: 'Santa Fe',
			distance: 72,
			color: 'blue'
		},
		{
			title: 'Mount Oread',
			distance: 185,
			color: 'red'
		},
		{
			title: 'Kansas River',
			distance: 241,
			color: 'pink'
		},
		{
			title: 'Fort Kearny',
			distance: 409,
			color: 'orange'
		},
		{
			title: 'South Platte',
			distance: 488,
			color: 'green'
		},
		{
			title: 'Ash Hollow',
			distance: 571,
			color: 'blue'
		},
		{
			title: 'Jail Rocks',
			distance: 772,
			color: 'pink'
		},
		{
			title: 'Chimney Rock',
			distance: 814,
			color: 'green'
		},
		{
			title: 'Scotts Bluff',
			distance: 865,
			color: 'red'
		},
		{
			title: 'Fort Laramie',
			distance: 912,
			color: 'orange'
		},
		{
			title: 'Register Cliff',
			distance: 1350,
			color: 'pink'
		},
		{
			title: 'Montana',
			distance: 1481,
			color: 'blue'
		},
		{
			title: 'Ayres Natural',
			distance: 1578,
			color: 'green'
		},
		{
			title: 'Independence Rock',
			distance: 1723,
			color: 'red'
		},
		{
			title: 'South Pass',
			distance: 1990,
			color: 'orange'
		},
		{
			title: 'Salt Lake',
			distance: 2130,
			color: 'pink'
		},
		{
			title: 'Green River',
			distance: 2181,
			color: 'green'
		},
		{
			title: 'Names Hill',
			distance: 2287,
			color: 'blue'
		},
		{
			title: 'Soda Springs',
			distance: 2405,
			color: 'pink'
		},
		{
			title: 'Fort Hall',
			distance: 2473,
			color: 'orange'
		},
		{
			title: 'California',
			distance: 2510,
			color: 'blue'
		},
		{
			title: 'Fort Boise',
			distance: 2734,
			color: 'green'
		},
		{
			title: 'Snake River',
			distance: 2927,
			color: 'pink'
		},
		{
			title: 'Pre-1847 route',
			distance: 3017
		},
		{
			title: 'Whitman Mission',
			distance: 3180,
			color: 'red'
		},
		{
			title: 'Fort Nez Percés',
			distance: 3275,
			color: 'blue'
		},
		{
			title: 'The Dalles',
			distance: 3301,
			color: 'pink'
		},
		{
			title: 'Oregon City',
			distance: 3378,
			color: 'green'
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

	function getUsersOnCircle(sectionIndex: number, stepIndex: number) {
		const section = sections[sectionIndex];
		const step = section.steps[stepIndex];

		let nextStep = section.steps[stepIndex + 1] ?? null;
		if (nextStep === null) {
			nextStep = sections[sectionIndex + 1]?.steps[0] ?? 99999999;
		}

		return data.documents.filter((d) => {
			const hasCurrent = d.meters >= step;
			const hasNext = d.meters >= nextStep;

			return hasCurrent && !hasNext;
		});
	}
</script>

<div class="bg-[#202f36]">
	<div class="max-w-lg mx-auto p-3 text-center py-12">
		<div class="flex flex-row justify-center gap-3">
			<a
				href="/audit"
				class="rounded-lg title uppercase font-bold px-6 py-2 bg-[#ffffff] text-[#010434]"
			>
				Season 1
			</a>

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
				users={getUsersOnCircle(sectionIndex, stepIndex)}
				color={section.color ?? 'green'}
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
			<p class="text-md -mt-1 text-[#ffffff] font-bold">{data.document.name}</p>
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
