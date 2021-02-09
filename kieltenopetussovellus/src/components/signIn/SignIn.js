import React, { useState } from 'react';

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

function SignIn() {
    // Tracks values of form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Tracks user input
    const usernameChanged = (event) => {
        setUsername(event.target.value);
    };
    const passwordChanged = (event) => {
        setPassword(event.target.value);
    };


    return (
        <>
            <Container data-testid="signincontainer">
                <FormWrap data-testid="signinformwrap">
                    <Icon to="/" data-testid="signinicon">GroupO</Icon>
                    <FormContent data-testid="signinformcontent">
                        <Form action="#" data-testid="signinform">
                            <FormH1 data-testid="signinformh1">User login</FormH1>
                            <FormLabel htmlFor="for" data-testid="signinformlabel1">Username</FormLabel>
                            <FormInput type="text" required value={username} onChange={(e) => { usernameChanged(e) }} />
                            <FormLabel htmlFor="for">Password</FormLabel>
                            <FormInput type="password" required value={password} onChange={(e) => { passwordChanged(e) }} />
                            <FormButton type="submit">Login</FormButton>
                        </Form>
                        
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignIn;