'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

import {
  Button,
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'

import { updateDepartment } from '@/server/actions/employee'
import Loading from './Loading'

const DepartmentUpdate = ({
  list,
  departmentId,
  employeeId,
  enable,
}: { list: { id: number; name: string }[]; departmentId: number; employeeId: number; enable: boolean }) => {
  const [selected, setSelected] = useState(departmentId)

  const handleChange = (event: SelectChangeEvent) => setSelected(Number(event.target.value))
  const submit = async () => {
    const result = await updateDepartment(employeeId, selected)
    toast[result.success ? 'success' : 'error'](result.msg)
  }

  if (!list) return <Typography>Departments not found</Typography>

  return (
    <div>
      <Typography variant='subtitle2'>Update Department</Typography>

      <Stack spacing={2} direction='row'>
        <FormControl sx={{ width: 250 }} size='small' disabled={!enable}>
          <Select value={selected.toString()} onChange={handleChange}>
            {list.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <form action={submit}>
          <SubmitButton disabled={selected === departmentId || !enable} />
        </form>
      </Stack>
    </div>
  )
}

// Next.js tactics to show submiting state
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      variant='contained'
      color='primary'
      sx={{ width: 100 }}
      disabled={disabled || pending}
    >
      {pending ? <Loading /> : 'Update'}
    </Button>
  )
}

export default DepartmentUpdate
