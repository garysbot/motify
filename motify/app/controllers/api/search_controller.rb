module Api
  class SearchController < ApplicationController
    def index
      @results = {
        artists: Artist.search(params[:q]),
        songs: Song.includes(:album).search(params[:q]),     # Eager load albums
        albums: Album.search(params[:q]),
        playlists: Playlist.search(params[:q])
      }

      # render json: @results
    end
  end
end
