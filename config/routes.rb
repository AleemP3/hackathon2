Rails.application.routes.draw do
  get 'video/api/auth'

  mount_devise_token_auth_for 'User', at: 'api/auth'
  
  namespace :api do
    resources :users do
      resources :videos
    end

    resources :videos do
      resources :comments
    end
  end

end
