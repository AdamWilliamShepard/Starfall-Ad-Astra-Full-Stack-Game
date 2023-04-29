import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import StarfallLogo from '../img/StarfallLogo.png'

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/title">
        <img src={StarfallLogo} alt="logo" style={{ width: '40%', height: '100%', objectFit: 'cover', marginLeft: 100 }} />
      </Link>
      <div style={{ marginRight: 100 }}>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/story">
              Story
            </Link>

            <Link className="navLink" to="/canvas">
              Play Game
            </Link>

            <Link className="navLink" to="/about">
              About
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/form">
          Form
        </Link> */}

      </div>
    </div>
  );
}

export default Nav;
