import '../MainPage.css'
import './Sidebar.css'
import Icon from '../../Icons/Icons.jsx'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js'

const SidebarLibrary = () => {
  return (
    <>
      <div className='sidebar-library'>
        <div className='library-header'>
          <div className='library'>
            <Icon iconType='LibraryActive' />
            <p>Your Library</p>
          </div>
          <div className='library-plus'>
            <Link to='/create'>
              <Icon iconType='PlusActive'/>
            </Link>
          </div>
        </div>
        <div className='library-content'>
          {/* Subcomponents in here */}
        </div>
      </div>
    </>
  );
}

export default SidebarLibrary;