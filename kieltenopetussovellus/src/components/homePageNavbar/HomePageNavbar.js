import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './homePageNavbar.css';


function HomePageNavbar() {

    const [luokka, setLuokka] = useState("links");

    const toggleLuokka = () =>{
        if(luokka === "links"){
            setLuokka("links linksActive")
        }else{
            setLuokka("links")
        }
    }

    return (
        <nav className="nav">
            <NavLink to="/" className="navlink">Brand Name</NavLink>
            <div className={"burger"} onClick={() => {toggleLuokka()} } >
                <div className="burger-line1"></div>
                <div className="burger-line1"></div>
                <div className="burger-line1"></div>
            </div>
            <ul  className={luokka}>
                <li>
                    <button className="navbar-button">Sign In</button>
                </li>
                <li>
                    <button className="navbar-button">Sign Up</button>
                </li>
            </ul>
            
        </nav>
    )
}

export default HomePageNavbar
