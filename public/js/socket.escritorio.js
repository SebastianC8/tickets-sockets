const socket = io();
const params = new URLSearchParams(window.location.search);

if (!params.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario.');
}

const escritorio = params.get('escritorio');
const elmtHTML = document.querySelector('#btn_atender_ticket');

document.querySelector('h1').innerHTML += `Escritorio: ${escritorio}`;

elmtHTML.addEventListener('click', () => {

    socket.emit('atenderTicket', { escritorio }, (data) => {
        
        if (data === 'No hay tickets') {
            alert(data);
            return;
        }

        document.querySelector('small').innerHTML = `Ticket: ${data.numero}`;
    });
});