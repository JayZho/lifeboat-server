const express = require("express");
const app = express();
const http = require("http");

// const cors = require("cors");
// // app.use(cors({
// //     origin: "*"
// // })
// // );

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: [
            "https://lifeboat-client-0gddwfowd10071bd-1302413344.ap-shanghai.app.tcloudbase.com",
            "http://localhost:3000",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

io.on('connection', socket => {
    console.log(socket.id);
    io.emit('message', "server's greetings!");
});

server.listen(3001, () => {
    console.log("Server running")
})