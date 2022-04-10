import React from 'react';
import './App.css';
import { Sun, MoonStars, BrandTwitter, Search } from 'tabler-icons-react';
import { AppShell, Navbar, Header, Group, SimpleGrid, Card, Image, Text, Badge, Button, useMantineTheme, Input } from '@mantine/core';

function App() {
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  function createCards() {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      let val = Math.floor(Math.random() * Math.floor(10));
      cards.push(
        <Card shadow="sm" p="lg">
          <Card.Section>
            <Image src={`https://picsum.photos/200/300?random=${val}`} height={160} alt="Norway" />
          </Card.Section>

          <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            <Text weight={500}>Norway Fjord Adventures</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>

          <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>

          <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
            Book classic tour now
          </Button>
        </Card>
      );
    }
    return cards;
  }
  return (
    <div className="App">
      <AppShell
        padding="md"
        navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
        header={<Header height={60} p="xs">{
          <Input
            icon={<Search size={16} />}
            placeholder="Search"
            rightSectionWidth={70}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            rightSection={
              <Badge color="blue" variant="filled">
                new
              </Badge>
            }
          />
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
