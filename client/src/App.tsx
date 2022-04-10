import './App.css';
import { Search } from 'tabler-icons-react';
import { AppShell, Header, SimpleGrid, Input } from '@mantine/core';
import { ResultCard } from './components/ResultCard';
import { SearchInput } from './components/SearchInput';

function App() {
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
    <div className="App">
      <AppShell
        padding="md"
        // navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
        header={<Header height={60} p="xs">{
          <SearchInput />
        }</Header>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        <SimpleGrid cols={3}>
          {createCards()}
        </SimpleGrid>
      </AppShell>
    </div>
  );
}

export default App;
