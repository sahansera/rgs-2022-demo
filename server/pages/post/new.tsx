import { Box, Button, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification, updateNotification } from "@mantine/notifications";
import { CircleCheck } from 'tabler-icons-react';

const url = "/api/indexer";

export default function NewPost() {

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
    },
  });

  type FormValues = typeof form.values;

  async function handleSubmit(values: FormValues) {

    showNotification({
      id: 'load-data',
      loading: true,
      title: 'Posting...',
      message: 'Data will be loaded in 3 seconds, you cannot close this yet',
      autoClose: false,
      disallowClose: true,
    });

    // POST data to the api/indexer
    const data = {
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

    updateNotification({
      id: 'load-data',
      color: 'teal',
      title: 'Data was loaded',
      message: 'Notification will close in 2 seconds, you can close this notification now',
      icon: <CircleCheck />,
      autoClose: 2000,
    });

    // redirect to home
    window.location.href = '/';

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