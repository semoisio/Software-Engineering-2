import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../homePageNavbar/Navbar';
import SideBar from '../homePageNavbar/SideBar';
import FooterJS from '../footer/Footer';
import { languageOptions } from '../../tools/defaultOptions';
import Select from 'react-select';
import Loader from "react-loader-spinner";

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
    LinkContainer,
    SelectContainer
} from './SignUpElements';
import {
    LoaderContainer,
    LoaderText,
} from '../../components/languageAppPage/searchElement/SearchElements';

function SignUp() {
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
    // This states keep track values of form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [learning, setLearning] = useState(languageOptions[0]);
    const [infoText, setInfotext] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [pwInfo, setPwInfo] = useState("");
    const [pwInputVisited, setPwInputVisited] = useState(false);
    const [registering, setRegistering] = useState(false);

    // These functions change states if user types in something
    const usernameChanged = (event) => {
        setUsername(event.target.value);
        setInfotext("");
    };
    const passwordChanged = (event) => {
        setPassword(event.target.value);
        setInfotext("");
    };
    const emailChanged = (event) => {
        setEmail(event.target.value);
        setInfotext("");
    };
    const learningChanged = (event) => {
        setLearning(event);
        setInfotext("");
    };
    const confPasswordChanged = (event) => {
        setconfPassword(event.target.value);
        setInfotext("");
    };

    const pwFocus = () => {
        setPwInputVisited(true);
        validatePw();
    }

    const validatePw = () => {
        let length = "Minimum length 8 characters\n";
        let capital = "At least one uppercase letter (between A-Z)\n";
        let lower = "At least one lowercase letter (between a-z)\n";
        let number = "At least one number\n";

        if (password.length >= 8) {
            length = "";
        }
        if (password.match(/[A-Z]/g)) {
            capital = "";
        }
        if (password.match(/[a-z]/g)) {
            lower = "";
        }
        if (password.match(/[0-9]/g)) {
            number = "";
        }
        if (length.length > 0 || capital.length > 0 || lower.length > 0 || number.length > 0) {
            setPwInfo("Your password does not fulfill following requirements:\n" + length + capital + lower + number);
        }
        else {
            setPwInfo("");
        }
    }

    const SubmitRegister = async (e) => {
        e.preventDefault();
        // confirm password
        if (password !== confPassword || pwInfo !== "") {
            setInfotext("Check password");
        }
        else {
            setRegistering(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "username": username, "password": password, "email": email, "learning": learning.value })
            };
            const result = await fetch("http://127.0.0.1:3001/user", requestOptions);
            let response = await result.json();
            setRegistering(false);
            if (response.status === "OK") {
                // redirect to signin
                history.push({
                    pathname: '/signupsuccess',
                    state: { user: response.added[0] }
                });
            }
            else {
                setInfotext(response.msg);
            }
        }
    };

    useEffect(() => {
        if (pwInputVisited)
            validatePw();
    }, [password]);

    return (
        <Container data-testid="signupcontainer">
            <Navbar data-testid="navbar" toggle={toggle} />
            <SideBar data-testid="sidebar" isOpen={isOpen} toggle={toggle} />
            {
                registering ?
                    <LoaderContainer>
                        <LoaderText>Registering</LoaderText>
                        <Loader
                            type="TailSpin"
                            color="#00BFFF"
                            height={50}
                            width={50}
                        />
                    </LoaderContainer> :
                    <FormWrap data-testid="signupformwrap">
                        <FormContent data-testid="signupformcontent">
                            <Form action="" data-testid="signupform" onSubmit={(e) => SubmitRegister(e)}>
                                <FormH1 data-testid="signupformh1">REGISTER</FormH1>
                                <FormLabel htmlFor="for">I want to learn</FormLabel>
                                <SelectContainer>
                                    <Select
                                        value={learning}
                                        onChange={learningChanged}
                                        options={languageOptions}
                                    />
                                </SelectContainer>
                                <FormLabel htmlFor="for" data-testid="signupformlabel1">Username</FormLabel>
                                <FormInput type="text" required value={username} onChange={(e) => { usernameChanged(e) }} data-testid="signupforminput1" />
                                <FormLabel htmlFor="for">Email</FormLabel>
                                <FormInput type="email" required value={email} onChange={(e) => { emailChanged(e) }} />
                                <FormLabel htmlFor="for">Password</FormLabel>
                                <FormInput type="password" required value={password} onChange={(e) => { passwordChanged(e) }} onFocus={() => pwFocus()} />
                                <FormLabel>{pwInfo}</FormLabel>
                                <FormLabel htmlFor="for">Confirm password</FormLabel>
                                <FormInput type="password" required value={confPassword} onChange={(e) => { confPasswordChanged(e) }} />
                                <FormLabel htmlFor="for">{infoText}</FormLabel>
                                <FormButton type="submit">Register</FormButton>
                            </Form>
                        </FormContent>

                    </FormWrap>
            }
        <FooterJS />
        </Container>
    )
}

export default SignUp;