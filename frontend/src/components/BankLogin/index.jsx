import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Group,
    Button,
    Checkbox,
    Anchor,
    Stack,
    Container,
    rem,
    Paper,
    useMantineTheme,
    useComputedColorScheme,
    Title,
} from '@mantine/core';
import { IconAt, IconKey, IconUser } from '@tabler/icons-react';
import classes from './banklogin.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export function BankLogin() {
    const [type, toggle] = useToggle(['login', 'register']);

    const [gradient, setGradient] = useState('linear-gradient(0deg, #242424f0, #000000e0)');

    const theme = useMantineTheme();

    const navigate = useNavigate();

    const computedColorScheme = useComputedColorScheme('auto', { getInitialValueInEffect: true });

    useEffect(() => {
        console.log(theme.colorScheme);
        if (theme.colorScheme === 'dark') {
            setGradient('linear-gradient(0deg, #000000f7, #000000f7)');
        } else {
            setGradient('linear-gradient(0deg, #ff0000f7, #000000f7)');
        }
    }, [])

    const loginForm = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 3 ? 'Password is too short' : null)
        },
    });

    const handleLoginSubmit = async (values) => {
        console.log(values);
        // console.log(import.meta.env.VITE_API_URL);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/bank/auth`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(res.status);

        if (res.status === 200) {
            enqueueSnackbar('Logged in successfully', { variant: 'success' });

            const data = await res.json();
            sessionStorage.setItem('bank', JSON.stringify(data));
            // setLoggedIn(true);
            // resetForm();
            navigate('/bank/approveapplication');

        } else if (res.status === 401) {
            enqueueSnackbar('Invalid credentials', { variant: 'error' });

        } else {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
    }

    return (
        <Paper className={classes.bg} style={{
            backgroundImage: `linear-gradient(0deg, ${computedColorScheme==='dark' ? '#000000e0, #000000e0' : '#ffffff8c, #ffffff8c'}), url("https://images.livemint.com/img/2021/01/17/1600x900/PTI30-03-2020_000065B_1585738603793_1610864931154.jpg")`
        }}>
            <Container w={'100%'} size={460}>
                <Title mb="xl" order={2} style={{ textAlign: 'center' }}>
                    Bank Login
                </Title>
                <form onSubmit={loginForm.onSubmit(handleLoginSubmit)}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                            {...loginForm.getInputProps('email')}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            leftSection={<IconKey style={{ width: rem(16), height: rem(16) }} />}
                            {...loginForm.getInputProps('password')}
                            radius="md"
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component={Link} to="/signup" c="dimmed" size="xs">
                            Don't have an account? Register
                        </Anchor>
                        <Button type="submit" radius="xl">
                            Login
                        </Button>
                    </Group>
                </form>
            </Container>
        </Paper>
    );
}
