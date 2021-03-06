class Api::CommentsController < ApplicationController
  before_action :set_video
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    render json: @video.comments
  end

  def show
    render json: @comment
  end

  def create
    @comment = @video.comments.new(comment_params)

    if @comment.save
      render json: @comment
    else
      render json: @comment.errors, status: 422
    end

  end

  def update

    if @video.comments.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: 422
    end

  end

  def destroy
    @comment.destroy
  end

  private

    def set_video
      @video = Video.find(params[:video_id])
    end

    def set_comment
      @comment = @video.comments.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:author, :body, :date)
    end

end
