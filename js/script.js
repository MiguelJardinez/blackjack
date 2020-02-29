/**
 * 2C = two of clubs (Tréboles)
 * 2D = two of Dimons (Diamantes)
 * 2H = two of Heart (Corazones)
 * 2S = two of Swords (Espadas)
 */

 let deck         = [];
 const tipos      = ['C', 'D', 'H', 'S']; 
 const especiales = ['A', 'J', 'Q', 'K']; 

const crearDeck =  () => {

    for(let i = 2; i <= 10; i++ ){
        for(let tipo of tipos){
            deck.push( i + tipo );
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    console.log(deck); 
}

crearDeck(); 