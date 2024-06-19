import { Avatar, Tooltip } from '@mui/material'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

const sx = {
  navContainer: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

const TopNav = async () => {
  return (
    <nav>
      <Container maxWidth='md' sx={sx.navContainer}>
        <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant='h5'>Number9</Typography>
        </Link>

        <Tooltip title='Renan Alves' placement='bottom'>
          <Avatar alt='Renan Alves' src='/avatar.jpg' />
        </Tooltip>
      </Container>
      <Divider sx={{ pt: 1 }} />
    </nav>
  )
}

export default TopNav
