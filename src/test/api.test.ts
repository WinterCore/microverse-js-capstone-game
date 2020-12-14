import { saveScore, fetchScores, ENDPOINT } from '../api';


describe('Score Api', () => {
    let origFetch = window.fetch;

    beforeEach(() => {
        window.fetch = jest.fn();
        // @ts-ignore
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ result: [] })
        });
    });

    afterAll(() => {
        window.fetch = origFetch;
    });

    it('Should fetche scores successfully', async () => {
        const data = await fetchScores();

        expect(window.fetch).toHaveBeenCalledWith(ENDPOINT, {
            headers: { 'Accept': 'application/json' }
        });
        expect(data).toEqual({ result: [] });
    });

    it('Should submit scores successfully', async () => {
        const score = { score: 15, user: 'test' };
        const data = await saveScore(score);

        expect(window.fetch).toHaveBeenCalledWith(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(score),
            headers: {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
        });

        expect(data).toEqual({ result: [] });
    });
});
