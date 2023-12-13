import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export const useAlbums = () => {
  const [albums, setAlbums] = useState()

  useEffect(()=>{
    const fetchAlbums = async () => {
      const response = await fetch ('/albums/')
      const data = await response.json();
      setAlbums(data);
    };
    // console.log(`albums`)

    fetchAlbums();
  }, []);

  return albums;

}