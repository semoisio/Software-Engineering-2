import React, { useEffect, useState } from 'react';
import { Footer, FooterLink } from '../footer/FooterElements';
import PrivacyPolicy from '../footer/PrivacyPolicy.pdf';
import Navbar from '../homePageNavbar/Navbar';
import SideBar from '../homePageNavbar/SideBar';
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";
import {
    LoaderContainer,
    LoaderText,
} from '../../components/languageAppPage/searchElement/SearchElements';
import {
    Container,
    FormWrap,
    Icon,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton

} from './SignInElements';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import NotifyDialog from '../../dialogs/NotifyDialog';


const ResetPassword = (props) => {
    // This state keeps track if sidebar is open or not
    const [isOpen, setIsOpen] = useState(false);
    //const [user, setUser] = useState();
    const history = useHistory();
    /**
     * Toggle function for showing and hiding sidebar
     */
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    // Tracks values of form
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [infoText, setInfotext] = useState("");
    const [signing, setSigning] = useState(false);
    const [loading, setLoading] = useState(true);
    const [linkok, setLinkok] = useState(false);
    const [pwInfo, setPwInfo] = useState("");
    const [pwInputVisited, setPwInputVisited] = useState(false);


    // Tracks user input
    const password1Changed = (event) => {
        setPassword1(event.target.value);
        setInfotext("");
    };
    const password2Changed = (event) => {
        setPassword2(event.target.value);
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

        if (password1.length >= 8) {
            length = "";
        }
        if (password1.match(/[A-Z]/g)) {
            capital = "";
        }
        if (password1.match(/[a-z]/g)) {
            lower = "";
        }
        if (password1.match(/[0-9]/g)) {
            number = "";
        }
        if (length.length > 0 || capital.length > 0 || lower.length > 0 || number.length > 0) {
            setPwInfo("Your password does not fulfill following requirements:\n" + length + capital + lower + number);
        }
        else {
            setPwInfo("");
        }
    }
    useEffect(() => {
        if (pwInputVisited)
            validatePw();
    }, [password1]);

    let dialogprops = {
        title: "Success",
        message: "Password has been changed succesfully, you can now sign in",
        clickOk: () => {
            history.push('/signin');
        }
    }


    useEffect(async () => {
        const token = props.match.params.id;
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        const result = await fetch("http://127.0.0.1:3001/emailreset?rptoken=" + token, requestOptions);
        let response = await result.json();

        if (response.status === "OK") {
            setLoading(false);
            setLinkok(true);
        }
        else {
            setLoading(false);
            setLinkok(false);
            setInfotext(response.msg);
        }
    }, []);



    const SubmitReset = async (e) => {
        e.preventDefault();
        if (password1 !== password2 || pwInfo !== "") {
            setInfotext("Check password");
        }
        else {
            setSigning(true);
            const token = props.match.params.id;
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "rptoken": token, "password": password1 })
            };
            const result = await fetch("http://127.0.0.1:3001/login", requestOptions);
            let response = await result.json();
            setSigning(false);
            if (response.status === "OK") {              
                NotifyDialog(dialogprops);
                history.push('/signin');
            }
            else {
                setInfotext(response.msg);

            }
        }

    };
    const SubmitHomepage = async (e) => {
        e.preventDefault();
        history.push('/');
    };


    if (loading) {
        return (<>
            <Container data-testid="signincontainer">

                <LoaderContainer>
                    <LoaderText>Verifying link</LoaderText>
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                </LoaderContainer>

                <Footer>
                    <FooterLink to={PrivacyPolicy} target="_blank">Terms and Conditions</FooterLink>
                    <FooterLink to={PrivacyPolicy} target="_blank">Privacy policy</FooterLink>
                    <FooterLink to={PrivacyPolicy} target="_blank">About us</FooterLink>
                </Footer>
            </Container>

        </>)
    }
    if (linkok) {
        return (
            <>
                <Container data-testid="signincontainer">

                    {
                        signing ?
                            <LoaderContainer>
                                <LoaderText>Changing password</LoaderText>
                                <Loader
                                    type="TailSpin"
                                    color="#00BFFF"
                                    height={50}
                                    width={50}
                                />
                            </LoaderContainer> :
                            <FormWrap data-testid="resetformwrap">
                                <Navbar data-testid="navbar" toggle={toggle} />
                                <SideBar data-testid="sidebar" isOpen={isOpen} toggle={toggle} />
                                <FormContent data-testid="resetpasswordformcontent">
                                    <Form action="" data-testid="resetpasswordform" onSubmit={(e) => SubmitReset(e)}>
                                        <FormH1 data-testid="resetpasswordformh1">Enter new password</FormH1>
                                        <FormLabel htmlFor="for" data-testid="resetpasswordformlabel1">Password</FormLabel>
                                        <FormInput type="password" required value={password1} onChange={(e) => { password1Changed(e) }} onFocus={() => pwFocus()} />
                                        <FormLabel>{pwInfo}</FormLabel>
                                        <FormLabel htmlFor="for">Confirm password</FormLabel>
                                        <FormInput type="password" required value={password2} onChange={(e) => { password2Changed(e) }} />

                                        <FormButton type="submit">Submit</FormButton>
                                        <FormLabel htmlFor="for">{infoText}</FormLabel>
                                    </Form>

                                </FormContent>
                            </FormWrap>}
                    <Footer>
                        <FooterLink to={PrivacyPolicy} target="_blank">Terms and Conditions</FooterLink>
                        <FooterLink to={PrivacyPolicy} target="_blank">Privacy policy</FooterLink>
                        <FooterLink to={PrivacyPolicy} target="_blank">About us</FooterLink>
                    </Footer>
                </Container>

            </>
        )
    }
    else {
        return (
            <>
                <Container data-testid="signincontainer">


                    <FormWrap data-testid="resetformwrap">
                        <Navbar data-testid="navbar" toggle={toggle} />
                        <SideBar data-testid="sidebar" isOpen={isOpen} toggle={toggle} />
                        <FormContent data-testid="resetpasswordformcontent">
                            <Form action="" data-testid="resetpasswordform" onSubmit={(e) => SubmitHomepage(e)}>
                                <FormH1 data-testid="resetpasswordformh1">Problem verifying link</FormH1>
                                <FormLabel htmlFor="for">{infoText}</FormLabel>
                                <FormButton type="submit">Back to homepage</FormButton>
                            </Form>
                        </FormContent>
                    </FormWrap>
                    <Footer>
                        <FooterLink to={PrivacyPolicy} target="_blank">Terms and Conditions</FooterLink>
                        <FooterLink to={PrivacyPolicy} target="_blank">Privacy policy</FooterLink>
                        <FooterLink to={PrivacyPolicy} target="_blank">About us</FooterLink>
                    </Footer>
                </Container>

            </>
        )
    }

}

export default ResetPassword;