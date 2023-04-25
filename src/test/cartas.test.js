import {
    TIPO_CARTAS,
    getTipoCarta,
    convertirNumeroCartaValido,
    generarCartaAleatoria
} from '../utility/cartas'

describe('getTipoCarta', () => {
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