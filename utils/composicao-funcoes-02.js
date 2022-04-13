function composicao(...funcoes) {
  // conceito de prog: currying (lazy evaluation)
  return function (valor) {
    return funcoes.reduce((acc, fn) => {
      return fn(acc);
    }, valor);
  };
}

function gritar(texto) {
  return texto.toUpperCase();
}

function enfatizar(texto) {
  return `${texto}!!!`;
}

function tornarLento(texto) {
  return texto.split('').join(' ');
}

const exagerado = composicao(gritar, enfatizar, tornarLento);

const quaseExagerado = composicao(gritar, enfatizar);

console.log(exagerado('cuidado com o buraco'));
console.log(quaseExagerado('para'));

console.log(composicao(gritar, enfatizar)('eita'));
