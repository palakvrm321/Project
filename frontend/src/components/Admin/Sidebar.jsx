import { useState } from 'react';
import { Group, Code, Button } from '@mantine/core';
import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconSwitchHorizontal,
    IconLogout,
    IconBuildingBank,
    IconHomePlus,
    IconCreditCard,
    IconHelp,
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { IconUserEdit } from '@tabler/icons-react';
import UseAdminContext from '../../AdminContext';

const data = [
    { link: '/admin/profile', label: 'Manage Profile', icon: IconSettings },
    { link: '/admin/manageuser', label: 'Manage Users', icon: IconUserEdit },
    { link: '/admin/addbank', label: 'Add New Bank', icon: IconHomePlus },
    { link: '/admin/managebank', label: 'Manage Banks', icon: IconBuildingBank },
    { link: '/admin/manageapplication', label: 'Manage Applications', icon: IconCreditCard },
    { link: '/admin/managecontact', label: 'Manage Queries', icon: IconHelp },
];

export function Sidebar() {
    //   const [active, setActive] = useState('Billing');

    const { pathname } = useLocation();
    const { logout } = UseAdminContext();

    // console.log(pathname);
    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.link === pathname || undefined}
            to={item.link}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <>
            <div className={classes.navbarMain}>

                {links}
            </div>

            <div className={classes.footer}>
                {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a> */}

                <a href='' type='button' className={classes.link} onClick={(event) => {
                    event.preventDefault()
                    logout()
                }}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </>
    );
}