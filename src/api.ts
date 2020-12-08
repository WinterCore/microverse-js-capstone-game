const GAME_ID = 'tf6XB9aHY5hoYEbi45Ym';

const ENDPOINT = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${GAME_ID}/scores`;

export type Score = {
    user: string;
    score: number;
};

export const saveScore = async (score: Score) => {
    const response = await fetch(ENDPOINT, {
        method  : 'POST',
        body    : JSON.stringify(score),
        headers : {
          'Accept'       : 'application/json',
          'Content-Type' : 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('something happened');
    }
    return response.json();
};

export const fetchScores = async (): Promise<{ result: Score[] }> => {
    const result = await fetch(ENDPOINT, { headers: { 'Accept' : 'application/json' } });

    return result.json();
};
