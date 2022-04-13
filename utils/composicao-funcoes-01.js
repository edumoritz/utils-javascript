function composicao(fn1, fn2, fn3) {
  return function (valor) {
    return fn3(fn2(fn1(valor)));
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

const teste = composicao(gritar, enfatizar, tornarLento)('teste');

console.log(teste);

const exagerado = composicao(gritar, enfatizar, tornarLento);

console.log(exagerado('cuidado com o buraco'));
console.log(exagerado('para'));
