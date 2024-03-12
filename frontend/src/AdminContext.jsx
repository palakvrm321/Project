import { enqueueSnackbar } from "notistack";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({children}) => {
    
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('admin')));

    const [loggedIn, setLoggedIn] = useState( currentUser!==null );

    const logout = () => {
        sessionStorage.removeItem('admin');
        setCurrentUser(null);
        setLoggedIn(false);
        navigate('/login');
        enqueueSnackbar('Logged Out Successfully', { variant: 'success' });
    }

    return (
        <AdminContext.Provider value={{loggedIn, setLoggedIn, currentUser, setCurrentUser, logout}} >
            {children}
        </AdminContext.Provider>
    )
}

const UseAdminContext = () => useContext(AdminContext);
export default UseAdminContext;