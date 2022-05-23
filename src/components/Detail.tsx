import React from 'react'
import { Modal, Card, CardMedia, Avatar, CardContent, Box, Container, Typography } from '@mui/material'
import IPokemons from '../interfaces/Pokemons'

function Detail (props: any) {
  const pokemon: IPokemons = props.pokemon

  return (
    <div style={{ width: '100vw' }}>
      <Modal open={props.open} onClose={props.handleClose} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100%' }}>
        <Card sx={{ width: '325px', maxHeight: '80vh', margin: '10px', overflow: 'hidden' }}>
          <CardMedia sx={{ height: '70px', width: '100%', padding: '0', display: 'flex', justifyContent: 'center' }}>
          <Avatar src={pokemon.sprites.front_default} alt="green iguana" sx={{ width: '125px', height: '125px', position: 'relative', top: '-20px' }}/>
          </CardMedia>
          <CardContent>
            <Container sx={{ margin: '0', padding: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
              <Box sx={{ marginRight: '5px', padding: '0', display: 'flex' }}>
                <Typography variant='h6' sx={{ padding: '0', marginRight: '5px', color: 'cadetblue' }}>{`#${pokemon.id}`}</Typography>
                <Typography variant='h6' sx={{ padding: '0', color: 'cadetblue' }}>{`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`}</Typography>
              </Box>
              <Box>
                <Typography variant='h6' sx={{ padding: '0', color: 'cadetblue' }}>{pokemon.types.map((type: any) => type.type.name[0].toUpperCase() + type.type.name.slice(1)).join(', ')}</Typography>
              </Box>
            </Container>
            <Container sx={{ display: 'flex', padding: '0' }}>
              <Typography variant='subtitle2' sx={{ padding: '0', marginRight: '5px', color: 'cadetblue' }}>{`Height: ${pokemon.height}`}</Typography>
              <Typography variant='subtitle2' sx={{ padding: '0', marginRight: '5px', color: 'cadetblue' }}>{`Weight: ${pokemon.weight}`}</Typography>
            </Container>
            {/* <Typography variant='button'>{pokemon.moves.map((move: any) => move.move.name[0].toUpperCase() + move.move.name.slice(1)).join(', ')}</Typography> */}
            <Container sx={{ display: 'flex', padding: '0', flexWrap: 'wrap', overflow: 'hidden' }}>
            {pokemon.moves.map((move, idx) => (
              <Container key={`${pokemon.name} move ${idx}`} sx={{ width: '50%', padding: '0', margin: '0', display: 'flex', alignItems: 'center' }}>
                <img src={`icons/${move.move.type}.png`} alt={move.move.type} style={{ width: '15px', height: '15px', fill: 'black' }}/>
                <Typography key={`Moves ${pokemon.id} ${idx}`} color='GrayText' fontSize='12px' sx={{ padding: '5px', margin: '2px' }}>
                  {`${move.move.name.toUpperCase()}`}
                </Typography>
              </Container>
            ))}
            </Container>
          </CardContent>
        </Card>
      </Modal>
    </div>
  )
}

export default Detail
