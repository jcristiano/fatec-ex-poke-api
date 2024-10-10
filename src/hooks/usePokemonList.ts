import { useQuery } from "@tanstack/react-query"
import { fetchPokemonList } from "../service/PokemonService";
import { IPokemonList } from "../types/IPokemonList";

interface UsePokemonListProps {
    page?: number;
    itensPerPage?: number;
}

export const usePokemonList = ({ page = 1, itensPerPage = 20 }: UsePokemonListProps) => {

    const { data: pokemonList , isLoading, isError } = useQuery<IPokemonList>({
        queryKey: ['fetchPokemonList', page, itensPerPage],
        queryFn: () => fetchPokemonList(page, itensPerPage)
    });

    return {
        pokemonList,
        isLoading,
        isError,
        totalCount: pokemonList?.count ?? 0
    }
}