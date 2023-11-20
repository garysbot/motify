import './Sidebar.css'
import '../MainPage.css'
import SidebarLibrary from "./SidebarLibrary";
import SidebarMiniHome from "./SidebarMiniHome";

const Sidebar = () => {
  return (
    <>
      <div className="user-home-sidebar">
        <SidebarMiniHome/>
        <SidebarLibrary/>
      </div>
    </>
  );
}

export default Sidebar;