import { Link } from 'react-router-dom'

const SongCards = ({ song }) => {
  <div className='vertical-content-card' key={song.id}>
  <Link to={`/songs/${song.id}`}>
    <img src={song.cover_img} alt='' className='vertical-cover' />
    <p className='vertical-title'>{song.title}</p>
  </Link>
  <p className='vertical-artist'>{song.artistName}</p>
</div>
}

export default SongCards;