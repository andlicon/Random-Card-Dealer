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

const CONSTANTES_PROGRAMA = {
  'width': '',
  'height': '',
  'cantidadCartas': 1,
  'segundoActual': 10,
  'segundoSetteado': 10
}

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
  const cartasArray = [];
  const cantidad = CONSTANTES_PROGRAMA.cantidadCartas;

  for (let i = 0; i < cantidad; i++) {
    const aleatorioTipoCarta = Math.floor(Math.random() * TIPO_CARTAS.length);
    const tipoCarta = getTipoCarta(aleatorioTipoCarta);

    const aleatorioNumeroCarta = Math.floor(Math.random() * 12) + 1;
    const numeroCarta = convertirNumeroCartaValido(aleatorioNumeroCarta);

    if (tipoCarta == null || numeroCarta == null) {
      return 'ERROR AL GENERAR CARTA';
    }

    const carta = tipoCarta;
    carta['numero'] = numeroCarta;

    cartasArray.push(carta);
  }

  return cartasArray;
}

const renderCarta = (cartasArray) => {
  const display = document.querySelector('#display-cartas');

  for (let i = 0; i < cartasArray.length; i++) {
    const divCarta = document.createElement('div');
    divCarta.classList.add('carta');

    divCarta.style.width = CONSTANTES_PROGRAMA.width + "px";
    divCarta.style.height = CONSTANTES_PROGRAMA.height + "px";

    //Div de los simbolos
    for (let j = 0; j < 2; j++) {
      const divTipoCarta = document.createElement('div');
      const posicion = j == 0 ? 'tipo-carta--superior' : 'tipo-carta--inferior';
      divTipoCarta.classList.add('tipo-carta', cartasArray[i].clase, posicion);
      divCarta.appendChild(divTipoCarta);
    }

    //Numero de carta
    const spanNumero = document.createElement('span');
    spanNumero.classList.add('numero-carta');
    spanNumero.innerText = cartasArray[i].numero;
    spanNumero.style.color = cartasArray[i].color;
    divCarta.appendChild(spanNumero);

    //Anadir div al display
    display.appendChild(divCarta);
  }
}

const displayReiniciado = () => {
  const displayViejo = document.querySelector('#display-cartas');
  document.body.removeChild(displayViejo);
  const nuevoDisplay = document.createElement('div');
  nuevoDisplay.id = 'display-cartas';
  nuevoDisplay.classList.add('container-carta');

  return nuevoDisplay;
}

const actualizarTemporizador = () => {
  const divDecenaSegundo = document.querySelector('#decimaSegundo');
  const divUnidadSegundo = document.querySelector('#unidadSegundo');

  divDecenaSegundo.innerText = "0";
  divUnidadSegundo.innerText = CONSTANTES_PROGRAMA.segundoActual;
}

const eventoGeneradorCarta = () => {
  //reiniciar display
  document.body.appendChild(displayReiniciado());
  //reiniciar temporizador
  reiniciarTemporizador();

  renderCarta(generarCartaAleatoria(CONSTANTES_PROGRAMA.cantidadCartas));
}

const generarNumerosInputRange = () => {
  const rangesArray = document.querySelectorAll('input[type="range"]');

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

const inicializarInputsSoloNumeros = () => {
  const inputsArray = document.querySelectorAll('input[data-type="number"]');

  for (let i = 0; i < inputsArray.length; i++) {
    inputsArray[i].addEventListener('keydown', (event) => {
      const key = event.key;

      if (!key.match(/[0-9]/)
        && key != 'Backspace'
        && !key.match('Arrow')
        && key != 'Delete') {
        event.preventDefault();
      }
    });
  }
}

const updateConstantes = (e) => {
  const target = e.target

  if (target.id == 'cantidad') {
    CONSTANTES_PROGRAMA.cantidadCartas = target.value;
  }
  if (target.id == 'width') {
    CONSTANTES_PROGRAMA.width = target.value;
  }
  if (target.id == 'height') {
    CONSTANTES_PROGRAMA.height = target.value;
  }

}

const reiniciarTemporizador = () => {
  CONSTANTES_PROGRAMA.segundoActual = CONSTANTES_PROGRAMA.segundoSetteado;

  const divDecenaSegundo = document.querySelector('#decimaSegundo');
  const divUnidadSegundo = document.querySelector('#unidadSegundo');

  divDecenaSegundo.innerText = '1';
  divUnidadSegundo.innerText = '0';
}

window.onload = function () {
  //Inicializando los elementos 
  generarNumerosInputRange();
  inicializarInputsSoloNumeros();

  //cambiar constantes del programa
  const contenedorModificadores = document.querySelector('#menuOpciones');
  contenedorModificadores.addEventListener('change', (e) => updateConstantes(e));

  //Generar cartas al click
  const generador = document.querySelector('#generador');
  generador.addEventListener('click', () => {
    eventoGeneradorCarta();
    actualizarTemporizador();
  });

  //generar primera carta
  eventoGeneradorCarta();

  setInterval(() => {
    //temporizador
    CONSTANTES_PROGRAMA.segundoActual--;

    if (CONSTANTES_PROGRAMA.segundoActual <= 0) {
      eventoGeneradorCarta();
    }
    else {
      actualizarTemporizador();
    }

  }, 1000);
};
