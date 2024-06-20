'use client'

import { useState } from 'react'

import {
  Button,
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'

const DepartmentUpdate = ({
  list,
  id,
  enable,
}: { list: { id: number; name: string }[]; id: number; enable: boolean }) => {
  const [selected, setSelected] = useState(id)

  const handleChange = (event: SelectChangeEvent) => setSelected(Number(event.target.value))

  if (!list) return <Typography>Departments not found</Typography>

  return (
    <div>
      <Typography variant='subtitle2'>Update Department</Typography>

      <Stack spacing={1} direction='row'>
        <FormControl fullWidth size='small' disabled={!enable}>
          {/* <InputLabel id='label-id'>Department</InputLabel> */}
          <Select value={selected.toString()} onChange={handleChange}>
            {list.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          {/* {!!errors.guests && <FormHelperText>{errors.guests?.message}</FormHelperText>} */}
        </FormControl>

        <Button variant='contained' color='primary' disabled={selected === id || !enable}>
          Update
        </Button>
      </Stack>
    </div>
  )
}

export default DepartmentUpdate
