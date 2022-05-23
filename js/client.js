var socket = io();
var id_salon = 'salonG';
var allMessages = [];

socket.emit('set-pseudo', prompt("Pseudo ?"));


// Variables qui récupure éléments HTML
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');


// Écouteur et envoi du message du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('emission_message', input.value, id_salon);
        input.value = '';
    }
});


// Reception ansi que l'affichage message
socket.on('reception_message', (contenu) => {
    allMessages.push({
        pseudo: contenu.pseudo,
        message: contenu.msg,
        id_destinateur: contenu.id_destinateur,
        id_emetteur: contenu.id_emetteur,
        prive: contenu.prive
    });
    salon(id_salon);
    check_unread();
});

// Affiche les utilisateurs de connéctés et channel public
socket.on('reception_utilisateur', (contenu) => {
    pseudo.innerHTML = "Channel :<br><br>";
    pseudo.innerHTML += '<a href = # onClick = salon("salon")>Public</a><br><br>';
    pseudo.innerHTML += "Utilisateurs connectés :<br><br>";
    contenu.forEach(item => {
        if (socket.id != item.id) {
            pseudo.innerHTML += '<a href = # onClick = salon("' + item.id + '")><div>' + item.pseudo + '<span class ="badge badge-primary" id="' + item.id + '"></span></div></a>';
        }
        if (id_salon != 'salonG') {
            document.getElementById(id_salon).innerHTML = "";
        }
    });
});

// La fonction salon permet d'afficher les messages d'un emetteur à son distinateur
// ou dans le salon général
function salon(id) {
    console.log(id);
    id_salon = id;
    messages.innerHTML = "";
    allMessages.forEach((contenu) => {
        if (contenu.id_destinateur == id_salon && id_salon == 'salonG' || contenu.id_destinateur == id_salon && contenu.id_emetteur == socket.id || contenu.id_destinateur == socket.id && contenu.id_emetteur == id_salon) {
            var item = document.createElement('li');
            item.textContent += contenu.pseudo + "  >>  " + contenu.message;
            messages.appendChild(item);
            window.scrollTo(-10, document.body.scrollHeight);
        }
    });
}
