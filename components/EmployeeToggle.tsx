import { toggle } from '@/server/actions/employee'
import { Button } from '@mui/material'

const EmployeeToggle = ({ id, isEnable }: { id: number; isEnable: boolean }) => {
  return (
    <div>
      <form action={toggle.bind(null, id)}>
        <Button type='submit' variant='contained' color={isEnable ? 'error' : 'success'}>
          {isEnable ? 'Deactivate' : 'Activate'}
        </Button>
      </form>
    </div>
  )
}

export default EmployeeToggle
