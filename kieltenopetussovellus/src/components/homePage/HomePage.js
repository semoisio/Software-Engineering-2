import React, {useState} from 'react';
import Navbar from '../homePageNavbar/Navbar'
import SideBar from '../homePageNavbar/SideBar';

function HomePage(){

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen);
    };

    return(
        <div>
            <Navbar toggle={toggle}/>
            <SideBar isOpen={isOpen} toggle={toggle}/>
        </div>
    );
}

export default HomePage;