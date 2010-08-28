class CreateAlbums < ActiveRecord::Migration
  def self.up
    create_table :albums do |t|
      t.string :band_name
      t.string :album_title
      t.string :cover_file_name
      t.string :cover_content_type
      t.integer :cover_file_size
      t.datetime :cover_updated_at
      t.string :wikipedia_url
      t.string :flickr_url
      t.string :quotations_url
      t.text :review

      t.timestamps
    end
  end

  def self.down
    drop_table :albums
  end
end
