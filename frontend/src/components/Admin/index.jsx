import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { AppShell, Burger, Flex, Group, Text } from "@mantine/core"
import { MantineLogo } from "@mantinex/mantine-logo"
import { useDisclosure } from "@mantine/hooks"
import { IconUser } from "@tabler/icons-react"

const Admin = () => {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Flex
                        direction={{ base: 'row' }}
                        justify={{ sm: 'center' }}
                        align={{ sm: 'center' }}
                    >
                        <img onClick={e => navigate('/')} src={'/logo.png'} alt="logo" style={{ width: 40, height: 40 }} />
                        <Text weight={700} size="lg" ml="sm"> Admin Dashboard </Text>
                    </Flex>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Sidebar />

            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}

export default Admin