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

var obsticlesRealLocation = [],

var state = {
    space :[1000, 1000],
    shipLoc :[0, 0],
    fuel = 100,
    health = 100,
    enemy =[], // {}
    obsticles =[], //{}
    bullets = 100,
    broken =[],
    tasks =["Patch Leak", "Repair Wires", "Tighten Screw", "Fix Hole"],
    rooms =["Food", "Fuel", "Bullets", "Engine", "Control"],
    roles =["Captain", "Navigator", "Fighter", "Engineer"],
    players = 0
}

io.on('connection', (socket, listener) => {
    console.log("someone connected")
    socket.on('state',(event) => {
        console.log(event)
        socket.emit('state', state)
    })
})

function init() {
    for(var i = 0; i < 100; i++){
        var randX = Math.round(Math.random() * 20000) - 10000
        var randY = Math.round(Math.random() * 20000) - 10000

        state.obsticles.push({
            x = randX,
            y = randY,
            id = i
        })
    }
}

console.log('Server listening on port 3000')
init();
server.listen(port);