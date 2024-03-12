import { ThemeIcon, Text, Avatar, Timeline } from '@mantine/core';
import { IconCheck, IconLoader, IconSun, IconVideo, IconX } from '@tabler/icons-react';

const TrackCard = ({ creditCard }) => {

    const getgeneratedItem = (status) => {
        if (status === 'pending') {
            return <Timeline.Item title={"Credit Card Generated"} lineVariant="dashed"
                bullet={<ThemeIcon
                    size={22}
                    radius="xl"
                >
                    <IconLoader size="1rem" />
                </ThemeIcon>}>
                <Text c="dimmed" size="sm">
                    Virtual Credit Card Generated for online use
                </Text>
            </Timeline.Item>
        } else if (status === 'accepted') {
            return <Timeline.Item title={"Credit Card Generated"}
                bullet={<ThemeIcon
                    size={22}
                    variant="gradient"
                    gradient={{ from: 'lime', to: 'cyan' }}
                    radius="xl"
                >
                    <IconCheck size="0.8rem" />
                </ThemeIcon>}>
                <Text c="dimmed" size="sm">
                    Virtual Credit Card Generated for online use
                </Text>
            </Timeline.Item>
        } else if (status === 'rejected') {
            return <Timeline.Item title={"Credit Card Generated"}
                bullet={<ThemeIcon
                    size={22}
                    variant="gradient"
                    gradient={{ from: 'red', to: 'pink' }}
                    radius="xl"
                >
                    <IconX size="0.8rem" />
                </ThemeIcon>} lineVariant='dashed'>
                <Text c="dimmed" size="sm">
                    Virtual Credit Card Generated for online use
                </Text>
            </Timeline.Item>
        }
    }

    const getDispatchedItem = (status) => {
        if (status === 'pending' || status === 'rejected') {
            return <Timeline.Item title={"Credit Card Dispatched"}
                lineVariant='dashed'>
                <Text c="dimmed" size="sm">
                    Physical Credit Card dispatched to your address
                </Text>
            </Timeline.Item>
        } else if (status === 'accepted') {
            return <Timeline.Item title={"Credit Card Dispatched"}
                bullet={<ThemeIcon
                    size={22}
                    variant="gradient"
                    gradient={{ from: 'lime', to: 'cyan' }}
                    radius="xl"
                >
                    <IconCheck size="0.8rem" />
                </ThemeIcon>} lineVariant='dashed'>
                <Text c="dimmed" size="sm">
                    Physical Credit Card dispatched to your address
                </Text>
            </Timeline.Item>
        } else if (status === 'rejected') {
            return <Timeline.Item title={"Credit Card Dispatched"}
                bullet={<ThemeIcon
                    size={22}
                    variant="gradient"
                    gradient={{ from: 'red', to: 'pink' }}
                    radius="xl"
                >
                    <IconX size="0.8rem" />
                </ThemeIcon>} lineVariant='dashed'>
                <Text c="dimmed" size="sm">
                    Physical Credit Card dispatched to your address
                </Text>
            </Timeline.Item>
        }
    }

    return (
        <Timeline bulletSize={24} active={creditCard.status==='pending' || creditCard.status==='rejected' ? 2 : 3}>
            <Timeline.Item title="Application Submitted" bullet={
                <ThemeIcon
                    size={18}
                    variant="gradient"
                    gradient={{ from: 'lime', to: 'cyan' }}
                    radius="xl"
                >
                    <IconCheck size="0.8rem" />
                </ThemeIcon>
            } >
                <Text c="dimmed" size="sm">
                    Credit Card Application submitted to the Bank
                </Text>
            </Timeline.Item>
            <Timeline.Item
                title={(creditCard.status === 'accepted' || creditCard.status === 'rejected') ? "Verification Processed" : "Verification Processing"}
                bullet={
                    <ThemeIcon
                        size={22}
                        variant="gradient"
                        gradient={{ from: 'lime', to: 'cyan' }}
                        radius="xl"
                    >
                        <IconCheck size="0.8rem" />
                    </ThemeIcon>
                }
            >
                <Text c="dimmed" size="sm">
                    Application verified by the Bank
                </Text>
            </Timeline.Item>
            {
                getgeneratedItem(creditCard.status)
            }
            {
                getDispatchedItem(creditCard.status)
            }
            <Timeline.Item
                title="Credit Card Delivered"

            >
                <Text c="dimmed" size="sm">
                    Physical Credit Card delivered to your address
                </Text>
            </Timeline.Item>
        </Timeline>
    );
};

export default TrackCard;