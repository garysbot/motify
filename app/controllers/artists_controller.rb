class ArtistsController < ApplicationController
  before_action :set_artist, only: %i[ show ]

  # GET /artists
  # GET /artists.json
  def index
    @artists = Artist.includes(:albums).all
  end

  
  # GET /artists/1
  # GET /artists/1.json
  def show
    @artist = Artist.find(params[:id])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artist
      @artist = Artist.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def artist_params
      params.require(:artist).permit(:artist_name, :verified, :about_blurb, :about_img, :global_ranking, :monthly_listeners)
    end
end
