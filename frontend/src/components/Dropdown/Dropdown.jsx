import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


import { useDispatch } from 'react-redux';
import { toggleDropdown } from '../../store/uiReducer';
import * as sessionActions from '../../store/session';


import '../MainPage/MainPage.css'
import './Dropdown.css'

import { ReactComponent as MenuDots } from '../../static/icons/show-menu.svg'


const Dropdown = ({ type, state }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    dispatch(sessionActions.logout())
    dispatch(toggleDropdown())
    history.push('/login');
  }
  

  if (type === 'user') {
    return (
      <div className="userbar-profile-menu">
        <ul>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    );
  }

  if (type === 'song') {
    return (
      <>
        <MenuDots/>
        { state && 
          <>
            <div className='song-menu' >
              <ul>
                <li>
                  <p>Hi</p>
                </li>
              </ul>
            </div>
          </> 
        }
      </>
    )
  }


};

export default Dropdown;
