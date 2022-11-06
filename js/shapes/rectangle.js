class Rectangle extends Ploygon {
	constructor(ctx, id, x, y, w, h, a, c) {
    super(ctx, id, x, y, w, h, a, c);
  }

  draw(){
    var x1 = this.x - this.w*0.5;
    var y1 = this.y - this.h*0.5
    this.shadow()
    this.ctx.beginPath();
    this.ctx.save();
    this.rotatation();
    this.ctx.moveTo(x1 + 10, y1);
    this.ctx.lineTo(x1 + this.w - 10, y1);
    this.ctx.quadraticCurveTo(x1 + this.w, y1, x1 + this.w, y1 + 10);
    this.ctx.lineTo(x1 + this.w, y1 + this.h - 10);
    this.ctx.quadraticCurveTo(x1 + this.w, y1 + this.h, x1 + this.w - 10, y1 + this.h);
    this.ctx.lineTo(x1 + 10, y1 + this.h);
    this.ctx.quadraticCurveTo(x1, y1 + this.h, x1, y1 + this.h - 10);
    this.ctx.lineTo(x1, y1 + 10);
    this.ctx.quadraticCurveTo(x1, y1, x1 + 10, y1);
    this.ctx.restore();
    this.ctx.stroke();
    this.noshadow(); 
  }
}

class Comment extends Shape{
  constructor(ctx, id, x, y, w, h, a, c) {
    super(ctx, id, x, y, w, h, a, c);
  }
  draw(){
    this.shadow()
    this.ctx.beginPath();
    this.ctx.save();
    this.rotatation();
    this.ctx.rect(this.x - this.w*0.5, this.y - this.h*0.5, this.w, this.h); 
    this.ctx.restore();
    this.ctx.stroke();
    this.noshadow(); 
  }

}