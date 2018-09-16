module Movies
  class ShowService < BaseService
    attr_reader :movie_id

    def initialize(movie_id)
      @movie_id = movie_id
    end

    private
      def query_response_body
        self.class.get("/3/movie/#{movie_id}", query: default_params).body
      end
  end
end
