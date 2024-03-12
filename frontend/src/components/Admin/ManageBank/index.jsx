import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Container, Title, Divider, Loader, Flex, Box, Drawer, TextInput, Button } from '@mantine/core';
import {
  IconAt,
  IconPencil,
  IconTrash,
  IconUser
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import RingLoader from '../../RingLoader';
import { enqueueSnackbar } from 'notistack';
import { IconCake } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Formik } from 'formik';

const DisplayBankDetails = ({bankData}) => {
  console.log(bankData);
  const updateBank = async (values) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/bank/update/${bankData._id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(res.status);

    if (res.status === 200) {
      enqueueSnackbar('Bank Updated successfully', { variant: 'success' });
      //   navigate('/login');
      //   contactForm.reset();

    } else {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  }

  return <div style={{padding: 30}}>
      <Formik initialValues={bankData} onSubmit={updateBank}>
        {
          ({ values, errors, handleChange, handleSubmit }) => {

            return <form onSubmit={handleSubmit}>

              <TextInput mb="lg" withAsterisk label="Bank Name" placeholder="Bank Name" style={{width: '100%'}}  value={values.bankName} id='bankName' onChange={handleChange} />
              <TextInput mb="lg" withAsterisk label="Email Address" placeholder="Email Address" style={{width: '100%'}}  value={values.email} id='email' onChange={handleChange} />
              <TextInput mb="lg" withAsterisk label="Website" placeholder="Website" style={{width: '100%'}} value={values.website} id='website' onChange={handleChange} />
              <TextInput mb="lg" withAsterisk label="Branch" placeholder="Branch" style={{width: '100%'}} value={values.branch} id='branch' onChange={handleChange} />
              <TextInput mb="lg" withAsterisk label="Create Password" placeholder="Password" style={{width: '100%'}} value={values.password} id='password' onChange={handleChange} />


              <Button fullWidth mt="xl" size="md" type='submit'>
                Update Bank Details
              </Button>
            </form>
          }
        }
      </Formik>
    
  </div>

}

export function ManageBank() {

  const [bankList, setBankList] = useState([]);
  const [loading, setloading] = useState(false);
  const [drawerOpened, drawerStatus] = useDisclosure(false);

  const [selBank, setSelBank] = useState(null);

  const fetchBankData = async () => {
    setloading(true);
    const response = await fetch('http://localhost:5000/bank/getall');
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    setBankList(data);
    setloading(false);
  }

  useEffect(() => {
    fetchBankData();
  }, [])

  const deleteBank = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bank/delete/${id}`, {
      method: 'DELETE'
    });

    if (response.status === 200) {
      enqueueSnackbar('❌ Bank Deleted', { variant: 'success' });
      fetchBankData();

    } else {
      enqueueSnackbar('Some Error Occured', { variant: 'error' });
    }

    const data = await response.json();
    console.log(data);
  }

  const displayBanksData = () => {
    if (loading) {
      return <div className="text-center">
        <Loader size={30} />
        <p>Loading... Please Wait</p>
      </div>
    }

    if (bankList.length === 0) {
      return <h3>No Bank Data Found</h3>
    }

    return <Table.ScrollContainer mt={10} minWidth={500}>
      <Table verticalSpacing="md">

        <Table.Tbody>
          {
            bankList.map((item) => (
              <Table.Tr key={item._id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar size={40} src={item.avatar} radius={40} />
                    <div>
                      <Text fz="sm" fw={500}>
                        {item.bankName}
                      </Text>
                      <Text c="dimmed" fz="xs">
                        {item.branch}
                      </Text>
                    </div>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text fz="sm">{item.website}</Text>
                  <Text fz="xs" c="dimmed">
                    Official Website
                  </Text>
                </Table.Td>

                <Table.Td>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon onClick={() => {
                        drawerStatus.open();
                        setSelBank(item);
                      }} variant="subtle" color="gray">
                      <IconPencil  style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon onClick={e => deleteBank(item._id)} variant="subtle" color="red">
                      <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>

  }


  return (
    <>
      <Drawer
        position='right'
        opened={drawerOpened}
        onClose={drawerStatus.close}
        title="Update Bank Details"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {
          selBank !== null &&
          <DisplayBankDetails bankData={selBank} />
        }
      </Drawer>
      <Container size="lg">
        <Title order={1}>Manage Website Users</Title>
        <Divider my="lg" />
        {
          displayBanksData()
        }
      </Container>
    </>
  );
}