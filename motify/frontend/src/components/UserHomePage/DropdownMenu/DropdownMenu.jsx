import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleDropdown } from '../../../store/uireducer';
import * as sessionActions from '../../../store/session';
import '../UserHomePage.css'


const DropdownMenu = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    await dispatch(sessionActions.logout())
    dispatch(toggleDropdown())
    history.push('/login');
  }

  return (
    <div className="userbar-profile-menu">
      <ul>
        <li onClick={handleLogout}>Log out</li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
