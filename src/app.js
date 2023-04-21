const TIPO_CARTAS = [
  {
    'nombre': 'corazon',
    'color': 'red',
    'clase': 'tipo--corazon'
  },
  {
    'nombre': 'trebol',
    'color': 'black',
    'clase': 'tipo--trebol'
  },
  {
    'nombre': 'diamante',
    'color': 'red',
    'clase': 'tipo--diamante'
  },
  {
    'nombre': 'pica',
    'color': 'black',
    'clase': 'tipo--pica'
  }
]

const getTipoCarta = (index) => {
  if (index >= TIPO_CARTAS.length || index < 0) {
    return null;
  }

  return TIPO_CARTAS[index];
}

const convertirNumeroCartaValido = (numero) => {

  if (numero <= 0 || numero > 12) return null; //invalido
  if (numero == 1) return 'A';
  if (numero == 10) return 'J'
  if (numero == 11) return 'Q'
  if (numero == 12) return 'K'

  return numero;
}

const generarCartaAleatoria = () => {
  const aleatorioTipoCarta = Math.floor(Math.random() * TIPO_CARTAS.length);
  const tipoCarta = getTipoCarta(aleatorioTipoCarta);

  const aleatorioNumeroCarta = Math.floor(Math.random() * 12) + 1;
  const numeroCarta = convertirNumeroCartaValido(aleatorioNumeroCarta);

  if (tipoCarta == null || numeroCarta == null) {
    return 'ERROR AL GENERAR CARTA';
  }

  const carta = tipoCarta;
  carta['numero'] = numeroCarta;
  return carta;
}

const renderCarta = (carta) => {
  const display = document.querySelector('#display-cartas');

  const divCarta = document.createElement('div');
  divCarta.classList.add('carta');

  //Div de los simbolos
  for (let i = 0; i < 2; i++) {
    const divTipoCarta = document.createElement('div');
    const posicion = i == 0 ? 'tipo-carta--superior' : 'tipo-carta--inferior';
    divTipoCarta.classList.add('tipo-carta', carta.clase, posicion);
    divCarta.appendChild(divTipoCarta);
  }

  //Numero de carta
  const spanNumero = document.createElement('span');
  spanNumero.classList.add('numero-carta');
  spanNumero.innerText = carta.numero;
  spanNumero.style.color = carta.color;
  divCarta.appendChild(spanNumero);

  //Anadir div al display
  display.appendChild(divCarta);
}

const eventoClickGenerador = () => {
  const displayViejo = document.querySelector('#display-cartas');
  document.body.removeChild(displayViejo);

  const nuevoDisplay = document.createElement('div');
  nuevoDisplay.id = 'display-cartas';
  nuevoDisplay.classList.add('container-carta');
  document.body.appendChild(nuevoDisplay);

  renderCarta(generarCartaAleatoria());
}

const generarNumerosInputRange = () => {
  const rangesArray = document.querySelectorAll('input[type="range"]');
  // const indicadoresArray = document.querySelectorAll('input[type="range"] + .range-indicadores');

  for (let i = 0; i < rangesArray.length; i++) {
    const range = rangesArray[i];
    const papaRange = range.parentNode;
    //Creando indicador
    const indicador = document.createElement('div');
    indicador.classList.add('range-indicadores');

    const inicio = Number(range.min);
    const cantidad = Number(range.max);
    const step = Number(range.step);

    for (let j = inicio; j <= cantidad; j += step) {
      const spanIndicador = document.createElement('span');
      spanIndicador.classList.add('indicador');
      spanIndicador.textContent = j;
      indicador.appendChild(spanIndicador);
    }

    papaRange.appendChild(indicador);

  }
}

window.onload = function () {
  //asignar 
  generarNumerosInputRange();

  renderCarta(generarCartaAleatoria());

  const generador = document.querySelector('#generador');
  generador.addEventListener('click', eventoClickGenerador);

};
