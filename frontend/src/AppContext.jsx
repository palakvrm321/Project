import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({children}) => {
    
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const [loggedIn, setLoggedIn] = useState( currentUser!==null );

    const logout = () => {
        sessionStorage.removeItem('user');
        setCurrentUser(null);
        setLoggedIn(false);
        navigate('/login');
    }

    return (
        <AppContext.Provider value={{loggedIn, setLoggedIn, currentUser, setCurrentUser, logout}} >
            {children}
        </AppContext.Provider>
    )
}

const UseAppContext = () => useContext(AppContext);
export default UseAppContext;