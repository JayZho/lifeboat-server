module.exports = {
    makeid,
}

function makeid(existingIDs) {
    let limit = 0; // an infinite-loop safety measure
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
    const charactersLength = characters.length;
    while ((result === "" || existingIDs.includes(result)) && limit < 20) {
        for (var i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        limit += 1;
    }
    return limit === 20 ? "" : result;
}