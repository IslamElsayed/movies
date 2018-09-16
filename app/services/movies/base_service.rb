module Movies
  class BaseService
    include HTTParty
    base_uri 'https://api.themoviedb.org'
    API_KEY = 'da5633de24ad3c84f279687ae8a55e17'

    def execute
      JSON.parse(query_response_body)
    end

    private
      def default_params
        { language: 'en-US', api_key: API_KEY }
      end
  end
end
