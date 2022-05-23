import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTypes } from '../redux/pokemonSlice'
import { RootState } from '../redux/store'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { IFilter } from '../interfaces/Filter'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function Filter (props: IFilter) {
  const dispatch = useDispatch()
  const { typeName, setTypeName } = props

  async function getTypes () {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type')
      const types: any = response.data.results.map((type: any) => type.name[0].toUpperCase() + type.name.slice(1))
      dispatch(setTypes(types))
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event: SelectChangeEvent<typeof typeName>) => {
    const {
      target: { value }
    } = event
    setTypeName(
      value
    )
  }

  useEffect(() => { getTypes() }, [dispatch])
  const names = useSelector((state: RootState) => state.pokemons.types)

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel sx={{ color: 'whitesmoke' }}>Types</InputLabel>
        <Select
          labelId='types-label'
          id='types'
          value={typeName}
          onChange={handleChange}
          input={<OutlinedInput label='Types' />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
          variant='filled'
          sx={{ color: 'whitesmoke', borderColor: 'whitesmoke' }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} >
              <Checkbox checked={typeName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Filter
