# app/views/search/index.json.jbuilder


json.array!(@results[:artists] + @results[:albums] + @results[:songs] + @results[:playlists]) do |result|
  json.type result.class.name.downcase
  case result
  when Artist
    json.extract! result, :id, :artist_name, :verified, :about_blurb, :about_img, :global_ranking, :monthly_listeners
    json.songs result.songs.map { |song|
      song_attributes = song.as_json(only: [:id, :title, :duration, :explicit, :album_id, :artist_id])
      song_attributes.merge!(
        cover_img: song.album&.cover_img,  # Safely get the cover image from the song's album
        album_title: song.album&.title,    # Safely get the album's title
        artist_name: result.artist_name  # Artist's name from the current artist context
      )
    }
  when Album
    json.extract! result, :id, :artist_id, :title, :genre, :cover_img, :release_date, :record_company
    json.songs result.songs.map { |song|
      song_attributes = song.as_json(only: [:id, :title, :duration, :explicit])
      song_attributes.merge!(
        artist_name: song.artist&.artist_name,  # Safely get the artist's name
        album_title: result.title,            # Add the album's title from the current album context
        cover_img: result.cover_img,
        artist_id: result.artist_id
      )
    }
  when Song
    json.extract! result, :id, :artist_id, :album_id, :title, :duration, :explicit, :song_url
    json.cover_img result.album.try(:cover_img)
    json.artist_name result.artist.try(:artist_name)
    json.album_title result.album.try(:title)
  when Playlist
    json.extract! result, :id, :user_id, :title
  end
end