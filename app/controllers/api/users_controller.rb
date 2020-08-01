class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)

        if @user.save
            login(@user)
            render "api/users/show"
        else
            errors = {}
            @user.errors.each do |attribute, message|
                if message == "is not a valid email address."
                    message = params[:user][:email] + ' ' + message
                elsif message.starts_with?("Enter")
                    message = message + ' ' + User.human_attribute_name(attribute)
                else
                    message = User.human_attribute_name(attribute).capitalize + ' ' +  message
                end

                if message == " is not a valid email address."
                    message = "Enter an email"
                end
                errors[attribute] = message
            end
            render json: errors, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :password, :email)
    end
end
