module Movies
  class SearchService < BaseService
    attr_reader :params

    def initialize(query, page = 1)
      @params = default_params.merge(include_adult: false, query: query, page: page)
    end

    private

    def query_response_body
      self.class.get('/3/search/movie', query: params).body
    end
  end
end
