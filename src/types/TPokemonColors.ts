export const typeColors: { [key: string]: string } = {
    fire: '#F08030',        // Fogo
    water: '#6890F0',       // Água
    grass: '#78C850',       // Grama
    electric: '#F8D030',    // Elétrico
    ice: '#98D8D8',         // Gelo
    ghost: '#705898',       // Fantasma
    bug: '#A8B820',         // Inseto
    normal: '#A8A878',      // Normal
    poison: '#A040A0',      // Venenoso
    flying: '#A8BFE0',      // Voador
    fighting: '#C22E28',    // Lutador
    dark: '#705746',        // Noturno
    steel: '#B7B7CE',       // Aço
    dragon: '#6F35FC',      // Dragão
    psychic: '#F95587',     // Psíquico
    rock: '#B6A136',        // Pedra
    fairy: '#EE99AC',       // Fada
    ground: '#E0C068'       // Terrestre
};


export const getTypeColor = (type: string): string => {
    return typeColors[type] || '#F0F0F0';
};