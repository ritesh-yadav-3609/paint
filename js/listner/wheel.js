
var WheelTracker = function(c, mx, my, callback){
  
    function zoom(evt) {
        evt.preventDefault();
        var zoom = 1 + (evt.deltaY * -0.01);
        if (evt.wheelDelta/120 >= 0){
			mx = evt.clientX - canvas.offsetLeft;
			my = evt.clientY - canvas.offsetTop;
		}
        callback(mx, my, zoom);
    }
    c.onmousewheel = zoom;
}

var KeyboardTracker = function(c, callback){
  
    function processEvent(evt) {}

    function onKeyDown(evt) {
        evt.preventDefault();
        callback(evt.type, evt.key, evt.keyCode, evt.ctrlKey, evt.shiftKey, evt.altKey);
    }

    function onKeyPress(evt) {
        evt.preventDefault();
        callback(evt.type, evt.key, evt.keyCode, evt.ctrlKey, evt.shiftKey, evt.altKey);
    }

    function onKeyUp(evt) {
        evt.preventDefault();
    }

    c.onkeydown = onKeyDown;
    c.onkeypress = onKeyPress;
    c.onkeyup = onKeyUp;
}

