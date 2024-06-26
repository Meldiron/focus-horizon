import { Client, Databases, ID } from 'node-appwrite';
import Axios from 'axios';

export default async ({ req, res, log, error }) => {
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
      url:
        'https://c88fef96.forestapp.cc/api/v1/users/' + forestId + '/profile',
      headers: {
        'User-Agent': 'Focus Horizon (Alpha), matejbaco2000@gmail.com',
      },
    });

    const minutes = response.data.total_minute;
    const name = response.data.name ?? 'Unnamed';

    try {
      const oldDocument = await databases.getDocument(
        'main',
        'forestData',
        forestId
      );

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
    }
  }

  return res.send('OK');
};
