import React, { useState, useEffect } from 'react'
import {
    ProfileContainer,
    UserContainer,
    Username,
    Learn,
    UserImage,
    SelectContainer,
    FormInput,
    FormLabel,
    FormButton,
    FormButtonDelete,
    FormText
} from './ProfileElements';
import Select from 'react-select';
import kuva from '../../../images/AudioWave.jpg'
import { languageOptions } from '../../../tools/defaultOptions';
import Loader from "react-loader-spinner";
import {
    LoaderText,
    LoaderContainer
} from '../searchElement/SearchElements'
import { foundCorrectLabel, checkMatch } from './profileFunctions';
import NotifyDialog from '../../../dialogs/NotifyDialog';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import { useHistory } from 'react-router-dom';



const Profile = () => {
    const history = useHistory();
    // State to toggle searching or no
    const [searching, setSearching] = useState(false);

    const [deleteUser, setDeleteUser] = useState(false);

    const [editing, setEditing] = useState(false);

    const [editingButtonText, setEeditingButtonText] = useState("Edit language");

    const [changePassword, setChangePassword] = useState(false);

    //Fire user update
    const [doUpdate, setDoupdate] = useState(0);
    const [doPasswordUpdate, setDoPasswordUpdate] = useState(0);


    //Fire password change
    const [doCheck, setDoCheck] = useState(0);

    const [selectedLanguage, setSelectedLanguage] = useState({ value: "" });

    const [user, setUser] = useState();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [pwInputVisited, setPwInputVisited] = useState(false);
    const [pwInfo, setPwInfo] = useState("");

    const [match, setMatch] = useState(false);

    const handleSelectClickLanguage = (param) => {
        setSelectedLanguage(param);
    }

    const oldPasswordChanged = (e) => {
        setOldPassword(e.target.value);
    }

    const passwordChanged = (e) => {
        setNewPassword1(e.target.value);
    }

    const confirmPasswordChanged = (e) => {
        setNewPassword2(e.target.value);
    }

    const editingChangged = () => {
        if (editingButtonText === "Edit language") {
            setEditing(true);
            setEeditingButtonText("Save");
        } else {
            setEditing(false);

            // if no changes we dont do anything
            if (user[0].learning !== selectedLanguage.value) {
                user[0].learning = selectedLanguage.value
                setDoupdate(doUpdate + 1);
            }
            setEeditingButtonText("Edit language");
        }
    }
    useEffect(() => {
        const savePassword = async () => {
            setDoCheck(true);

            // First chech is the oldpassword correct
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const result = await fetch("http://127.0.0.1:3001/login?username=" + localStorage.getItem("user") + '&password=' + oldPassword, requestOptions);
            let response = await result.json();

            if (response.status === "NOT OK") {
                let dialogprops = {
                    title: "Incorrect password",
                    message: "Wrong old password!",
                }
                NotifyDialog(dialogprops);
                setDoCheck(false);
            } 
            else {

                if (newPassword1.length === 0) {
                    let dialogprops = {
                        title: "Check new password",
                        message: "You have to give something!",
                    }
                    NotifyDialog(dialogprops);
                    setDoCheck(false);
                } 
                else {
                    // Second chech does new passwords match
                    if (false === checkMatch(newPassword1, newPassword2)) {
                        let dialogprops = {
                            title: "Check passwords",
                            message: "New passwords doesn't match!",
                        }
                        NotifyDialog(dialogprops);
                        setDoCheck(false);
                    } 
                    else {

                        // update password 
                        user[0].password = newPassword1;
                        const requestOptions = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(user[0])
                        };
                        const responseU = await fetch("http://127.0.0.1:3001/user", requestOptions);
                        let updated = await responseU.json();

                        if (updated.status === "OK") {
                            cancelSavePassword();
                            setDoCheck(false);
                            let dialogprops = {
                                title: "Succes!",
                                message: "Password changed succesfully!",
                            }
                            NotifyDialog(dialogprops);
                            setDoCheck(false);
                        } 
                        else {
                            let dialogprops = {
                                title: "Error",
                                message: "Something went wrong updating password! Try again later.",
                            }
                            NotifyDialog(dialogprops);
                            setDoCheck(false);
                        }

                    }
                }
            }
        }

        if (doPasswordUpdate > 0) {
            savePassword();
        }
    }, [doPasswordUpdate]);

    const cancelSavePassword = () => {
        setChangePassword(!changePassword);
        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");
    }

    const confirmUserDelete = () => {
        let dialogprops = {
            title: "HOX!",
            message: "Are you sure?",
            clickOk: () => {
                setDeleteUser(true)
            }
        }
        ConfirmDialog(dialogprops)
    }

    useEffect(() => {
        const deleteUserFunc = async () => {
            try {
                const requestOptions = {
                    method: 'delete'
                };
                const delResponse = await fetch("http://127.0.0.1:3001/user/" + user[0]._id, requestOptions);
                let del = await delResponse.json();

                if (del.status === "OK") {
                    let dialogprops = {
                        title: "Succes",
                        message: "Account deleted succesfully",
                    }

                    NotifyDialog(dialogprops);
                    history.push("/");
                    localStorage.clear();
                    window.location.reload();

                } else {
                    let dialogprops = {
                        title: "Error",
                        message: "Something went wrong!",
                    }
                    NotifyDialog(dialogprops);
                }


            } catch {
                console.log("User delete failed");
            }

        }

        if (deleteUser === true) {
            deleteUserFunc();
        }

    }, [deleteUser]);

    useEffect(() => {
        const updateUser = async () => {
            setSearching(true);
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user[0])
                };
                const responseU = await fetch("http://127.0.0.1:3001/user", requestOptions);
                let updated = await responseU.json();

                //After update channe correct info to screen. In else notify user that update failed
                if (updated.status === "OK") {
                    const url = "http://127.0.0.1:3001/user?username=" + localStorage.getItem("user");
                    const response = await fetch(url);
                    let rJson = await response.json();

                    if (rJson.status === "OK") {
                        setUser(rJson.found);
                        setSelectedLanguage({ value: rJson.found[0].learning, label: foundCorrectLabel(rJson.found[0].learning) })
                        setSearching(false);
                    }
                    else {
                        setSearching(false);
                    }
                } else {
                    const url = "http://127.0.0.1:3001/user?username=" + localStorage.getItem("user");
                    const response = await fetch(url);
                    let rJson = await response.json();

                    if (rJson.status === "OK") {
                        setUser(rJson.found);
                        setSelectedLanguage({ value: rJson.found[0].learning, label: foundCorrectLabel(rJson.found[0].learning) })
                        setSearching(false);
                    }
                    else {
                        setSearching(false);
                    }
                    let dialogprops = {
                        title: "Update failed",
                        message: "Update failed please try again later",
                    }
                    NotifyDialog(dialogprops);
                }


            } catch {
                console.log("User update failed");
                setSearching(false);
            }

        }

        if (doUpdate > 0) {
            updateUser();
        }

    }, [doUpdate]);

    useEffect(() => {
        const fetchUser = async () => {
            setSearching(true);

            try {
                const url = "http://127.0.0.1:3001/user?username=" + localStorage.getItem("user");
                const response = await fetch(url);
                let rJson = await response.json();

                if (rJson.status === "OK") {
                    setUser(rJson.found);
                    setSelectedLanguage({ value: rJson.found[0].learning, label: foundCorrectLabel(rJson.found[0].learning) })
                    setSearching(false);
                }
                else {
                    setSearching(false);
                }
            } catch {
                console.log("User search failed");
                setSearching(false);
            }

        }

        fetchUser();

    }, []);

    const pwFocus = () => {
        setPwInputVisited(true);
        validatePw();
    }

    const validatePw = () => {
        let length = "Minimum length 8 characters\n";
        let capital = "At least one uppercase letter (between A-Z)\n";
        let lower = "At least one lowercase letter (between a-z)\n";
        let number = "At least one number\n";

        if (newPassword1.length >= 8) {
            length = "";
        }
        if (newPassword1.match(/[A-Z]/g)) {
            capital = "";
        }
        if (newPassword1.match(/[a-z]/g)) {
            lower = "";
        }
        if (newPassword1.match(/[0-9]/g)) {
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
    }, [newPassword1]);

    const changePasswordClicked = () => {
        setChangePassword(!changePassword)
    }

    return (
        <ProfileContainer data-testid="profileContainer">

            {changePassword ?

                <UserContainer>
                    <FormLabel>Old password</FormLabel>
                    <FormInput type="password" value={oldPassword} onChange={(e) => (oldPasswordChanged(e))} />
                    <FormLabel>New password</FormLabel>
                    <FormInput type="password" value={newPassword1} onChange={(e) => (passwordChanged(e))} onFocus={() => pwFocus()} />
                    <FormText>{pwInfo}</FormText>
                    <FormLabel>Confirm new password</FormLabel>
                    <FormInput type="password" value={newPassword2} onChange={(e) => (confirmPasswordChanged(e))} onBlur={() => setMatch(checkMatch(newPassword1, newPassword2))} />

                    {doCheck ?
                        <>
                            <LoaderText>Checkking</LoaderText>
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={50}
                                width={50}
                            />
                        </> :
                        <>
                            <FormButton onClick={() => { setDoPasswordUpdate(doPasswordUpdate + 1) }} >Save password</FormButton>
                            <FormButtonDelete onClick={() => { cancelSavePassword() }} >Cancel</FormButtonDelete>
                        </>
                    }

                </UserContainer> :
                searching ?
                    <LoaderContainer>
                        <LoaderText>Loading user data</LoaderText>
                        <Loader
                            type="TailSpin"
                            color="#00BFFF"
                            height={50}
                            width={50}
                        />
                    </LoaderContainer> :

                    <UserContainer>
                        <Username>{user === undefined ? "testi" : user[0].username}</Username>
                        <UserImage src={kuva} />
                        <SelectContainer>
                            <Select
                                isDisabled={!editing}
                                value={selectedLanguage}
                                onChange={handleSelectClickLanguage}
                                options={languageOptions}
                            />
                        </SelectContainer>
                        <FormButton onClick={() => editingChangged()}>{editingButtonText}</FormButton>
                        <FormButton onClick={() => changePasswordClicked()}>Change password</FormButton>
                        <FormButtonDelete onClick={() => confirmUserDelete()}>Delete account</FormButtonDelete>
                    </UserContainer>
            }



        </ProfileContainer>
    )
}

export default Profile;
