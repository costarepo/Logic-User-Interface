// Função para o DOM (extratosfera)

const entrada = document.querySelector('input');
const button = document.querySelector('button');
const output = document.querySelector('output');

button.addEventListener('click', function(event) {
    event.preventDefault();

    let text = entrada.value;

    output.textContent = downcase(text);
});


const downcase = function(text) {
    let saida = '';
    let especiais = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~1234567890áéíóúãêíç ';
    for (let c of text) {
        if (!(incluso(especiais, c))) {
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

// Funções Secundarias

const incluso = function(parametro, vetor) {
    for (let i of vetor) {
        for (let j of parametro) if (i === j) return true;
    }
    return false;
};

// [+]|=================|Casos de Testes|==================|[+]

console.log(downcase('TESTE') === 'teste');
console.log(downcase('Teste') === 'teste');
console.log(downcase('T$% 12TR') === 't$% 12tr');
console.log(downcase('CURSO TÉCNICO EM INFORMÁTICA PARA INTERNET') === 'curso técnico em informática para internet');
console.log(downcase('Grande Área: CIÊNCIA DA COMPUTAÇÃO') === 'grande área: ciência da computação');
