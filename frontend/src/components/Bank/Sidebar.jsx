import { useState } from 'react';
import { Group, Code } from '@mantine/core';
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
    IconCreditCardFilled,
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { IconUserEdit } from '@tabler/icons-react';
import UseBankContext from '../../BankContext';

const data = [
    // { link: '/bank/profile', label: 'Manage Profile', icon: IconSettings },
    { link: '/bank/approveapplication', label: 'Manage Credit Cards', icon: IconCreditCardFilled }
];

export function Sidebar() {
    //   const [active, setActive] = useState('Billing');

    const { pathname } = useLocation();

    const { logout } = UseBankContext();

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
                <a href="" type='button' className={classes.link} onClick={(event) => {
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