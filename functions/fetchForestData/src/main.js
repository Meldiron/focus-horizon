import { Client, Databases } from 'node-appwrite';
import Axios from 'axios';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  const forestId = '8328439';

  const response = await Axios({
    method: 'GET',
    url: 'https://c88fef96.forestapp.cc/api/v1/users/' + forestId + '/profile',
  });

  const minutes = response.data.total_minute;

  try {
    await databases.updateDocument('main', 'forestData', forestId, {
      minutes,
    });
  } catch (err) {
    await databases.createDocument('main', 'forestData', forestId, {
      minutes,
    });
  }

  res.send('OK');
};
