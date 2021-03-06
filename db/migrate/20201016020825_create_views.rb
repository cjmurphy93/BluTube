class CreateViews < ActiveRecord::Migration[5.2]
  def change
    create_table :views do |t|
      t.integer :video_id, null: false
      t.string :ip_address, null: false
      t.integer :user_id, null: true

      t.timestamps
    end

    add_index :views, :video_id
    add_index :views, :user_id
  end
end
