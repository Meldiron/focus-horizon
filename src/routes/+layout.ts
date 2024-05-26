import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { LayoutLoad } from './$types';

export let ssr = false;

export const load: LayoutLoad = async ({ url }) => {
	const user = url.searchParams.get('u') ?? 'Matej Baco';

	const response = await databases.listDocuments('main', 'forestData', [Query.limit(100)]);

	response.documents = response.documents.map((doc) => {
		return {
			...doc,
			meters: Math.floor((doc.minutes - doc.initMinutes) / 3)
		};
	});

	return {
		document: response.documents.find((d) => d.name === user) ?? {
			name: 'No user',
			minutes: 0,
			initMinutes: 0
		},
		documents: response.documents
	};
};
