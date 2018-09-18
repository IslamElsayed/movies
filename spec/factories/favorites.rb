FactoryBot.define do
  factory :favorite do
    user
    mdb_id { Faker::Number.number(3) }
  end
end
