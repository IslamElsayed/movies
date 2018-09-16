class V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save
    render_resource(resource)
  end

  protected

    # need to override it, as by default it will return v1_users
    def resource_name
      "user"
    end
end
