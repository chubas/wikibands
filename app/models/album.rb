class Album < ActiveRecord::Base

  validates_attachment_presence :cover
  validates_presence_of :album_title, :band_name

  # Always honor the sources
  validates_presence_of :wikipedia_url, :flickr_url, :quotations_url

  has_attached_file :cover,
                    :styles => { :thumb => "72x72" },
                    :storage => :database

  default_scope select_without_file_columns_for(:cover)

  def encoded_album
    "" # Not needed by the moment except for building forms
  end

  def encoded_album=(base64_value)
    if base64_value.present?
      decoded_data = Base64.decode64(base64_value.gsub(/data:image\/\w+;base64,/, ''))
      StringIO.open(decoded_data) do |data|
        data.original_filename = "#{Time.now.to_i}.png"
        data.content_type = "image/png"
        self.cover = data
      end
    end
  end

end
