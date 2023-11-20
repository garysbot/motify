import '../MainPage.css'
import './Sidebar.css'
import Icon from '../../Icons/Icons.jsx'

const SidebarLibrary = () => {
  return (
    <>
      <div className='sidebar-library'>
        <div className='library-header row-align'>
          <Icon iconType='LibraryActive' />
          <p>Your Library</p>
        </div>
        <div className='library-content'>
          {/* Subcomponents in here */}
        </div>
      </div>
    </>
  );
}

export default SidebarLibrary;