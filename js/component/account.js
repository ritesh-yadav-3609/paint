class Account extends Cloud {
	constructor(ctx, id, d, p) {
        super(ctx, id, p.x, p.y, p.w, p.h, p.a, p.c);
		this.d = d;
	}
	get data(){
		return {
			id:this.id,
			d:this.d,
			p:super.data
		}
	}
}

class Status extends Comment {
	constructor(ctx, id, d, p) {
		console.log(p,d);
        super(ctx, id, p.x, p.y, p.w, p.h, p.a, p.c);
		this.d = d;
	}
	get data(){
		return {
			id:this.id,
			d:this.d,
			p:super.data
		}
	}
}
