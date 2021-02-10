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
    Text,
    LinkContainer
} from './SignUpElements';

function SignUp() {
    // This state keeps track is sidebaropen or not
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Toggle function for showing and hiding sidebar
     */
    const toggle = () =>{
        setIsOpen(!isOpen);
    };
    // This states keep track values of form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [learning, setLearning] = useState("");
    const [infoText, setInfotext] = useState("");

    // This functions changes states if user types in something
    const usernameChanged = (event) => {
        setUsername(event.target.value);
    };
    const passwordChanged = (event) => {
        setPassword(event.target.value);
    };
    const emailChanged = (event) => {
        setEmail(event.target.value);
    };
    const learningChanged = (event) => {
        setLearning(event.target.value);
    };

    const SubmitRegister = async (e) => {
        e.preventDefault();
        console.log(e);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": username, "password": password, "email": email, "learning": learning })
        };
        const result = await fetch("http://127.0.0.1:3001/user", requestOptions);
        let response = result.json();
        console.log(response);
        if (response.status === "OK") {
            setInfotext("success");
        }
        else {
            setInfotext("failure");
        }
    };

    return (
        <>
            <Container data-testid="signupcontainer">
                <FormWrap data-testid="signupformwrap">
                <Navbar data-testid="navbar" toggle={toggle}/>
                <SideBar data-testid="sidebar" isOpen={isOpen} toggle={toggle}/>
                    <FormContent data-testid="signupformcontent">
                        <Form action="" data-testid="signupform" onSubmit={(e) => SubmitRegister(e)}>
                            <FormH1 data-testid="signupformh1">Create user</FormH1>
                            <FormLabel htmlFor="for" data-testid="signupformlabel1">Username</FormLabel>
                            <FormInput type="text" required value={username} onChange={(e) => { usernameChanged(e) }} data-testid="signupforminput1" />
                            <FormLabel htmlFor="for">Password</FormLabel>
                            <FormInput type="password" required value={password} onChange={(e) => { passwordChanged(e) }} />
                            <FormLabel htmlFor="for">Email</FormLabel>
                            <FormInput type="email" required value={email} onChange={(e) => { emailChanged(e) }} />
                            <FormLabel htmlFor="for">I want to learn</FormLabel>
                            <FormInput type="text" required value={learning} onChange={(e) => { learningChanged(e) }} />
                            <FormButton type="submit">Register</FormButton>
                            <p style={{ color: "red" }}>{infoText}</p>
                        </Form>
                    </FormContent>

                </FormWrap>
            </Container>
        </>
    )
}

export default SignUp;