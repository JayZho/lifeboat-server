const io = require("socket.io")(
    3000,
    {
        cors: {
            origin: ["https://lifeboat-client-0gddwfowd10071bd-1302413344.ap-shanghai.app.tcloudbase.com/"]
        }
    }
);

io.on("connection", socket => {
    console.log("++++++++++")
    console.log(socket.id);
    console.log("---------")
});