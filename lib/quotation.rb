class Quotation

  include HTTParty
  format :html

  base_uri 'http://www.quotationspage.com/'

  attr_reader :text, :link, :author

  def self.random
    new(get('/random.php3'))
  end

  def self.test
    Struct.new(:text, :link, :author).new(
        "First keep the peace within yourself, then you can also bring peace to others.",
        "somewhere",
        "Dalai Lama"
    )
  end

  def initialize(html_response)
    html = Hpricot(html_response.to_s)
    @text   = search_for_quote(html)
    @link   = search_for_link(html)
    @author = search_for_author(html)
  end

  def search_for_quote(html)
    html.search('dt[@class="quote"]').last.search('a').inner_text
  end

  def search_for_link(html)
    'http://www.quotationspage.com' + html.search('dt[@class="quote"]').last.search('a').attr('href')
  end

  def search_for_author(html)
    html.search('dd[@class="author"]').last.search('b').search('a').inner_text
  end

end