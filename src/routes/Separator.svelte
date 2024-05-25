<script lang="ts">
	export let title: string;
</script>

<div class="relative w-full h-[3px] bg-[#37464f] rounded-full mt-10">
	{#if title}
		<div class="absolute left-0 w-full top-0 flex justify-center">
			<p
				class="bg-[#131f24] font-bold text-lg py-2 px-6 text-[#52656d] transform translate-y-[-50%]"
			>
				{title}
			</p>
		</div>
	{/if}
</div>
