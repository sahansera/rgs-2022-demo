import { AzureKeyCredential, SearchClient } from '@azure/search-documents';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const searchUrl = process.env.SEARCH_URL || '';
const searchAdminKey = process.env.SEARCH_ADMIN_KEY || '';
const searchIndex = 'posts';

const searchClient = new SearchClient(
  searchUrl,
  searchIndex,
  new AzureKeyCredential(searchAdminKey)
);

export default async function handler(req: any, res: any) {
  async function createPost() {
    const { title, content } = req.body;
    const id = uuidv4();
    const post = {
      id,
      title,
      content,
    };
    await searchClient.uploadDocuments([post]);
    return id;
  }

  async function getPosts() {
    const response = await axios.get(
      `${searchUrl}/indexes/${searchIndex}/docs?api-version=2019-05-06&search=*`,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': searchAdminKey,
        },
      }
    );

    return response.data.value;
  }

  if (req.method === 'POST') {
    const id = await createPost();
    res.status(200).json({ id });
  } else if (req.method === 'GET') {
    const response = await getPosts();
    res.status(200).json(response);
  } else {
    res.status(405).end();
  }
}
