export interface pokemonParentList{ // gets the api and gets the number of pokemon it has and its different results in an array
    count: number;
    results: parentListResults[];
}

export interface parentListResults{ // stores the pokemons name and url of its different info's
    name: string;
    url: string;
    id?: number;
    front_default?: string;
}

export interface partyParentList{
    value: parentPartyList[];
}

export interface parentPartyList{
    TrainerId: number;
    MyPokeId: number;
}

export interface myPokeParentList{
    value: parentMyPokeList[];
}

export interface parentMyPokeList{
    Id: number;
    PokedexEntry: number;
    Nickname:string;
    Hp: number;
    PokeLvl: number;
    Sprite: string;
}

export interface pokeTrainerParentList {
    value: parentPokeTrainerList[];
}

export interface parentPokeTrainerList {
    Id: number;
    TrainerName: string;
}

export class pokeApi {
    id: number;
    base_experience: number;
    name: string;
    types: Array<Types>;
    weight: number;
    sprites: {
        front_default: string;
    }
    height: number;
    abilities: Array<Ability>;
    stats: Array<Stat>;
    moves: Array<Moves>;
    constructor() {
        this.id = 0;
        this.base_experience = 0;
        this.name = '';
        this.types = [];
        this.weight = 0;
        this.sprites = {
            front_default: ''
        };
        this.height = 0;
        this.abilities = [];
        this.stats = [];
        this.moves = [];
    }
}

export interface Moves {
    move: {
        name: string;
    }
}

export interface Types {
    type:   {
        name: string;
    }
}

export interface Ability {
    ability: {
        name: string;
    }
}

export interface Stat {
    base_stat: number;
    stat: {
        name: string;
    }
}