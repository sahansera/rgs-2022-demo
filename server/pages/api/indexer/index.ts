import { AzureKeyCredential, SearchClient } from '@azure/search-documents';
import { v4 as uuidv4 } from 'uuid';

const searchUrl = process.env.SEARCH_URL || '';
const searchAdminKey = process.env.SEARCH_ADMIN_KEY || '';
const searchIndex = 'posts';

const searchClient = new SearchClient(
  searchUrl,
  searchIndex,
  new AzureKeyCredential(searchAdminKey)
);

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const id = uuidv4();
    const post = {
      id,
      title,
      content,
    };
    await searchClient.uploadDocuments([post]);
    res.status(200).json({ id });
  } else {
    res.status(405).end();
  }
}
