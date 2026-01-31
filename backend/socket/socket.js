
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
   cors: 'http://localhost:5173',
});

// const io = new Server(server, {
//   cors: {
//     origin: "*", // or your tunnel domain
//     methods: ["GET", "POST"],
//   },
// });


io.on('connection', (socket) => {
    console.log('User Connected: ', socket.id);

    socket.on('joinRoom', (conversationID) => {
        socket.join(conversationID);
        console.log(`Joined room: ${conversationID}`);
    })

    socket.on('disconnect', (reason) => {
        console.log("REASON: ", reason);
        console.log('User disconnecting: ', socket.id);
    })
})

module.exports = { app, server, io };