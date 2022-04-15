import { SimpleGrid } from '@mantine/core';
import { ResultCard } from '../components/ResultCard/ResultCard';

export default function HomePage() {
  function createCards() {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      let val = Math.floor(Math.random() * Math.floor(10));
      cards.push(
        <ResultCard key={i} id={val} />
      );
    }
    return cards;
  }

  return (
    <>
      <SimpleGrid cols={3}>
        {createCards()}
      </SimpleGrid>
    </>
  );
}
