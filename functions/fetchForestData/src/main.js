import { Client, Databases, ID } from 'node-appwrite';
import Axios from 'axios';

export default async ({ req, res }) => {
	const client = new Client()
		.setEndpoint('https://cloud.appwrite.io/v1')
		.setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
		.setKey(process.env.APPWRITE_API_KEY);

	const databases = new Databases(client);

	let forests = process.env.FOREST_IDS.split(',');

	if (req.bodyRaw) {
		forests = req.bodyRaw.split(',');
	}

	for (const forestId of forests) {
		const response = await Axios({
			method: 'GET',
			url: 'https://c88fef96.forestapp.cc/api/v1/users/' + forestId + '/profile',
			headers: {
				'User-Agent': 'Focus Horizon (Alpha), matejbaco2000@gmail.com',
			},
		});

		const minutes = response.data.total_minute;
		const name = response.data.name ?? 'Unnamed';

		let diff = minutes;

		try {
			const oldDocument = await databases.getDocument('main', 'forestData', forestId);

			if (oldDocument.minutes < minutes) {
				await databases.updateDocument('main', 'forestData', forestId, {
					minutes,
					name,
				});

				const minutesBefore = oldDocument.minutes;
				diff = minutes - minutesBefore;
				await databases.createDocument('main', 'audit', ID.unique(), {
					userId: forestId,
					name,
					minutes: diff,
				});

				await discordNotification(diff, name);
			}
		} catch (err) {
			await databases.createDocument('main', 'forestData', forestId, {
				minutes,
				initMinutes: minutes,
				name,
			});

			await databases.createDocument('main', 'audit', ID.unique(), {
				userId: forestId,
				name,
				minutes: diff,
			});

			await discordNotification(diff, name);
		}
	}

	return res.send('OK');
};

const discordNotification = async (minutes, name) => {
	const webhookUrl = process.env.DISCORD_WEBHOOK;

	let pingMatej = name === 'Diana Mohamedová' || name === 'annnnyyýya';
	let pingAnet = name === 'Diana Mohamedová';

	const pings = [];
	if (pingMatej) {
		pings.push('287294735054274560');
	}
	if (pingAnet) {
		pings.push('1152120064154288169');
	}

	const payload = {
		content: pings.map((id) => `<@${id}>`).join(' '),
		embeds: [
			{
				title: `[${minutes}min] ${name} planted a tree 🌳`,
				color: 1547019,
			},
		],
		attachments: [],
	};

	try {
		await Axios({
			method: 'POST',
			url: webhookUrl,
			headers: {
				'Content-Type': 'application/json',
			},
			data: payload,
		});
	} catch (err) {
		console.error('Discord notification failed:', err);
	}
};
