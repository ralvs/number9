'use client'

import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import { create } from '@/server/actions/employee'
import { EmployeeSchema, type EmployeeType } from '@/server/formSchemas'
import Loading from './Loading'

const EmployeeAdd = ({ departments }: { departments: { id: number; name: string }[] }) => {
  const [open, setOpen] = useState(false)
  const toggleModal = () => {
    if (open) reset()
    setOpen(cur => !cur)
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeType>({
    resolver: zodResolver(EmployeeSchema),
    mode: 'onChange',
    defaultValues: {
      id: undefined,
      isEnable: true,
      avatar: faker.image.avatar(), // using Faker just for demo purposes
      firstName: '',
      lastName: '',
      hireDate: dayjs().toDate(),
      departmentId: 1,
      phone: '',
      address: '',
    },
  })

  const onSubmit = handleSubmit(async (data: EmployeeType) => {
    const result = await create({ ...data })
    console.log('🚀 ~ result:', result)
    toggleModal()
    toast[result.success ? 'success' : 'error'](result.msg as string)
  })

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        sx={{ width: 200, alignSelf: 'flex-end' }}
        onClick={toggleModal}
      >
        New Employee
      </Button>

      <Dialog open={open} onClose={toggleModal} maxWidth='xs'>
        <DialogTitle>Add new Employee</DialogTitle>

        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <DialogContent>
            <Grid container rowSpacing={4} columnSpacing={2}>
              <Grid item xs={12}>
                <Controller
                  name='avatar'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Avatar URL'
                      error={!!errors.avatar}
                      helperText={errors.avatar?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='firstName'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      autoFocus
                      label='First Name'
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      label='Last Name'
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='hireDate'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      type='date'
                      value={dayjs(field.value).format('YYYY-MM-DD')}
                      onChange={e => field.onChange(dayjs(e.target.value).toDate())}
                      label='Hire Date'
                      error={!!errors.hireDate}
                      helperText={errors.hireDate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='departmentId'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id='label-id'>Status</InputLabel>
                      <Select {...field} label='Status' labelId='label-id'>
                        {departments.map(item => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Phone'
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='address'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Address'
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={toggleModal}>Cancel</Button>
            <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
              {isSubmitting ? <Loading /> : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default EmployeeAdd
