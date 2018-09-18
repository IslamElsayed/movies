class Favorite < ApplicationRecord
  belongs_to :user
  validates :mdb_id, presence: true, uniqueness: { scope: :user }
end
