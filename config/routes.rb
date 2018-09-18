Rails.application.routes.draw do
  devise_for :users, path: 'v1/users', controllers: { registrations: "v1/users/registrations", sessions: "v1/users/sessions" }
  namespace :v1, defaults: { format: 'json' } do
    resources :movies, only: [:index, :show]
    resources :favorites, param: :mdb_id,only: [:create, :destroy, :index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
