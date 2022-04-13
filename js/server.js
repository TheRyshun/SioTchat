const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");
let PORT = 4090;

// Port d'écoute
server.listen(PORT, () => {
    console.log('Serveur démarée  :  ' + PORT);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/client.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'js/client.js'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/style.css'));
});

io.on('connection', (socket) => {
    socket.on('set-pseudo', (pseudo) => {
        console.log(pseudo + " vient de se connecter à " + new Date());
        socket.nickname = pseudo;
        io.fetchSockets().then((room) => {
            var utilisateur = [];
            room.forEach((item) => {
                utilisateur.push({
                    id_client : item.id,
                    pseudo_client : item.nickname
                });
            });
            io.emit('reception_utilisateur', utilisateur);
        });
    });


    socket.on("emission_message", (message) => {
            console.log(socket.nickname + " à send : \'" + message + "\'");
            contenu = message;
            io.emit('reception_message', {
                 pseudo : socket.nickname,
                messages : message
            });
    });

    socket.on('disconnect', () => {
        socket._onclose(console.log(socket.nickname + ' viens de deco ' + new Date()));
    });
});