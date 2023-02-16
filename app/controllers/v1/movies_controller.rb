class V1::MoviesController < ApplicationController
  def index
    result = Movies::SearchService.new(params[:keyword], params[:page] || 1).execute
    render json: result
  end

  def show
    movie = Movies::ShowService.new(params[:id]).execute
    render json: movie
  end
end
