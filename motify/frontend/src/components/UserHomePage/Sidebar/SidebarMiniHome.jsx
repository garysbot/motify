import '../UserHomePage.css'
import './Sidebar.css'
import Icon from '../../Icons/Icons.jsx'

const SidebarMiniHome = () => {
  return (
    <>
      <div className='sidebar-mini-home'>
        <div className="mini-home-icon row-align">
          <Icon iconType='HomeActive' /><p>Home</p>
        </div>
        <div className='mini-home-search row-align'>
          <Icon iconType='SearchInactive' /><p>Search</p>
        </div>
      </div>
    </>
  );
}

export default SidebarMiniHome;