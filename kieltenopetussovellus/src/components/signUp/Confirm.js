import React, { useEffect, useState } from 'react';
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
import Loader from "react-loader-spinner";
import {
    LoaderContainer,
    LoaderText,
} from '../../components/languageAppPage/searchElement/SearchElements';

const Confirm = (props) => {
    const [confirming, setConfirming] = useState(true);
    const [confirmed, setConfirmed] = useState(false);
    const [errortext, setErrortext] = useState("");

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

    useEffect(async () => {
        // get id from url
        const id = props.match.params.id;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id": id })
        };

        const result = await fetch("http://127.0.0.1:3001/email/confirm", requestOptions);
        let response = await result.json();
        if (response.status === "OK") {
            setConfirmed(true);
        }
        else {
            setErrortext(response.msg);
        }
        setConfirming(false);
    }, []);

    const redirectSignIn = () => {
        history.push('/signin');
    };


    return (
        <Container data-testid="signupcontainer">
            <Navbar data-testid="navbar" toggle={toggle} />
            <SideBar data-testid="sidebar" isOpen={isOpen} toggle={toggle} />
            <FormWrap data-testid="confirmformwrap">
                <FormContent data-testid="confirmformcontent">
                    {
                        confirming ?
                            <LoaderContainer>
                                <LoaderText>Registering</LoaderText>
                                <Loader
                                    type="TailSpin"
                                    color="#00BFFF"
                                    height={50}
                                    width={50}
                                />
                            </LoaderContainer>
                            :
                            confirmed ?
                                <Form action="" data-testid="confirmform">
                                    <FormLabel htmlFor="for">
                                        Email confirmed, you can now sign in
                                    </FormLabel>
                                    <FormButton type="button" onClick={() => redirectSignIn()}>Sign in</FormButton>
                                </Form>
                                :
                                <Form action="">
                                    <FormLabel>{errortext}</FormLabel>
                                </Form>
                    }
                </FormContent>
            </FormWrap>
        </Container>
    );
}

export default Confirm