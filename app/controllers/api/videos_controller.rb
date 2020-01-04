class Api::VideosController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    render json: Video.all
  end

  def show
    render json: @video
  end

  def create
    video = Video.new(product_params)

    if video.save
      render json: video
    else
      render json: video.errors, status: 422
    end
  end

  def update
    if @video.update(product_params)
      render json: @video
    else
      render json: @video.errors, status: 422
    end
  end

  def destroy
    @video.destroy
  end

  private
    def set_product
      @video = Video.find(params[:id])
    end

    def product_params
      params.require(:video).permit(:name, :description, :price, :department)
    end
end
