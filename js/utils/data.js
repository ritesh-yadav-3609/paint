var data = {
    nodes:[
        {
            id:1,
            type: "Account",
            d:{
                name:"Discount", desc:"All values",
                value:100, unit:"%", formula:"a+b",
            },
            p:{
                x:200, y:200, w:100, h:80, a:0, c:"red"
            }
        },
        {
            id:2,
            type: "Account",
            d:{
                name:"Discount", desc:"All values",
                value:100, unit:"%", formula:"a+b",
            },
            p:{
                x:400, y:400, w:100, h:80, a:0, c:"red"
            }
        }
    ],
    edges:[
        {
            id:1,
            type: "SArrow",
            sid:1, eid:2,
            d:{ name:"Discount", desc:"All values",
                value:100, unit:"%", formula: "a+b",
            },
            p:{
                x:200, y:200, w:100, h:80, a:0, c:"red"
            }
        }
    ]
}