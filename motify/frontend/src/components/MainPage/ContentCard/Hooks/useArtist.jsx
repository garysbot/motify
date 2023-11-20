import { useEffect, useState } from "react"

export const useArtist = (artistId) => {

  const [artist, setArtist] = useState()

  useEffect(()=>{
    const fetchAlbum = async () => {
      const response = await fetch (`/artists/${artistId}`)
      const data = await response.json();
      setArtist(data);
    };
    // console.log(`albums`)

    fetchAlbum();
  }, [artistId]);

  return artist;

}