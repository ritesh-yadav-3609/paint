
class Oval extends Shape {
	constructor(ctx, id, x, y, w, h, a, c) {
        super(ctx, id, x, y, w, h, a, c);
	}

    draw(){
        this.shadow()
        this.ctx.beginPath();
        this.ctx.save();
        this.rotatation();
        this.ctx.ellipse(this.x, this.y, this.w*0.5, this.h*0.5, 0, 0, 2 * Math.PI);
        this.ctx.restore();
        this.ctx.stroke();
        this.noshadow(); 
    }
}


class Cloud extends Shape {
	constructor(ctx, id, x, y, w, h, a, c) {
        super(ctx, id, x, y, w, h, a, c);
	}

    draw(){
        // var ratio = w/h;
        var x1 = this.x - this.w*0.5;
        var y1 = this.y - this.h*0.5;
    
        this.shadow()
        this.ctx.beginPath();
        this.ctx.save();
        this.rotatation();
        this.ctx.moveTo(x1+this.w*0.1, y1+this.h*0.45);
        this.ctx.bezierCurveTo(x1, y1+this.h*0.1, x1 + this.w*0.2, y1, x1+ this.w*0.3, y1 + this.h*0.1);
        this.ctx.bezierCurveTo(x1 + this.w*0.3, y1-this.h*0.1, x1 + this.w*0.8, y1, x1+ this.w*0.75, y1 + this.h*0.15);
        this.ctx.bezierCurveTo(x1 + this.w*1.1, y1 - this.h*0.01, x1 + this.w, y1 + this.h*0.4, x1+ this.w*0.9, y1 + this.h*0.5);
        this.ctx.bezierCurveTo(x1 + this.w, y1 + this.h*0.5, x1 + this.w*1.1, y1 + this.h*0.8, x1+ this.w*0.81, y1 + this.h*0.9);
        this.ctx.bezierCurveTo(x1 + this.w*0.66, y1 + this.h*1.1, x1 + this.w*0.3, y1 + this.h, x1+ this.w*0.3, y1 + this.h*0.85);
        this.ctx.bezierCurveTo(x1-this.w*0.1 , y1 + this.h*0.8, x1, y1 + this.h*0.4, x1+ this.w*0.1, y1 + this.h*0.45);
        this.ctx.restore();
        this.ctx.stroke();
        this.noshadow(); 
    }
}