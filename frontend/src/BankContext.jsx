import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const BankContext = createContext();

export const BankProvider = ({children}) => {
    
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('bank')));

    const [loggedIn, setLoggedIn] = useState( currentUser!==null );

    const logout = () => {
        sessionStorage.removeItem('bank');
        setCurrentUser(null);
        setLoggedIn(false);
        navigate('/banklogin');
    }

    return (
        <BankContext.Provider value={{loggedIn, setLoggedIn, currentUser, setCurrentUser, logout}} >
            {children}
        </BankContext.Provider>
    )
}

const UseBankContext = () => useContext(BankContext);
export default UseBankContext;