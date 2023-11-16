import { useEffect, useState } from "react"

export const useSongs = () => {

  const [songs, setSongs] = useState()

  useEffect(()=>{
    const fetchSongs = async () => {
      const response = await fetch ('/songs/')
      const data = await response.json();
      setSongs(data);
    };
    // console.log(`songs`)

    fetchSongs();
  }, []);

  return songs;

}