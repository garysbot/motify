import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'
import { ReactComponent as PlayButton } from '../../static/playbar/show/show-play-bar-play-button.svg'
import { ReactComponent as PlayButtonCircle } from '../../static/playbar/show/show-play-bar-play-circle.svg'
import { ReactComponent as PauseButton } from '../../static/playbar/show/show-play-bar-pause-button.svg'
import { ReactComponent as ShuffleButton } from '../../static/icons/shuffle.svg'
import { ReactComponent as PrevButton } from '../../static/icons/prev.svg'
import { ReactComponent as NextButton } from '../../static/icons/next.svg'
import { ReactComponent as RepeatButtonInactive } from '../../static/icons/repeat-inactive.svg'
import { ReactComponent as RepeatButtonActive } from '../../static/icons/repeat-active.svg'
import { ReactComponent as QueueButtonInactive } from '../../static/icons/queue-inactive.svg'
import { ReactComponent as VolumeButton } from '../../static/icons/volume.svg'

const PlayBarContent = ({ contentType }) => {
  const content = {
    kendrickAlbumCover,
    PlayButton,
    PlayButtonCircle,
    PauseButton,
    ShuffleButton,
    PrevButton,
    NextButton,
    RepeatButtonActive,
    RepeatButtonInactive,
    QueueButtonInactive,
    VolumeButton
  }

  const ContentComponent = content[contentType]
  return <ContentComponent />
};

export default PlayBarContent;