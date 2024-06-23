'use client'

import { Button } from '@mui/material'
import { useFormStatus } from 'react-dom'
import Loading from './Loading'

const EmployeeToggle = ({ isEnable }: { isEnable: boolean }) => {
  const { pending } = useFormStatus()
  const content = pending ? <Loading white /> : isEnable ? 'Deactivate' : 'Activate'

  return (
    <Button type='submit' variant='contained' color={isEnable ? 'error' : 'success'}>
      {content}
    </Button>
  )
}

export default EmployeeToggle
