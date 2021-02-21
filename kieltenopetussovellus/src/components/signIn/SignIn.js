import React, { useState } from 'react';
import Navbar from '../homePageNavbar/Navbar';
import SideBar from '../homePageNavbar/SideBar';

import {
    Container,
    FormWrap,
    Icon,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,

} from './SignInElements';

const SignIn=(props) =>{
    // This state keeps track if sidebar is open or not
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Toggle function for showing and hiding sidebar
     */
    const toggle = () =>{
        setIsOpen(!isOpen);
    };
    // Tracks values of form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [infoText, setInfotext] = useState("");

    // Tracks user input
    const usernameChanged = (event) => {
        setUsername(event.target.value);
    };
    const passwordChanged = (event) => {
        setPassword(event.target.value);
    };

    // Login function
    const SubmitLogin = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const result = await fetch("http://127.0.0.1:3001/user?username="+username + '&password=' + password, requestOptions);
        let response = await result.json();
        if (response.status === "OK") {
            props.setIsloggedin(true)
            console.log('login success')
        }
        else {
            setInfotext(response.msg);
            console.log('submit fail')
        }
        
    };


    return (
        <>
            <Container data-testid="signincontainer">
                <FormWrap data-testid="signinformwrap">
                    <Navbar data-testid="navbar" toggle={toggle} />
                    <SideBar data-testid="sidebar" isOpen={isOpen} toggle={toggle} />
                    <FormContent data-testid="signinformcontent">
                        <Form action="" data-testid="signinform" onSubmit={(e) => SubmitLogin(e)}>
                            <FormH1 data-testid="signinformh1">User login</FormH1>
                            <FormLabel htmlFor="for" data-testid="signinformlabel1">Username</FormLabel>
                            <FormInput type="text" required value={username} onChange={(e) => { usernameChanged(e) }} />
                            <FormLabel htmlFor="for">Password</FormLabel>
                            <FormInput type="password" required value={password} onChange={(e) => { passwordChanged(e) }} />
                            <FormButton type="submit">Login</FormButton>
                            <p style={{ color: "white" }}>{infoText}</p>
                        </Form>

                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignIn;