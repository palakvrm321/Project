import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Container, Title, Divider, Loader } from '@mantine/core';
import {
  IconTrash
} from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';

export function ManageApplication() {

  const [applicationList, setApplicationList] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchApplicationData = async () => {
    setloading(true);
    const response = await fetch('http://localhost:5000/application/getall');
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    setApplicationList(data);
    setloading(false);
  }

  useEffect(() => {
    fetchApplicationData();
  }, []);

  const deleteApplication = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/application/delete/${id}`, {
      method: 'DELETE'
    });

    if (response.status === 200) {
      enqueueSnackbar('❌ Application Deleted', { variant: 'success' });
      fetchApplicationData();

    } else {
      enqueueSnackbar('Some Error Occured', { variant: 'error' });
    }

    const data = await response.json();
    console.log(data);
  }

  const displayApplicationData = () => {
    if (loading) {
      return <div className="text-center">
        <Loader size={30} />
        <p>Loading... Please Wait</p>
      </div>
    }

    if (applicationList.length === 0) {
      return <h3>No Bank Data Found</h3>
    }

    return <Table.ScrollContainer mt={10} minWidth={800}>
      <Table verticalSpacing="md">

        <Table.Tbody>
          {
            applicationList.map((item) => (
              <Table.Tr key={item._id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar size={40} src={item.avatar} radius={40} />
                    <div>
                      <Text fz="sm" fw={500}>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text c="dimmed" fz="xs">
                        {item.email}
                      </Text>
                    </div>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text fz="sm">{item.creditScore}</Text>
                  <Text fz="xs" c="dimmed">
                    Credit Score
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fz="sm">{<TimeAgo
                    datetime={item.submitDate}
                    locale='en_IN'
                  />}</Text>
                  <Text fz="xs" c="dimmed">
                    Submitted
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="red">
                      <IconTrash onClick={e => deleteApplication(item._id)} style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
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
          displayApplicationData()
        }
      </Container>
    </>
  );
}