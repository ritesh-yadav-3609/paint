var rectangleCollide =  function (x1, y1, w, h, x2, y2) {
  return x2 > (x1 - w*0.5) && y2 > (y1 - h*0.5) && x2 < (x1 + w*0.5) && y2 < (y1 + h*0.5)
}

var rectangleOverlap =  function (x1, y1, w1, h1, x2, y2, w2, h2, a1, a2) {
  // var p1 = rotateByAngleInDeg(x1 - w1*0.5, y1 - h1*0.5, x1, y1, -a1);
  // var p2 = rotateByAngleInDeg(x2 - w2*0.5, y2 - h2*0.5, x2, y2, -a2);
  // console.log(p1, p2);
  x1 = x1 - w1*0.5;
  y1 = y1 - h1*0.5;
  x2 = x2 - w2*0.5;
  y2 = y2 - h2*0.5;
  // x1 = p1.x, y1 = p1.y;
  // x2 = p2.x, y2 = p2.y;
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}


var rotateByAngleInDeg = function (x, y, ox, oy, a) {
  a = a*Math.PI/180;
  x = x-ox, y = y-oy;
  var nx = x*Math.cos(a) + y*Math.sin(a);
  var ny = -x*Math.sin(a) + y*Math.cos(a);
  return {x:nx+ox, y:ny+oy};
}

var scaleShape = function (x, y, ox, oy, s) {
  x = x/s+ox;
	y = y/s+oy;
  return {x:x, y:y};
}

var lineCollide =  function (x1, y1, x2, y2, x, y) {
  return distance(x1, y1, x, y)+distance(x2, y2, x, y)-distance(x1, y1, x2, y2)<0.3
}

var distance =  function (x1, y1, x2, y2) {
  return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

