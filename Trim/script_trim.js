const trimLeft = function(text) {
    let saida = '';
    let flag = true;

    for (let caracter of text) {
        if (!(incluso(' \n\r\t', caracter) && flag)) {
            flag = false;
            saida += caracter;
        }
    }
    return saida;
};

const trimRight = function(text) {
    text = trimLeft(reverse(text));
    return reverse(text);
};

const trim = function(text) {
    return trimLeft(trimRight(text));
};

//  Sub Functions
const incluso = function(parametro, vetor) {
    for (let i of vetor) {
        for (let j of parametro) if (i === j) return true;
    }
    return false;
};


const reverse = function(text) {
    let saida = '';

    for (let i = text.length - 1; i >= 0; i--) saida += text[i]; return saida;
};

//  [+]|===============|Casos de Teste|==================[+]

// aparar String à esquerda: remover espaços à esquerda da String
console.assert(trimLeft('    abc  ') === 'abc  ');
console.assert(trimLeft('    com espaco  ') === 'com espaco  ');
console.assert(trimLeft('\r \n \t com carriage return, line feed, tab e espaco  \n') === 'com carriage return, line feed, tab e espaco  \n');

// aparar String à direita: remover espaços à direita da String
console.assert(trimRight('    abc  ') === '    abc');
console.assert(trimRight('    abc \r \n \t ') === '    abc');

// aparar String em ambos lados
console.assert(trim('    abc  ') === 'abc');
console.assert(trim('\n \r\t      abc\n\r \t        ') === 'abc');
console.assert(trim('\n \r\t      com espaco\n\r \t        ') === 'com espaco');

// situações excepcionais
console.assert(trimLeft('') === '');
console.assert(trimRight('') === '');
console.assert(trim('') === '');
console.assert(trimLeft('   \n\t\r  \n\r ') === '');
console.assert(trimRight('   \n\t\r  \n\r ') === '');
console.assert(trim('   \n\t\r  \n\r ') === '');
console.assert(trim('                                                                  a                                                                                       ') === 'a');
