import {
    TIPO_CARTAS,
    getTipoCarta,
    convertirNumeroCartaValido,
    generarCartaAleatoria
} from '../utility/cartas'

describe('Funcion: getTipoCarta', () => {
    test('Debe devolver un tipo carta por cada indice del arreglo TIPO_CARTAS', () => {
        for (let i = 0; i < TIPO_CARTAS.length; i++) {
            const result = getTipoCarta(i);
            expect(result).toBe(TIPO_CARTAS[i]);
        }
    });
    test('Un indice menor que 0 debe retornar null', () => {
        const result = getTipoCarta(-1);
        expect(result).toBe(null);
    });
    test('Un indice que desborde TIPO_CARTAS debe retornar null', () => {
        const result = getTipoCarta(TIPO_CARTAS.length);
        expect(result).toBe(null);
    });
    test('Un indice undefined debe retornar null', () => {
        const result = getTipoCarta(undefined);
        expect(result).toBe(null);
    });
    test('Un tipo de dato diferente a Number debe retornar null', () => {
        const result = getTipoCarta('a');
        expect(result).toBe(null);
    });
    test('Un tipo de dato diferente a Number debe retornar null', () => {
        const result = getTipoCarta(0.1);
        expect(result).toBe(null);
    });
    test('Null debe retornar null', () => {
        const result = getTipoCarta(null);
        expect(result).toBe(null);
    });
});

describe('Funcion: convertirNumeroCartaValido', () => {
    test('Un indice superior al 12 debe retornar null ', () => {
        const result = convertirNumeroCartaValido(13);
        expect(result).toBe(null);
    });
    test('Un indice menor que 0 debe retornar null', () => {
        const result = convertirNumeroCartaValido(-1);
        expect(result).toBe(null);
    });
    test('Null debe retornar null', () => {
        const result = convertirNumeroCartaValido(null);
        expect(result).toBe(null);
    });
    test('Undefined debe retornar null', () => {
        const result = convertirNumeroCartaValido(undefined);
        expect(result).toBe(null);
    });
    test('Tipo de dato distinto a numero debe retornar null', () => {
        const result = convertirNumeroCartaValido('a');
        expect(result).toBe(null);
    });
    test('Tipo de dato distinto a numero debe retornar null', () => {
        const result = convertirNumeroCartaValido(1.5);
        expect(result).toBe(null);
    });
    test('indice 1 debe retornar la letra A', () => {
        const result = convertirNumeroCartaValido(1);
        expect(result).toBe('A');
    });
    test('indice 10 debe retornar la letra J', () => {
        const result = convertirNumeroCartaValido(10);
        expect(result).toBe('J');
    });
    test('indice 11 debe retornar la letra Q', () => {
        const result = convertirNumeroCartaValido(11);
        expect(result).toBe('Q');
    });
    test('indice 12 debe retornar la letra K', () => {
        const result = convertirNumeroCartaValido(12);
        expect(result).toBe('K');
    });
});

describe('Funcion generarCartaAleatoria', () => {
    test('Debe retornar la cantidad de cartas indicadas', () => {
        const result = generarCartaAleatoria(4);
        expect(result.length).toBe(4);
    });
    test('Debe retornar la cantidad de cartas indicadas', () => {
        const result = generarCartaAleatoria(0);
        expect(result.length).toBe(0);
    });
    test('Cantidad negativa debe ser tratada como si fuese positiva', () => {
        const result = generarCartaAleatoria(-4);
        expect(result.length).toBe(4);
    });
    test('Null debe retornar null', () => {
        const result = generarCartaAleatoria(null);
        expect(result).toBe(null);
    });
    test('Undefined debe retornar null', () => {
        const result = generarCartaAleatoria(undefined);
        expect(result).toBe(null);
    });
    test('Un indice distinto de number debe retornar null', () => {
        const result = generarCartaAleatoria('a');
        expect(result).toBe(null);
    });
    test('Las cartas deben tener todos los atributos validos', () => {
        const result = generarCartaAleatoria(4);
        const ATRIBUTOS_VALIDOS = ["nombre", "color", "clase", "numero"];
        for (let i = 0; i < result.length; i++) {
            const currentAtributos = Object.keys(result[i]).toString();
            expect(currentAtributos).toBe(ATRIBUTOS_VALIDOS.toString());
        }
    });
    test('Los atributos de las cartas deben tener valores', () => {
        const result = generarCartaAleatoria(4);
        const ATRIBUTOS_VALIDOS = ['nombre', 'color', 'clase', 'numero'];
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < ATRIBUTOS_VALIDOS.length; j++) {
                const currentAtributo = ATRIBUTOS_VALIDOS[j];
                expect(result[i][currentAtributo]).not.toBe(undefined);
            }
        }
    });
});