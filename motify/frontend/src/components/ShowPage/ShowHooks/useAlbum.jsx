import { useEffect, useState } from "react"

export const useAlbum = (albumId) => {

  const [album, setAlbum] = useState()

  useEffect(()=>{
    const fetchAlbum = async () => {
      const response = await fetch (`/albums/${albumId}`)
      const data = await response.json();
      setAlbum(data);
    };
    // console.log(`albums`)

    fetchAlbum();
  }, [albumId]);

  return album;

}