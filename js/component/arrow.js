
class SArrow extends Line {
  	// type [expences, credit] method [%, number], value 
  	constructor(ctx, id, sid, eid, d, p) {
        super(ctx, id, p.x, p.y, p.w, p.h, p.a, p.c);
		this.d = d;
		this.sid = sid;
		this.eid = eid;
	}

	get start(){
		return Shape.s(this.sid);
	}

	get end(){
		return Shape.s(this.eid);
	}
}

class CArrow extends Curve {
	constructor(ctx, id, sid, eid, d, p) {
        super(ctx, id, p.x, p.y, p.w, p.h, p.a, p.c);
		this.d = d;
		this.sid = sid;
		this.eid = eid;
	}

	get start(){
		return Shape.s(this.sid);
	}

	get end(){
		return Shape.s(this.eid);
	}
}