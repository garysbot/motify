import './HomePage.css';
import Cards from '../Content/Cards/Cards.jsx'

const HomePage = () => {
  return (
    <>
      <Cards contentType='artists'/>
      <Cards contentType='albums'/>
      <Cards contentType='songs'/>
    </>
  );
}

export default HomePage