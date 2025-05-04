<script lang="ts">
  import * as seedrandom from 'seedrandom';

	import type { PageData } from './$types';
	import Circle from './Circle.svelte';
	import Separator from './Separator.svelte';

	export let data: PageData;

	let progressMeters = data.document?.meters ?? -1; // Change this to fill progress to 100%
	progressMeters = 9999;

	const progressUnit = progressMeters > 9999 ? 'Km' : 'Km';
	const progressUnitDistance = progressMeters > 9999 ? progressMeters / 1000 : progressMeters;

	let signInOpened = false;

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
			title: 'Praha',
			distance: 0,
			color: ''
		},
		{
			title: 'Šternov',
			distance: 51,
			color: ''
		},
		{
			title: 'Humpolec',
			distance: 98,
			color: ''
		},
		{
			title: 'Jihlava',
			distance: 127,
			color: ''
		},
		{
			title: 'Jabloňov',
			distance: 162,
			color: ''
		},
		{
			title: 'Domašov',
			distance: 190,
			color: ''
		},
		{
			title: 'Brno',
			distance: 211,
			color: ''
		},
		{
			title: 'Uherský Brod',
			distance: 294,
			color: ''
		},
		{
			title: 'Trenčín',
			distance: 338,
			color: ''
		},
		{
			title: 'Žilina',
			distance: 412,
			color: ''
		},
		{
			title: 'Liptovský Mikuláš',
			distance: 503,
			color: ''
		},
		{
			title: 'Poprad',
			distance: 553,
			color: ''
		},
		{
			title: 'Prešov',
			distance: 625,
			color: ''
		},
		{
			title: 'Košice',
			distance: 652,
			color: 'gold'
		}
	];
	
	const colors = ['red' ,'orange' ,'green', 'blue', 'pink'];
	sections = sections.map((section) => {
	let color = section.color;
	
	
	if(!color) {
	const rand = seedrandom.default(section.title + '-2');
	const n = rand();
	color = colors[Math.floor(n*colors.length)];

	}
	
	section.color = color;
	
	return section;
	})
	
	

	const FINAL_METER = 660;

	sections = sections.map((section: any, index) => {
		const steps = generateSteps(
			section.distance,
			(sections[index + 1] ?? { distance: FINAL_METER }).distance
		);

		if (index === sections.length - 1) {
			steps.push(FINAL_METER);
		}

		return {
			...section,
			steps
		};
	});

	let currentSection = sections.find((s) => {
		return progressMeters >= s.distance;
	});
	let nextSection = sections.find((s, index) => {
		return progressMeters < s.distance;
	});
	if (!nextSection) {
		nextSection = sections[sections.length - 1];
	}

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

	function scrollToPlayer(name: string) {
		document.getElementById(name)?.scrollIntoView({
			behavior: 'smooth'
		});
	}

	function getLeaderboardHeight(current: number, max: number) {
		const MAX_HEIGHT = 200;
		if (current === max) {
			return MAX_HEIGHT;
		}

		const percentage = current / max;

		return Math.floor(MAX_HEIGHT * percentage);
	}
</script>

<div class="bg-[#202f36]">
	<div class="max-w-lg mx-auto p-3 text-center py-12">
		<div class="flex flex-row justify-center gap-3">
			<a
				href="/history/season1"
				class="rounded-lg title uppercase font-bold px-6 py-2 bg-transparent border-2 border-neutral-300 text-[#ffffff]"
			>
				Season 1
			</a>

			<div class="rounded-lg title uppercase font-bold px-6 py-2 bg-[#ffffff] text-[#010434]">
				Season 2
			</div>
		</div>

		<h1 class="title font-bold text-5xl text-white mt-8">Focus Horizon</h1>

		<h3 class="title font-bold text-2xl text-[#52656d] mt-4">Mini World Tour</h3>

		<div class="flex justify-center items-center gap-2 mt-6">
			<div
				class="rounded-lg title uppercase text-sm font-bold px-3 py-1 bg-[#375e76] text-[#6bbdf3]"
			>
				10 minutes
			</div>
			<p class="font-bold text-[#375e76]">=</p>
			<div
				class="rounded-lg title uppercase text-sm font-bold px-3 py-1 bg-[#375e76] text-[#6bbdf3]"
			>
				1 kilometer
			</div>
		</div>

		<div class="mt-6">
			<a href="/audit" class="bg-[#161f23] px-4 py-2 rounded-lg text-[#6bbdf2]">
				View Activity History
			</a>
		</div>
	</div>
