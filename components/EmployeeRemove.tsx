import { remove } from '@/server/actions/employee'
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton, Tooltip } from '@mui/material'

const EmployeeRemove = ({ id }: { id: number }) => {
  return (
    <Tooltip title='Delete'>
      <form action={remove.bind(null, id)}>
        <IconButton type='submit'>
          <ClearIcon color='error' />
        </IconButton>
      </form>
    </Tooltip>
  )
}

export default EmployeeRemove
