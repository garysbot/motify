# app/views/search/index.json.jbuilder

json.results do
  json.array!(@results[:artists] + @results[:albums] + @results[:songs] + @results[:playlists]) do |result|
    json.type result.class.name.downcase # Adding a type attribute to distinguish the result type
    case result
    when Artist
      json.extract! result, :id, :artist_name, :verified, :about_blurb, :about_img, :global_ranking, :monthly_listeners
      # Additional artist attributes if needed
    when Album
      json.extract! result, :id, :artist_id, :title, :genre, :cover_img, :release_date, :record_company
      # Additional album attributes if needed
    when Song
      json.extract! result, :id, :artist_id, :album_id, :title, :duration, :explicit, :song_url
      # Additional song attributes if needed
    when Playlist
      json.extract! result, :id, :user_id, :title
      # Additional playlist attributes if needed
    end
  end
end
