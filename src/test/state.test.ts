import State from '../state';


describe('State', () => {
    it('Should be an object', () => {
        expect(typeof State).toBe('object');
    });

    it('Should be a singleton', () => {
        expect(require('../state')).toBe(require('../state'));
    });

    it('Should have soundOn property with a default value of true', () => {
        expect(State).toHaveProperty('soundOn');
        expect(State.soundOn).toBe(true);
    });

    it('Should have musicOn property with a default value of true', () => {
        expect(State).toHaveProperty('musicOn');
        expect(State.musicOn).toBe(true);
    });

    it('Should have data property', () => {
        expect(State).toHaveProperty('data');
    });
});
