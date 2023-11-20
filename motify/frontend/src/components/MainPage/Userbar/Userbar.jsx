import '../MainPage.css'
import Icon from '../../Icons/Icons.jsx'
import ProfileMenu from './ProfileMenu/ProfileMenu.jsx';
import { ReactComponent as LeftArrowActive } from '../../../static/icons/left-arrow-active.svg'
import { ReactComponent as RightArrowActive } from '../../../static/icons/right-arrow-active.svg'

const Userbar = () => {
  return (
    <>
      <div className='user-home-userbar'>
        <div className='userbar-arrow-nav'>
          <Icon iconType='LeftArrow' />
          <LeftArrowActive />
          <RightArrowActive />
        </div>

        <div className='userbar-profile-container'>
          <ProfileMenu />
        </div>

      </div>
    </>
  );
}

export default Userbar;