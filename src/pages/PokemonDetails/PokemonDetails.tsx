import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IPokemonDetails } from '../../types/IPokemonDetails';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { getPokemonDetails } from '../../service/PokemonService';

const StyledCard = styled(Card)`
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
`;

const PokemonDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: pokemon, isLoading, isError } = useQuery<IPokemonDetails>({
        queryKey: ['pokemon', id],
        queryFn: () => getPokemonDetails(id)
    });


    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (isError || !pokemon) {
        return <Typography>Error loading Pokémon details</Typography>;
    }

    const spriteImage =
        pokemon.sprites.other?.dream_world.front_default ||
        pokemon.sprites.other?.['official-artwork'].front_default ||
        pokemon.sprites.front_default;

    return (
        <>
            <Link to="/">
                <Button variant="contained" color="primary" style={{ margin: '10px' }}>
                    Voltar para Home
                </Button>
            </Link>
            <StyledCard>
                <CardMedia
                    component="img"
                    alt={pokemon.name}
                    image={spriteImage}
                    title={pokemon.name}
                    sx={{ width: '100%', height: '250px', objectFit: 'contain' }}
                />
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Height: {pokemon.height} decimetres
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Weight: {pokemon.weight} hectograms
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Types: {pokemon.types.map(type => type.type.name).join(', ')}
                    </Typography>
                </CardContent>
            </StyledCard>
        </>
    );
}

export default PokemonDetails;
