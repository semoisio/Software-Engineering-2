import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../homePageNavbar/Navbar';
import { NavBtnLink } from '../homePageNavbar/NavbarElements';
import SideBar from '../homePageNavbar/SideBar';

import {
    Container,
    FormWrap,
    FormContent,
    Form,
    FormLabel,
    FormButton
} from './SignUpElements';

function SignUpSuccess() {
    // This state keeps track is sidebaropen or not
    const [isOpen, setIsOpen] = useState(false);

    // access to browser history
    const history = useHistory();

    /**
     * Toggle function for showing and hiding sidebar
     */
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    

    return (
        <>
            <Container data-testid="signupcontainer">
                <Navbar data-testid="navbar" toggle={toggle} />
                <SideBar data-testid="sidebar" isOpen={isOpen} toggle={toggle} />
                <FormWrap data-testid="signupsuccessformwrap">
                    <FormContent data-testid="signupsuccessformcontent">
                        <Form action="" data-testid="signupsuccessform">
                            <FormLabel htmlFor="for">
                                Account created successfully. Confirmation link has been sent to your email. You must confirm your email before you can sign in.
                        </FormLabel>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignUpSuccess;