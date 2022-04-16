import { Box, Button, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification, updateNotification } from "@mantine/notifications";
import { CircleCheck } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const url = "/api/post";

export default function NewPost() {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      id: uuidv4(),
      title: '',
      content: '',
    },
  });

  type FormValues = typeof form.values;

  function notifyUser(shouldUpdate?: boolean) {
    if (shouldUpdate) {
      const data = {
        id: 'load-data',
        color: 'teal',
        title: 'Post Successful',
        message: 'Notification will close in 2 seconds, you can close this notification now',
        icon: <CircleCheck />,
        autoClose: 2000,
      };
      updateNotification(data);
    } else {
      const data = {
        id: 'load-data',
        loading: true,
        title: 'Posting...',
        message: 'Data will be loaded in 3 seconds',
        autoClose: false,
        disallowClose: true,
      };
      showNotification(data);
    }
  }

  async function handleSubmit(values: FormValues) {

    notifyUser();

    // POST data to the api/indexer
    const data = {
      id: values.id,
      title: values.title,
      content: values.content,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    notifyUser(true);

    // redirect to home
    router.push('/');
  }

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput name="title" label="Title"
          required
          placeholder="Your post's title"
          {...form.getInputProps('title')}
        />
        <Textarea name="content" label="Content"
          required
          minRows={10}
          placeholder="Write your post here"
          {...form.getInputProps('content')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}