</div>

<div class="max-w-lg mx-auto p-3 mt-4 flex flex-col gap-12 mb-32">
	<div class="relative z-[20] -mb-16 mt-6 grid grid-cols-12 gap-1">
		<div class="absolute opacity-50 inset-0 flex items-end justify-end pointer-events-none">
			<div class="w-full h-10 bg-gradient-to-t from-[#131f24]"></div>
		</div>
		<div class="col-span-4 flex flex-col justify-end">
			<button on:click={() => scrollToPlayer(data.documents[1].name)}>
				<p class="text-[#52656d] text-lighter text-sm uppercase">{data.documents[1].meters} Km</p>

				<p class="text-center text-lg text-white opacity-50 font-semibold mb-2">
					{data.documents[1].name}
				</p>
				<div
					style={`height: ${getLeaderboardHeight(data.documents[1].meters, data.documents[0].meters)}px`}
					class="rounded-tr-none rounded-t-xl bg-gradient-to-b from-[#d9e3ed] via-[#c0d1db] to-[#8aa2ba] text-white font-bold text-2xl tracking-wide flex items-center justify-center"
				>
					#2
				</div>
			</button>
		</div>

		<div class="col-span-4 flex flex-col justify-end">
			<button on:click={() => scrollToPlayer(data.documents[0].name)}>
				<p class="text-white text-lighter opacity-50 text-sm uppercase">
					{data.documents[0].meters} Km
				</p>
				<p class="text-center text-lg text-[#ffffff] font-semibold mb-2">
					{data.documents[0].name}
				</p>
				<div
					style={`height: ${getLeaderboardHeight(data.documents[0].meters, data.documents[0].meters)}px`}
					class="rounded-t-xl bg-gradient-to-b from-[#fde966] via-[#fed604] to-[#ff9b00] text-white font-bold text-2xl tracking-wide flex items-center justify-center"
				>
					#1
				</div>
			</button>
		</div>

		<div class="col-span-4 flex flex-col justify-end">
			<button on:click={() => scrollToPlayer(data.documents[2].name)}>
				<p class="text-[#52656d] text-lighter text-sm uppercase">{data.documents[2].meters} Km</p>

				<p class="text-center text-lg text-white opacity-50 font-semibold mb-2">
					{data.documents[2].name}
				</p>
				<div
					style={`height: ${getLeaderboardHeight(data.documents[2].meters, data.documents[0].meters)}px`}
					class="rounded-tl-none rounded-t-xl bg-gradient-to-b from-[#f8be8e] via-[#e3ad7e] to-[#c87e14] text-white font-bold text-2xl tracking-wide flex items-center justify-center"
				>
					#3
				</div>
			</button>
		</div>
	</div>
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

