class Line extends Shape {
	constructor(ctx, id, x, y, w, h, a, c) {
        super(ctx, id, x, y, w, h, a, c);
        this.pointSelected = "";
        this.s1 = -0.5;
        this.s2 = 0.5;
	}

    move(x, y){
        if(this.pointSelected==="one"){
            this.x = (this.x+this.w*0.5+x)*0.5
            this.y = (y+this.y + this.h*this.s2)*0.5
            this.w = (this.x+this.w*0.5)-x
            this.h = y-(this.y + this.h*this.s2)
            if(this.s1<0){
                this.h = -1*this.h;
            }
        }else if(this.pointSelected==="two"){
            this.x = (this.x-this.w*0.5+x)*0.5
            this.y = (y+this.y + this.h*this.s1)*0.5
            this.w = x-(this.x-this.w*0.5)
            this.h = y-(this.y + this.h*this.s1)
            if(this.s2<0){
                this.h = -1*this.h;
            }
        }else if(this.pointSelected===""){
            this.x = x;
            this.y = y;
        }
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.w = Math.round(this.w);
        this.h = Math.round(this.h);
    }

    overlap(s){
        // return rectangleOverlap(this.x, this.y, this.w, this.h, s.x, s.y, s.w, s.h, this.a, s.a);
    }

    bounce(s, x, y){
        // var n = new Shape(this.ctx, this.id, x, y, this.w, this.h, this.a, this.c);
        // if(!s.overlap(n)){
        //     this.x = x;
        //     this.y = y;
        // }
    }

    draw(){
        var headlen = 10;
        var y1 = this.y + this.h*this.s1;
        var y2 = this.y + this.h*this.s2;
        var angle = Math.atan2(this.h,this.w);
        this.shadow()
        this.ctx.beginPath();
        this.ctx.save();
        this.rotatation();
        this.ctx.moveTo(this.x - this.w*0.5, y1);
        this.ctx.lineTo(this.x + this.w*0.5, y2);
        this.ctx.lineTo(this.x + this.w*0.5 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(this.x + this.w*0.5, y2);
        this.ctx.lineTo(this.x + this.w*0.5 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));

        
        this.ctx.stroke();
        if(this.isSelected){
            this.ctx.beginPath();
            this.ctx.arc(this.x-this.w*0.5, y1, 5, 0, Math.PI * 2, false);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(this.x+this.w*0.5, y2, 5, 0, Math.PI * 2, false);   
            this.ctx.fill();
        }
        this.ctx.restore();
        this.noshadow();
    }

    collide(x, y){
        this.pointSelected = "";
        this.isSelected = lineCollide(this.x - this.w*0.5, this.y + this.h*this.s1, this.x + this.w*0.5, this.y + this.h*this.s2, x, y);
        if(rectangleCollide(this.x-this.w*0.5, this.y+this.h*this.s1, 10, 10, x, y)){
            this.pointSelected = "one";
            this.isSelected = true;
        }
        if(rectangleCollide(this.x+this.w*0.5, this.y+this.h*this.s2, 10, 10, x, y)){
            this.pointSelected = "two";
            this.isSelected = true;
        }
        return this.isSelected;
    }
}


class Curve extends Line {
	constructor(ctx, id, x, y, w, h, a, c) {
        super(ctx, id, x, y, w, h, a, c);
        this.x1 = x-w*0.5;
        this.y1 = y-h*0.5;
        this.x2 = x+w*0.5;
        this.y2 = y+h*0.5;
        this.pointSelected = "";
	}

    draw(){
        var headlen = 10; // length of head in pixels
        var y1 = this.y + this.h*this.s1;
        var y2 = this.y + this.h*this.s2;
        var angle = Math.atan2(y2-this.y2,(this.x + this.w*0.5)-(this.x2));
        var angle2 = Math.atan2(this.h,this.w);
        angle = angle2*0.1 +angle*0.9
        this.shadow()
        this.ctx.beginPath();
        this.ctx.save();
        this.rotatation();
        this.ctx.moveTo(this.x - this.w*0.5, y1);
		this.ctx.bezierCurveTo(this.x1, this.y1, this.x2, this.y2, this.x + this.w*0.5, y2);
        this.ctx.moveTo(this.x + this.w*0.5, y2);
        this.ctx.lineTo(this.x + this.w*0.5 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(this.x + this.w*0.5, y2);
        this.ctx.lineTo(this.x + this.w*0.5 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));

		this.ctx.stroke();
        if(this.isSelected){
            this.ctx.beginPath();
            this.ctx.arc(this.x-this.w*0.5, y1, 5, 0, Math.PI * 2, false);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(this.x+this.w*0.5, y2, 5, 0, Math.PI * 2, false);   
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(this.x1, this.y1, 5, 0, Math.PI * 2, false);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(this.x2, this.y2, 5, 0, Math.PI * 2, false);
            this.ctx.fill();
        }
        this.ctx.restore();
        this.noshadow();
    }

    move(x, y){
        super.move(x, y);
        if(this.pointSelected==="three"){
            this.x1 = x;
            this.y1 = y;
        }else if(this.pointSelected==="four"){
            this.x2 = x;
            this.y2 = y;
        }
    }

    collide(x, y){
        super.collide(x, y);
        if(rectangleCollide(this.x1, this.y1, 10, 10, x, y)){
            this.pointSelected = "three";
            this.isSelected = true;
        }
        if(rectangleCollide(this.x2, this.y2, 10, 10, x, y)){
            this.pointSelected = "four";
            this.isSelected = true;
        }
        return this.isSelected;
    }
}