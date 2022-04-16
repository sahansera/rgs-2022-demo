import { Badge, Box, Text } from "@mantine/core";
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
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Text mb={15} size="xl">
        {post?.title}
      </Text>
      <Text mb={15} size="xs">{post?.content}</Text>
      <Text mb={15} size="xs">Organizations</Text>
      {post?.organizations?.map(org => <Badge>{org}</Badge>)}
      <Text mt={15} size="xs">Locations</Text>
      {post?.locations?.map(org => <Badge>{org}</Badge>)}
      <Text mt={15} size="xs">People</Text>
      {post?.people?.map(org => <Badge>{org}</Badge>)}
      <Text mt={15} size="xs">Keyphrases</Text>
      {post?.keyphrases?.map(org => <Badge>{org}</Badge>)}
    </Box>
  );
}