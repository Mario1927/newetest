interface IAbilities {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

interface IForms {
    name: string;
    url: string;
}

interface IMoves {
    move: {
        name: string;
        type: string;
    }
}

interface ISpecies {
    name: string;
    url: string;
}

interface ISprites {
    back_default: string;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string | null
    front_shiny_female: string | null;
}

interface IStats {
    base_stat: number;
    effort: number;
    stat: {
        name: string
        url: string
    }
}

interface ITypes {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

interface IPokemons {
    name: string;
    url: string;
    abilities: IAbilities[];
    base_experience: number;
    forms: IForms[];
    height: number;
    id: number;
    is_default: boolean;
    moves: IMoves[];
    order: number;
    species: ISpecies;
    sprites: ISprites;
    stats: IStats[];
    types: ITypes[];
}

export default IPokemons
