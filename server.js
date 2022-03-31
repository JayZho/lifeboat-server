const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors({
    origin: "*"
})
);

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (client) => {
    console.log(client.id);


    client.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(3001, () => {
    console.log("Server running")
})