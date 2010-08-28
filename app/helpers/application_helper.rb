module ApplicationHelper

  def extract_album_title_from(quotation)
    words = quotation.split(/\s+/).last(5)
    ([words[0].humanize] + words[1..-1]).
        join(' ').
        gsub(/\.$/, '')
  end

  def extract_band_name_from(wikipedia_title)
    wikipedia_title.gsub(/\([^\)]+\)\s*$/, '').strip
  end

end
