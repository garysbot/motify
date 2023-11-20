import '../UserHomePage.css'
import './Sidebar.css'
import Icon from '../../Icons/Icons.jsx'
import { NavLink } from 'react-router-dom'

const SidebarMiniHome = () => {
  return (
    <>
      <div className='sidebar-mini-home'>
          <NavLink
            to='/home' 
            className='mini-home-icon row-align'
            activeClassName='active-link'
            >
            <button>
              <Icon iconType='HomeActive'/><p>Home</p>
            </button>
          </NavLink>
          <NavLink to='/search' className='mini-home-search row-align'>
            <button>
              <Icon iconType='SearchInactive' /><p>Search</p>
            </button>
          </NavLink>
      </div>
    </>
  );
}

export default SidebarMiniHome;