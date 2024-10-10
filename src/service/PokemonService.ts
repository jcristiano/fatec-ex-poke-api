import { AxiosError, AxiosResponse } from "axios";
import http from "../http";
import { IPokemonList } from "../types/IPokemonList";
import { IPokemonDetails } from "../types/IPokemonDetails";

const BASEURL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (page: number, itensPerPage: number): Promise<IPokemonList> => {
    const offset: number = (page - 1) * itensPerPage;

    const response: AxiosResponse<IPokemonList> = await http.get<IPokemonList>(`${BASEURL}/pokemon`,
        {
            params: {
                offset: offset,
                limit: itensPerPage
            }
        }
    );
    return response.data;

}

export const fetchPokemonDetail = async (url: string): Promise<IPokemonDetails> => {
    const response: AxiosResponse<IPokemonDetails> = await http.get<IPokemonDetails>(url);
    return response.data;
}

export const getPokemonDetails = async (id: string | undefined): Promise<IPokemonDetails> => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response: AxiosResponse<IPokemonDetails> = await http.get<IPokemonDetails>(url);
    return response.data;
}