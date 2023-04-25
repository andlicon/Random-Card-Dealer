export const TIPO_CARTAS = [
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
];

export const getTipoCarta = (index) => {
    if (index >= TIPO_CARTAS.length
        || index < 0
        || index == undefined
        || !Number.isInteger(index)) {
        return null;
    }

    return TIPO_CARTAS[index];
};

export const convertirNumeroCartaValido = (numero) => {
    if (numero <= 0
        || numero > 12
        || numero == undefined
        || !Number.isInteger(numero)) return null; //invalido
    if (numero == 1) return 'A';
    if (numero == 10) return 'J'
    if (numero == 11) return 'Q'
    if (numero == 12) return 'K'

    return numero;
};

export const generarCartaAleatoria = (cantidad) => {
    if (cantidad == null
        || cantidad == undefined
        || !Number.isInteger(cantidad)) return null;

    const cartasArray = [];

    for (let i = 0; i < Math.abs(cantidad); i++) {
        const aleatorioTipoCarta = Math.floor(Math.random() * TIPO_CARTAS.length);
        const tipoCarta = getTipoCarta(aleatorioTipoCarta);

        const aleatorioNumeroCarta = Math.floor(Math.random() * 12) + 1;
        const numeroCarta = convertirNumeroCartaValido(aleatorioNumeroCarta);

        const carta = tipoCarta;
        carta['numero'] = numeroCarta;

        cartasArray.push(carta);
    }

    return cartasArray;
};