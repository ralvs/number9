'use client'

import { GeistSans } from 'geist/font/sans'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: GeistSans.style.fontFamily,
  },

  palette: {
    primary: {
      main: '#D14124',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0086bf',
      contrastText: '#fff',
    },
  },

  shape: { borderRadius: 20 },
})

export default theme
