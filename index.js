require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
const http = require('http')
const { Server } = require("socket.io");

const app = require('./app')
const port = process.env.PORT

const server = http.createServer(app)

const io = new Server(server);

io.on('connection', (socket) => {
    const {room} = socket.handshake.query
    
    if (socket.adapter.rooms.get(room)?.size < 2 || !socket.adapter.rooms.get(room)) {
        socket.join(room)
    } else {
        socket.emit('receiveMessage', 'room sudah penuh')
        socket.disconnect() 
    }

    socket.on('sendMessage', (message) => {
        io.to(room).emit('receiveMessage', message.message)
    })
})

server.listen(port, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
