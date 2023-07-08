// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Homepage.css';
import logo from './Logo/luxebnb.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <nav className='navbar'>
      <div className='logo-container'>
      <NavLink exact to="/" activeClassName="active-link" onClick={handleLogoClick}>
          <img src={logo} className="logo" />
        </NavLink>
      </div>
      <ul className='nav-links'>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>

  );
}

export default Navigation;
