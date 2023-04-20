const CONSTANTES_CARTAS = [
  {
    'tipo': 'corazon',
    'color': 'red',
    'imagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png'
  },
  {
    'tipo': 'trebol',
    'color': 'black',
    'imagen' : 'https://cdn-icons-png.flaticon.com/512/105/105219.png'
  },
  {
    'tipo': 'diamante',
    'color': 'red',
    'imagen': 'https://images.emojiterra.com/google/android-nougat/512px/2666.png'
  },
  {
    'tipo': 'pica',
    'color': 'black',
    'imagen': 'https://images.emojiterra.com/openmoji/v13.1/512px/2660.png'
  }
]

const getTipoCarta = (index) => {
  if(index>=CONSTANTES_CARTAS.length || index<0) {
    return null;
  }

  return CONSTANTES_CARTAS[index];
}

const convertirNumeroCartaValido = (numero) => {
  
  if(numero<=0 || numero>12) return null; //valida
  if(numero==1) return 'A';
  if(numero==10) return 'J'
  if(numero==11) return 'Q'
  if(numero==12) return 'K'

  return numero;
}

const generarCartaAleatoria = () => {
  const aleatorioTipoCarta = Math.floor(Math.random() * CONSTANTES_CARTAS.length);
  const tipoCarta = getTipoCarta(aleatorioTipoCarta);
  
  const aleatorioNumeroCarta = Math.floor(Math.random() * 12)+1;
  const numeroCarta = convertirNumeroCartaValido(aleatorioNumeroCarta);

  if(tipoCarta==null || numeroCarta==null) {
    return 'ERROR AL GENERAR CARTA';
  }

  const carta = tipoCarta;
  carta['numero'] = numeroCarta;
  return carta;
}


window.onload = function() {
  //write your code here
  const carta = generarCartaAleatoria();
};
