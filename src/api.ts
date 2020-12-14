const GAME_ID = 'tf6XB9aHY5hoYEbi45Ym';

export const ENDPOINT = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${GAME_ID}/scores`;

export type Score = {
    user: string;
    score: number;
};

type CustomResponse<T> = {
    success: boolean;
    result: T;
};

export const saveScore = async (score: Score): Promise<Omit<CustomResponse<unknown>, 'result'>> => {
    try {
        const response = await fetch(ENDPOINT, {
            method  : 'POST',
            body    : JSON.stringify(score),
            headers : {
            'Accept'       : 'application/json',
            'Content-Type' : 'application/json'
            },
        });
        return { success: true };
    } catch (e) {
        return { success: false };
    }
};

export const fetchScores = async (): Promise<CustomResponse<{ result: Score[] } | null>> => {
    try {

        const response = await fetch(ENDPOINT, { headers: { 'Accept' : 'application/json' } });

        return {
            success: true,
            result: await response.json()
        };
    } catch (e) {
        return { success: false, result: null };
    }
};
