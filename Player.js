module.exports = {
    createPlayer,
    findPlayer,
    assignRoles
}

let assert = require("assert");

function createPlayer(id, name) {
    const player = {
        id: id,
        name: name,
    }
    return player;
}

function findPlayer(room, pID) {
    if (room === null) {
        return null;
    } else {
        return room.filter((p) => p.ID === pID);
    }
}

function assignRoles(players, rs) {
    assert(players.length === rs.length, "The number of players isn't equal to the number of given roles.");

    const roles = [...rs];
    const hates = [...rs];
    const likes = [...rs];
    
    for (let i = 0; i < players.length; i++) {
        const rolesLeft = roles.length;
        const roleIndex = Math.floor(Math.random() * rolesLeft);
        const hateIndex = Math.floor(Math.random() * rolesLeft);
        const likeIndex = Math.floor(Math.random() * rolesLeft);
        players[i]["role"] = roles[roleIndex];
        players[i]["hate"] = hates[hateIndex];
        players[i]["like"] = likes[likeIndex];
        roles.splice(roleIndex, 1);
        hates.splice(hateIndex, 1);
        likes.splice(likeIndex, 1);
    }
}