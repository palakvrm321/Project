
import { useState } from 'react';
import { Stepper, Button, Group, Container, Stack, PasswordInput, TextInput, rem, Grid, Select, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertTriangleFilled, IconAt, IconBuilding, IconBuildingBank, IconBuildingSkyscraper, IconCake, IconChefHat, IconKey, IconLetterI, IconMapPin, IconPhoneCall, IconPin, IconRoadSign, IconUserCircle, IconUserDollar, IconUserSquareRounded } from '@tabler/icons-react';
import { Banner } from '../Banner';
import { FileUploader } from '../FileUploader';
import { IconCashBanknote } from '@tabler/icons-react';
import { IconCreditCardRefund } from '@tabler/icons-react';
import { Dots } from '../Dots';
import dotClasses from '../Dots/dots.module.css';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';


const ApplicationForm = () => {

    const [active, setActive] = useState(0);
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [selFile, setSelFile] = useState('');

    const formStep1 = useForm
        ({
            initialValues: {
                user: currentUser._id,
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                email: '',
                phoneNumber: '',
                street: '',
                city: '',
                state: '',
                pinCode: '',
                employerName: '',
                jobTitle: '',
                income: ''
            },
            validate: {
                firstName: (value) => {
                    if (!value) {
                        return 'First name is required';
                    }
                    if (value.length < 3) {
                        return 'First name is too short';
                    }
                    return null;
                },

                lastName: (value) => {
                    if (!value) {
                        return 'Last name is required';
                    }
                    if (value.length < 3) {
                        return 'Last name is too short';
                    }
                    return null;
                },

                dateOfBirth: (value) => {
                    if (!value) {
                        return 'Date of Birth is required';
                    }
                    if (value.length < 3) {
                        return 'Date of Birth is too short';
                    }
                    return null;

                },

                email: (value) => {
                    if (!value) {
                        return 'Email is required';
                    }
                    if (value.length < 3) {
                        return 'Email is too short';
                    }
                    return null;
                },

                phoneNumber: (value) => {
                    if (!value) {
                        return 'Phone Number is required';
                    }
                    if (value.length < 3) {
                        return 'Phone Number is too short';
                    }
                    return null;
                },

                street: (value) => {
                    if (!value) {
                        return 'Street is required';
                    }
                    if (value.length < 3) {
                        return 'Street is too short';
                    }
                    return null;
                },

                city: (value) => {
                    if (!value) {
                        return 'City is required';
                    }
                    if (value.length < 3) {
                        return 'City is too short';
                    }
                    return null;
                },

                state: (value) => {
                    if (!value) {
                        return 'State is required';
                    }
                    if (value.length < 3) {
                        return 'State is too short';
                    }
                    return null;
                },

                pinCode: (value) => {
                    if (!value) {
                        return 'Pin Code is required';
                    }
                    if (value.length < 3) {
                        return 'Pin Code is too short';
                    }
                    return null;
                },

                employerName: (value) => {
                    if (!value) {
                        return 'Employer Name is required';
                    }
                    if (value.length < 3) {
                        return 'Employer Name is too short';
                    }
                    return null;
                },

                jobTitle: (value) => {
                    if (!value) {
                        return 'Job Title is required';
                    }
                    if (value.length < 3) {
                        return 'Job Title is too short';
                    }
                    return null;
                },

                income: (value) => {
                    if (!value) {
                        return 'Income is required';
                    }
                    if (value.length < 3) {
                        return 'Income is too short';
                    }
                    return null;
                },
            },
        });

    const formStep2 = useForm
        ({
            initialValues: {
                bankName: '',
                branch: '',
                ifscCode: '',
                accountNumber: '',
                submitDate: new Date()
            },
            validate: {
                bankName: (value) => {
                    if (!value) {
                        return 'Bank Name is required';
                    }
                    if (value.length < 3) {
                        return 'Bank Name is too short';
                    }
                    return null;
                },
                branch: (value) => {
                    if (!value) {
                        return 'Branch is required';
                    }
                    if (value.length < 3) {
                        return 'Branch is too short';
                    }
                    return null;
                },
                ifscCode: (value) => {
                    if (!value) {
                        return 'IFSC Code is required';
                    }
                    if (value.length < 3) {
                        return 'IFSC Code is too short';
                    }
                    return null;
                },
                accountNumber: (value) => {
                    if (!value) {
                        return 'Account Number is required';
                    }
                    if (value.length < 3) {
                        return 'Account Number is too short';
                    }
                    return null;
                }
            }
        });

    const formStep3 = useForm
        ({
            initialValues: {
                creditScoreReport: '',
                creditScore: 0,
                creditLimit: 0,
            },

            validate: {
                creditScore: (value) => {
                    if (!value) {
                        return 'Credit Score is required';
                    }
                    if (value.length < 3) {
                        return 'Credit Score is too short';
                    }
                    return null;
                }

            }
        });


    const handleStep1Submit = async (values) => {
        console.log(values);
    }

    const handleStep2Submit = async (values) => {
        console.log(values);

    }

    const generateVisaCardNumber = () => {
        let cardNumber = '';
        for (let i = 0; i < 16; i++) {
            cardNumber += Math.floor(Math.random() * 10);
        }
        return cardNumber;
    }

    const getExpiryDate = () => {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 3);
        return date;
    }

    const handleStep3Submit = async (values) => {
        console.log(values);
        // console.log(formStep1.values);
        console.log(selFile);
        if (!selFile) {
            enqueueSnackbar('Please upload Credit Score Report', { variant: 'error' });
            return;
        }

        values = {
            ...formStep1.values, ...formStep2.values, ...values, creditScoreReport: selFile,
            submitDate: new Date(),
            cardNumber: generateVisaCardNumber(),
            cardExpiry: getExpiryDate(),
            cardCVV: Math.floor(Math.random() * 1000).toString().padStart(3, '0')
        };
        console.log(values);
        // return;
        // console.log(import.meta.env.VITE_API_URL);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/application/add`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(res.status);

        if (res.status === 200) {
            enqueueSnackbar('Application submitted successfully', { variant: 'success' });
            navigate('/user/applicationstatus');
        } else {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }

    }

    const step1Form = () => {
        return <form onSubmit={formStep1.onSubmit(handleStep1Submit)}>
            <Banner title={"Personal Details"} description={"Fill all your personal details correctly to avoid any kind of issues in future."} backgroundPosition={'bottom'} imageUrl={'https://creditkarma-cms.imgix.net/wp-content/uploads/2018/02/credit-card-approval.jpg?w=1024&auto=compress'} />
            <Stack mt="lg">
                <Grid>
                    <Grid.Col span={6}>

                        <TextInput
                            required
                            label="First Name"
                            placeholder="John"
                            leftSection={<IconUserSquareRounded style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('firstName')}
                            radius="md"
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            required
                            label="Last Name"
                            placeholder="Doe"
                            leftSection={<IconUserSquareRounded style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('lastName')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>

                        {/* <DateInput
                            required

                            label="Date of Birth"
                            placeholder="DD/MM/YYYY"
                            leftSection={<IconCake style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('dateOfBirth')}
                            radius="md"
                        /> */}
                        <TextInput
                            required
                            type='date'
                            label="Date Of Birth"
                            placeholder="DD/MM/YYYY"
                            leftSection={<IconCake style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('dateOfBirth')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <TextInput
                            required
                            label="Email"
                            placeholder=""
                            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('email')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <TextInput
                            required
                            label="Phone Number"
                            placeholder=""
                            leftSection={<IconPhoneCall style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('phoneNumber')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <TextInput
                            required
                            label="Street"
                            placeholder=""
                            leftSection={<IconRoadSign style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('street')}
                            radius="md"
                        />
                    </Grid.Col>


                    <Grid.Col span={3}>
                        <TextInput
                            required
                            label="City"
                            placeholder=""
                            leftSection={<IconBuildingSkyscraper style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('city')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <TextInput
                            required
                            label="State"
                            placeholder=""
                            leftSection={<IconMapPin style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('state')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <TextInput
                            required
                            label="Pin Code"
                            placeholder=""
                            leftSection={<IconPin style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('pinCode')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <TextInput
                            required
                            label="Employer Name"
                            placeholder=""
                            leftSection={<IconUserDollar style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('employerName')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <TextInput
                            required
                            label="Job Title"
                            placeholder=""
                            leftSection={<IconChefHat style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('jobTitle')}
                            radius="md"
                        />

                    </Grid.Col>

                    <Grid.Col span={6}>
                        <TextInput
                            required
                            label="Income"
                            placeholder=""
                            leftSection={<IconCashBanknote style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep1.getInputProps('income')}
                            radius="md"
                        />
                    </Grid.Col>



                </Grid>
            </Stack>
        </form>
    }


    const step2Form = () => {
        return <form onSubmit={formStep2.onSubmit(handleStep2Submit)}>
            <Banner
                title={"Bank Details"}
                description={"Bank details for credit card request application"}
                backgroundPosition={'center'}
                imageUrl={'https://cardinsider.com/wp-content/uploads/2022/05/how-to-link-credit-card-to-bank-account-Post.png'} />
            <Stack mt="xl">
                <Grid>
                    <Grid.Col span={12}>

                        <Select
                            required
                            label="Select Bank"
                            placeholder="Pick value"
                            data={["HDFC", "ICICI", "SBI", "Axis", "Kotak"]}
                            leftSection={<IconBuildingBank style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep2.getInputProps('bankName')}
                            radius="md"
                        />

                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            required
                            label="Branch"
                            placeholder=""
                            leftSection={<IconBuilding style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep2.getInputProps('branch')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <TextInput
                            required
                            label="IFSC Code"
                            placeholder=""
                            leftSection={<IconLetterI style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep2.getInputProps('ifscCode')}
                            radius="md"
                        />
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <TextInput
                            required
                            label="Account Number"
                            placeholder=""
                            leftSection={<IconUserCircle style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep2.getInputProps('accountNumber')}
                            radius="md"
                        />
                    </Grid.Col>



                </Grid>

            </Stack>

            {/* <Group justify="space-between" mt="xl">
                <Button type="submit" radius="xl">
                    Next
                </Button>
            </Group> */}
        </form>
    }

    const step3Form = () => {
        return <form onSubmit={formStep3.onSubmit(handleStep3Submit)}>
            <Banner title={"Credit Score Report"} description={"Provide Credit Score History and Report for assessing your creditworthiness"} backgroundPosition={'center'} imageUrl={'https://vakilsearch.com/blog/wp-content/uploads/2023/10/What-Is-A-Good-Credit-Score_.jpg'} />
            <Stack mt="xl">
                <Grid mb="lg">
                    <Grid.Col span={6}>
                        <TextInput
                            required
                            label="Credit Score"
                            description="Enter a value between 300 to 1000"
                            placeholder=""
                            leftSection={<IconCreditCardRefund style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep3.getInputProps('creditScore')}
                            radius="md"
                        />
                    </Grid.Col>

                    {/* <Grid.Col span={6}>
                        <TextInput
                            required
                            label="Credit Limit"
                            description="Enter your credit limit"
                            placeholder=""
                            leftSection={<IconAlertTriangleFilled style={{ width: rem(16), height: rem(16) }} />}
                            {...formStep3.getInputProps('creditLimit')}
                            radius="md"
                        />
                    </Grid.Col> */}

                </Grid>

                <FileUploader setSelFile={setSelFile} />

                <a href="https://www.cibil.com/freecibilscore" target='_blank'>
                    <Text c='blue' mt='lg' style={{ textDecoration: 'underline' }}>Click here to get your Credit Score</Text>
                </a>
            </Stack>

            <Group justify="space-between" mt="xl">
                <Button type="submit" radius="xl">
                    Submit Form
                </Button>
            </Group>
        </form>
    }

    const isStep1Valid = () => {
        formStep1.validate();
        return formStep1.isValid();

    };

    const isStep2Valid = () => {
        formStep2.validate();
        return formStep2.isValid();
    };

    const isStep3Valid = () => {
        formStep3.validate();
        return formStep3.isValid();
    }

    // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const nextStep = () => {
        let isValid = false;

        switch (active) {
            case 0:
                isValid = isStep1Valid();
                break;
            case 1:
                isValid = isStep2Valid();
                break;
            case 2:
                isValid = isStep3Valid();
                break;
        }

        setActive((current) => ((current < 3) && isValid ? current + 1 : current))

    };

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Container mt="lg" pb='lg'>
                <Dots className={dotClasses.dots} style={{ left: 60, top: 100 }} />
                <Dots className={dotClasses.dots} style={{ left: 20, top: 200 }} />
                <Dots className={dotClasses.dots} style={{ right: 60, top: 100 }} />
                <Dots className={dotClasses.dots} style={{ right: 100, bottom: 50 }} />

                <h1 className='display-3 fw-bold'>Fill Credit Card Application</h1>

                <Stepper active={active} onStepClick={setActive}>
                    <Stepper.Step label="Personal Details" description="Create an account">
                        {step1Form()}
                    </Stepper.Step>
                    <Stepper.Step label="Bank Details" description="To apply Credit Card">
                        {step2Form()}
                    </Stepper.Step>
                    <Stepper.Step label="Credit Score" description="Credit Score details">
                        {step3Form()}
                    </Stepper.Step>
                    <Stepper.Completed>
                        Completed, click back button to get to previous step
                    </Stepper.Completed>
                </Stepper>

                <Group justify="center" m="xl">
                    {
                        active > 0 && (
                            <Button variant="default" onClick={prevStep}>Prev Step</Button>
                        )
                    }
                    {
                        active < 2 && (
                            <Button variant="filled" onClick={nextStep}>Next Step</Button>
                        )
                    }
                </Group>
            </Container>
        </>
    );
}
export default ApplicationForm;
