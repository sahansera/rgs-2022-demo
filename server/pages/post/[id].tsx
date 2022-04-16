import { Badge, Box, Skeleton, Text, Title } from "@mantine/core";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../../models/post";

export default function ViewPost({ }) {
  const router = useRouter();
  const { id } = router.query;
  let [post, setPost] = useState<Post>();

  const getPost = async () => {
    const response = await axios.get(`/api/post/view?id=${id}`);
    setPost(response.data[0]);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Skeleton visible={!post} sx={{ maxWidth: 500 }} mx='auto'>
        <Box>
          <Title mb={15}>
            {post?.title}
          </Title>
          <Text mb={15} size="sm">{post?.content}</Text>
          <Title my={15} order={3}>Organizations</Title>
          {post?.organizations?.map(org => <Badge>{org}</Badge>)}
          <Title my={15} order={3}>Locations</Title>
          {post?.locations?.map(loc => <Badge color={'teal'}>{loc}</Badge>)}
          <Title my={15} order={3}>People</Title>
          {post?.people?.map(p => <Badge color={'grape'}>{p}</Badge>)}
          <Title my={15} order={3}>Keyphrases</Title>
          {post?.keyphrases?.map(k => <Badge color={'green'}>{k}</Badge>)}
        </Box>
      </Skeleton>
    </>
  );
}