class Api::VideosController < ApplicationController
  before_action :set_video, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    render json: Video.all
  end

  def show
    render json: @video
  end

  def create
    video = Video.new(video_params)

    if video.save
      render json: video
    else
      render json: video.errors, status: 422
    end
  end

  def update
    if @video.update(video_params)
      render json: @video
    else
      render json: @video.errors, status: 422
    end
  end

  def destroy
    @video.destroy
  end

  private
    def set_video
      @video = Video.find(params[:id])
    end

    def video_params
      params.require(:video).permit(:title, :description, :genre, :trailer)
    end
end
