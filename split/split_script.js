const button = document.querySelector('#submit');
const texto = document.querySelector('#texto');
const parametro = document.querySelector('#parametro');

button.addEventListener('click', function(event) {
    event.preventDefault();
    let text = texto.value;
    let flag = parametro.value;

    let partes = split(text, flag);
    let cont = 1;
    console.log(partes);
    for (let parte of partes) {
        const saida = document.querySelectorAll('ul')[1];
        saida.innerHTML += '<li>Parte ' + cont + ':   ' + parte + '</li>';
        cont++;
    }
});

const split = function(texto, parametro) {
    let palavra = '';
    let saida = [];
    texto += parametro;

    for (let caracter of texto) {
        if (caracter !== parametro) palavra += caracter;

        else {
            saida.push(palavra);
            palavra = '';
        }
    }
    return saida;
};


// [+]|=================|Casos de Testes|==============[+]

const parts = split('the:matrix:revisited', ':');
console.log(parts.length === 3);
console.log(parts[0] === 'the');
console.log(parts[1] === 'matrix');
console.log(parts[2] === 'revisited');
console.log(parts[3] === undefined);

console.log(split('banana', 'a')[0] === 'b');
console.log(split('banana', 'a')[1] === 'n');
console.log(split('banana', 'a')[2] === 'n');
console.log(split('banana', 'a')[3] === '');

const dbo = split('desenvolvimento baseado em objetos', ' ');
console.log(dbo.length === 4);
console.log(dbo[0] === 'desenvolvimento');
console.log(dbo[1] === 'baseado');
console.log(dbo[2] === 'em');
console.log(dbo[3] === 'objetos');
