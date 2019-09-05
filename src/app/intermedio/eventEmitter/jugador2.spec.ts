import { Jugador2 } from './jugador2';

describe('Jugador 2 test', () => {
    let jugador: Jugador2;

    beforeEach(() => jugador = new Jugador2());

    it('debe emitir cuando recibe daño', () => {
        let nuevoHP = 0;
        jugador.hpCambia.subscribe( hp => nuevoHP = hp );

        jugador.recibeDanio(1000);

        expect(nuevoHP).toBe(0);
    });

    it('debe emitir cuando recibe daño y sobrevivir si es menos de 100', () => {
        let nuevoHP = 0;
        jugador.hpCambia.subscribe( hp => nuevoHP = hp );

        jugador.recibeDanio(50);

        expect(nuevoHP).toBe(50);
    });
});
