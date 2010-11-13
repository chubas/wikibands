class AddedFileStorageFieldsToAlbums < ActiveRecord::Migration
  def self.up
    add_column :albums, :cover_file, :binary
    add_column :albums, :cover_thumb_file, :binary
  end

  def self.down
    remove_column :albums, :cover_file, :binary
    remove_column :albums, :cover_thumb_file, :binary
  end
end
