// Generated by CoffeeScript 1.4.0
(function() {
  var URL, requestAnimationFrame, smoother, track, _stop, _videoleft, _videotop;

  URL = window.URL || window.webkitURL;

  requestAnimationFrame = function(callback, element) {
    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(callback, element) {
      var currTime, id, lastTime, timeToCall;
      currTime = new Date().getTime();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      id = window.setTimeout(function() {
        return callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    return requestAnimationFrame.call(window, callback, element);
  };

  _videoleft = $("#camvideo").offset().left;

  _videotop = $("#camvideo").offset().top;

  _stop = true;

  smoother = new Smoother(0.85, [0, 0, 0, 0, 0]);

  $("#trackbutton").on("click", function() {
    _stop = !_stop;
    return requestAnimationFrame(track);
  });

  track = function() {
    var video;
    if (!_stop) {
      requestAnimationFrame(track);
    }
    video = $("#camvideo");
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      return $("#camvideo").objectdetect("all", {
        scaleMin: 3,
        scaleFactor: 1.1,
        classifier: objectdetect.frontalface
      }, function(coords) {
        var height, left, top, width;
        if (coords[0]) {
          coords = smoother.smooth(coords[0]);
          left = ~~(coords[0] + coords[2] * 1.0 / 8 + $(video).offset().left);
          top = ~~(coords[1] + coords[3] * 0.8 / 8 + $(video).offset().top);
          width = ~~(coords[2] * 6 / 8);
          height = ~~(coords[3] * 6 / 8);
          $("#coordinates").html("(" + (~~coords[0]) + ", " + (~~coords[1]) + ")");
          return $("#tracker").css({
            "left": ($(video).width() - left - width) + "px",
            "top": top + "px",
            "width": width + "px",
            "height": height + "px",
            "display": "block"
          });
        } else {
          return $("#tracker").css({
            "display": "none"
          });
        }
      });
    }
  };

}).call(this);
