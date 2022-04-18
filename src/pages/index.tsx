import { Center, Loader, SimpleGrid } from '@mantine/core';
import { ResultCard } from '../components/ResultCard/ResultCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post } from '../models/post';
import { useRouter } from 'next/router';

export default function HomePage() {

  const { query } = useRouter();

  let [cards, setCards] = useState<Post[] | undefined>(undefined);

  const fetchData = async () => {
    const qStr = query.q ? query.q : '*';
    const posts = await axios.get(`/api/post?q=${qStr}`);
    setCards(posts.data);
  }

  useEffect(() => {
    fetchData();
  }, [query.q]);

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
