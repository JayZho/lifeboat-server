const { makeid } = require('./helper');
const { createPlayer, findPlayer, assignRoles } = require('./Player');

const express = require('express');
const app = express();
const http = require("http");
const { CHARACTER, characters } = require('./gameSet');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: [
            "https://lifeboat-client-0gddwfowd10071bd-1302413344.ap-shanghai.app.tcloudbase.com",
            "http://lifeboat-client-0gddwfowd10071bd-1302413344.ap-shanghai.app.tcloudbase.com",
            "http://localhost:8080",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

const rooms = {};
const ongoingRooms = {};

io.on('connection', client => {
    client.on("createRoom", createRoom);
    client.on("joinRoom", joinRoom);
    client.on("cancelRoom", cancelRoom);
    client.on("leaveRoom", leaveRoom);
    client.on("startGame", startGame);

    function createRoom(clientName) {
        const roomID = makeid(Object.keys(rooms));

        // if roomID === "", then failed to create a room
        client.emit("roomCode", roomID, client.id);

        // create a new player and add it to room
        const player = createPlayer(client.id, clientName);
        rooms[roomID] = [player];
        client.join(roomID);

        // update all players of the current players in the room
        updatePlayers(roomID);

        // debugging
        console.log("room" + roomID + "created");
        console.log("current rooms: " + Object.keys(rooms));
    }

    function joinRoom(clientName, roomCode) {
        if (!Object.keys(rooms).includes(roomCode)) {
            client.emit("roomCode", "");
        } else {
            const room = rooms[roomCode];
            if (room.length > 7) {
                // room full
                client.emit("roomCode", "max");
            } else {
                // create player and join the room
                const player = createPlayer(client.id, clientName);
                room.push(player);
                client.join(roomCode);
                client.emit("roomCode", roomCode, client.id)

                // update players list
                updatePlayers(roomCode);
            }

        }
    }

    function cancelRoom(roomCode) {
        delete rooms[roomCode];
        io.to(roomCode).emit("roomDeleted");
    }

    function leaveRoom(rID, pID) {
        const room = rooms[rID]
        if (room) {
            rooms[rID] = room.filter((p) => p.id !== pID);
            updatePlayers(rID);
        }
    }

    function startGame(roomID) {
        // init characters and assign to players
        const roomSize = rooms[roomID].length;
        const roles = characters.slice(0, roomSize);
        assignRoles(rooms[roomID], roles);
        io.to(roomID).emit("playersInit", rooms[roomID]);
    }
});

function updatePlayers(roomCode) {
    io.to(roomCode).emit("playerUpdate", rooms[roomCode]);
}



const port = process.env.PORT || 80;
server.listen(port, () => {
    console.log("Server running")
})

