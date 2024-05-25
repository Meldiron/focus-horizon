import { Client, Databases } from 'appwrite';

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('focus-horizon');

export const databases = new Databases(client);
