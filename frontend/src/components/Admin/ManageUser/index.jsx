import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Container, Title, Divider, Loader } from '@mantine/core';
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
} from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';

const DisplayUserDetails = (userData) => {

  return <div className={classes.wrapper}>
    <Flex gap="sm" align="center" mb="md" >
      <Box>
        <IconUser color='white' />
      </Box>
      <div>
        <Text size="xs" className={classes.title}>
          Name
        </Text>
        <Text className={classes.description}>{userData.name}</Text>
      </div>
    </Flex>
    <Flex gap="sm" align="center" mb="md" >
      <Box>
        <IconAt color='white' />
      </Box>
      <div>
        <Text size="xs" className={classes.title}>
          Email
        </Text>
        <Text className={classes.description}>{userData.email}</Text>
      </div>
    </Flex>
  </div>

}

const DeleteForm = ({ close, user, setModalType, refreshData }) => {


  const deleteSubmit = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/delete/${user._id}`, {
      method: 'DELETE'
    });

    if (response.status === 200) {
      enqueueSnackbar('❌ User Deleted', { variant: 'success' });
      close();
      setModalType('');
      refreshData();

    } else {
      enqueueSnackbar('Some Error Occured', { variant: 'error' });
    }

    const data = await response.json();
    console.log(data);
  }


  return <>
    <Text>Are you sure you want to delete this user?</Text>
    <Button
      variant="outline"
      color="red"
      style={{ marginRight: '10px' }}
      onClick={close}
    >
      Cancel
    </Button>
    <Button variant="outline" color="red" onClick={deleteSubmit}>
      Delete
    </Button>
  </>
}

export function ManageUser() {

  const [userList, setUserList] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchUserData = async () => {
    setloading(true);
    const response = await fetch('http://localhost:5000/user/getall');
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    setUserList(data);
    setloading(false);
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  const deleteUser = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/delete/${id}`, {
      method: 'DELETE'
    });

    if (response.status === 200) {
      enqueueSnackbar('❌ User Deleted', { variant: 'success' });
      fetchUserData();

    } else {
      enqueueSnackbar('Some Error Occured', { variant: 'error' });
    }

    const data = await response.json();
    console.log(data);
  }

  const displayUsersData = () => {
    if (loading) {
      return <div className="text-center">
        <Loader size={30} />
        <p>Loading... Please Wait</p>
      </div>
    }

    if (userList.length === 0) {
      return <h3>No User Data Found</h3>
    }

    return <Table.ScrollContainer mt={10} minWidth={400}>
      <Table verticalSpacing="md">

        <Table.Tbody>
          {
            userList.map((item) => (
              <Table.Tr key={item._id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar size={40} src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`} radius={40} />
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
                  {/* <Text fz="sm">{item.website}</Text> */}
                  <Text fz="xs" c="dimmed">
                    {item.role}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fz="xs" c="dimmed">
                    Registered On
                  </Text>
                  <Text fz="sm">{new Date(item.createdAt).toLocaleDateString()}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="blue">
                      <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon onClick={e => deleteUser(item._id)} variant="subtle" color="red">
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
      <Container size="lg">
        <Title order={1}>Manage Website Users</Title>
        <Divider my="lg" />
        {
          displayUsersData()
        }
      </Container>
    </>
  );
}