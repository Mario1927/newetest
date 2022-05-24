import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPokemons } from '../redux/pokemonSlice'
import { RootState } from '../redux/store'
import axios from 'axios'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import Pagination from './Pagination'
import { headerColors } from '../assets/colors/colors'
import Filter from './Filter'
import Detail from './Detail'
import IPokemons from '../interfaces/Pokemons'

function Home () {
  const dispatch = useDispatch()
  const [offset, setOffset] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [typeName, setTypeName] = useState('All')
  const [open, setOpen] = React.useState(false)
  const handleClose = () => setOpen(false)
  const [pokemon, setPokemon] = useState({})

  async function getPokemons () {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      const pokemonDetail: any = await Promise.all(
        response.data.results.map(async (pokemon: any) => {
          const data: any = await axios.get(pokemon.url)
          const moves: any = await Promise.all(
            data.data.moves.map(async (move: any) => {
              const moveData: any = await axios.get(move.move.url)
              return {
                move: {
                  name: moveData.data.name,
                  type: moveData.data.type.name
                }
              }
            }))
          data.data.moves = moves
          return { ...pokemon, ...data.data }
        })
      )
      dispatch(setPokemons(pokemonDetail))
      setOffset(offset + 10)
      setCurrentPage(offset / 10)
      setTypeName('All')
    } catch (error) {
      console.error(error)
    }
  }

  function handleOpen (pokemon: IPokemons) {
    setPokemon(pokemon)
    setOpen(true)
  }

  const indexLastPokemon = currentPage * 10
  const indexFirstPokemon = indexLastPokemon - 10
  let pokemons = useSelector((state: RootState) => state.pokemons.displayedPokemons)
  const totalPokemons = pokemons.length
  pokemons = pokemons.slice(indexFirstPokemon, indexLastPokemon)

  return (
    <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
      <Filter setTypeName={setTypeName} typeName={typeName} setPage={setCurrentPage}/>
      <Button size='small' color='primary' variant='contained' onClick={getPokemons} sx={{ marginY: '15px' }}>
        GET POKEMONS
      </Button>
      <Grid container sx={{ width: '100vw', justifyContent: 'center' }}>
        {pokemons.length
          ? pokemons.map((pokemon) => (
          <Card sx={{ width: 345, height: '265px', margin: '10px' }} key={`Card ${pokemon.id}`}>
            <CardActionArea sx={{ height: '230px' }} onClick={() => handleOpen(pokemon)}>
              <CardMedia sx={{ backgroundColor: headerColors[`${pokemon.types[0].type.name}`], height: '70px', width: '100%', padding: '0', display: 'flex', justifyContent: 'center' }}>
                <img src={`icons/${pokemon.types[0].type.name}.png`} alt={`${pokemon.types[0].type.name}`} style={{ height: '20px', width: '20px', position: 'relative', top: '25px', right: '75px' }} />
                <Avatar src={pokemon.sprites.front_default} alt="green iguana" sx={{ width: '125px', height: '125px', position: 'relative', top: '-20px', right: '7.5px' }}/>
              </CardMedia>
              <CardContent sx={{ height: '160px' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`}
                </Typography>
                <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0', height: '95px', overflow: 'hidden', width: '100%' }}>
                  {pokemon.moves.slice(0, 5).map((move, idx) => (
                    <Box key={`${pokemon.name} move ${idx}`}>
                      <img src={`icons/${move.move.type}.png`} alt={move.move.type} style={{ width: '15px', height: '15px', fill: 'black' }}/>
                      <Typography key={`Moves ${pokemon.id} ${idx}`} color='GrayText' fontSize='12px' sx={{ padding: '5px', margin: '2px' }}>
                        {`${move.move.name.toUpperCase()}`}
                      </Typography>
                    </Box>
                  ))}
                </Container>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ paddingY: '0' }}>
              <Button size='small' color='primary' onClick={() => handleOpen(pokemon)}>
                MORE INFO
              </Button>
            </CardActions>
          </Card>
          ))
          : null}
      </Grid>
      {Object.keys(pokemon).length ? <Detail open={open} handleClose={handleClose} pokemon={pokemon}/> : null}
      {pokemons.length
        ? <Pagination currentPage={currentPage} setPage={setCurrentPage} totalPokemons={totalPokemons} firstPokemon={indexFirstPokemon} lastPokemon={indexLastPokemon}/>
        : null}
    </Container>
  )
}

export default Home
