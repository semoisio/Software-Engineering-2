import React from 'react'
import {
    ProfileContainer,
    UserContainer,
    Username,
    Learn
}from './ProfileElements';

const Profile = () => {
    return (
        <ProfileContainer data-testid="profileContainer">
            <UserContainer>
                <Username>Testi</Username>
                <Learn>I want to learn:​</Learn>
            </UserContainer>
        </ProfileContainer>
    )
}

export default Profile
