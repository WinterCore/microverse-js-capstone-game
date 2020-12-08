export type CoinType = {
    spawn_rate : number;
    points     : number;
    key        : string;
};

export type Texture = 'grass' | 'snow' | 'sand' | 'light_grass';

type Config = {
    coins                            : CoinType[]
    coin_spawn_rate                  : number;
    initial_scroll_speed             : number;
    scroll_speed_increase_rate       : number;
    scroll_speed_increase_per_points : number;
    passed_platform_points           : number;
    textures                         : Texture[];
    player                           : {
        gravity    : number;
        move_speed : number;
        jump_force : number;
        max_jump   : number;
    };
    defaultFontStyle: {
        color           : string;
        fontSize        : string;
        fontFamily      : string;
        strokeThickness : number;
        stroke          : string;
    };
};


const config: Config = {
    coins: [
        // NOTE: The rates need to amount to 1 in total and need to be in DESCENDING order
        {
            points     : 10,
            spawn_rate : 0.5,
            key        : 'bronze',
        },
        {
            points     : 20,
            spawn_rate : 0.3,
            key        : 'silver',
        },
        {
            points     : 35,
            spawn_rate : 0.2,
            key        : 'gold',
        },
    ],
    coin_spawn_rate                  : 0.7,
    initial_scroll_speed             : 150,
    scroll_speed_increase_per_points : 50,
    scroll_speed_increase_rate       : 20,
    passed_platform_points           : 5,
    textures                         : ['light_grass', 'grass', 'snow', 'sand'],
    player                           : {
        gravity    : 800,
        move_speed : 200,
        jump_force : 600,
        max_jump   : 2,
    },

    defaultFontStyle: {
        color           : 'white',
        fontSize        : '24px',
        fontFamily      : 'junegull',
        strokeThickness : 4,
        stroke          : 'black'
    },
};


export default config;
