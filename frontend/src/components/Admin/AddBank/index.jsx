import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Grid,
} from '@mantine/core';
import classes from './addbank.module.css';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { enqueueSnackbar } from 'notistack';

export function AddBank() {

  const signupForm = useForm({
    initialValues: {
      password: '',
      bankName: '',
      website: '',
      branch: '',
      createdAt: new Date(),
    },
    validate: {
      bankName: (value) => (value.length < 3 ? 'Bank Name is too short' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      website: (value) => (value.length < 3 ? 'Website is too short' : null),
      branch: (value) => (value.length < 3 ? 'Branch is too short' : null),
      password: (value) => (value.length < 3 ? 'Password is too short' : null),
    },
  });

  const handleSubmitForm = async (values) => {
    console.log(values);
    // console.log(import.meta.env.VITE_API_URL);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/bank/add`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(res.status);

    if (res.status === 200) {
      enqueueSnackbar('Bank added successfully', { variant: 'success' });
      signupForm.reset();
    } else {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }

  }

  return (
    <div className={classes.wrapper}>
      <Grid className={classes.grid} justify="center" align='stretch'>
        <Grid.Col span={{sm: 10, md: 6}}>

          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
              Add New Bank Details
            </Title>
            <form onSubmit={signupForm.onSubmit(handleSubmitForm)}>
              {/* <TextInput mb="lg" withAsterisk label="Full Name" placeholder="FirstName LastName" size="md" {...signupForm.getInputProps('name')} />
              <TextInput mb="lg" withAsterisk label="Email address" placeholder="yourmail@gmail.com" size="md" {...signupForm.getInputProps('email')} />
              <PasswordInput mb="xl" withAsterisk label="Password" placeholder="Your password" size="md" {...signupForm.getInputProps('password')} /> */}

              <TextInput mb="lg" withAsterisk label="Bank Name" placeholder="Bank Name" size="md" {...signupForm.getInputProps('bankName')} />
              <TextInput mb="lg" withAsterisk label="Email Address" placeholder="Email Address" size="md" {...signupForm.getInputProps('email')} />
              <TextInput mb="lg" withAsterisk label="Website" placeholder="Website" size="md" {...signupForm.getInputProps('website')} />
              <TextInput mb="lg" withAsterisk label="Branch" placeholder="Branch" size="md" {...signupForm.getInputProps('branch')} />
              <TextInput mb="lg" withAsterisk label="Create Password" placeholder="Password" size="md" {...signupForm.getInputProps('password')} />


              <Button fullWidth mt="xl" size="md" type='submit'>
                Add Bank
              </Button>
            </form>
          </Paper>
        </Grid.Col>

        {/* <Grid.Col p={0} span={8} md={6} lg={4} sm={12} className={classes.info_bg}>
          <div style={{ padding: 50 }}>

          </div>
        </Grid.Col> */}
      </Grid>
    </div>
  );
}