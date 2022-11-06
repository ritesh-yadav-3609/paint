
class Configuration{

    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight-100;
        this.isRunning = false;
        this.isLastRun = false;
        this.editable = false;
        this.scale = 1;
        this.originx = 0;
        this.originy = 0;
        this.graph = null;
    }

    get components(){
        return this.graph.components
    }

    get width(){
        return this.canvas.width
    }

    get height(){
        return this.canvas.height
    }

    set customRefresh(refreshCallback){
        this.refreshCallback = refreshCallback;
    }

    set run(runCallback){
        this.runCallback = runCallback;
    }

    set lastRun(lastRunCallback){
        this.lastRunCallback = lastRunCallback;
    }

    set customRefresh(refreshCallback){
        this.refreshCallback = refreshCallback;
    }

    refresh(type){
		if(type!=="isRunning") this.isRunning = false;
		if(type!=="isLastRun") this.isLastRun = false;
		if(type!=="editable") this.editable = false; 
        this.refreshCallback(type);  
    }

    zoom(x, y, z){
        this.context.translate(this.originx,this.originy);
		this.context.scale(z,z);
		this.context.translate(
			-(x/this.scale+this.originx-x/(this.scale*z)),
			-(y/this.scale+this.originy-y/(this.scale*z))
		);
        this.originx = ( x / this.scale + this.originx - x / ( this.scale * z ) );
		this.originy = ( y / this.scale + this.originy - y / ( this.scale * z ) );
		this.scale *= z;
        this.draw("zoom");
    }

    toggleEditSave(ele, eleC, eleV){
		this.refresh("editable");
		if(!this.editable){
			ele.innerHTML = "Save";
			eleC.classList.remove("hidden");
			eleV.classList.remove("hidden");
			this.editable = true;
			return;
		}
        console.log("alldata",this.graph.getData());
		this.editable = false;
    }

    toggleRun(ele){
		this.refresh("isRunning");
		if(!this.isRunning){
			ele.innerHTML = "Stop";
			this.isRunning = true;
			// this.draw("run");
            this.runCallback("run")
			return;
		}
		this.isRunning = false;
    }

    toggleLastRun(ele){
		this.refresh("isLastRun");
		if(!this.isLastRun){
			ele.innerHTML = "Stop";
			this.isLastRun = true;
			this.draw("last-run");
			return;
		}
		this.isLastRun = false;
    }

    draw(type){
        this.context.clearRect(this.originx,this.originy,this.width/this.scale,this.height/this.scale);
		for(var i = 0; i < this.components.length; i += 1) {
			this.components[i].draw();
		}
        if(type==="last-run" && this.isLastRun){
            this.lastRunCallback(type)
        }
        if(type==="run" && this.isRunning){
            this.runCallback(type)
        }
    }

    addAccount(){
        
        this.components.push(new Account(this.context, 12, {}, {x:200, y:200, w:100, h:80, a:0, c:"red"}))
		this.draw("refresh");
    }

    addComment(){
        this.components.push(new Status(this.context, 12, {}, {x:200, y:200, w:100, h:80, a:0, c:"red"}))
		this.draw("refresh");
    }

    addCredit(){
        this.components.push(new Credit(this.context, 12, {}, {x:200, y:200, w:100, h:80, a:0, c:"red"}))
		this.draw("refresh");
    }

    addExpense(){
        this.components.push(new Expense(this.context, 12, {}, {x:200, y:200, w:100, h:80, a:0, c:"red"}))
		this.draw("refresh");
    }

    addSArrow(){
        this.components.push(new SArrow(this.context, 12, 0, 0, {}, {x:200, y:200, w:100, h:80, a:0, c:"red"}))
		this.draw("refresh");
    }

    addCArrow(){
        this.components.push(new CArrow(this.context, 12, 0, 0, {}, {x:200, y:200, w:100, h:80, a:0, c:"red"}))
		this.draw("refresh");
    }

    selectComponent(x, y){
        if(this.isSelected()) this.selected.unselect();
        var flag = true;
        for(var i = 0; i < this.components.length; i += 1) {
            var component = this.components[i];
            var p = rotateByAngleInDeg(x, y, component.x, component.y, component.a);
            if(component.collide(p.x, p.y)){
                this.selected = component;
                this.selected.isSelected = true;
                flag = false;
            }
        }
        if(flag)this.selected = null;
        this.draw("move");
    }

    isSelected(){
        return this.selected !== null && this.selected!==undefined
    }

    moveComponent(x, y){
        if(this.isSelected()){
            var flag = true;
            var n = new Shape(this.ctx, this.selected.id, x, y, this.selected.w, this.selected.h, this.selected.a, this.selected.c)
            for(var i = 0; i < this.components.length; i += 1) {
                var component = this.components[i];
                if(component!==this.selected && component.overlap(n)){
                    flag = false;
                    this.selected.bounce(component, x, y);
                }
            }
            
            if(flag)this.selected.move(x, y);
            this.draw("move");
        }
    }

}