import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';
import type { PageData } from './$types';

export let ssr = false;

export const load = async () => {
	const response = await databases.listDocuments('main', 'audit', [
		Query.limit(1000),
		Query.orderDesc('$createdAt')
	]);

	return {
		documents: response.documents
	};
};
