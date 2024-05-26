<script lang="ts">
	export let distance: number;
	export let finished: boolean;
	export let finishedPrevious: boolean;
	export let iterator: number;
	export let mirrored: boolean;
	export let color: 'red' | 'orange' | 'green' | 'blue' | 'pink';
	export let users: any[];

	const isFirst = iterator === 0;

	const steps = [0, 1, 2, 1, 0, -1, 0, 1, 0, -1, -2, -1, 0, 1, 2, 1];

	const step = iterator % steps.length;
	const stepValue = steps[step] * (mirrored ? -1 : 1);

	const previousStepValue = (steps[step - 1] ?? steps[steps.length - 1]) * (mirrored ? -1 : 1);

	const stepSize = 60;

	let translateX = stepSize * stepValue;

	const unit = distance > 9999 ? 'Km' : 'Meters';
	const unitedDistance = distance > 9999 ? distance / 1000 : distance;

	let longNames: string[] = [];
	function toggleLongName(name: string) {
		if (longNames.includes(name)) {
			longNames = longNames.filter((n) => n !== name);
			longNames = longNames;
		} else {
			longNames.push(name);
			longNames = longNames;
		}
	}

	function isWinner(user: any, users: any[]) {
		return user.name === 'annnnyyýya';
	}
	/*
	function isWinner(user: any, users: any[]) {
		let maxMeters: any = null;
		let maxIndex: any = null;

		users.forEach((u, index) => {
			if(maxMeters === null || u.meters > maxMeters) {
				maxMeters = u.meters;
				maxIndex = index;
			}
		})

		if(user.name === users[maxIndex].name) {
			return true;
		}

		return false;
	}
	*/

	function getShortName(name: string) {
		if (name.includes(' ')) {
			const parts = name.split(' ');
			return parts
				.map((part) => part[0])
				.join('')
				.toUpperCase();
		}

		return name[0].toUpperCase();
	}

	function getColorClasses(color: string) {
		if (color === 'green') {
			return 'bg-[#58cc02] text-[#ffffff] shadow-green';
		}
		if (color === 'blue') {
			return 'bg-[#53adef] text-[#ffffff] shadow-blue';
		}
		if (color === 'pink') {
			return 'bg-[#ef8ccc] text-[#ffffff] shadow-pink';
		}
		if (color === 'orange') {
			return 'bg-[#ff9600] text-[#ffffff] shadow-orange';
		}
		if (color === 'red') {
			return 'bg-[#ff4b4b] text-[#ffffff] shadow-red';
		}
	}

	function getLineClasses(color: string) {
		if (color === 'green') {
			return 'bg-[#58cc02]';
		}
		if (color === 'blue') {
			return 'bg-[#53adef]';
		}
		if (color === 'pink') {
			return 'bg-[#ef8ccc]';
		}
		if (color === 'orange') {
			return 'bg-[#ff9600]';
		}
		if (color === 'red') {
			return 'bg-[#ff4b4b]';
		}
	}
</script>

<div class="w-full flex justify-center">
	<div
		style={`transform: translateX(${translateX}px)`}
		class={`${finished ? getColorClasses(color) : 'text-[#52656d] bg-[#37464f] shadow-gray'} relative w-20 h-20 rounded-full flex items-center justify-center`}
	>
		<div class="text-center flex flex-col">
			<p class="font-bold text-2xl">{unitedDistance}</p>
			<p class="font-bold text-sm opacity-50 -mt-2">{unit}</p>
		</div>

		{#if !isFirst}
			{#if previousStepValue < stepValue}
				<div
					class={`${finishedPrevious ? getLineClasses(color) : 'bg-[#37464f]'} absolute bottom-[calc(100%+20px)] -left-1 w-8 h-1 rounded-full transform rotate-[60deg]`}
				></div>
			{:else if previousStepValue > stepValue}
				<div
					class={`${finishedPrevious ? getLineClasses(color) : 'bg-[#37464f]'} absolute bottom-[calc(100%+20px)] -right-1 w-8 h-1 rounded-full transform rotate-[-60deg]`}
				></div>
			{/if}
		{/if}

		{#if users.length > 0}
			<div class="flex gap-1 absolute bottom-[calc(100%-14px)]">
				{#each users as user}
					<button
						on:click={() => toggleLongName(user.name)}
						class={`${longNames.includes(user.name) ? 'rounded-lg p-2 py-1' : 'rounded-full p-2 px-3 '} w-[max-content] text-[#010434] bg-[#ffffff] font-bold text-sm text-center border-[#dadbe0] border-[2px]`}
					>
						<div class="relative w-[fit-content]">
							<p>{longNames.includes(user.name) ? user.name : getShortName(user.name)}</p>
							{#if longNames.includes(user.name)}
								<p class="-mt-1 text-xs text-start text-[#bcbdc6]">1245 m</p>
							{/if}
							{#if isWinner(user, users) && !longNames.includes(user.name)}
								<div class="absolute left-0 top-0">
									<p
										class="transform translate-y-[-16px] translate-x-[-7px] text-lg rotate-[-10deg]"
									>
										👑
									</p>
								</div>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
