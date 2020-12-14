import Button from '../objects/button';
import Coin from '../objects/coin';
import InfoText from '../objects/info-text';
import Platform from '../objects/platform';
import Player from '../objects/player';

describe('Scenes', () => {
    test('All scenes must be function constructors', () => {
        expect(typeof Button).toBe('function');
        expect(typeof Coin).toBe('function');
        expect(typeof InfoText).toBe('function');
        expect(typeof Platform).toBe('function');
        expect(typeof Player).toBe('function');
    });
});