import { ReactComponent as HomeActive } from '../../static/icons/home-active.svg';
import { ReactComponent as HomeInactive } from '../../static/icons/home-inactive.svg';
<<<<<<< HEAD

import { ReactComponent as SearchActive } from '../../static/icons/search-active.svg'
import { ReactComponent as SearchInactive } from '../../static/icons/search-inactive.svg'

import { ReactComponent as LibraryActive } from '../../static/icons/library-active.svg'
import { ReactComponent as LibraryInactive } from '../../static/icons/library-inactive.svg'


import { ReactComponent as PlusActive } from '../../static/icons/plus-active.svg'

import { ReactComponent as LeftArrow } from '../../static/icons/left-arrow.svg'

const Icon = ({ iconType }) => {

=======
import { ReactComponent as SearchActive } from '../../static/icons/search-active.svg';
import { ReactComponent as SearchInactive } from '../../static/icons/search-inactive.svg';
import { ReactComponent as LibraryActive } from '../../static/icons/library-active.svg';
import { ReactComponent as LibraryInactive } from '../../static/icons/library-inactive.svg';
import { ReactComponent as PlusActive } from '../../static/icons/plus-active.svg';
import { ReactComponent as LeftArrow } from '../../static/icons/left-arrow.svg';
import { ReactComponent as PlayButton } from '../../static/playbar/show/show-play-bar-play-button.svg';
import { ReactComponent as PlayButtonCircle } from '../../static/playbar/show/show-play-bar-play-circle.svg';
import { ReactComponent as PauseButton } from '../../static/playbar/show/show-play-bar-pause-button.svg';
import { ReactComponent as ShuffleButton } from '../../static/icons/shuffle.svg';
import { ReactComponent as PrevButton } from '../../static/icons/prev.svg';
import { ReactComponent as NextButton } from '../../static/icons/next.svg';
import { ReactComponent as RepeatButtonInactive } from '../../static/icons/repeat-inactive.svg';
import { ReactComponent as RepeatButtonActive } from '../../static/icons/repeat-active.svg';
import { ReactComponent as QueueButtonInactive } from '../../static/icons/queue-inactive.svg';
import { ReactComponent as VolumeButton } from '../../static/icons/volume.svg';

const Icon = ({ iconType, onClick }) => {
>>>>>>> 1ecacea65fbf6501191f487682f488e757fa3f65
  const icons = {
    HomeActive,
    HomeInactive,
    SearchActive,
    SearchInactive,
    LibraryActive,
    LibraryInactive,
    PlusActive,
<<<<<<< HEAD
    LeftArrow
  }

  const IconComponent = icons[iconType]
  return <IconComponent />
}

export default Icon;
=======
    LeftArrow,
    PlayButton,
    PlayButtonCircle,
    PauseButton,
    ShuffleButton,
    PrevButton,
    NextButton,
    RepeatButtonActive,
    RepeatButtonInactive,
    QueueButtonInactive,
    VolumeButton,
  };

  const IconComponent = icons[iconType];
  return <IconComponent onClick={onClick} />;
}

export default Icon;
>>>>>>> 1ecacea65fbf6501191f487682f488e757fa3f65
