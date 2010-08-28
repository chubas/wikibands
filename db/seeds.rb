# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

REVIEWS = {
  :rock => {
    :band => [
      "{:band} decided not to break up, and released their new album \"{:album}\", possibly
      their last. And it would be a good thing to be, since their quality has been going downhill
      since their greatest hit _{:random_album}_. They're not the band that, five or six years
      earlier, promised to revolutionize the rock scene.",
      "{:band} are obsessed with aggressively finding their own style, and they have pretty much
      succeeded. This new album _{:album}_ is clearly a breakthrough for their musical career, and
      their early influences - imitations - from artists like _{:random_band}_ and
      _{:random_band}_ have virtually faded away, leaving a new mix of styles worth of listening"
    ]
  }
}