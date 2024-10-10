export interface IPokemonAbility {
    ability: {
        name: string;
        url: string;
    };
}

export interface IPokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface IPokemonType {
    type: {
        name: string;
        url: string;
    };
}

export interface IPokemonSprites {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other?: {
        dream_world: {
            front_default: string;
        },
        "official-artwork": {
            front_default: string
        };
    };
}

export interface IPokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: IPokemonSprites;
    types: IPokemonType[];
    abilities: IPokemonAbility[];
    stats: IPokemonStat[];
}
