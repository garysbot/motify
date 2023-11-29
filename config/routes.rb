Rails.application.routes.draw do
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:show, :create, :destroy]
    get 'search', to: 'search#index'
  end

  resources :artists, only: [:index, :show]
  resources :songs, only: [:index, :show]
  resources :albums, only: [:index, :show]
  resources :playlists, only: [:create, :destroy, :show, :index, :update]

  get '*path', to: "static_pages#frontend_index"

end
