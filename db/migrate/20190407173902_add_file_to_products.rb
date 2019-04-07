class AddFileToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :file, :text
  end
end
