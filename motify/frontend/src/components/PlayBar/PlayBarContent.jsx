import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'


const PlayBarContent = ({ contentType }) => {
  const content = {
    kendrickAlbumCover
  }

  const ContentComponent = content[contentType]
  return <ContentComponent />
};

export default PlayBarContent;