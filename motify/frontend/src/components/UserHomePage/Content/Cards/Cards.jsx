import Cover1 from '../../../../static/albums/covers/cover-midjourney-1.png'
import Cover2 from '../../../../static/albums/covers/cover-midjourney-2.png'
import Cover3 from '../../../../static/albums/covers/cover-midjourney-3.png'
import Cover4 from '../../../../static/albums/covers/cover-midjourney-4.png'
import Cover5 from '../../../../static/albums/covers/cover-midjourney-5.png'
import Cover6 from '../../../../static/albums/covers/cover-midjourney-6.png'
import './Cards.css'

const Cards = ({ albums }) => {

  const cardsData = {
    Cover1,
    Cover2,
    Cover3,
    Cover4,
    Cover5,
    Cover6,
  }

  return (
    <>
      <div className='content-cards-container'>
        {/* // TODO Dynamic H2 */}
        <h2>Albums</h2>
        <div className='content-cards'>
          {/* Max - 3x per row; 2x rows */}
          {/* Min - 2x per row; 3x rows */}
          <div className="vertical-content-card">
            {/* On Hover Play/Pause Button */}
            {/* Boolean -> True = show play anim / False = do not show */}
            <img src={Cover1} alt='' className='vertical-cover'/>
              <div className='vertical-text'>
                <p className='vertical-title'>Album Title Here</p>
                <p className='vertical-artist'>Artist Name Here</p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;