import React from 'react'
import { useHistory } from 'react-router-dom';
import {
    SignoutContainer
}from './SignOutElements';


const SignOut = () => {
    const history = useHistory();
    const handleLogout = () => {
        history.push("/signin"); 
        localStorage.clear();    
        window.location.reload();  
      };
    
    return (
        <SignoutContainer data-testid="signoutContainer">
            
            <button onClick={handleLogout}>SignOut</button>
        </SignoutContainer>
    )
}

export default SignOut
