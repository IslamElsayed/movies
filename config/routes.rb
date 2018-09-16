Rails.application.routes.draw do
  namespace :v1 do
    devise_for :users, controllers: { registrations: "v1/users/registrations", sessions: "v1/users/sessions", passwords: "devise/passwords" }
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
