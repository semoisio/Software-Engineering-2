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
    FormButtonDelete
} from './ProfileElements';
import Select from 'react-select';
import kuva from '../../../images/AudioWave.jpg'
import { languageOptions } from '../../../tools/defaultOptions';
import Loader from "react-loader-spinner";
import {
    LoaderText,
    LoaderContainer
} from '../searchElement/SearchElements'
import { foundCorrectLabel } from './profileFunctions';


const Profile = () => {
    // State to toggle searching or no
    const [searching, setSearching] = useState(false);

    const [editing, setEditing] = useState(false);

    const [editingButtonText, setEeditingButtonText] = useState("Edit language");

    const [changePassword, setChangePassword] = useState(false);

    //Fire user update
    const [doUpdate, setDoupdate] = useState(0);

    //Fire password change
    const [doCheck, setDoCheck] = useState(0);

    const [selectedLanguage, setSelectedLanguage] = useState({ value: "" });

    const [user, setUser] = useState();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

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
            user[0].learning = selectedLanguage.value 
            setEeditingButtonText("Edit language");
            //setDoupdate(doUpdate +1);
        }
    }

    const savePassword = () => {
        setChangePassword(!changePassword);
    }

    const confirmUserDelete = () => {
        if(window.confirm("Are you sure?")){

        }else{

        }
    }

    useEffect(() => {
        const updateUser = async () => {
            setSearching(true);
             // HUOM KEskes!!!!!!!!!!!
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


    return (
        <ProfileContainer data-testid="profileContainer">
            
            {changePassword ? 
            
            <UserContainer>
                <FormLabel>Old password</FormLabel>
                <FormInput type="text"  value={oldPassword} onChange={(e) =>(oldPasswordChanged(e))}  />
                <FormLabel>New password</FormLabel>
                <FormInput type="text" value={newPassword1} onChange={(e) =>(passwordChanged(e))} />
                <FormLabel>Confirm new password</FormLabel>
                <FormInput type="text"  value={newPassword2} onChange={(e) =>(confirmPasswordChanged(e))} />
                <FormButton onClick={() =>{savePassword()}} >Save password</FormButton>
            </UserContainer>:
            searching ?
                <LoaderContainer>
                    <LoaderText>Loading</LoaderText>
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                </LoaderContainer> :

                <UserContainer>
                    <Username>{user === undefined ? "testi" : user[0].username}</Username>
                    <Learn>I want to learn:​</Learn>
                    <UserImage src={kuva} />
                    <SelectContainer>
                        <Select
                            isDisabled={!editing}
                            value={selectedLanguage}
                            onChange={handleSelectClickLanguage}
                            options={languageOptions}
                        />
                    </SelectContainer>
                    <FormButton onClick={() => (editingChangged())}>{editingButtonText}</FormButton>
                    <FormButton onClick={() => (setChangePassword(!changePassword))}>Change password</FormButton>
                    <FormButtonDelete onClick={() =>{confirmUserDelete()}}>Delete account</FormButtonDelete>
                </UserContainer>
            }
        


        </ProfileContainer>
    )
}

export default Profile;
