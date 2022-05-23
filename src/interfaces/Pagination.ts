export interface IPagination {
  currentPage: number
  totalPokemons: number
  firstPokemon: number
  lastPokemon: number
  setPage: (page: number) => void
}
