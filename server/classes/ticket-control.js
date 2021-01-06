const fs = require('fs');

class Ticket
{

    constructor(numero, escritorio) {
        
        this.numero = numero;
        this.escritorio = escritorio;

    }

}

class TicketControl
{

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        const data = require('../data/data.json');
        
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }

    }

    siguienteTicket = () => {

        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;

    };

    ultimoTicket = () => `Ticket ${this.ultimo}`;

    getUltimosCuatro = () => this.ultimosCuatro;

    atenderTicket = (escritorio) => {
        
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        const numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        
        const atender = new Ticket(numeroTicket, escritorio);
        // this.ultimosCuatro = [];
        this.ultimosCuatro.unshift(atender);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1);
        }

        console.log('Ultimos cuatro', this.ultimosCuatro);
        this.grabarArchivo();

        return atender;

    }

    reiniciarConteo = () => {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        console.log('Se ha inicilizado el sistema.');
        this.grabarArchivo();

    }

    grabarArchivo = () => {

        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));

    }

}

module.exports = { TicketControl };