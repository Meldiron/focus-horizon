import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { LayoutLoad } from './$types';

export let ssr = false;

export const load: LayoutLoad = async ({ url }) => {
	const KM_PER_MINUTE = 10;

	const user = url.searchParams.get('u') ?? null;

	const response = await databases.listDocuments('main', 'forestData', [Query.limit(100)]);

	response.documents = response.documents
		.filter((doc) => doc.$id != '4974446')
		.map((doc) => {
			return {
				...doc,
				meters: Math.floor((doc.minutes - doc.initMinutes) / KM_PER_MINUTE)
			};
		});

	return {
		document: response.documents.find((d) => d.name === user) ?? null,
		documents: response.documents.sort((a, b) => (a.meters > b.meters ? -1 : 1))
	};
};
