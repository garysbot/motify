class SongsController < ApplicationController
  before_action :set_song, only: %i[ show update destroy ]

  # GET /songs
  # GET /songs.json
  def index
    @songs = Song.includes(:album, :artist).all
  end

  # GET /songs/1
  # GET /songs/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_song
      @song = Song.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def song_params
      params.require(:song).permit(:artist_id, :album_id, :duration, :title, :explicit)
    end
end
