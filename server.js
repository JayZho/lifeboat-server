const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://lifeboat-client-0gddwfowd10071bd-1302413344.ap-shanghai.app.tcloudbase.com/",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (client) => {
    console.log(client.id);

    client.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(3001, () => {
    console.log("Server running")
})