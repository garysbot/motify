import { useEffect, useState } from "react"

export const useArtists = () => {

  const [artists, setArtists] = useState()

  useEffect(()=>{
    const fetchArtists = async () => {
      const response = await fetch ('/artists/')
      const data = await response.json();
      setArtists(data);
    };
    // console.log(`artists`)

    fetchArtists();
  }, []);

  return artists;

}