var MouseTouchTracker = function(c, callback){
  
  function processEvent(evt) {
    var rect = c.getBoundingClientRect();
    var offsetTop = rect.top;
    var offsetLeft = rect.left;

    if (evt.touches) {
      return {
        x: evt.touches[0].clientX - offsetLeft,
        y: evt.touches[0].clientY - offsetTop
      }
    } else {
      return {
        x: evt.clientX - offsetLeft,
        y: evt.clientY - offsetTop
      }
    }
  }

  function onDown(evt) {
    evt.preventDefault();
    var coords = processEvent(evt);
    callback('down', coords.x, coords.y);
    c.ontouchmove = onMove;
    c.onmousemove = onMove;
    c.ontouchend = onUp;
    c.onmouseup = onUp;
  }

  function onUp(evt) {
    var coords = processEvent(evt);
    callback('up', coords.x, coords.y);
    c.ontouchmove = null;
    c.onmousemove = null;
    c.ontouchend = null;
    c.onmouseup = null;
  }

  function onMove(evt) {
    evt.preventDefault();
    var coords = processEvent(evt);
    callback('move', coords.x, coords.y);
  }
  
  c.ontouchstart = onDown;
  c.onmousedown = onDown;
  
  
}

function removeListener(c){
  c.ontouchmove = null;
  c.onmousemove = null;
  c.ontouchstart = null;
  c.onmousedown = null;
  c.ontouchend = null;
  c.onmouseup = null;
}