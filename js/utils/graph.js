
class Graph{
    constructor(){
        this.nodes = [];
        this.components = [];
        this.edges = {};
        this.data = {}
    }

    build(cfg){
        this.nodes = [];
        this.components = [];
        this.edges = {};
        this.data.nodes.forEach(e => {
            var type = e.type;
            if(type==="Account"){
                this.addNode(new Account(cfg.context, e.id, e.d, e.p))
            }
        });
        this.data.edges.forEach(e => {
            var type = e.type;
            if(type==="SArrow"){
                this.addNode(new SArrow(cfg.context, e.id, e.sid, e.eid, e.d, e.p))
            }
        });
        this.components = this.nodes;
    }

    getData(){
        var alldata = []
        this.components.forEach(e => {
            var d = e.data;
            d.type = e.constructor.name;
            alldata.push(d);
        });
        return alldata;
    }

    getNodeById(id){

    }

    addNode(n){
        this.nodes.push(n);
        this.edges[n] = [];
    }

    removeNode(n){
        this.nodes.pop(n);
        this.edges.pop(n);
    }

    addEdge(e){
        this.edges[e.start].push(e);
    }

    removeEdge(e){
        this.edges[e.start].pop(e);
    }

    updateEdge(e, oldStart){
        // this.edges[oldStart].pop(e);
        // this.edges[e.start] = e;
    }

    traverse(){
        // for (let index = 0; index < this.nodes.length; index++) {
        //     console.log(this.nodes[index],this.edges);
        //     this.edges[this.nodes[index]].forEach(ele => {
        //         // console.log(ele);
        //     });
        // }
    }
}