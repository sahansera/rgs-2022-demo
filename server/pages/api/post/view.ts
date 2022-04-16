import axios from 'axios';
const entityType = 'posts';

// Search related keys
const searchUrl = process.env.SEARCH_URL || '';
const searchKey = process.env.SEARCH_KEY || '';

export default async function handler(req: any, res: any) {
  async function getPost() {
    const response = await axios.get(
      `${searchUrl}/indexes/${entityType}/docs?api-version=2021-04-30-Preview&search=${req.query.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': searchKey,
        },
      }
    );

    return response.data;
  }

  if (req.method === 'GET') {
    const response = await getPost();
    console.log(response);
    res.status(200).json(response.value);
  } else {
    res.status(405).end();
  }
}
