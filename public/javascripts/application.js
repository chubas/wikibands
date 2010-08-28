$(function(){
  $('#help').mouseover(function(){
    $(this).find('#description').show();
  }).mouseout(function(){
    $(this).find('#description').hide();
  });
  var canvas = document.getElementById("disc-creator");
  if(canvas && canvas.getContext) {
    var context = canvas.getContext('2d');

    var DELTA = 100;
    var OUTPUT_SCALE = 1.5;
    var image = new Image();
    var bandFontFamily = $('.choose-band-font li:first-child div').text();
    var discFontFamily = $('.choose-disc-font li:first-child div').text();

    image.addEventListener('load', function(){
      var $img = this;
      var w = this.width;
      var h = this.height;
      var size = Math.min(w, h);
      var discSize = 520; //OUTPUT_SCALE * size;

      var bandNameHeight = 30;
      var bandNameColor = "#000";
      var bandName = $('#bandname').text();

      var discNameHeight = 20;
      var discNameColor = "#000";
      var discName = $('#discname').text();

      var imgX, imgY, bandX, bandY, discX, discY;

      $(canvas).attr({width:discSize, height:discSize});

      var getBandNameWidth = function(text) {
        context.save();
        context.font = '' + bandNameHeight + 'px "' + bandFontFamily + '"';
        var lines = text.split(/\n\r?/);
        var widths = $.map(lines, function(line){
          return context.measureText(line).width;
        });
        context.restore();
        return Math.max.apply(Math, widths);
      };

      var getDiscNameWidth = function(text) {
        context.save();
        context.font = '' + discNameHeight + 'px "' + discFontFamily + '"';
        var lines = text.split(/\n\r?/);
        var widths = $.map(lines, function(line){
          return context.measureText(line).width;
        });
        context.restore();
        return Math.max.apply(Math, widths);
      };

      var bandNameWidth = getBandNameWidth($('#bandname').text());
      var discNameWidth = getDiscNameWidth($('#discname').text());

      var drawImage = function() {
        context.save();
        context.drawImage($img, imgX, imgY, size, size, 0, 0, discSize, discSize);
        context.restore();
      };

      var drawBandName = function() {
        var lines = bandName.split(/\n\r?\s*/);
        context.save();
        context.textBaseline = "top";
        context.fillStyle = bandNameColor;
        context.font = '' + bandNameHeight + "px '" + bandFontFamily + "'";
        $.each(lines, function(index, line){
          context.fillText(line, bandX, bandY + (bandNameHeight * 1.2 * index));
        });
        context.restore();
      };

      var drawDiscName = function() {
        var lines = discName.split(/\n\r?\s*/);
        context.save();
        context.textBaseline = "top";
        context.fillStyle = discNameColor;
        context.font = '' + discNameHeight + "px '" + discFontFamily + "'";
        $.each(lines, function(index, line){
          context.fillText(line, discX, discY + (discNameHeight * 1.2 * index));
        });
        context.restore();
      };

      var drawAll = function() {
        drawImage();
        drawBandName();
        drawDiscName();
      };

      imgX = 0;
      imgY = 0;
      bandX = 0;
      bandY = 0;
      discX = discSize - discNameWidth;
      discY = discSize - discNameHeight;

      drawImage();

      var shouldBeWhite = function(context, x, y, width, height) {
        var imageData = context.getImageData(x, y, width, height).data;
        var sum = 0;
        for(var i = 0; i < imageData.length; i+=4) {
          sum += ((imageData[i] + imageData[i+1] + imageData[i+2]) / 3);
        }
        var avg = sum / (imageData.length / 4);
        return avg <= 127.5;
      };

      if(shouldBeWhite(context, bandX, bandY, bandNameWidth, bandNameHeight)) {
        bandNameColor = "#FFF";
      }
      if(shouldBeWhite(context, discX, discY, discNameWidth, discNameHeight)) {
        discNameColor = "#FFF";
      }

      drawBandName();
      drawDiscName();

      $('#image-slider').css('width', discSize.toString() + 'px').slider({
        step: 0.5,
        min: 0,
        max: DELTA,
        slide: function(event, ui) {
          var mov;
          if(w > h) {
            mov = -((size - w) / DELTA) * ui.value;
            imgX = mov;
          } else {
            mov = -((size - h) / DELTA) * ui.value;
            imgY = mov;
          }
          drawAll();
        }
      });

      $('#bandname-slider-horizontal').slider({
        orientation: 'horizontal',
        slide: function(event, ui) {
          bandX = (((discSize - (bandNameWidth)) / 100) * ui.value);
          drawAll();
        }
      });

      $('#bandname-slider-vertical').slider({
        orientation: 'vertical',
        value: 100,
        slide: function(event, ui) {
          var realVal = 100 - ui.value;
          bandY = (((discSize - (bandNameHeight)) / 100) * realVal);
          drawAll();
        }
      });

      $('#discname-slider-horizontal').slider({
        value: 100,
        slide: function(event, ui) {
          discX = (((discSize - (discNameWidth)) / 100) * ui.value);
          drawAll();
        }
      });

      $('#discname-slider-vertical').slider({
        orientation: 'vertical',
        slide: function(event, ui) {
          var realVal = 100 - ui.value;
          discY = (((discSize - (discNameHeight)) / 100) * realVal);
          drawAll();
        }
      });

      $('#bandname-colorpicker').bind('change', function(){
        bandNameColor = $(this).val();
        drawAll();
      });

      $('#discname-colorpicker').bind('change', function(){
        discNameColor = $(this).val();
        drawAll();
      });

      $('#bandname').editable({
        type: 'textarea',
        onSubmit: function(text) {
          bandName = text.current;
          bandNameWidth = getBandNameWidth(bandName);
          drawAll();
          $('form#new_album #album_band_name').val(bandName);
        }
      });
      
      $('#discname').editable({
        type: 'textarea',
        onSubmit: function(text) {
          discName = text.current;
          discNameWidth = getDiscNameWidth(discName);
          drawAll();
          $('form#new_album #album_album_title').val(discName);
        }
      });

      $('#bandname-size').slider({
        value: 30,
        min: 25,
        max: 70,
        slide: function(event, ui){
          bandNameHeight = ui.value;
          bandNameWidth = getBandNameWidth(bandName);
          drawAll();
        }
      });

      $('#discname-size').slider({
        value: 20,
        min: 15,
        max: 50,
        slide: function(event, ui){
          discNameHeight = ui.value;
          discNameWidth = getDiscNameWidth(discName);
          drawAll();
        }
      });

      $('#band-font').change(function(){
        bandFontFamily = $(this).val();
        bandNameWidth = getBandNameWidth(bandName);
        drawAll();
      });

      $('#disc-font').change(function(){
        discFontFamily = $(this).val();
        discNameWidth = getDiscNameWidth(bandName);
        drawAll();
      });

      $("ul.choose-band-font").fontPicker({
        onMouseLeave: function(value) {
          bandFontFamily = value;
          bandNameWidth = getBandNameWidth(bandName);
          drawAll();
        },
        onHover : function(value){
          bandFontFamily = value;
          bandNameWidth = getBandNameWidth(bandName);
          drawAll();
        },
        onSelect : function(value) {
          bandFontFamily = value;
          bandNameWidth = getBandNameWidth(bandName);
          drawAll();
        }
      });

      $("ul.choose-disc-font").fontPicker({
        onMouseLeave: function(value) {
          discFontFamily = value;
          discNameWidth = getDiscNameWidth(discName);
          drawAll();
        },
        onHover : function(value){
          discFontFamily = value;
          discNameWidth = getDiscNameWidth(discName);
          drawAll();
        },
        onSelect : function(value) {
          discFontFamily = value;
          discNameWidth = getDiscNameWidth(discName);
          drawAll();
        }
      });

    }, false);

    image.src = $('img.disc-image').attr('src');

    $('form').submit(function(){
      $('#album_encoded_album').val(canvas.toDataURL());
    });
  }

});
