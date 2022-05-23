import { Container } from '@mui/system'
import React from 'react'
import { IPagination } from '../interfaces/Pagination'
import { Button, Typography } from '@mui/material'

function Pagination (props: IPagination) {
  const { currentPage, totalPokemons, setPage, firstPokemon } = props
  const lastPokemon = props.lastPokemon > totalPokemons ? totalPokemons : props.lastPokemon

  const disabledPrev = currentPage === 1
  const disabledNext = currentPage === Math.ceil(totalPokemons / 10)

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
      <Button size='small' color='primary' variant='contained' onClick={() => setPage(currentPage - 1)} disabled={disabledPrev} sx={{ margin: '15px' }}>Previous</Button>
      <Typography color='whitesmoke'>{`${firstPokemon + 1} - ${lastPokemon} / ${totalPokemons}`}</Typography>
      <Button size='small' color='primary' variant='contained' onClick={() => setPage(currentPage + 1)} disabled={disabledNext} sx={{ margin: '15px' }}>Next</Button>
    </Container>
  )
}

export default Pagination
