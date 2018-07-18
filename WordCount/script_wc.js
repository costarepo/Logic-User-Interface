// Função para DOM

const button = document.querySelector('#submit');
const entrada = document.querySelector('textarea');
const saida = document.querySelectorAll('ul')[1];

button.addEventListener('click', function(event) {
    event.preventDefault();

    const valor = entrada.value;

    const words = stats(valor);

    for (let word of words) {
        let temp = word[0] + ': ' + word[1];
        saida.innerHTML += '<li>' + temp + '</li>&nbsp; -> &nbsp;';
    }
});

// Função primaria

const stats = function(text) {
    let special = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~1234567890';
    let result = new Array(0);

    text = downcase(text);
    text = remove(text, special, true);
    text = split(text, ' ');
    text = remove(text, stop_words, false);

    for (let i = 0; i < text.length; i++) {
        let number = 0;

        for (let word of text) {
            if (word === text[i]) number++;
        }

        result.push([text[i], number]);
    }

    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length; j++) {
            if (result[i][0] === result[j][0] && i !== j) {
                result[j] = ' ';
            }
        }
    }

    result = remove(result, ' ', false);

    return result;
};

// Stop words

const stop_words = ['de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'é', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas', 'foi', 'ao', 'ele', 'das', 'tem', 'á', 'seu', 'sua', 'ou', 'ser', 'quando', 'muito', 'há', 'nos', 'já', 'está', 'eu', 'só', 'pelo', 'pela', 'até', 'isso', 'ela', 'entre', 'era', 'depois', 'sem', 'mesmo', 'aos', 'ter', 'seus', 'quem', 'nas', 'me', 'esse', 'eles', 'estão', 'você', 'tinha', 'foram', 'essa', 'num', 'nem', 'suas', 'meu', 'ás', 'minha', 'têm', 'numa', 'pelos', 'elas', 'havia', 'seja', 'qual', 'será', 'nós', 'tenho', 'lhe', 'deles', 'essas', 'esses', 'pelas', 'este', 'fosse', 'dele', 'tu', 'te', 'vocês', 'vos', 'lhes', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'nosso', 'nossa', 'nossos', 'nossas', 'dela', 'delas', 'esta', 'estes', 'estas', 'aquele', 'aquela', 'aqueles', 'aquelas', 'isto', 'aquilo', 'estou', 'está', 'estamos', 'estão', 'estive', 'esteve', 'estivemos', 'estiveram', 'estava', 'estávamos', 'estavam', 'estivera', 'estivéramos', 'esteja', 'estejamos', 'estejam', 'estivesse', 'estivéssemos', 'estivessem', 'estiver', 'estivermos', 'estiverem', 'hei', 'há', 'ha', ' '];

// Secundarias

const downcase = function(text) {
    let saida = '';
    let especiais = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~1234567890áéíóúãêíç ';
    for (let c of text) {
        if (!(incluso(especiais, c, true))) {
            if (c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 122) {
                saida += c;
            } else {
                saida += String.fromCharCode(c.charCodeAt(0) + 32);
            }
        } else {
            saida += c;
        }
    }
    return saida;
};

const incluso = function(parametro, vetor, method) {
    if (method) {
        for (let i of vetor) {
            for (let j of parametro) {
                if (i === j) return true;
            }
        }
        return false;
    } else {
        for (let i of parametro) {
            if (i === vetor) {
                return true;
            }
        }
        return false;
    }
};

const remove = function(text, parameter, method) {
    if (method) {
        let text2 = '';
        for (let i=0; i<text.length; i++) {
            if (!(incluso(parameter, text[i], true))) {
                text2 += text[i];
            }
        }
        return text2;
    } else {
        let vetor = new Array(0);

        for (let i=0; i<text.length; i++) {
            if (!(incluso(stop_words, text[i], false))) vetor.push(text[i]);
        }

        return vetor;
    }
};

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

// Casos de Testes

const texto = "Programação Orientada a Objetos (também conhecida pela sua sigla POO) é um modelo de análise, projeto e programação de software baseado na composição e interação entre diversas unidades chamadas de 'objetos'. A POO é um dos 4 principais paradigmas de programação (as outras são programação imperativa, funcional e lógica). Os objetos são operados com o conceito de 'this' (isso) ou 'self' (si), de forma que seus métodos muitas vezes modifiquem os dados da própria instância. Os programas são arquitetados na forma de objetos que interagem entre si. Dentre as várias abordagens da POO, as baseadas em classes são as mais comuns: objetos são instâncias de classes, o que em geral também define o tipo do objeto. Assim, na POO, implementa-se um conjunto de classes. Cada classe determina o comportamento (definido nos métodos) e estados possíveis (atributos) de seus objetos, assim como o relacionamento com outros objetos. A alternativa mais usual ao uso de classes é o uso de protótipos. Neste caso, objetos são copias de outros objetos, não instâncias de classes. Javascript e Lua são exemplos de linguagens cuja POO é realizada por protótipos. A diferença mais prática mais evidente é que na POO baseada em protótipos apenas a herança simples é implementada pela cópia do objeto.";

const result = stats(texto);
console.log(result.length > 50)
// cada item em resultado é a estatística de uma palavra
// o subitem 0 é a palavra e o subitem 1 é a contagem
console.log(result[0][0] === 'programação');
console.log(result[0][1] === 4);
console.log(result[1][0] === 'orientada');
console.log(result[1][1] === 1);
console.log(result[2][0] === 'objetos');
console.log(result[2][1] === 9);
console.log(result[3][0] === 'também');
console.log(result[3][1] === 2);

// adicionar mais 12 casos de teste:
const text = 'abacate cenoura,';
const result2 = stats(text);

console.log(result2[0][0] === 'abacate');
console.log(result2[0][1] === 1);
console.log(result2[1][0] === 'cenoura');
console.log(result2.length === 2);

const text2 = 'a abacate';

const result3 = stats(text2);

console.log(result3[0][0] === 'abacate');
console.log(result3[0][1] === 1);
console.log(result3.length === 1);
console.log(result3.length === 1);

const text3 = 'a a a a a a matrix aham';

const result4 = stats(text3);

console.log(result4[0][0] === 'matrix');
console.log(result4[0][1] === 1);
console.log(result4[1][0] === 'aham');
console.log(result4.length === 2);
