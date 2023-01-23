var app =  require('express')();//on charge express
var http =  require('http').Server(app);//on utilise le serveur de l'application en http
var io =  require('socket.io')(http);//on charge socket.io
//ON = écoute, EMIT= ENVOIE

app.get("/", function(req, res){//lorsque le serveur est à la racine --> 
    res.sendFile(__dirname + '/html/index.html')
})

//SOCKET.IO écoute tout les utilisateurs qui se connectent et qui se déconnecte
io.on('connection', function(socket){//sur chaque client qui se connecte
    console.log("user is connected");
    socket.on('disconnect', function(){//à chaque déconnection
        console.log("user disconnected");
    })
    socket.on('chat message', function(msg){
        console.log("message reçu: " + msg);
        io.emit('chat message', msg)
    })
})

http.listen(3000, function(){//pour lancer le serveur (ici sur le port 3000)
    console.log("Server running on port: 3000" )
})