import './SearchResultsDropdown.css'
import searchArrow from '../../static/icons/search-arrow.svg'
import { Link } from 'react-router-dom'

const SearchResultsDropdown = ({ query, searchResults, searchInitiated }) => {
  // Initialize the results as empty arrays
  let albumResults = searchResults.albums || [];
  let artistResults = searchResults.artists || [];
  let playlistResults = searchResults.playlists || [];
  let songResults = searchResults.songs || [];

  // Function to check if there are any results
  const hasResults = () => {
    return albumResults.length > 0 || artistResults.length > 0 || 
            playlistResults.length > 0 || songResults.length > 0;
  }

  return (
    <>
      <div className="search-results">
      {!hasResults() && searchInitiated && 
        <div className='no-results'>
          <h3>No results found for "{query}"</h3>
        </div>
      }

        {
          artistResults.map((artist, index) => 
            <div className='result-row'>
              <div className='result-detail'>
                <img src={artist.about_img} alt=''/>
                <div className='name'>
                  <p key={index}>{artist.artist_name}</p>
                  <p className='result-label'>Artist</p>
                </div>
              </div>
              <div className='result-link'>
                <Link to={`/artists/${artist.id}`}><img src={searchArrow} alt='Link' className='search-arrow'/></Link>
              </div>
            </div>
          )
        }

        {
          albumResults.map((album, index) => 
            <div className='result-row'>
              <div className='result-detail'>
                <img src={album.cover_img} alt='' />
                <div className='name'>
                  <p key={index}>{album.title}</p>
                  <p className='result-label'>Album</p>
                </div>
              </div>
              <div className='result-link'>
                <Link to={`/albums/${album.id}`}><img src={searchArrow} alt='Link' className='search-arrow'/></Link>
              </div>
            </div>
          )
        }

        {/* {
          songResults.map((song, index) => 
            <div className='song-result'>
              <p key={index}>{song.title}</p>
            </div>
          )
        } */}

        {
          playlistResults.map((playlist, index) => 
            <div className='playlist-result'>
              <p key={index}>{playlist.title}</p>
            </div>
          )
        }


      </div>
    </>
  );
}

export default SearchResultsDropdown;