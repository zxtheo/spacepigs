const server = require('http').createServer();
var port = process.env.PORT || 3000;


const io = require('socket.io')(server, {
    path: '/test',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

var obsticlesRealLocation = []
var player = 0


var state = {
    shipLoc :{x:0, y:0},
    fuel : 100,
    health : 100,
    enemy :[], // {}
    obsticles :[], //{}
    bullets : [], //{}
    broken :[],
    tasks :["Patch Leak", "Repair Wires", "Tighten Screw", "Fix Hole"],
    rooms :["Food", "Fuel", "Bullets", "Engine", "Control"],
    roles :["Captain", "Navigator", "Fighter", "Engineer"],
    
}

io.on('connection', (socket, listener) => {
    console.log("someone connected")
    socket.on('state',(event) => {
        console.log(event)
        socket.emit('state', state)
    })
    socket.on('shipLocation', (event) => {
        state = {}
        state = event
        console.log("New state received")
        console.log(state)
        nearObsticles()
        socket.emit('state', state)
        socket.broadcast.emit('state', state)
    })
    socket.on('shotFired', (shot) =>{
        shotFired(shot)
        socket.emit('state', state)
        socket.broadcast.emit('state', state)
    })
    socket.on("reset", ()=>{
        state = {
            shipLoc: { x: 0, y: 0 },
            fuel: 100,
            health: 100,
            enemy: [], // {}
            obsticles: [], //{}
            bullets: [], //{}
            broken: [],
            tasks: ["Patch Leak", "Repair Wires", "Tighten Screw", "Fix Hole"],
            rooms: ["Food", "Fuel", "Bullets", "Engine", "Control"],
            roles: ["Captain", "Navigator", "Fighter", "Engineer"],
            }
        init()
        socket.broadcast.emit("state", state)
        socket.emit("state", state)
})
})

function shotFired(shot){
    for(var i = 0; i <state.obsticles.length; i++){
        if(state.obsticles[i].id == shot){
            // state.obsticles.splice(i, 1)
        }
    }
    
}

function init() {
    console.log("init")
    obsticlesRealLocation = []
    for(var i = 0; i < 200; i++){
        var randX = Math.round(Math.random() * 5000) - 2500
        var randY = Math.round(Math.random() * 5000) - 2500

        obsticlesRealLocation.push({
            x:randX,
            y:randY,
            id:i
        })
    }
    nearObsticles()
}

function nearObsticles(){
    state.obsticles = []
    for(var i = 0; i < obsticlesRealLocation.length; i++){
        //900x1300 = 450x650
        // console.log("object")
        // console.log(obsticlesRealLocation[i].x + " " + state.shipLoc.x)
        
       
        if (obsticlesRealLocation[i].x >= state.shipLoc.x - 450 && obsticlesRealLocation[i].x <= state.shipLoc.x + 450){
            if (obsticlesRealLocation[i].y >= state.shipLoc.y - 650 && obsticlesRealLocation[i].y <= state.shipLoc.y + 650)
            {
                // console.log('obsticle added')
                var newx, newy, vx, vy

                vx = obsticlesRealLocation[i].x - state.shipLoc.x
                vy = obsticlesRealLocation[i].y - state.shipLoc.y

                newx = 450 + vx
                newy = 450 + vy

                state.obsticles.push({x:newx, y:newy})
            }
        }
        
    }
}

console.log('Server listening on port 3000')
init();
server.listen(port)