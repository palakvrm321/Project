import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom';
import UseAppContext from './AppContext';
import { Login } from './components/Login';

const UserAuth = ({children}) => {

    const hasRun = useRef(false);

    // const {currentUser} = UseAppContext();
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    useEffect(() => {
        if(currentUser === null&& !hasRun.current) {
            // console.log('ok');
            enqueueSnackbar('Please login to continue', { variant: 'error' });
            hasRun.current = true;
        }else if (currentUser !== null) {
            hasRun.current = false;
          }
    }, [currentUser]);


    if(currentUser!==null) {
        return children;
    }
        
        return <Navigate to="/login" />
    

}

export default UserAuth;