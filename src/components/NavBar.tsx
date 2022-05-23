import React from 'react'
import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material'
import Logo from '../assets/logo.png'

function NavBar () {
  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', height: '60px', backgroundColor: '#0a192f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img src={Logo} alt="logo" style={{ width: '50px', height: '50px' }} />
        </Container>

        <Container>
            <Typography>
                NEWE TEST
            </Typography>
        </Container>

        {/* <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Input sx={{ backgroundColor: 'white', borderRadius: '0.25rem', width: '250px' }}/>
            <Button sx={{ marginLeft: '5px' }}>SEARCH</Button>
        </Container> */}
    </Box>
  )
}

export default NavBar
