// core styles are required for all packages
import { Card, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

import { Navbar } from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { NotFound } from './components/NotFound';
import Admin from './components/Admin';
import { Notifications } from '@mantine/notifications';
import ApplicationForm from './components/ApplicationForm';
import { SnackbarProvider } from 'notistack';
import UserAuth from './UserAuth';
import { AppProvider } from './AppContext';
import Profile from './components/Admin/Profile';
import { ManageUser } from './components/Admin/ManageUser';
import { AddBank } from './components/Admin/AddBank';
import { ManageBank } from './components/Admin/ManageBank';
import { ManageApplication } from './components/Admin/ManageApplication';
import { BankLogin } from './components/BankLogin';
import { ApproveApplication } from './components/Bank/ApproveApplication';
import Bank from './components/Bank';
import User from './components/User';
import CreditCard from './components/User/CreditCard';
import CardStatus from './components/User/CardStatus';
import { AdminProvider } from './AdminContext';
import AdminAuth from './AdminAuth';
import { BankProvider } from './BankContext';
import { ManageContact } from './components/Admin/ManageContact';
import UserProfile from './components/User/Profile';
import ResetPassword from './components/ResetPassword';

const theme = createTheme({
    /** Put your mantine theme override here */
});

const App = () => {
    return (
        <MantineProvider theme={theme} defaultColorScheme="light">
            {/* <Notifications  /> */}
            <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <BrowserRouter>
                    <AppProvider>
                        <AdminProvider>
                            <BankProvider>
                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/resetpassword" element={<ResetPassword />} />
                                    <Route path="/banklogin" element={<BankLogin />} />
                                    <Route path="/applicationform" element={<UserAuth> <ApplicationForm /> </UserAuth>} />
                                    <Route path="/admin" element={<AdminAuth> <Admin /> </AdminAuth>} >
                                        <Route path="addbank" element={<AddBank />} />
                                        <Route path="profile" element={<Profile />} />
                                        <Route path="manageuser" element={<ManageUser />} />
                                        <Route path="managebank" element={<ManageBank />} />
                                        <Route path="manageapplication" element={<ManageApplication />} />
                                        <Route path="managecontact" element={<ManageContact />} />
                                    </Route>
                                    <Route path="/bank" element={<Bank />} >
                                        <Route path="profile" element={<Profile />} />
                                        <Route path="approveapplication" element={<ApproveApplication />} />
                                        <Route path="managebank" element={<ManageBank />} />
                                        <Route path="manageapplication" element={<ManageApplication />} />
                                    </Route>
                                    <Route path="/user" element={<User />} >
                                        <Route path="profile" element={<UserProfile />} />
                                        {/* <Route path="creditcard" element={<CreditCard />} /> */}
                                        <Route path="applicationstatus" element={<CardStatus />} />
                                    </Route>
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </BankProvider>
                        </AdminProvider>
                    </AppProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </MantineProvider>
    )
}

export default App;