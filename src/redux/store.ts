import { configureStore } from '@reduxjs/toolkit'
import pokemonSlice from './pokemonSlice'

export const store = configureStore({
  reducer: {
    pokemons: pokemonSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
