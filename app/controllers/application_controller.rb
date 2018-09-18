class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  private
    def render_resource(resource)
      if resource.errors.empty?
        render json: resource
      else
        validation_error(resource)
      end
    end

    def validation_error(resource)
      render json: {
        errors: [
          resource.errors
        ]
      }, status: :bad_request
    end

    def authenticate_user!
      authenticate_or_request_with_http_token do |token, options|
        user = User.find_by(jti: token)
        sign_in user, store: false if user
      end
    end
end
