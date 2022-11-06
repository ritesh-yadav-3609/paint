
class Shape {
	constructor(ctx, id, x, y, w, h, a, c) {
        this.ctx = ctx;
        this.id = id;
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.a = a;
        this.c = c;
        this.isSelected = false;
	}

    shadow(){
        if(this.isSelected===true) {
            this.ctx.shadowColor = "rgb(233, 133, 10)";
            this.ctx.shadowOffsetX = 4;
            this.ctx.shadowOffsetY = 4;
            this.ctx.shadowBlur = 8;
        }
    }
    noshadow(){
        this.ctx.shadowColor = null;
        this.ctx.shadowOffsetX = null;
        this.ctx.shadowOffsetY = null;
        this.ctx.shadowBlur = null;
    }

    rotatation(){
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.a * Math.PI / 180);
        this.ctx.translate(-this.x, -this.y); 
    }

    draw() {
        this.shadow()
        this.ctx.beginPath();
        this.ctx.save();
        this.rotatation();
        this.ctx.rect(this.x - this.w*0.5, this.y - this.h*0.5, this.w, this.h); 
        this.ctx.restore();
        this.ctx.stroke();
        this.noshadow(); 
    }

    rotate(a){
        // this.a = a;
    }

    move(x, y){
        this.x = x;
        this.y = y;
    }
    resize(w, h){
        
        this.w = w;
        this.h = h;
    }

    collide(x, y){
        this.isSelected = rectangleCollide(this.x, this.y, this.w, this.h, x, y);
        return this.isSelected;
    }

    overlap(s){
        return rectangleOverlap(this.x, this.y, this.w, this.h, s.x, s.y, s.w, s.h, this.a, s.a);
    }

    bounce(s, x, y){
        var n = new Shape(this.ctx, this.id, x, y, this.w, this.h, this.a, this.c);
        if(!s.overlap(n)){
            this.x = x;
            this.y = y;
        }
    }

    unselect(){
        this.isSelected = false;
    }

    static s(id, list){
        list.forEach(e => {
            if(e.id===id){
                return e;
            }
        });
        return false;
    }

    static init(value){
        return Object.assign(new Shape("", ""), value);
    }

    get data(){
        return {
            id:this.id,
            x:this.x,
            y:this.y,
            w:this.w,
            h:this.h,
            a:this.a,
            c:this.c
        }
    }

}

class Ploygon extends Shape {
	constructor(ctx, id, x, y, w, h, a, c) {
        super(ctx, id, x, y, w, h, a, c);
	}
    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(100,50);
        this.ctx.lineTo(50, 100);
        this.ctx.lineTo(0, 90);
        this.ctx.closePath();
        this.ctx.fill();
    }
}



