import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


export const ErrorpageContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right:0;
    top:0;
    z-index:0;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background: linear-gradient( 
        108deg, 
        rgb(120, 120, 120),
        rgb(180, 180, 180)
    );
`;

export const ErrorMSG = styled.h1`
    @media screen and (max-width: 470px){
        font-size: 1.2rem;
    }
`;

export const ErrorImg = styled.img`
    height:400px;
    width: 450px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.9);
    border-radius: 1rem;

    @media screen and (max-width: 470px){
        height:15rem;
        width: 17rem;
    }
`;

export const BackHomeLink = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin-top:3rem;


    &:hover{
        text-decoration: underline;
    }
`;