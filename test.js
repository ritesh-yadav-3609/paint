console.clear();

/*
  Utils
  (Mouse, resize)
*/

var mouse = {
  x: 0,
  y: 0,
  ox: 0,
  oy: 0,
  
  listeners: [],
  
  onMove: function(event) {
    this.ox = this.x;
    this.oy = this.y;
    this.x = event.pageX;
    this.y = event.pageY;
    
    for(var i = 0; i < this.listeners.length; i++) {
      this.listeners[i](event);
    }
  },
  
  addListener: function(callback) {
    if(this.listeners.length < 1) {
      window.addEventListener('mousemove', this.onMove.bind(this));
    }
    this.listeners.push(callback);
  }
};

var resizer = {
  w: 0,
  h: 0,
  
  listeners: [],
  
  onResize: function() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    
    for(var i = 0; i < this.listeners.length; i++) {
      this.listeners[i]();
    }
  },
  
  addListener: function(callback) {
    if(this.listeners.length < 1) {
      window.addEventListener('resize', this.onResize.bind(this));
    }
    this.listeners.push(callback);
  }
}

var Point = {
  x: 0,
  y: 0
};

/*
  Canvas init
*/

var canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    velocity = Object.create(Point),
    start = Object.create(Point),
    elastic = Object.create(Point),
    target = Object.create(Point),
    middle = Object.create(Point),
    end = Object.create(Point);

var params = {
  showPoints: true,
  radius: 9,
  lineWidth: 9,
  spring: 0.2,
  friction: 0.9
};

function onResize() {
  canvas.width = resizer.w;
  canvas.height = resizer.h;
  
  start.x = resizer.w * 0.5;
  start.y = resizer.h * 0.5;
}

function onMove(event) {
  end.x = event.pageX;
  end.y = event.pageY;
  
  middle.x = (end.x + start.x) * 0.5;
  middle.y = (end.y + start.y) * 0.5;
}

resizer.addListener(onResize);
resizer.onResize();
mouse.addListener(onMove);

function drawPoint(point, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(point.x, point.y, params.radius, 0, Math.PI * 2);
    context.fill();
}

function drawCurve(points, color) {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = params.lineWidth;
  context.lineCap = context.lineJoin = 'round';
  var i = 0;
  
  context.moveTo(points[i].x, points[i].y);
   for (i = 1; i < points.length - 2; i ++) {
      var x = (points[i].x + points[i + 1].x) * 0.5,
          y = (points[i].y + points[i + 1].y) * 0.5;
      context.quadraticCurveTo(points[i].x, points[i].y, x, y);
   }

   context.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x,points[i + 1].y);
   context.stroke();
}

function update() {
   requestAnimationFrame(update);
  
   context.clearRect(0, 0, resizer.w, resizer.h);
  
  if(params.showPoints) {
    drawPoint(start, '#FF00FF');
    drawPoint(elastic, '#FFFF00');
    drawPoint(end, '#FF00FF');
  }
  
  // BOOM elastic ease formulae
  velocity.x += (middle.x - elastic.x) * params.spring;
  velocity.y += (middle.y - elastic.y) * params.spring;
  velocity.x *= params.friction;
  velocity.y *= params.friction;
  elastic.x += velocity.x;
  elastic.y += velocity.y;
  
  // draw bezier with target, start and elastic.
  drawCurve([start, elastic, end], '#FFF');
}

var gui = new dat.GUI();
gui.add(params, 'showPoints');
gui.add(params, 'radius').min(1).max(20).step(1);
gui.add(params, 'lineWidth').min(1).max(20).step(1);
gui.add(params, 'spring').min(0).max(1).step(0.01);
gui.add(params, 'friction').min(0).max(1).step(0.01);

update();