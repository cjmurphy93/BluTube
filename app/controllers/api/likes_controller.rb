class Api::LikesController < ApplicationController
    before_action :require_logged_in, only: [:create, :destroy]

    def index
        @likes = Like.where(user_id: current_user.id)
        render :index
    end

    def create
        @like = Like.find_by(
            user_id: current_user.id,
            likeable_type: params[:like][:likeable_type],
            likeable_id: params[:like][:likeable_id]
        )

        unless @like
            @like = Like.new(like_params)
            @like.user_id = current_user.id
        end

        @like.dislike = params[:like][:dislike]

        if @like.save
            render :show
        else
            render json: @like.errors.full_messages
        end
    end

    def destroy
        @like = Like.find_by(
            user_id: current_user.id,
            likeable_type: params[:like][:likeable_type],
            likeable_id: params[:like][:likeable_id]
        )

        if @like
            @like.destroy
            render :show
        else
            render json: ['No like found'], status: 404
        end
    end

    private

    def like_params
        params.require(:like).permit(:user_id, :likeable_type, :likeable_id, :dislike)
    end

end
