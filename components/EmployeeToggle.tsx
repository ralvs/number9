import { toggle } from '@/actions/employee'
import { Button } from '@mui/material'

const EmployeeToggle = ({ id, isEnable }: { id: number; isEnable: boolean }) => {
  return (
    <form action={toggle.bind(null, id)}>
      <Button type='submit' variant='contained' color={isEnable ? 'error' : 'success'} sx={{ mt: 2 }}>
        {isEnable ? 'Deactivate' : 'Activate'}
      </Button>
    </form>
  )
}

export default EmployeeToggle
