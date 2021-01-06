const socket = io();
const labelNextTicket = document.querySelector('#lblNuevoTicket');

socket.on('connect', () => console.log('Conectado al servidor.'));
socket.on('disconnect', () => console.log('Desconectado del servidor.'));

document.querySelector('#btn_new_ticket').addEventListener('click', () => {

    socket.emit('siguienteTicket', null, (data) => {
        labelNextTicket.innerHTML = data;
    });

});

socket.on('estadoActual', (data) => labelNextTicket.innerHTML = data.current);