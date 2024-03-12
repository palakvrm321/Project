import {
    IconSettings,
    IconLogout,
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { IconUserEdit } from '@tabler/icons-react';
import UseAppContext from '../../AppContext';
import { IconHome } from '@tabler/icons-react';

const data = [
    { link: '/user/profile', label: 'Manage Profile', icon: IconSettings },
    { link: '/user/applicationstatus', label: 'Manage Users', icon: IconUserEdit },
    { link: '/', label: 'Home', icon: IconHome }
];

export function Sidebar() {

    const { pathname } = useLocation();
    const { logout } = UseAppContext();
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