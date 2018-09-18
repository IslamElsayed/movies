class V1::FavoritesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_favorite, only: [:destroy]

  # GET /favorites
  def index
    @favorites = current_user.favorites

    render json: @favorites
  end

  # POST /favorites
  def create
    @favorite = current_user.favorites.new(favorite_params)

    if @favorite.save
      render json: @favorite, status: :created
    else
      render json: @favorite.errors, status: :unprocessable_entity
    end
  end

  # DELETE /favorites/1
  def destroy
    @favorite.destroy
    render json: current_user.favorites
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_favorite
      @favorite = Favorite.find_by(mdb_id: params[:mdb_id])
    end

    # Only allow a trusted parameter "white list" through.
    def favorite_params
      params.require(:favorite).permit(:mdb_id)
    end
end
