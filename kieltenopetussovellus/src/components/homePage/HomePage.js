import React, {useState} from 'react';
import Navbar from '../homePageNavbar/Navbar'
import SideBar from '../homePageNavbar/SideBar';
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
        <div data-testid="homepage">
            <Navbar data-testid="navbar" toggle={toggle}/>
            <SideBar data-testid="sidebar" isOpen={isOpen} toggle={toggle}/>
        </div>
    );
}

export default HomePage;