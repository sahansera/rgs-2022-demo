import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorScheme, AppShell, Button, Container, Group, Header, Text } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { CirclePlus } from 'tabler-icons-react';
import { SearchInput } from '../components/SearchInput/SearchInput';
import Link from 'next/link';
import '../styles.css';
import { useRouter } from 'next/router';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const router = useRouter();

  const onSearch = async (query: string) => {
    // Redirect to queried home page
    router.push({
      pathname: '/',
      query: {
        q: query,
      },
    });
  };

  return (
    <>
      <Head>
        <title>React Global Summit '22</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <AppShell
            padding="md"
            header={
              <Header height={60} p="xs">
                <Container>
                  <Group style={{ justifyContent: 'center' }}>
                    <Link href='/'><Text align='left'>React Global Summit 2022</Text></Link>
                    <SearchInput onSearch={onSearch} />
                    <Group position='right' noWrap>
                      <Link href='/post/new'><Button leftIcon={<CirclePlus />}>Post new</Button></Link>
                    </Group>
                  </Group>
                </Container>
              </Header>
            }
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
          >
            <Component {...pageProps} />

          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
