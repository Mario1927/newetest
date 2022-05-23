import { createSlice } from '@reduxjs/toolkit'
import IPokemons from '../interfaces/Pokemons'

export interface IPokemonsSlice {
  pokemons: IPokemons[],
  types: string[],
}

const initialState: IPokemonsSlice = {
  pokemons: [],
  types: ['All']
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons (state, action) {
      state.pokemons = state.pokemons.concat(action.payload)
    },
    setTypes (state, action) {
      state.types = state.types.concat(action.payload)
    }
  }
})

export const { setPokemons, setTypes } = pokemonSlice.actions

export default pokemonSlice.reducer
