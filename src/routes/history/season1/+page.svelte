<script lang="ts">
	function getLeaderboardHeight(current: number, max: number) {
		const MAX_HEIGHT = 200;
		if (current === max) {
			return MAX_HEIGHT;
		}

		const percentage = current / max;

		return Math.floor(MAX_HEIGHT * percentage);
	}

	let winners = [
		{
			name: 'Diana Mohamedová',
			meters: 8492, // real: 8492, max :3490
			finished: true
		},
		{
			name: 'annnnyyýya',
			meters: 4193, // real: 4193, max: 3490
			finished: true
		},
		{
			name: 'Eva Jekielková',
			meters: 3227,
			finished: false
		}
	];
</script>

<div class="bg-[#202f36]">
	<div class="max-w-lg mx-auto p-3 text-center py-12">
		<div class="flex flex-row justify-center gap-3">
			<div class="rounded-lg title uppercase font-bold px-6 py-2 bg-[#ffffff] text-[#010434]">
				Season 1
			</div>

			<a
				href="/"
				class="rounded-lg title uppercase font-bold px-6 py-2 bg-transparent border-2 border-neutral-300 text-[#ffffff]"
			>
				Season 2
			</a>
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
				1 kilometer
			</div>
		</div>
	</div>
</div>

<div class="max-w-lg mx-auto p-3 mt-4 flex flex-col gap-12 mb-32">
	<div class="relative z-[20] -mb-16 mt-6 grid grid-cols-12 gap-1">
		<div class="absolute opacity-50 inset-0 flex items-end justify-end pointer-events-none">
			<div class="w-full h-10 bg-gradient-to-t from-[#131f24]"></div>
		</div>
		<div class="col-span-4 flex flex-col justify-end">
			<p class="text-[#52656d] text-lighter text-sm uppercase text-center">
				{winners[1].meters} Km
			</p>

			<p class="text-center text-lg text-white opacity-50 font-semibold mb-2">
				{winners[1].name}
			</p>

			{#if winners[1].finished}
				<div class="flex justify-center w-full">
					<p
						class="text-black bg-green-500 rounded-full py-0.5 px-2 z-[10] -mb-2.5 font-bold text-xs uppercase text-center"
					>
						Finished
					</p>
				</div>
			{/if}

			<div
				style={`height: ${getLeaderboardHeight(winners[1].meters, winners[0].meters)}px`}
				class="rounded-tr-none rounded-t-xl bg-gradient-to-b from-[#d9e3ed] via-[#c0d1db] to-[#8aa2ba] text-white font-bold text-2xl tracking-wide flex items-center justify-center"
			>
				#2
			</div>
		</div>

		<div class="col-span-4 flex flex-col justify-end">
			<p class="text-white text-lighter opacity-50 text-sm uppercase text-center">
				{winners[0].meters} Km
			</p>
			<p class="text-center text-lg text-[#ffffff] font-semibold mb-2">
				{winners[0].name}
			</p>

			{#if winners[0].finished}
				<div class="flex justify-center w-full">
					<p
						class="text-black bg-green-500 rounded-full py-0.5 px-2 z-[10] -mb-2.5 font-bold text-xs uppercase text-center"
					>
						Finished
					</p>
				</div>
			{/if}

			<div
				style={`height: ${getLeaderboardHeight(winners[0].meters, winners[0].meters)}px`}
				class="rounded-t-xl bg-gradient-to-b from-[#fde966] via-[#fed604] to-[#ff9b00] text-white font-bold text-2xl tracking-wide flex items-center justify-center"
			>
				#1
			</div>
		</div>

		<div class="col-span-4 flex flex-col justify-end">
			<p class="text-[#52656d] text-lighter text-sm uppercase text-center">
				{winners[2].meters} Km
			</p>

			<p class="text-center text-lg text-white opacity-50 font-semibold mb-2">
				{winners[2].name}
			</p>

			{#if winners[2].finished}
				<div class="flex justify-center w-full">
					<p
						class="text-black bg-green-500 rounded-full py-0.5 px-2 z-[10] -mb-2.5 font-bold text-xs uppercase text-center"
					>
						Finished
					</p>
				</div>
			{/if}

			<div
				style={`height: ${getLeaderboardHeight(winners[2].meters, winners[0].meters)}px`}
				class="rounded-tl-none rounded-t-xl bg-gradient-to-b from-[#f8be8e] via-[#e3ad7e] to-[#c87e14] text-white font-bold text-2xl tracking-wide flex items-center justify-center"
			>
				#3
			</div>
		</div>
	</div>
</div>
