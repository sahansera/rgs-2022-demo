import { SearchClient, AzureKeyCredential } from '@azure/search-documents';
import { SimpleGrid } from '@mantine/core';
import { ResultCard } from '../components/ResultCard/ResultCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post } from '../models/post';

export default function HomePage() {

  let [cards, setCards] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      const posts = await axios.get('/api/indexer');
      setCards(posts.data);
    }
    fetchData();
  });

  return (
    <>
      <SimpleGrid cols={3}>
        {cards && cards.map(card => <ResultCard key={card.id} data={card} />)}
      </SimpleGrid>
    </>
  );
}
