'use client'

import ClearIcon from '@mui/icons-material/Clear'
import { IconButton, Tooltip } from '@mui/material'
import { useFormStatus } from 'react-dom'
import Loading from './Loading'

const EmployeeRemove = () => {
  const { pending } = useFormStatus()

  return (
    <Tooltip title='Delete'>
      <IconButton type='submit' disabled={pending}>
        {pending ? <Loading /> : <ClearIcon color='error' />}
      </IconButton>
    </Tooltip>
  )
}

export default EmployeeRemove
