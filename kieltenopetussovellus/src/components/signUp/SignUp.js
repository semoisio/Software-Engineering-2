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
    Text
} from './SignUpElements';

function SignUp() {
    // This states keep track values of form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

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

    return (
        <>
            <Container data-testid="signupcontainer">
                <FormWrap data-testid="signupformwrap">
                    <Icon to="/" data-testid="signupicon">GroupO</Icon>
                    <FormContent data-testid="signupformcontent">
                        <Form action="#" data-testid="signupform">
                            <FormH1 data-testid="signupformh1">Create user</FormH1>
                            <FormLabel htmlFor="for" data-testid="signupformlabel1">Username</FormLabel>
                            <FormInput type="text" required value={username} onChange={(e) => { usernameChanged(e) }} data-testid="signupforminput1"/>
                            <FormLabel htmlFor="for">Password</FormLabel>
                            <FormInput type="password" required value={password} onChange={(e) => { passwordChanged(e) }} />
                            <FormLabel htmlFor="for">Email</FormLabel>
                            <FormInput type="email" required value={email} onChange={(e) => { emailChanged(e) }} />
                            <FormButton type="submit">register</FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignUp;