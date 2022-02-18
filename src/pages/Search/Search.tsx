import Pagination from 'components/Pagination/Pagination';
import PokemonList from 'components/PokemonList/PokemonList';
import { PAGINATION_STEP } from 'constants/constants';
import useRequest from 'hooks/useRequest';
import React from 'react';
import { IpokemonSearchResponse } from 'types/pokemonTypes';

import * as Styling from "./search-styling"

function Search() {
    const [offset, setOffset] = React.useState<number>(0)
    const { data, isValidating, error } = useRequest<IpokemonSearchResponse>({
        url: "/pokemon",
        params: {
            offset
        }
    })

    const offsetHandler = (page: number) => {
        setOffset(page * PAGINATION_STEP)
    }

    return (
        <Styling.Page>
            <Styling.Title>Pokemons:</Styling.Title>
            <PokemonList
                pokemons={data?.results}
                isError={!!error}
                isLoading={isValidating}
            />
            <Pagination totalCount={data?.count} onPageChange={offsetHandler} />
        </Styling.Page>

    );
}

export default Search;
