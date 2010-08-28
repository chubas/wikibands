class AlbumsController < ApplicationController
  def index
    @albums = Album.paginate :page => params[:page], :per_page => 9
  end

  def create
    @album = Album.new(params[:album])
    @album.save!
    redirect_to albums_path
  end

  def new
    @wikipedia = Wikipedia.random
    @flickr = Flickr.random
    @quotation = Quotation.random

    @fonts = ['YanoneKaffeesatz',
              'BanksiaBold', '20DB', 'CarbonType', 'College',
              'CopystructBold', 'CPMonoLight', 'Forelle',
              'LittleTroubleGirl', 'EmbossedBlack', 'SFArcheryBlack',
              'SpinCycle', 'Tagapagsalaysay',
              'WoodenNickelBlack', 'xenophone']

    @album = Album.new
  end

end
