import Navbar from '../homePageNavbar/Navbar';
import SideBar from '../homePageNavbar/SideBar';
import { Footer, FooterLink } from '../footer/FooterElements';
import PrivacyPolicy from '../footer/PrivacyPolicy.pdf';
import crypto from 'crypto';
import Loader from "react-loader-spinner";
import {
    LoaderContainer,
    LoaderText,
} from '../../components/languageAppPage/searchElement/SearchElements';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
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
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ForgotPassword = (props) => {
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
    const [email, setEmail] = useState("");

    const [infoText, setInfotext] = useState("");

    const [loading, setLoading] = useState(false);

    let dialogprops = {
        title: "Success",
        message: "A link to reset password has been sent to your email",
        clickOk: async () => {

        }
    }



    // Tracks user input
    const emailChanged = (event) => {
        setEmail(event.target.value);
    };

    const SubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = crypto.randomBytes(20).toString('hex');
        //const expires = Date.now() + 3600000;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "email": email, "rptoken": token })
        };
        const result = await fetch("http://127.0.0.1:3001/emailreset", requestOptions);
        let response = await result.json();
        setLoading(false);
        if (response.status === "OK") {
            ConfirmDialog(dialogprops);
            setInfotext("");
        }
        else {
            setInfotext(response.msg);
        };

    }


    return (
        <>
            <Container data-testid="forgotpasswordcontainer">
                {
                    loading ?
                        <LoaderContainer>
                            <LoaderText>Loading</LoaderText>
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={50}
                                width={50}
                            />
                        </LoaderContainer> :
                        <FormWrap data-testid="forgotpasswordformwrap">
                            <Navbar data-testid="navbar" toggle={toggle} />
                            <SideBar data-testid="sidebar" isOpen={isOpen} toggle={toggle} />
                            <FormContent data-testid="forgotpasswordformcontent">
                                <Form action="" data-testid="forgotpasswordform" onSubmit={(e) => SubmitEmail(e)}>
                                    <FormH1 data-testid="forgotpasswordformh1">Password reset</FormH1>
                                    <FormLabel htmlFor="for" data-testid="forgotpasswordformlabel1">Email</FormLabel>
                                    <FormInput type="text" required value={email} onChange={(e) => { emailChanged(e) }} />
                                    <FormButton type="submit">Send reset email</FormButton>
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
export default ForgotPassword;