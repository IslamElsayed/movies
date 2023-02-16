module Movies
  class BaseService
    include HTTParty

    def execute
      JSON.parse(query_response_body)
    end

    private

    base_uri ENV['THE_MOVIE_DB_API_BASE_URL']

    def default_params
      { language: 'en-US', api_key: ENV['THE_MOVIE_DB_API_KEY'] }
    end
  end
end
