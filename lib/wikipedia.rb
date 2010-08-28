require 'pp'

class Wikipedia

  include HTTParty
  format :json

  attr_reader :link, :title

  base_uri 'http://en.wikipedia.org/w/api.php'

  DEFAULT_QUERY = {
    :action       => :query,
    :list         => :random,
    :rnlimit      => 1,
    :format       => :json,
    :rnnamespace  => 0
  }

  DEFAULT_HEADERS = { 'User-agent' => 'wikibands' }

  def self.random
    new(get('/', :query => DEFAULT_QUERY, :headers => DEFAULT_HEADERS))
  end

  def self.test
    returning Struct.new(:link, :title).new do |o|
      o.title = "Bellevue High School"
      o.link = @link  = "http://en.wikipedia.org/wiki/#{URI.escape(o.title)}"
    end
  end

  def initialize(json_response)
    @title = json_response['query']['random'].first['title']
    @link  = "http://en.wikipedia.org/wiki/#{URI.escape(@title)}"
  end

end