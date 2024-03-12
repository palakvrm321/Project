import React, { useEffect } from 'react';
import classes from './cardstatus.module.css';
import { Accordion, Alert, Box, Grid } from '@mantine/core';
import { useState } from 'react';
import CreditCard from '../CreditCard';
import { IconCheck, IconCross, IconProgress, IconX } from '@tabler/icons-react';
import TrackCard from '../TrackCard';

const CardStatus = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [applicationList, setApplicationList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplicationData = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/application/getbyuser/${currentUser._id}`);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    setApplicationList(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchApplicationData();
  }, []);

  const applicationStatus = (status) => {
    switch (status) {
      case 'pending':
        return <Alert variant="light" color="yellow" title="Your application is in process." icon={<IconProgress />} />
      case 'accepted':
        return <Alert variant="light" color="green" title="Congratulations! Your Credit Card has been generated." icon={<IconCheck />} />
      case 'rejected':
        return <Alert variant="light" color="red" title="Card Application Rejected." icon={<IconX />} />
      default:
        return <Alert variant="light" color="yellow" title="Your application is pending." icon={<IconX />} />
    }
  }

  const displayApplications = () => {
    if (loading) {
      return <p>Loading...</p>
    }

    if (applicationList.length < 1) {
      return <p>No applications found</p>
    }

    // const 

    return applicationList.map((application) => (
      <Accordion.Item value={application._id}>
        <Accordion.Control>{application.bankName}  ({application._id}) - {new Date(application.submitDate).toLocaleDateString()}</Accordion.Control>
        <Accordion.Panel>
          <Grid cols={2}>
            <Grid.Col span={6}>
              <p>{application.id}</p>
              <p>{application.email}</p>
              {applicationStatus(application.status)}
            </Grid.Col>
            <Grid.Col span={6}>
              {
                application.status === 'accepted' && (
                  <CreditCard
                    name={`${application.firstName} ${application.lastName}`}
                    cardNumber={application.cardNumber}
                    expiryDate={application.cardExpiry}
                    cvv={application.cardCVV}
                     />
                )
              }
            </Grid.Col>
          </Grid>
          <Box mt="lg" p={5}>
            <TrackCard creditCard={application} />
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    ))
  }

  return (
    <Box px="lg">
      <h1>Credit Card Application Status</h1>
      <Accordion classNames={classes}>
        {displayApplications()}
      </Accordion>
    </Box>
  );
}

export default CardStatus;