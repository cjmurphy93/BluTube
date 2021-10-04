require 'rails_helper'

RSpec.describe Api::VideosController, type: :controller do
    def create_users
        @user1 = FactoryBot.create(:user, email: '1@1.com')
    end
    def create_videos
        @new_vid = FactoryBot.create(:video, title: "new", creator_id: @user1.id, created_at: 1.day.ago)
        @old_vid = FactoryBot.create(:video, title: "old", creator_id: @user1.id, created_at: 1.year.ago)
    end

   describe "GET #index" do
    before do
        create_users
        create_videos
    end

     context "of latest videos" do
      it "renders the index template" do
        get :index, {format: :json}

        expect(assigns(:videos)).to contain_exactly(@new_vid)
        expect(response).to render_template("index")
      end
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
 
  end
end
