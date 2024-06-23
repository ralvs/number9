import { Typography } from '@mui/material'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <Typography>
        This page is not part of the exercise, and I want to use the real paths for the Employees pages.
        Please follow the link bellow.
      </Typography>
      <Link href='/employee/all'>All Employees</Link>
    </>
  )
}

export default Home
