import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styled from "styled-components";
import { IPokemonListResult } from "../../types/IPokemonList";
import { getTypeColor } from "../../types/TPokemonColors";
import { usePokemonCard } from "./usePokemonCard";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/pokemon-not-found.png";

interface PokemonCardProps {
    pokemon: IPokemonListResult;
}

const StyledCard = styled(Card) <{ bgColor: string }>`
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.05);
    }
`;
const TypeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const TypeBox = styled.div<{ bgColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 5px;
    padding: 5px;
    flex: 1;
    margin: 0 5px;
    text-align: center;
`;

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon: pokemonInfo }) => {

    const { details: pokemon, isLoading, isError } = usePokemonCard(pokemonInfo);

    console.log("pokemonInfo:", pokemonInfo);

    if (isLoading) {
        return <StyledCard bgColor="#f0f0f0" sx={{ maxWidth: 300, margin: 2 }}>
            <CardContent>
                <Typography>Loading...</Typography>
            </CardContent>
        </StyledCard>;
    }

    if (isError || !pokemon) {
        return <StyledCard bgColor="#f0f0f0" sx={{ maxWidth: 300, margin: 2 }}>
            <CardContent>
                <Typography>Error loading Pokémon details</Typography>
            </CardContent>
        </StyledCard>;
    }

    const spriteImage =        
        pokemon.sprites.front_default ||
        defaultImage;


    return (
        <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none' }}>
            <StyledCard bgColor={getTypeColor(pokemon.types[0].type.name)} sx={{ maxWidth: 300, margin: 2 }}>
                <CardMedia
                    component="img"
                    alt={pokemon.name}
                    image={spriteImage}
                    title={pokemon.name}
                    sx={{ width: '100%', height: '200px', objectFit: 'contain' }}
                />
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </Typography>
                    <TypeContainer>
                        {pokemon.types.map((typeInfo) => (
                            <TypeBox key={typeInfo.type.name} bgColor={getTypeColor(typeInfo.type.name)}>
                                <Typography variant="body2" color="#fff" fontWeight="bold">
                                    {typeInfo.type.name}
                                </Typography>
                            </TypeBox>
                        ))}
                    </TypeContainer>
                </CardContent>
            </StyledCard>
        </Link>
    )
}

export default PokemonCard;