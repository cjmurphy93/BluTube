class Api::VideosController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]
    
    def index
        if params[:query]
            @videos = Video.with_attached_video_file.joins(:creator)
            .where('lower(videos.title) LIKE lower(?)
                    OR lower(videos.description) LIKE lower(?)
                    OR lower(users.first_name) LIKE lower(?)
                    OR lower(users.last_name) LIKE lower(?)', 
                    "%#{params[:query]}%",
                    "%#{params[:query]}%",
                    "%#{params[:query]}%",
                    "%#{params[:query]}%")
        else
            # @videos = Video.with_attached_video_file.all
            @videos = Video.with_attached_video_file.where('created_at >= ?', 3.months.ago).order('created_at DESC').limit(10)

            # BluTube_development=# EXPLAIN ANALYZE SELECT * FROM videos WHERE created_at >= CURRENT_DATE - INTERVAL '3 months' ORDER BY created_at DESC LIMIT 10;
                                                            #   QUERY PLAN                                                  
            # --------------------------------------------------------------------------------------------------------------
            #  Limit  (cost=1.34..1.35 rows=1 width=48) (actual time=0.065..0.074 rows=10 loops=1)
            #    ->  Sort  (cost=1.34..1.35 rows=1 width=48) (actual time=0.064..0.070 rows=10 loops=1)
                    #  Sort Key: created_at DESC
                    #  Sort Method: quicksort  Memory: 25kB
                    #  ->  Seq Scan on videos  (cost=0.00..1.33 rows=1 width=48) (actual time=0.022..0.047 rows=11 loops=1)
                        #    Filter: (created_at >= (CURRENT_DATE - '3 mons'::interval))
                        #    Rows Removed by Filter: 10
            #  Planning Time: 0.195 ms
            #  Execution Time: 0.107 ms
            # (9 rows)
            
        end
        render "api/videos/index"
    end

    def show
        
        @video = Video.with_attached_video_file.find(params[:id])
        
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
        @video = Video.with_attached_video_file.find(params[:id])
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
        @video = Video.with_attached_video_file.find(params[:id])
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
        params.require(:video).permit(:title, :description, :video_file, :thumbnail)
    end
end
