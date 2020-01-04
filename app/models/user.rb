# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  namespace :api do
    resources :users do
      resources :videos
    end

    resources :videos do
      resources :comments
    end
  end

end
