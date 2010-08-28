$(function(){
  $.fn.fontPicker = function(options) {
    
    var defaults = {
      onHover: null,
      onSelect: null,
      onMouseLeave: null,
      highlightedClass: 'highlighted',
      dropdownClass: 'dropdown'
    };

    var settings = $.extend(defaults, options);

    return $.each($(this), function(){

      var dropdown = $(this);
      var wrapper = $('<div class="font-picker">');
      dropdown.wrap(wrapper);

      var trigger = $('<div class="current">').html(
        dropdown.find('li:first-child div').clone()
      ).insertBefore(dropdown);

      trigger.click(function() {
        dropdown.slideDown('fast').show();
      });

      dropdown.mouseleave(function(){
        dropdown.slideUp('slow');
        if(settings.onMouseLeave) {
          settings.onMouseLeave($.trim(trigger.text()));
        }
      });

      dropdown.find('li').hover(function() {
        $(this).addClass(settings.highlightedClass);
        if(settings.onHover) {
          settings.onHover($.trim($(this).text()));
        }

      }, function(){
        $(this).removeClass(settings.highlightedClass);

      }).click(function(){
        trigger.html($(this).find('div').clone());
        dropdown.slideUp('slow');
        if(settings.onSelect) {
          settings.onSelect($.trim($(this).text()));
        }
      });

      dropdown.hide();
    });

  }
});