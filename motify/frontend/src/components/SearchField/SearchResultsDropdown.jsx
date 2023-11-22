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
            <Link to={`/artists/${artist.id}`}>
              <div className='result-row'>
                <div className='result-detail'>
                  <img src={artist.about_img} alt=''/>
                  <div className='name'>
                    <p key={index}>{artist.artist_name}</p>
                    <p className='result-label'>Artist</p>
                  </div>
                </div>
                <div className='result-link'>
                  <img src={searchArrow} alt='Link' className='search-arrow'/>
                </div>
              </div>
            </Link> 
          )
        }

        {
          albumResults.map((album, index) =>
            <Link to={`/albums/${album.id}`}>
              <div className='result-row'>
                <div className='result-detail'>
                  <img src={album.cover_img} alt='' />
                  <div className='name'>
                    <p key={index}>{album.title}</p>
                    <p className='result-label'>Album</p>
                  </div>
                </div>
                <div className='result-link'>
                  <img src={searchArrow} alt='Link' className='search-arrow'/>
                </div>
              </div>
            </Link> 
          )
        }

        {
          songResults.map((song, index) => 
            <div className='result-row'>
              <div className='result-detail'>
                <img src={song.cover_img} alt=''/>
                <div className='name'>
                  <p key={index}>{song.title}</p>
                  <p className='result-label'>{song.duration}</p>
                </div>

              </div>
            </div>
          )
        }

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