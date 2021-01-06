const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        const next = ticketControl.siguienteTicket();
        callback(next);
    });

    // Estado actual
    client.emit('estadoActual', {
        current: ticketControl.ultimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            callback({err: true, mensaje: 'El escritorio es necesario'});
        }

        const atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatro()
        })

    });

});