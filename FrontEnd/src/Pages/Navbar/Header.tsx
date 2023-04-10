import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.png";
import jwt_decode from 'jwt-decode';
import { tokenType } from "../../Interfaces/RidesType";

export const Header = () => {
  let [showMenu, setShowMenu] = useState(false);
  let [routePath , setRoutePath] = useState(useLocation().pathname);
  let tokenDetails : tokenType = jwt_decode(localStorage.getItem('jwt-token')!);
  let useEmail : string = tokenDetails.email;
  let toggleShowMenu = (e :React.MouseEvent<HTMLImageElement, MouseEvent> ) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };
  
  let logoutUser = (e : React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
    e.preventDefault();
    localStorage.removeItem("jwt-token");
    window.location.replace('/login');
  }

  return (
    <>
      <div className="header d-flex align-items-center justify-content-between">
        <div className="header-logo">
          {" "}
          <img src={logo}></img>
        </div>
        <div className="header-profile-menu-bar">
          <div className="header-profile d-flex align-items-center">
            <h6>{useEmail}</h6>
            <img src={logo} onClick={e=>{toggleShowMenu(e)}}></img>

            {showMenu && (
              <div className="menu-bar mt-1">
                <div className={`list-option d-flex align-items-center ${routePath == '/bookorofferride' ? "selected-item":''}`}
                 >
                  <Link to={'/bookorofferride'}>
                  Profile
                  </Link>
                </div>
                <div 
                 className={`list-option d-flex align-items-center ${ routePath== '/history' ? 'selected-item':''}`}
                >
                  <Link
                    to="/history" 
                  >
                    My Rides
                  </Link>
                </div>
                <div className={`list-option d-flex align-items-center ${ routePath== '/login' ? 'selected-item':''}`}
                  >
                  <Link   to ={''} onClick ={e=>{logoutUser(e)}}>
                  Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
