import { Button, FileButton, Grid, Group, Image, TextInput, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconLock, IconUpload, IconUserSquareRounded } from "@tabler/icons-react";
import { useState } from "react";

const Profile = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('admin')));

  const profileForm = useForm({
    initialValues: currentUser
  }
  );

  const handleSubmitForm = async (values) => {
    console.log(values);
    // console.log(import.meta.env.VITE_API_URL);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/update`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(res.status);

    if (res.status === 200) {
      enqueueSnackbar('Profile Updated successfully', { variant: 'success' });
      contactForm.reset();

    } else {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }

  }

  return (
    <div>
      <Title order={1} mb="lg">Manage Profile</Title>
      <form onSubmit={profileForm.onSubmit(handleSubmitForm)}>
        <Grid gutter={{ base: 'xl' }}>
          <Grid.Col span={{ base: 12, md: 4 }}>

            <Image w="100%" h={300}
              fit="contain" src={`${import.meta.env.VITE_API_URL}/${currentUser.avatar}`} alt="" />

          </Grid.Col>
          <Grid.Col my="auto" h="100%" span={{ base: 12, md: 8 }}>

            <TextInput
              mb="lg"
              required
              label="Name"
              leftSection={<IconUserSquareRounded style={{ width: rem(16), height: rem(16) }} />}
              {...profileForm.getInputProps('name')}
              radius="md"
            />
            <TextInput
              mb="lg"
              required
              label="Email Address"
              leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
              {...profileForm.getInputProps('email')}
              radius="md"
            />
            <TextInput
              mb="lg"
              required
              label="Password"
              leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
              {...profileForm.getInputProps('password')}
              radius="md"
            />
            <Group mt="lg">
              <FileButton  accept="image/png,image/jpeg">
                {(props) => <Button color="red" radius="md" {...props} leftSection={<IconUpload size={14} />}> Upload Profile Image</Button> }
              </FileButton>
              <Button
                
                radius="md"
                type='submit'
              >Submit</Button>

            </Group>


          </Grid.Col>
        </Grid>
      </form>
    </div>
  )
}

export default Profile