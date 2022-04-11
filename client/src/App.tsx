import './App.css';
import { AppShell, Button, Container, Group, Header, MenuLabel, SimpleGrid, Text } from '@mantine/core';
import { SearchInput } from './components/SearchInput';
import { CirclePlus } from 'tabler-icons-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Home } from './pages/Home';
import { NewPost } from './pages/NewPost';


function App() {
  return (
    <div className="App">
      <Router>
        <AppShell
          padding="md"
          // navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
          header={<Header height={60} p="xs">{
            <Container>
              <Group>
                <Link to='/'><Text align='left'>Blog Demo</Text></Link>
                <SearchInput />
                <Group position='right' noWrap>
                  <Link to='new'><Button leftIcon={<CirclePlus />}>Post new</Button></Link>
                </Group>
              </Group>
            </Container>
          }</Header>}
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewPost />} />
          </Routes>
        </AppShell>
      </Router>
    </div>
  );
}

export default App;
