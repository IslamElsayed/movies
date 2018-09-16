class MoviesController < ApplicationController
  def index
    result = Movies::SearchService.new(params[:keyword]).execute
    render json: result
  end

  def show
    movie = Movies::ShowService.new(params[:movie_id]).execute
    render json: movie
  end
end
