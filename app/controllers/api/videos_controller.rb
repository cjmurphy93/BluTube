class Api::VideosController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]
    
    def index
        if params[:query]
            @videos = Video.joins(:creator)
            .where('lower(videos.title) LIKE lower(?)
                    OR lower(videos.description) LIKE lower(?)
                    OR lower(users.first_name) LIKE lower(?)
                    OR lower(users.last_name) LIKE lower(?)', 
                    "%#{params[:query]}%",
                    "%#{params[:query]}%",
                    "%#{params[:query]}%",
                    "%#{params[:query]}%")
        else
            @videos = Video.all
        end
        render :index
    end

    def show
        
        @video = Video.find(params[:id])
        
        if logged_in?
            @view = View.new(ip_address: request.remote_ip, video_id: params[:id], user_id: current_user.id)
            if @view.save
                render :show
            else
                render json: @view.errors.full_messages, status: 422
            end
        else
            @view = View.new(ip_address: request.remote_ip, video_id: params[:id])
            if @view.save
                render :show
            else
                render json: @view.errors.full_messages, status: 422
            end
        end

        # render :show
    end

    def create
        @video = current_user.created_videos.new(video_params)
        if @video.save
            render :show
        else
            render json: video.errors.full_messages, status: 422
        end
    end

    def update
        @video = Video.find(params[:id])
        if @video
            if @video.creator_id == current_user.id
                if @video.update(video_params)
                    render :show
                else
                    render json: @video.errors.full_messages, status: 422
                end
            else
                render json: ['Videos Content Creator is not Logged in'], status: 422 
            end
        else
            render json: @video.errors.full_messages, status: 422
        end
    end

    def destroy
        @video = Video.find(params[:id])
        if @video
            if @video.creator_id == current_user.id
                if @video.destroy
                    render :show
                else
                    render json: @video.errors.full_messages, status: 422
                end
            else
                render json: ['Videos Content Creator is not Logged in'], status: 422 
            end
        else
            render json: @video.errors.full_messages, status: 422
        end
    end

    private

    def video_params
        params.require(:video).permit(:title, :description, :video_file)
    end
end
