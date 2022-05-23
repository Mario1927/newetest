import { createSlice } from '@reduxjs/toolkit'
import IPokemons from '../interfaces/Pokemons'

export interface IPokemonsSlice {
  pokemons: IPokemons[],
  displayedPokemons: IPokemons[],
  types: string[],
}

const initialState: IPokemonsSlice = {
  pokemons: [],
  displayedPokemons: [],
  types: ['All']
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons (state, action) {
      state.pokemons = state.pokemons.concat(action.payload)
      state.displayedPokemons = state.pokemons
    },
    setTypes (state, action) {
      state.types = state.types.concat(action.payload)
    },
    filterPokemons (state, action) {
      action.payload !== 'All'
        ? state.displayedPokemons = state.pokemons.filter((pokemon) => pokemon.types.some((type) => type.type.name.toLowerCase() === action.payload.toLowerCase()))
        : state.displayedPokemons = state.pokemons
    }
  }
})

export const { setPokemons, setTypes, filterPokemons } = pokemonSlice.actions

export default pokemonSlice.reducer
