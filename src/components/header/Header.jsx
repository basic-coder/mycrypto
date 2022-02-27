import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import {BsFillMoonFill,BsFillSunFill} from 'react-icons/bs'
import "./header.css";

const Header = () => {
    
    const [toggleMenu, setToggleMenu] = useState(true)
    const [modeToggle, setModeToggle] = useState(true)

    const lightMode = () =>{
        document.body.classList.add('active')
        setModeToggle(false)
    }

    const darkMode = () =>{
        document.body.classList.remove('active')
        setModeToggle(true)
    }

     
  return (
    <>
      <header className={toggleMenu ? `crypto__header` : 'crypto__header active'}>
        <Link to="/" className="logo">
        <img
          className="crypto__user"
          src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_960_720.png"
          alt=""
        />
        <h3>Basic Coder</h3>
        </Link>
        <div className="crypto__navbar">
          <Link to="/">Home</Link>
          <Link to="/wallet">Wallet</Link>
          <Link to="/services">Services</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="contact">Contact</Link>
          
          {
              modeToggle ? (
                <div className="theme__toggler"  onClick={lightMode}>
                <BsFillSunFill />
                </div>
              ) :(
                <div className="theme__toggler"  onClick={darkMode}>
                <BsFillMoonFill  />
                </div>
              )
          }

        </div>
      </header>
      <div className="menu-btn">
          {toggleMenu ? (
              <AiOutlineBars onClick={()=> setToggleMenu(false)} />
          ) : (
            <AiOutlineClose onClick={()=> setToggleMenu(true)} />
          )
        }
      </div>
    </>
  );
};

export default Header;
