// Generated by CoffeeScript 1.4.0
(function() {
  var URL, requestAnimationFrame, track, _stop, _videoleft, _videotop;

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

  $("#trackbutton").on("click", function() {
    _stop = !_stop;
    return requestAnimationFrame(track);
  });

  track = function() {
    console.log("tracking...");
    if (!_stop) {
      requestAnimationFrame(track);
    }
    return $("#camvideo").objectdetect("all", {
      scaleMin: 3,
      scaleFactor: 1.1,
      classifier: objectdetect.frontalface
    }, function(coords) {
      var left, top;
      if (coords[0]) {
        left = "" + (~~(coords[0][0] + coords[0][2] * 1.0 / 8 + _videoleft)) + "px";
        top = "" + (~~(coords[0][1] + coords[0][3] * 0.8 / 8 + _videotop)) + "px";
        $("#coordinates").html("(" + left + ", " + top + ") - " + coords);
        return $("#tracker").css({
          "left": left,
          "top": top,
          "width": "80px",
          "height": "80px",
          "display": "block"
        });
      }
    });
  };

}).call(this);