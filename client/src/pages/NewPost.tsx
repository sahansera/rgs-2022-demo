import { Box, Button, Checkbox, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export function NewPost() {

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
    },
  });

  type FormValues = typeof form.values;

  // const handleSubmit = (values: FormValues) => console.log(values);

  function handleSubmit(values: FormValues) {
    // Submit the values to the indexer service

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