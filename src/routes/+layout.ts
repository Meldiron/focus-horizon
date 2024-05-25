import { databases } from '$lib/appwrite';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const document = await databases.getDocument('main', 'forestData', '4974446');
	return { document };
};
