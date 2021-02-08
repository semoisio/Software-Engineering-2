import React from 'react'
import {
    ErrorpageContainer,
    ErrorMSG,
    ErrorImg,
    BackHomeLink
} from './ErrorpageElemenents';
import wrongwayImg from '../../images/wrongpage.jpg';

const Errorpage = () => {
    return (
        <ErrorpageContainer data-testid="errorpageContainer">
            <ErrorMSG>We could't find the page</ErrorMSG>
            <ErrorImg src={wrongwayImg} alt="Wrong way sign "/>
            <BackHomeLink to="/" data-testid="backHomeLink">To Homepage</BackHomeLink>
        </ErrorpageContainer>
    )
}

export default Errorpage;
