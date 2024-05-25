import { databases } from '$lib/appwrite';
import type { LayoutLoad } from './$types';

export let ssr = false;

export const load: LayoutLoad = async () => {
	const document = await databases.getDocument('main', 'forestData', 'g');
	return { document };
};
