import React from 'react'
import{
    DeletedpageContainer,
    ErrorMSG,
    ErrorImg,
    BackHomeLink
}from './ProfileDeletedComponents';
import kuva from '../../images/byebye.png'

const ProfileDeleted = () => {
    return (
        <DeletedpageContainer>
            <ErrorMSG>Account deleted succesfully!</ErrorMSG>
            <ErrorImg src={kuva} alt="Wrong way sign "/>
            <BackHomeLink to="/" data-testid="backHomeLink">To Homepage</BackHomeLink>
        </DeletedpageContainer>
    )
}

export default ProfileDeleted
