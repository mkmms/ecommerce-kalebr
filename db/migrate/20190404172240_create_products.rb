class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :title
      t.string :slug
      t.text :description
      t.belongs_to :category, foreign_key: true
      t.integer :price
      t.text :image

      t.timestamps
    end
    add_index :products, :slug
  end
end
