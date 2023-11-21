module Api
  class SearchController < ApplicationController
    def index
      # Implement search logic here
      # Example: Search across different models
      @results = {
        artists: Artist.search(params[:q]),
        songs: Song.search(params[:q]),
        albums: Album.search(params[:q]),
        playlists: Playlist.search(params[:q])
      }

      render json: @results
    end
  end
end