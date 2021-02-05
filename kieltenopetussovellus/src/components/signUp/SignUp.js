import React from 'react';
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
    return (
        <>
            <Container>
                <FormWrap>
                <Icon to="/">GroupO</Icon>
                    <FormContent>
                        <Form action="#">
                            <FormH1>Create user</FormH1>
                            <FormLabel htmlFor="for">Username</FormLabel>
                            <FormInput type="text" required />
                            <FormLabel htmlFor="for">Password</FormLabel>
                            <FormInput type="password" required />
                            <FormLabel htmlFor="for">Email</FormLabel>
                            <FormInput type="email" required />
                            <FormButton type="submit">register</FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignUp;