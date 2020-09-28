class Api::CommentsController < ApplicationController
        before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        video = Video.find(params[:video_id])
        @comments = video.comments
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if !@comment.update
            render json: @comment.errors.full_messages
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
    end

    private

    def comment_params
        params.require(:comment).permit(:body,:author_id, :commentable_type, :commentable_id)
    end
end
