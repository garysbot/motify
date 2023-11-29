class AlbumsController < ApplicationController
  before_action :set_album, only: %i[ show update destroy ]

  # GET /albums
  # GET /albums.json
  def index
    @albums = Album.includes(:songs, :artist).all
    # .includes(:songs, :artist) preloads associated songs and artist
  end

  # GET /albums/1
  # GET /albums/1.json
  def show
    @album = Album.find(params[:id])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_album
      @album = Album.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def album_params
      params.require(:album).permit(:artist_id, :title, :genre, :cover_img, :release_date, :record_company )
    end
end
