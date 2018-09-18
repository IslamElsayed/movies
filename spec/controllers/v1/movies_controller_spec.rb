require 'rails_helper'

RSpec.describe V1::MoviesController do
  describe 'GET #index' do
    it "search for movies" do
      get :index, params: { keyword: 'key' }

      expect(response).to be_success
      json_response = JSON.parse(response.body)
      expect(json_response["results"].class).to eq(Array)
      expect(json_response["page"]).to eq(1)
    end
  end

  before do
    Movies::ShowService.any_instance.stub(:execute).and_return({ title: 'title', original_language: 'original_language', overview: 'overview' })
  end

  describe 'GET #show' do
    it "retrieve movie information" do
      get :show, params: { id: 1 }
      expect(response).to be_success
      json_response = JSON.parse(response.body)
      expect(json_response["title"]).to be_present
      expect(json_response["original_language"]).to be_present
      expect(json_response["overview"]).to be_present
    end
  end
end
