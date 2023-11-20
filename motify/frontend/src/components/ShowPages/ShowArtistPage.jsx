import './ShowPage.css'

const ShowArtistPage = ({ artistId }) => {
  return (
    <>
      <div className='show-banner'>
        <div className='banner-details'>
          <p>Artist</p>
          <h1 key={artistId}>{}</h1>
        </div>
      </div>
    </>
  );
}

export default ShowArtistPage;