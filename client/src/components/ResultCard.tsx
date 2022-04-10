import { Card, Group, Button, useMantineTheme, Image, Text, Badge } from "@mantine/core";

type Props = {
  id: number;
}

export function ResultCard({ id }: Props) {

  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Image src={`https://picsum.photos/200/300?random=${id}`} height={160} alt="Norway" />
      </Card.Section>

      <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
        <Text weight={500}>Norway Fjord Adventures</Text>
        {/* <Badge color="pink" variant="light">
          On Sale
        </Badge> */}
      </Group>

      <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        View
      </Button>
    </Card>
  )
}