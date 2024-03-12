import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Container, Title, Divider, Loader, Textarea, Modal, Button, Badge, Card, Drawer, Box, Flex, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
  IconX,
  IconCheck,
  IconUser,
  IconAt,
  IconCake,
  IconPhone,
} from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import TimeAgo from 'timeago-react';
import classes from './approve.module.css';
import { IconBuilding } from '@tabler/icons-react';

const DisplayApplicationDetails = (applicationData) => {

  return <div>
    <Flex gap="sm" align="center" mb="md" >
      <Box>
        <IconUser color='white' />
      </Box>
      <div>
        <Text size="xs" className={classes.title}>
          Name
        </Text>
        <Text className={classes.description}>{applicationData.firstName} {applicationData.lastName}</Text>
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
        <Text className={classes.description}>{applicationData.email}</Text>
      </div>
    </Flex>
    <Flex gap="sm" align="center" mb="md" >
      <Box>
        <IconCake color='white' />
      </Box>
      <div>
        <Text size="xs" className={classes.title}>
          Age
        </Text>
        <Text className={classes.description}>{new Date(applicationData.dateOfBirth).toLocaleDateString()}</Text>
      </div>
    </Flex>
    <Flex gap="sm" align="center" mb="md" >
      <Box>
        <IconPhone color='white' />
      </Box>
      <div>
        <Text size="xs" className={classes.title}>
          Phone No.
        </Text>
        <Text className={classes.description}>{applicationData.phoneNumber}</Text>
      </div>
    </Flex>
    <Flex gap="sm" align="center" mb="md" >
      <Box>
        <IconBuilding color='white' />
      </Box>
      <div>
        <Text size="xs" className={classes.title}>
          Employer
        </Text>
        <Text className={classes.description}>{applicationData.employerName}</Text>
      </div>
    </Flex>
    <Flex gap="sm" align="center" mb="md" >
      <Box>
        <IconUser color='white' />
      </Box>
      <div>
        <Text size="xs" className={classes.title}>
          Job Title
        </Text>
        <Text className={classes.description}>{applicationData.jobTitle}</Text>
      </div>
    </Flex>
  </div>

}

const RejectForm = ({ close, application, setModalType, refreshData }) => {

  const inputRef = useRef(null);

  const rejectSubmit = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/application/update/${application._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'rejected',
        rejectedReason: inputRef.current.value,
        rejectedDate: new Date(),
        approvedDate: null,
      })
    });

    if (response.status === 200) {
      enqueueSnackbar('❌ Credit Card Application Rejected', { variant: 'success' });
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
    <Text>Are you sure you want to reject this application?</Text>
    <Textarea ref={inputRef} my="lg" label="Reason" withAsterisk placeholder="Enter reason for rejection" />
    <Button
      variant="outline"
      color="red"
      style={{ marginRight: '10px' }}
      onClick={close}
    >
      Cancel
    </Button>
    <Button variant="outline" color="red" onClick={rejectSubmit}>
      Reject
    </Button>
  </>
}

const ApproveForm = ({ close, application, setModalType, refreshData }) => {

  const approveSubmit = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/application/update/${application._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'accepted',
        approvedDate: new Date(),
        rejectedDate: null,
        rejectedReason: null
      })
    });

    if (response.status === 200) {
      enqueueSnackbar('✅ Credit Card Application Accepted', { variant: 'success' });
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
    <Text mb="lg">Are you sure you want to approve this application?</Text>
    <Button
      variant="outline"
      color="red"
      style={{ marginRight: '10px' }}
      onClick={close}
    >
      Cancel
    </Button>

    <Button variant="outline" color="red" onClick={approveSubmit}>
      Approve
    </Button>

  </>
}

export function ApproveApplication() {

  const [applicationList, setApplicationList] = useState([]);
  const [loading, setloading] = useState(false);

  const [modelOpened, { open, close }] = useDisclosure(false);
  const [drawerOpened, drawerStatus] = useDisclosure(false);

  const [modalType, setModalType] = useState('');

  const [selApplication, setSelApplication] = useState(null);

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
  }, [])

  const displayBadge = (status) => {
    if (status === 'pending') {
      return <Badge
        size="md"
        variant="gradient"
        gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
      >
        {status}
      </Badge>
    } else if (status === 'accepted') {
      return <Badge
        size="md"
        variant="gradient"
        gradient={{ from: 'cyan', to: 'lime', deg: 90 }}  >
        {status}
      </Badge>
    } else if (status === 'rejected') {
      return <Badge
        size="md"
        variant="gradient"
        gradient={{ from: 'red', to: 'pink', deg: 90 }} >
        {status}
      </Badge>
    }

  }

  const deleteApplication = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/application/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      enqueueSnackbar('Application Deleted', { variant: 'success' });
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

    return <Table.ScrollContainer mt={10} minWidth={500}>
      <Table verticalSpacing="md">

        <Table.Tbody>
          {
            applicationList.map((item) => (
              <Table.Tr key={item._id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar size={40} src={item.avatar} radius={40}  />
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
                  <Text fz="sm">{displayBadge(item.status)}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon onClick={e => deleteApplication(item._id)} variant="subtle" color="red">
                      <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="blue" onClick={() => {
                      setSelApplication(item);
                      drawerStatus.open();
                    }}>
                      <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </ActionIcon>
                    <Menu
                      transitionProps={{ transition: 'pop' }}
                      withArrow
                      position="bottom-end"
                      withinPortal
                    >
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item color='red'
                          disabled={item.status === 'rejected' }
                          onClick={() => {
                            setSelApplication(item);
                            setModalType('reject');
                            open();
                          }}
                          leftSection={
                            <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                          }
                        >
                          Reject
                        </Menu.Item>
                        <Menu.Item color='green'
                          disabled={item.status === 'accepted'}
                          onClick={() => {
                            setSelApplication(item);
                            setModalType('approve');
                            open();
                          }}
                          leftSection={<IconCheck style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        >
                          Approve
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
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
      <Modal overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
        opened={modelOpened}
        onClose={close}
        title={modalType === 'reject' ? "Reject Credit Card Application" : 'Approve Credit Card Application'}>
        {
          (modalType === 'reject' && selApplication !== null) ?
            <RejectForm
              close={close}
              application={selApplication}
              setModalType={setModalType}
              refreshData={fetchApplicationData} /> :
            <ApproveForm
              close={close}
              application={selApplication}
              setModalType={setModalType}
              refreshData={fetchApplicationData} />
        }


      </Modal>

      <Drawer
        position='right'
        opened={drawerOpened}
        onClose={drawerStatus.close}
        title="Credit Card Application Details"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {
          selApplication !== null &&
          <DisplayApplicationDetails {...selApplication} />
        }
      </Drawer>

      <Container size="lg">
        <Title order={1}>Credit Card Applications</Title>
        <Divider my="lg" />
        {
          displayApplicationData()
        }
      </Container>
    </>
  );
}