import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { AzureNamedKeyCredential, TableClient } from '@azure/data-tables';
const entityType = 'posts';

// Search related keys
const searchUrl = process.env.SEARCH_URL || '';
const searchKey = process.env.SEARCH_KEY || '';

// DB related keys
const tablesEndpoint = process.env.DB_ENDPOINT || '';
const dbAccountName = process.env.DB_ACCOUNT_NAME || '';
const dbAccountKey = process.env.DB_ACCOUNT_KEY || '';

const tableClient = new TableClient(
  `${tablesEndpoint}/${entityType}`,
  entityType,
  new AzureNamedKeyCredential(dbAccountName, dbAccountKey)
);

export default async function handler(req: any, res: any) {
  async function createPost() {
    const { title, content } = req.body;
    const id = uuidv4();
    const post: any = {
      partitionKey: 'post',
      rowKey: id,
      id: id,
      title: title,
      content: content,
    };

    await tableClient.createEntity(post);

    return id;
  }

  async function getPosts() {
    const response = await axios.get(
      `${searchUrl}/indexes/${entityType}/docs?api-version=2021-04-30-Preview&search=${req.query.q}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': searchKey,
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
