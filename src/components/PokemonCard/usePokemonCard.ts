import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail } from "../../service/PokemonService";
import { IPokemonListResult } from "../../types/IPokemonList";
import { IPokemonDetails } from "../../types/IPokemonDetails";

export const usePokemonCard = (pokemon : IPokemonListResult) => {
    
    const { data: details , isLoading, isError } = useQuery<IPokemonDetails>({
        queryKey: ['fetchPokemonCardDetails', pokemon],
        queryFn: () => fetchPokemonDetail(pokemon.url)
    });

    return {
        details,
        isLoading,
        isError
    }
}