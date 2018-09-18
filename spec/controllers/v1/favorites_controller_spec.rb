require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe V1::FavoritesController do
  let(:user) { create(:user) }
  let(:favorites) { create_list(:favorite, 5, user: user) }
  before do
    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
    # This will add a valid token for `user` in the `Authorization` header
    @auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    allow(request.env['warden']).to receive(:authenticate!).and_return(user)
    allow(controller).to receive(:authenticate_user!).and_return(user)
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET #index' do
    it "get all favorites" do
      favorites
      get :index

      expect(response).to be_success
      json_response = JSON.parse(response.body)
    end
  end

  describe 'POST #create' do
    it "creates record" do
      post :create, params: { favorite: { mdb_id: 3 } }
      expect(response).to be_success
      expect(response.body).to eq(Favorite.last.to_json)
    end
  end

  describe 'DELETE #destroy' do
    it "deletes record" do
      delete :destroy, params: { mdb_id: favorites.first.mdb_id }
      expect(response).to be_success
      expect(response.body).to eq(favorites[1..-1].to_json)
    end
  end
end
