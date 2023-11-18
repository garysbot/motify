import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'
import { ReactComponent as PlayButton } from '../../static/playbar/show/show-play-bar-play-button.svg'
import { ReactComponent as PlayButtonCircle } from '../../static/playbar/show/show-play-bar-play-circle.svg'
import { ReactComponent as PauseButton } from '../../static/playbar/show/show-play-bar-pause-button.svg'

const PlayBarContent = ({ contentType }) => {
  const content = {
    kendrickAlbumCover,
    PlayButton,
    PlayButtonCircle,
    PauseButton
  }

  const ContentComponent = content[contentType]
  return <ContentComponent />
};

export default PlayBarContent;