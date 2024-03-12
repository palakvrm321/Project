import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Container, Title, Divider, Loader } from '@mantine/core';
import {
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

export function ManageContact() {

  const [contactList, setContactList] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchContactData = async () => {
    setloading(true);
    const response = await fetch('http://localhost:5000/contact/getall');
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    setContactList(data);
    setloading(false);
  }

  useEffect(() => {
    fetchContactData();
  }, [])

  const deleteContact = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/delete/${id}`, {
      method: 'DELETE'
    });

    if (response.status === 200) {
      enqueueSnackbar('❌ Contact Deleted', { variant: 'success' });
      fetchContactData();

    } else {
      enqueueSnackbar('Some Error Occured', { variant: 'error' });
    }

    const data = await response.json();
    console.log(data);
  }

  const displayContactsData = () => {
    if (loading) {
      return <div className="text-center">
        <Loader size={30} />
        <p>Loading... Please Wait</p>
      </div>
    }

    if (contactList.length === 0) {
      return <h3>No Contact Data Found</h3>
    }

    return <Table.ScrollContainer mt={10} minWidth={400}>
      <Table verticalSpacing="md">

        <Table.Tbody>
          {
            contactList.map((item) => (
              <Table.Tr key={item._id}>
                <Table.Td>
                  <Group gap="sm">
                    <div>
                    <Text fz="sm" fw={500}>
                      {item.name}
                    </Text>
                    <Text c="dimmed" fz="xs">
                      {item.email}
                    </Text>
                  </div>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text fz="xs" c="dimmed">
                    {item.role}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fz="xs" c="dimmed">
                    Queried On
                  </Text>
                  <Text fz="sm">{new Date(item.createdAt).toLocaleDateString()}</Text>
                </Table.Td>
                <Table.Td>
                  <Text fz="sm">{item.message}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon onClick={e => deleteContact(item._id)} variant="subtle" color="red">
                      <IconTrash   style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
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
      <Container size="lg">
        <Title order={1}>View User Queries</Title>
        <Divider my="lg" />
        {
          displayContactsData()
        }
      </Container>
    </>
  );
}