{#if data.document}
	<footer
		class="z-[50] px-3 py-4 fixed bottom-0 left-0 w-full bg-[#131f24] border-t-[2px] border-[#37464f]"
	>
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
{:else}
	<footer
		class="z-[50] px-3 py-4 fixed bottom-0 left-0 w-full bg-[#131f24] border-t-[2px] border-[#37464f]"
	>
		<div class="max-w-lg mx-auto flex items-center justify-center">
			<div class="text-center flex flex-col h-full items-center justify-center">
				<button
					on:click={() => (signInOpened = true)}
					class="bg-[#161f23] border-[2px] border-b-[3px] rounded-lg text-[#5697c0] font-bold border-[#3a464e] py-1.5 px-12"
					>Sign in</button
				>
				<p class="mt-2 text-sm italic -mt-1 text-[#51656d] font-semibold">
					Sign into account to see your progress
				</p>
			</div>
		</div>
	</footer>
{/if}

{#if signInOpened}
	<div class="z-[200] fixed inset-0 bg-black bg-opacity-60 flex items-end justify-center">
		<div class="max-w-md w-full mx-auto">
			<div class="w-full rounded-t-3xl bg-[#131f24] p-4 grid grid-cols-12 gap-3 gap-y-8">
				<a target="_self" href="/?u=Eva Jekielková" class="col-span-4 text-center">
					<div
						class="bg-[#131f24] border-[2px] border-[#52656d] text-[#ffffff] flex items-center justify-center rounded-2xl w-full aspect-video"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-8"
						>
							<path
								d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z"
							/>
						</svg>
					</div>
					<p class="mt-4 font-bold text-[#52656d] text-lg">Eva</p>
				</a>

				<a target="_self" href="/?u=annnnyyýya" class="col-span-4 text-center">
					<div
						class="bg-[#131f24] border-[2px] border-[#52656d] text-[#ffffff] flex items-center justify-center rounded-2xl w-full aspect-video"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-8"
						>
							<path
								d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"
							/>
						</svg>
					</div>
					<p class="mt-4 font-bold text-[#52656d] text-lg">Anet</p>
				</a>

				<a target="_self" href="/?u=Diana Mohamedová" class="col-span-4 text-center">
					<div
						class="bg-[#131f24] border-[2px] border-[#52656d] text-[#ffffff] flex items-center justify-center rounded-2xl w-full aspect-video"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-8"
						>
							<path
								fill-rule="evenodd"
								d="M8.478 1.6a.75.75 0 0 1 .273 1.026 3.72 3.72 0 0 0-.425 1.121c.058.058.118.114.18.168A4.491 4.491 0 0 1 12 2.25c1.413 0 2.673.651 3.497 1.668.06-.054.12-.11.178-.167a3.717 3.717 0 0 0-.426-1.125.75.75 0 1 1 1.298-.752 5.22 5.22 0 0 1 .671 2.046.75.75 0 0 1-.187.582c-.241.27-.505.52-.787.749a4.494 4.494 0 0 1 .216 2.1c-.106.792-.753 1.295-1.417 1.403-.182.03-.364.057-.547.081.152.227.273.476.359.742a23.122 23.122 0 0 0 3.832-.803 23.241 23.241 0 0 0-.345-2.634.75.75 0 0 1 1.474-.28c.21 1.115.348 2.256.404 3.418a.75.75 0 0 1-.516.75c-1.527.499-3.119.854-4.76 1.049-.074.38-.22.735-.423 1.05 2.066.209 4.058.672 5.943 1.358a.75.75 0 0 1 .492.75 24.665 24.665 0 0 1-1.189 6.25.75.75 0 0 1-1.425-.47 23.14 23.14 0 0 0 1.077-5.306c-.5-.169-1.009-.32-1.524-.455.068.234.104.484.104.746 0 3.956-2.521 7.5-6 7.5-3.478 0-6-3.544-6-7.5 0-.262.037-.511.104-.746-.514.135-1.022.286-1.522.455.154 1.838.52 3.616 1.077 5.307a.75.75 0 1 1-1.425.468 24.662 24.662 0 0 1-1.19-6.25.75.75 0 0 1 .493-.749 24.586 24.586 0 0 1 4.964-1.24h.01c.321-.046.644-.085.969-.118a2.983 2.983 0 0 1-.424-1.05 24.614 24.614 0 0 1-4.76-1.05.75.75 0 0 1-.516-.75c.057-1.16.194-2.302.405-3.417a.75.75 0 0 1 1.474.28c-.164.862-.28 1.74-.345 2.634 1.237.371 2.517.642 3.832.803.085-.266.207-.515.359-.742a18.698 18.698 0 0 1-.547-.08c-.664-.11-1.311-.612-1.417-1.404a4.535 4.535 0 0 1 .217-2.103 6.788 6.788 0 0 1-.788-.751.75.75 0 0 1-.187-.583 5.22 5.22 0 0 1 .67-2.04.75.75 0 0 1 1.026-.273Z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<p class="mt-4 font-bold text-[#52656d] text-lg">Diana</p>
				</a>
			</div>
		</div>
	</div>
{/if}
