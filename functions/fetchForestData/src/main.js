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

		try {
			const oldDocument = await databases.getDocument('main', 'forestData', forestId);

			if (oldDocument.minutes < minutes) {
				await databases.updateDocument('main', 'forestData', forestId, {
					minutes,
					name,
				});

				const minutesBefore = oldDocument.minutes;
				await databases.createDocument('main', 'audit', ID.unique(), {
					userId: forestId,
					name,
					minutes: minutes - minutesBefore,
				});

				await discordNotification(minutes, name);
			}
		} catch (err) {
			await databases.createDocument('main', 'forestData', forestId, {
				minutes,
				initMinutes: minutes,
				name,
			});

			const minutesBefore = 0;
			await databases.createDocument('main', 'audit', ID.unique(), {
				userId: forestId,
				name,
				minutes: minutes - minutesBefore,
			});

			await discordNotification(minutes, name);
		}
	}

	return res.send('OK');
};

const discordNotification = async (minutes, name) => {
	const webhookUrl =
		'https://discord.com/api/webhooks/1440073944794402816/UXZ_icvGw87j4rJYs-Y2BcnolI1LBVCvrv42TvlX--aaygrg9IAnTw1tsv2LeKbeiVog';

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
		content: null,
		embeds: [
			{
				title: `[${minutes}min] ${name} planted a tree 🌳`,
				description: pings.map((id) => `<@${id}>`).join(' '),
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
