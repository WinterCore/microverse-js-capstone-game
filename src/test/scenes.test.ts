import {
    Preload,
    Boot,
    Title,
    Leaderboard,
    Options,
    Game,
    Gameover,
    Credits,
    Guide,
} from '../scenes/index';

describe('Scenes', () => {
    test('All scenes must be function constructors', () => {
        expect(typeof Preload).toBe('function');
        expect(typeof Boot).toBe('function');
        expect(typeof Title).toBe('function');
        expect(typeof Leaderboard).toBe('function');
        expect(typeof Options).toBe('function');
        expect(typeof Game).toBe('function');
        expect(typeof Gameover).toBe('function');
        expect(typeof Credits).toBe('function');
        expect(typeof Guide).toBe('function');
    });
});
