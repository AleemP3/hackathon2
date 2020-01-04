Rails.application.routes.draw do
  get 'video/api/auth'

  mount_devise_token_auth_for 'User', at: 'api/auth'
end
