import { ReactComponent as HomeActive } from '../../static/icons/home-active.svg';
import { ReactComponent as HomeInactive } from '../../static/icons/home-inactive.svg';

import { ReactComponent as SearchActive } from '../../static/icons/search-active.svg'
import { ReactComponent as SearchInactive } from '../../static/icons/search-inactive.svg'

import { ReactComponent as LibraryActive } from '../../static/icons/library-active.svg'
import { ReactComponent as LibraryInactive } from '../../static/icons/library-inactive.svg'


import { ReactComponent as PlusActive } from '../../static/icons/plus-active.svg'

import { ReactComponent as LeftArrow } from '../../static/icons/left-arrow.svg'

const Icon = ({ iconType }) => {

  const icons = {
    HomeActive,
    HomeInactive,
    SearchActive,
    SearchInactive,
    LibraryActive,
    LibraryInactive,
    PlusActive,
    LeftArrow
  }

  const IconComponent = icons[iconType]
  return <IconComponent />
}

export default Icon;