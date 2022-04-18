import { Card, Group, Button, useMantineTheme, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { Post } from "../../models/post";

type Props = {
  data: Post;
}

export function ResultCard({ data }: Props) {

  const router = useRouter();
  const theme = useMantineTheme();

  function viewPost() {
    router.push(`/post/${data.id}`);
  }

  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Image src={`https://picsum.photos/200/300?random=${data.id}`} height={160} alt="Norway" />
      </Card.Section>

      <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
        <Text weight={500}>{data.title}</Text>
      </Group>

      <Text size="sm" style={{ lineHeight: 1.5 }}>
        {data.content}
      </Text>

      <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => viewPost()}>
        View
      </Button>
    </Card>
  )
}