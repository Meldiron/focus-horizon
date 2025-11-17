<script lang="ts">
	import Separator from '../Separator.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function timeDifference(current: number, previous: number) {
		var msPerMinute = 60 * 1000;
		var msPerHour = msPerMinute * 60;
		var msPerDay = msPerHour * 24;
		var msPerMonth = msPerDay * 30;
		var msPerYear = msPerDay * 365;

		var elapsed = current - previous;

		if (elapsed < msPerMinute) {
			return Math.round(elapsed / 1000) + ' secs ago';
		} else if (elapsed < msPerHour) {
			return Math.round(elapsed / msPerMinute) + ' mins ago';
		} else if (elapsed < msPerDay) {
			return Math.round(elapsed / msPerHour) + ' hrs ago';
		} else if (elapsed < msPerMonth) {
			return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
		} else if (elapsed < msPerYear) {
			return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
		} else {
			return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
		}
	}
</script>

<div class="bg-[#202f36]">
	<div class="max-w-lg mx-auto p-3 text-center py-12">
		<div class="flex flex-row justify-center gap-3">
			<a
				href="/"
				class="rounded-lg title uppercase font-bold px-6 py-2 bg-[#ffffff] text-[#010434]"
			>
				Go back
			</a>
		</div>

		<h1 class="title font-bold text-5xl text-white mt-8">Focus Horizon</h1>
	</div>
</div>

<div class="max-w-lg mx-auto p-3 mt-4 flex flex-col gap-4">
	<div class="mb-4">
		<Separator title={'Activity history'} />
	</div>

	{#each data.documents as activity}
		{@const startAt = new Date(
			new Date(activity.$createdAt).getTime() - activity.minutes * 60 * 1000
		)}
		{@const year = startAt.getFullYear()}
		{@const month = startAt.getMonth() + 1}
		{@const day = startAt.getDate()}
		{@const hour = startAt.getHours()}
		{@const minute = startAt.getMinutes()}
		{@const second = startAt.getSeconds()}
		{@const endAt = new Date(activity.$createdAt)}
		{@const yearEndAt = endAt.getFullYear()}
		{@const monthEndAt = endAt.getMonth() + 1}
		{@const dayEndAt = endAt.getDate()}
		{@const hourEndAt = endAt.getHours()}
		{@const minuteEndAt = endAt.getMinutes()}
		{@const secondEndAt = endAt.getSeconds()}
		{@const formattedDate = `${day}.${month}.${year} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second} to ${dayEndAt}.${monthEndAt}.${yearEndAt} ${hourEndAt < 10 ? '0' + hourEndAt : hourEndAt}:${minuteEndAt < 10 ? '0' + minuteEndAt : minuteEndAt}:${secondEndAt < 10 ? '0' + secondEndAt : secondEndAt}`}
		<div class="p-3 rounded-lg border-[2px] border-[#364750] bg-[#131f24] text-[#6e848e]">
			<p class="text-sm uppercase font-bold text-[#6e848e] text-opacity-50 tracking-wide">
				{formattedDate}
			</p>
			<p class="text-lg mt-1">
				<span class="text-white break-keep" style="white-space:nowrap;">{activity.name}</span> was
				focused for {activity.minutes} minutes.
			</p>
		</div>
	{/each}
</div>
