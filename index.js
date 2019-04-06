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

var state = {
    something: 10,
}

io.on('connection', (socket, listener) => {
    console.log("someone connected")
    socket.on('state',(event) => {
        console.log(event)
        socket.emit('state', state)
    })
})

console.log('Server listening on port 3000')
server.listen(port);