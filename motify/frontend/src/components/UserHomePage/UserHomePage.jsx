import "./UserHomePage.css";

const UserHomePage = () => {
  return (
    <>
      <div className="background">
        <div className="user-home-page-sidebar">
          <div className="user-home-page-mini-home-search">
            
            <p>Home</p>
            <p>Search</p>
            <div className="user-home-page-home-icon"></div>
          </div>
          
          <div className="user-home-page-library">
            <p>Library</p>
          </div>

        </div>
      </div>
    </>
  );

};

export default UserHomePage;
