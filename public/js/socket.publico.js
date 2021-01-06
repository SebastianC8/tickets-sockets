const socket = io();

const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');

const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('estadoActual', (data) => data.ultimosCuatro && actualizaHTML(data.ultimosCuatro));

socket.on('ultimosCuatro', (data) => {

    if (data.ultimosCuatro) {
        const audio = new Audio('audio/new-ticket.mp3');
        audio.play();
        actualizaHTML(data.ultimosCuatro);
    }

});

actualizaHTML = (ultimosCuatro) => {

    for (var i = 0; i <= ultimosCuatro.length - 1; i++) {
        lblTickets[i].innerHTML = `Ticket: ${ultimosCuatro[i].numero}`;
        lblEscritorios[i].innerHTML = `Escritorio: ${ultimosCuatro[i].escritorio}`;
    }

}