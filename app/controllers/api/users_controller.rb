class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # redirect_to users_url
      render 'api/users/show'
    else
      Rails.logger.info(@user.errors.full_messages.to_sentence)
      render json: { errors: @user.errors.full_messages }
    end
  end



  private
  
  def user_params
    params.require(:user).permit(:email, :username, :password, :birth_date, :gender, :optinmarketing)
  end

end
