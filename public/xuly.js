var socket = io("https://cutreson-web-socket.herokuapp.com/")

socket.on("server-send-register-error", function(){
    alert("User name da ton tai...");
});

socket.on("server-send-register-ok", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(500);
    $("#chatForm").show(1000);
});

socket.on("server-send-listUser", function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class = 'userOnline'>" + i + "</div>");
    });
});

socket.on("server-send-Message", function(data){
    $("#listMessages").append("<div class = 'message'>" + data.un + ": " + data.nd + "</div>");
});

$(document).ready(function() {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
        socket.emit("client-send-Username", $("#txtUsername").val());
    })

    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(1000);
        $("#chatForm").hide(500);
    })

    $("#btnMessage").click(function(){
        socket.emit("user-send-Message", $("#txtMessage").val());
        document.getElementById('txtMessage').value = "";
    })

});