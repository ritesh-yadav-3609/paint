window.onload = function() {
	// console.clear();
	var cfg = new Configuration("canvas");
	var graph = new Graph();
	cfg.graph = graph;
	graph.data = data;
	graph.build(cfg);

	var controllerPan = document.getElementById("controller-pan"), valuePan = document.getElementById("value-pan");	
	var editSaveBtn = document.getElementById("edit-save"), 
	runBtn = document.getElementById("run"), lastRunBtn = document.getElementById("last-run");
	cfg.customRefresh = function (type) {
		runBtn.innerHTML = "Run";
		lastRunBtn.innerHTML = "Last Run";
		editSaveBtn.innerHTML = "Edit";
		controllerPan.classList.add("hidden");
		valuePan.classList.add("hidden");
		if(cfg.isSelected()){
			valuePan.innerHTML = cfg.selected.data;
			controllerPan.innerHTML = cfg.selected.data;
		}	
	};
	cfg.run = function (type) { graph.traverse(); };
	cfg.lastRun = function (type) {
		if(cfg.selected.x> cfg.width) cfg.selected.x = 100;
		if(cfg.selected.y> cfg.height) cfg.selected.y = 100;
		cfg.selected.move(cfg.selected.x+10, cfg.selected.y+10);
		requestAnimationFrame(function() { cfg.draw(type) });
	};

	cfg.refresh();
	cfg.draw("start");

	editSaveBtn.onclick = function(evt){cfg.toggleEditSave(evt.toElement, controllerPan, valuePan);}; 
	runBtn.onclick = function(evt){cfg.toggleRun(evt.toElement);};
	lastRunBtn.onclick = function(evt){cfg.toggleLastRun(evt.toElement);};

	document.getElementById("account").onclick = function(evt){ cfg.addAccount(); };
	document.getElementById("comment").onclick = function(evt){ cfg.addComment(); };
	document.getElementById("credit").onclick = function(evt){ cfg.addCredit(); };
	document.getElementById("expense").onclick = function(evt){ cfg.addExpense(); };
	document.getElementById("sarrow").onclick = function(evt){ cfg.addSArrow(); };
	document.getElementById("carrow").onclick = function(evt){ cfg.addCArrow(); };

	new WheelTracker(cfg.canvas, mousex=0, mousey=0, function(mx, my, zoom) { cfg.zoom(mx, my, zoom); });
	new MouseTouchTracker(cfg.canvas,function(evtType, x, y) {
		var p = scaleShape(x, y, cfg.originx, cfg.originy, cfg.scale);
		x = p.x, y=p.y;
		if(evtType==="down") cfg.selectComponent(x, y);
		if(evtType==="move")cfg.moveComponent(x, y);
	});
	new KeyboardTracker(document.body,function(type, key, keyCode, ctrlKey, shiftKey, altKey) {
		if(cfg.isSelected()){
			if(key==="=" && ctrlKey) cfg.selected.resize(cfg.selected.w+1,cfg.selected.h+1);
			if(key==="-" && ctrlKey) cfg.selected.resize(cfg.selected.w-1,cfg.selected.h-1);
			if(key==="l" && ctrlKey) cfg.selected.rotate(cfg.selected.a+10);
			if(key==="r" && ctrlKey) cfg.selected.rotate(cfg.selected.a-10);
			if(key==="ArrowRight") cfg.moveComponent(cfg.selected.x+1,cfg.selected.y);
			if(key==="ArrowLeft") cfg.moveComponent(cfg.selected.x-1,cfg.selected.y);
			if(key==="ArrowUp") cfg.moveComponent(cfg.selected.x,cfg.selected.y-1);
			if(key==="ArrowDown") cfg.moveComponent(cfg.selected.x,cfg.selected.y+1);
			cfg.draw("move");
		}
	});

};






  

