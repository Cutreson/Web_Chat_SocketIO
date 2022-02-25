var express = require("express");
const res = require("express/lib/response");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;
server.listen(PORT);

var listUser = [];

io.on("connection", function(socket){
    console.log(socket.id + " da ket noi...");

    socket.on("client-send-Username", function(data){
        if(listUser.indexOf(data) >=0){
            //dang ki that bai
            socket.emit("server-send-register-error");
        }
        else{
            //dang ki thanh cong
            listUser.push(data);
            socket.Username = data;
            socket.emit("server-send-register-ok", data);
            io.sockets.emit("server-send-listUser",listUser);
        }
    });

    socket.on("logout", function(){
        listUser.splice(listUser.indexOf(socket.Username), 1);
        socket.broadcast.emit("server-send-listUser",listUser);
    });

    socket.on("user-send-Message", function(data){
        console.log(data);
        io.sockets.emit("server-send-Message", {un:socket.Username, nd:data});
    });
});

app.get("/", function(req, res){
    res.render("home");
});