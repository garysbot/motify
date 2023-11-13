class Api::SessionsController < ApplicationController
  # show
  def show
    if current_user
      render json: { user: current_user.as_json }
    else
      render json: { user: nil }
    end
  end

  # create
  def create
    @user = User.find_by_credentials(
      params[:credential],
      params[:password]
    )

    if @user
      login!(@user)
      render 'api/users/show'
      # render json: @user
    else
      render json: { errors: ['Incorrect username or password.'] }, status: :unauthorized
    end
  end

  # destroy
  def destroy
    logout! if current_user
    render json: { message: 'success' }
  end
end
