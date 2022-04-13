var socket = io();

socket.emit('set-pseudo',prompt("Pseudo ?"));

var message = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('emission_message', input.value);
        input.value="";
});


socket.on('reception_message', (contenu) =>{

        var li = document.createElement("li");
        var val = document.createTextNode(contenu.pseudo + " : " + contenu.messages);
        window.scrollTo(0, document.body.scrollHeight);
        li.appendChild(val);
        message.appendChild(li); 
        console.log(contenu.pseudo + " : " + contenu.messages);
});

socket.on('reception_utilisateur', (utilisateur) => {
        pseudo.innerHTML = "";
        var id_salon = 'salon';
        var lesMessages = [];               
        

        utilisateur.forEach(contenu => {        
        var li = document.createElement("li");
        li.innerHTML = contenu.pseudo_client;
        pseudo.appendChild(li);        
});

function salon(id) {
        console.log(id);
}
function check_unread() {
        
}
})

