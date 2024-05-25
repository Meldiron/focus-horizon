import { databases } from '$lib/appwrite';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const document = await databases.getDocument('main', 'forestData', '8328439');
	return { document };
};
