class PlaylistsController < ApplicationController
  before_action :set_playlist, only: %i[ show update destroy ]

  def index
    @playlists = Playlist.includes(songs: :artist).all
  end

  # POST /playlists
  # POST /playlists.json
  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      # Respond with the created playlist (e.g., render or redirect)
      render :show, status: :created, location: @playlist
    else
      # Handle the error scenario
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  def show
    @playlist = Playlist.includes(songs: :artist).find(params[:id])
  end

  # DELETE /playlists/1
  # DELETE /playlists/1.json
  def destroy
    @playlist.destroy
    # Respond to signify successful deletion
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_playlist
      @playlist = Playlist.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def playlist_params
      params.require(:playlist).permit(:user_id, :title)
    end
end
