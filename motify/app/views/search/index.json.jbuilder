# app/views/search/index.json.jbuilder

json.results do
  json.artists @results[:artists] do |artist|
    json.extract! artist, :id, :artist_name, :verified, :about_blurb, :about_img, :global_ranking, :monthly_listeners
    # Additional artist attributes if needed
  end

  json.albums @results[:albums] do |album|
    json.extract! album, :id, :artist_id, :title, :genre, :cover_img, :release_date, :record_company
    # Additional album attributes if needed
  end

  json.songs @results[:songs] do |song|
    json.extract! song, :id, :artist_id, :album_id, :title, :duration, :explicit, :song_url
    # Additional song attributes if needed
  end

  json.playlists @results[:playlists] do |playlist|
    json.extract! playlist, :id, :user_id, :title
    # Additional playlist attributes if needed
  end
end
