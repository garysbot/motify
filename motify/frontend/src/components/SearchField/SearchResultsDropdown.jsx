import './SearchResultsDropdown.css'

const SearchResultsDropdown = ({ searchResults, searchInitiated }) => {
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
      {!hasResults() && searchInitiated && <p>No results found</p>}

        {
          artistResults.map((artist, index) => 
            <div className='artist-result'>
              <p key={index}>{artist.artist_name}</p>
            </div>
          )
        }

        {
          albumResults.map((album, index) => 
            <div className='album-result'>
              <p key={index}>{album.title}</p>
            </div>
          )
        }

        {
          songResults.map((song, index) => 
            <div className='song-result'>
              <p key={index}>{song.title}</p>
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