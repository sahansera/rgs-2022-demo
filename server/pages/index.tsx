import { Center, Loader, SimpleGrid } from '@mantine/core';
import { ResultCard } from '../components/ResultCard/ResultCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post } from '../models/post';

export default function HomePage() {

  let [cards, setCards] = useState<Post[] | undefined>(undefined);

  const fetchData = async () => {
    const posts = await axios.get('/api/indexer');
    setCards(posts.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!cards && <Center>
        <Loader variant='dots' />
      </Center>}
      <SimpleGrid cols={3}>
        {cards && cards.map(card => <ResultCard key={card.id} data={card} />)}
      </SimpleGrid>
    </>
  );
}
