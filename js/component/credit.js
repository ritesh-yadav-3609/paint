
class Credit extends Oval {
	constructor(ctx, id, d, p) {
        super(ctx, id, p.x, p.y, p.w, p.h, p.a, p.c);
		this.d = d;
	}
}

class Expense extends Rectangle {
	constructor(ctx, id, d, p) {
        super(ctx, id, p.x, p.y, p.w, p.h, p.a, p.c);
		this.d = d;
	}
}
