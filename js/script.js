/**
 * 2C = two of clubs (Tréboles)
 * 2D = two of Dimons (Diamantes)
 * 2H = two of Heart (Corazones)
 * 2S = two of Swords (Espadas)
 */

//Valirables del dom 
let btnPedir = document.querySelector('#btnPedir');
let btnNuevo = document.querySelector('#btnNuevo');
let btnDetener = document.querySelector('#btnDetener');
let puntosHTML = document.querySelectorAll('small')
let divCartasJugador = document.querySelector('#jugador-cartas');
let divCartasComputadora = document.querySelector('#computadora-cartas');

//Se genera el deck para el juego 
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugardor = 0;
let puntosComputadora = 0;

//Esta funcion crea una nueva baraja
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

//Esta funcion me permite pedir una carta de la baraja

const pedirCarta = () => {


    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

pedirCarta();

//Pedir carta
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
    // let puntos = 0; 

    // if( isNaN( valor ) ){

    //     puntos = ( valor === 'A' ) ? 11 : 10; 

    // } else {
    //     console.log('Es un numero');
    //     puntos = valor * 1; 
    // }
    // console.log( puntos );

}

const valor = valorCarta(pedirCarta());

// turno de la computador
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        //creacion de la carta
        const imgCarta = document.createElement('img');
        imgCarta.src = `./Assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('nadie gana')
        } else if (puntosMinimos > 21) {
            alert('La computadora gana')
        } else if (puntosComputadora > 21) {
            alert('Jugador gana')
        } else {
            alert('Computadora gano')
        }

    }, 50);


}


//Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugardor = puntosJugardor + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugardor;

    //creacion de la carta
    const imgCarta = document.createElement('img');
    imgCarta.src = `./Assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugardor > 21) {
        console.warn('Lo siento has perdido');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugardor);

    } else if (puntosJugardor == 21) {
        console.warn('21, lo conseguiste');
        btnPedir.disabled = true;
        turnoComputadora(puntosComputadora);
    }

});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugardor);
})

btnNuevo.addEventListener('click', () => {

    deck = []; 
    deck = crearDeck(); 

    puntosComputadora = 0;
    puntosJugardor    = 0; 

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    btnDetener.disabled=false; 
    btnPedir.disabled=false; 

    divCartasComputadora.innerHTML = ''; 
    divCartasJugador.innerHTML = ''; 
})