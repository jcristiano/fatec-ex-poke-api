import React, { useEffect, useState } from "react";
import { usePokemonList } from "../../hooks/usePokemonList";
import { IPokemonListResult } from "../../types/IPokemonList";
import { Grid, Pagination } from "@mui/material";
import { PokemonCard } from "../../components";
import { usePagination } from "../../context/PaginationContext";

const PokemonList: React.FC = () => {

    const { currentPage, setCurrentPage } = usePagination();
    const itemsPerPage = 20;

    const { pokemonList, isLoading, isError, totalCount } = usePokemonList({ page: currentPage, itensPerPage: itemsPerPage });
    const [results, setResults] = useState<IPokemonListResult[]>([]);

    useEffect(() => {
        if (!!pokemonList?.results) {
            setResults(pokemonList.results);
        }
    }, [pokemonList?.results]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        setCurrentPage(value);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading data</p>;

    return (
        <div>
            <h1>Pokemon List</h1>
            <Pagination
                count={Math.ceil(totalCount / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}
            />
            <Grid container spacing={2}>
                {results.map((pokemon: IPokemonListResult, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default PokemonList;