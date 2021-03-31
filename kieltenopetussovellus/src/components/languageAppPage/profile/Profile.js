import React, { useState, useEffect } from 'react'
import {
    ProfileContainer,
    UserContainer,
    Username,
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

const Profile = () => {
    // State to toggle searching or no
    const [searching, setSearching] = useState(false);

    //Fires account delete
    const [deleteUser, setDeleteUser] = useState(0);
    //Keeps track of password what user have to gove when deleting account
    const [deletePassword, setDeletePassword] = useState("");

    // Keeps track is language edit open or not
    const [editing, setEditing] = useState(false);

    // Keeps track is account deletemode on or not
    const [deleteActive, setdeleteActive] = useState(false);

    //Changes edits langueage buttons text depenging on edit mode.
    const [editingButtonText, setEeditingButtonText] = useState("Edit language");

    //Keeps track is password changing mode on or not
    const [changePassword, setChangePassword] = useState(false);

    //Fire user update
    const [doUpdate, setDoupdate] = useState(0);

    // Fires password update
    const [doPasswordUpdate, setDoPasswordUpdate] = useState(0);


    //Fire password change
    const [doCheck, setDoCheck] = useState(0);

    //Keeps track what language is selected and shows it in select component
    const [selectedLanguage, setSelectedLanguage] = useState({ value: "" });

    // Locked in users data 
    const [user, setUser] = useState();

    //Following 3 states keep track passwords on password changing mode
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    // Keepstrack is password input visited. When it is we show pwinfo text.
    const [pwInputVisited, setPwInputVisited] = useState(false);
    const [pwInfo, setPwInfo] = useState("");

    /**
     * Updates selected language when user selects it from select component
     * @param {Object} param 
     */
    const handleSelectClickLanguage = (param) => {
        setSelectedLanguage(param);
    }
    /**
     * Following 4 functions are basicly same. All updates users given string to its state variable.
     * @param {String} e 
     */
    const oldPasswordChanged = (e) => {
        setOldPassword(e.target.value);
    }

    const passwordChanged = (e) => {
        setNewPassword1(e.target.value);
    }

    const confirmPasswordChanged = (e) => {
        setNewPassword2(e.target.value);
    }

    const deletePasswordChanged = (e) => {
        setDeletePassword(e.target.value);
    }

    /**
     * This function changes language edit mode. It also changes buttons text depending on mode. 
     * If language is changed in editmode function fires update throught setDoUpdate.
     */
    const editingChangged = () => {
        if (editingButtonText === "Edit language") {
            setEditing(true);
            setEeditingButtonText("Save");
        } else {
            setEditing(false);

            // if no changes we dont do anything
            if (user.learning !== selectedLanguage.value) {
                user.learning = selectedLanguage.value
                setDoupdate(doUpdate + 1);
            }
            setEeditingButtonText("Edit language");
        }
    }

    /**
     * This useEffect updates newPassword to database. 
     * It follows doPasswordUpdate state and is run when it changes.
     * Constraints:
     * 1. Oldpassword have to match to what we have in database.
     * 2. Users must give valid password
     * 3. New password and confirmpassword must match 
     */
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
                if (checkMatch(newPassword1, oldPassword) == true) {
                    let dialogprops = {
                        title: "HOX!",
                        message: "Your new password is same as old password!",
                    }
                    NotifyDialog(dialogprops);
                    setDoCheck(false);
                }
                else {
                    //Password must be longer than 0 and fulfill passwords terms
                    if (newPassword1.length === 0 || pwInfo !== "") {
                        let dialogprops = {
                            title: "Check new password",
                            message: "Check new password!",
                        }
                        NotifyDialog(dialogprops);
                        setDoCheck(false);
                    }
                    else {
                        // Third chech does new passwords match
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
                            user.password = newPassword1;
                            const requestOptions = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ _id: user._id, username: user.username, password: user.password })
                            };
                            const responseU = await fetch("http://127.0.0.1:3001/user", requestOptions);
                            let updated = await responseU.json();

                            if (updated.status === "OK") {
                                cancelSavePassword();
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
        }

        if (doPasswordUpdate > 0) {
            savePassword();
        }
    }, [doPasswordUpdate]);

    /**
     * Functions cancel password change mode. It clears all states and set mode false.
     */
    const cancelSavePassword = () => {
        setChangePassword(!changePassword);
        setPwInputVisited(false);
        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");
    }

    /**
     *  This function activates accounts delete mode.
     */
    const confirmUserDelete = () => {
        setdeleteActive(!deleteActive);
    }

    /**
     * This useEffect deletes account from database. Follows deleteUser state.
     * Constraint:
     *  1. It checks does users given password match to what we have in database.
     *     If password check is valid account will be deleted.
     *  
     */
    useEffect(() => {
        const deleteUserFunc = async () => {
            setDoCheck(true);
            try {
                //Check is user valid
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                };
                const result = await fetch("http://127.0.0.1:3001/login?username=" + localStorage.getItem("user") + '&password=' + deletePassword, requestOptions);
                let response = await result.json();

                if (response.status === "NOT OK") {
                    let dialogprops = {
                        title: "Incorrect password",
                        message: "Wrong password!",
                    }
                    NotifyDialog(dialogprops);
                    setDoCheck(false);
                }
                else {
                    const requestOptions = {
                        method: 'delete'
                    };
                    const delResponse = await fetch("http://127.0.0.1:3001/user/" + user._id, requestOptions);
                    let del = await delResponse.json();

                    if (del.status === "OK") {
                        localStorage.clear();
                        window.location.reload();

                    } else {
                        let dialogprops = {
                            title: "Error",
                            message: "Something went wrong!",
                        }
                        NotifyDialog(dialogprops);
                    }
                }
            } catch {
                console.log("User delete failed");
            }
        }
        if (deleteUser > 0) {
            deleteUserFunc();
        }
    }, [deleteUser]);

    /**
     * This useEffect updates changed language to database. Follows doUpdate state variable.
     */
    useEffect(() => {
        const updateUser = async () => {
            setSearching(true); // Shows spinner
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "_id": user._id, "username": user.username, "learning": user.learning })
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
                        setSelectedLanguage({ value: rJson.found.learning, label: foundCorrectLabel(rJson.found.learning) })
                        setSearching(false);
                    }
                    else {
                        setSearching(false);
                    }
                } else {
                    // Just in case fetc up-to-date data
                    const url = "http://127.0.0.1:3001/user?username=" + localStorage.getItem("user");
                    const response = await fetch(url);
                    let rJson = await response.json();

                    if (rJson.status === "OK") {
                        setUser(rJson.found);
                        setSelectedLanguage({ value: rJson.found.learning, label: foundCorrectLabel(rJson.found.learning) })
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

    /**
     * This useEffect fetches users up-to-date data from database. 
     */
    useEffect(() => {
        const fetchUser = async () => {
            setSearching(true);

            try {
                const url = "http://127.0.0.1:3001/user?username=" + localStorage.getItem("user");
                const response = await fetch(url);
                let rJson = await response.json();

                if (rJson.status === "OK") {
                    setUser(rJson.found);
                    setSelectedLanguage({ value: rJson.found.learning, label: foundCorrectLabel(rJson.found.learning) })
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

    /**
     * Check have user visited new password input. When user does we show validate text.
     */
    const pwFocus = () => {
        setPwInputVisited(true);
        validatePw();
    }

    /**
     * Function validates password
     */
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

    /**
     * Password validation fires allways when user enter one char
     */
    useEffect(() => {
        if (pwInputVisited)
            validatePw();
    }, [newPassword1]);

    /**
     * Changes to password changing mode.
     */
    const changePasswordClicked = () => {
        setChangePassword(!changePassword)
    }

    /**
     * Cancels deleting mode.
     */
    const cancelDelete = () => {
        setdeleteActive(!deleteActive);
        setDeletePassword("");
    }

    /**
     * Opens dialog what makes sure user still wanna delete account. 
     * If ok clicked fires account deleting useEffect
     */
    const makeSureDelete = () => {
        let dialogprops = {
            title: "HOX!",
            message: "Are you sure? You will lose all your data. ",
            clickOk: () => {
                setDeleteUser(deleteUser + 1)
            }
        }
        ConfirmDialog(dialogprops)
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
                    <FormInput type="password" value={newPassword2} onChange={(e) => (confirmPasswordChanged(e))}/>

                    {doCheck ?
                        <>
                            <LoaderText>Checking</LoaderText>
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={50}
                                width={50}
                            />
                        </> :
                        <>
                            <FormButton onClick={() => { setDoPasswordUpdate(doPasswordUpdate + 1) }} >Save password</FormButton>
                            <FormButtonDelete className="button2" onClick={() => { cancelSavePassword() }} >Cancel</FormButtonDelete>
                        </>
                    }

                </UserContainer> :
                deleteActive ?
                    <UserContainer>
                        <FormLabel>Give password</FormLabel>
                        <FormInput type="password" value={deletePassword} onChange={(e) => (deletePasswordChanged(e))} />

                        {doCheck ?
                            <>
                                <LoaderText>Deleting</LoaderText>
                                <Loader
                                    type="TailSpin"
                                    color="#00BFFF"
                                    height={50}
                                    width={50}
                                />
                            </> :
                            <>
                                <FormButton className="button2" onClick={() => makeSureDelete()} >Delete account</FormButton>
                                <FormButtonDelete onClick={() => { cancelDelete() }} >Cancel</FormButtonDelete>
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
                            <Username>{user === undefined ? "testi" : user.username}</Username>
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
                            <FormButtonDelete className="button2" onClick={() => confirmUserDelete()}>Delete account</FormButtonDelete>
                        </UserContainer>
            }



        </ProfileContainer>
    )
}

export default Profile;
