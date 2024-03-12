import { Button, Container, Grid, SimpleGrid, Text, ThemeIcon, Title, rem } from "@mantine/core";
import classes from './home.module.css';
import { IconCircleDotted, IconFileCode, IconFlame, IconReceiptOff } from "@tabler/icons-react";
import { ContactUs } from "../Contact";
import { Footer } from "../Footer";
import { Link } from "react-router-dom";
import { HomeFeatures } from "../HomeFeatures";
import AnimatedHeroCard from "../AnimatedHeroCard";

const Home = () => {

    const features = [
        {
            icon: IconReceiptOff,
            title: 'Free and open source',
            description: 'All packages are published under MIT license, you can use Mantine in any project',
        },
        {
            icon: IconFileCode,
            title: 'TypeScript based',
            description: 'Build type safe applications, all components and hooks export types',
        },
        {
            icon: IconCircleDotted,
            title: 'No annoying focus ring',
            description:
                'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
        },
        {
            icon: IconFlame,
            title: 'Flexible',
            description:
                'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
        },
    ];

    const items = features.map((feature) => (
        <div key={feature.title}>
            <ThemeIcon
                size={44}
                radius="md"
                variant="gradient"
                gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            >
                <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
            </ThemeIcon>
            <Text fz="lg" mt="sm" fw={500}>
                {feature.title}
            </Text>
            <Text c="dimmed" fz="sm">
                {feature.description}
            </Text>
        </div>
    ));

    return (
        <div>
            <header className={classes.root}>
                <Container size="lg">
                    {/* <div className={classes.inner}>
                        <div className={classes.content}> */}
                            <Grid>
                                <Grid.Col span={{ base: 12, md: 6 }}>

                                    <Title className={classes.title}>

                                        <Text
                                            component="span"
                                            inherit
                                            variant="gradient"
                                            gradient={{ from: 'pink', to: 'yellow' }}
                                        >
                                            Credit Card
                                        </Text>{' '}
                                        Application Simplified
                                    </Title>

                                    <Text className={classes.description} mt={30}>
                                        Apply for a credit card with ease. We have simplified the process for you. Just fill in the details and you are good to go.
                                    </Text>

                                    <Button
                                        variant="gradient"
                                        gradient={{ from: 'pink', to: 'yellow' }}
                                        size="xl"
                                        className={classes.control}
                                        mt={40}
                                        component={Link}
                                        to="/signup"
                                    >
                                        Get started
                                    </Button>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>

                                    <AnimatedHeroCard />
                                </Grid.Col>
                            </Grid>
                        {/* </div>
                    </div> */}
                </Container>
            </header>
            <HomeFeatures />
            <ContactUs />
            <Footer />
        </div>
    )
}

export default Home