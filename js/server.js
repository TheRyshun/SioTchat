const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");
let PORT = 4090;

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

// Lors de la connexion il y à un set d'un pseudo et qui utilise la fonction listeUser
io.on('connection',(socket)=>{
    socket.on('set-pseudo',(pseudo)=>{
    console.log(pseudo + " vient de se connecter à " + new Date());
    socket.nickname = pseudo;
    listeUser();
    }); 
  
    // L'émission d'un message avec les valeurs préféfini
    socket.on('emission_message',(leMessage, id)=>{
      var UnMessage ={
      id_destinateur : id,
      id_emetteur : socket.id,
      pseudo : socket.nickname,
      msg : leMessage,
      prive : false,
  };
  // Si le message va dans le général ou message privé
      if(id == "salonG"){
        io.emit("reception_message",UnMessage)
      }else{
        io.to(id).to(socket.id).emit("reception_message",UnMessage);
      }
    });
  
    // Logs de déconnexion d'un utilisateur
    socket.on('disconnect',()=>{
      console.log(socket.nickname+ "a quitté le chat");
      listeUser();
    });
  });
  
  // Cette fonction listeUser permet de récuperer lors dela connexion l'utilisatuers afin
  // de l'envoyer à la partie client (stocks tableau)
  function listeUser(){
    io.fetchSockets().then((room)=>{
    var utilisateurs =[];
    room.forEach((item) => {
        utilisateurs.push({
        id : item.id,
        pseudo : item.nickname
      });
    });
    io.emit('reception_utilisateur', utilisateurs)
    });
  }
