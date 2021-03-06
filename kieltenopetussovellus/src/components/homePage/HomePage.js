import React, {useState} from 'react';
import Navbar from '../homePageNavbar/Navbar'
import SideBar from '../homePageNavbar/SideBar';
import {HomePageWrapper} from './HomePageElements';
import IntroPageJS from './IntroPageJS';

/**
 * Homepage 
 */
function HomePage(){
    // This state keeps track is sidebaropen or not
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Toggle function for showing and hiding sidebar
     */
    const toggle = () =>{
        setIsOpen(!isOpen);
    };

    return(
        <HomePageWrapper data-testid="homepage">
            <IntroPageJS/>
        </HomePageWrapper>
    );
}

export default HomePage;