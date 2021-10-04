FactoryBot.define do
  factory :user do 
    first_name {'Joe'}
    last_name {'Brown'}
    email {'meow@meow.com'}
    password_digest {'password123'}
  end
end