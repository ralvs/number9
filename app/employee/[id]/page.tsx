import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import ChevronLeft from '@mui/icons-material/ChevronLeft'
import { Box, Button, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'

import DepartmentHistory from '@/components/DepartmentHistory'
import DepartmentUpdate from '@/components/DepartmentUpdate'
import EmployeeToggle from '@/components/EmployeeToggle'
import { calculateDuration } from '@/lib/helpers'
import { getAll } from '@/server/actions/department'
import { byId, toggle } from '@/server/actions/employee'

const sx = {
  column1: { flexBasis: '10%' },
  column2: { flexBasis: '33.33%' },
  changeDirection: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    flexDirection: { xs: 'row', sm: 'column' },
  },
}

const EmployeeDetails = async ({ params: { id = '' } }: { params: { id: string } }) => {
  const data = await byId(Number(id))
  const departments = await getAll()

  if (!data)
    return (
      <>
        <Typography>Employee not found</Typography>
        <Link href='/employee/all'>Please, go back to the list</Link>
      </>
    )

  return (
    <>
      <Grid container rowSpacing={6} columnSpacing={2}>
        <Grid item xs={12}>
          <Link href='/employee/all'>
            <Button variant='text' startIcon={<ChevronLeft />}>
              Back
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12} md={4} position='relative'>
          <Image
            priority
            src={data.avatar || '/dummy-image.png'}
            alt={data.firstName}
            style={{ borderRadius: 20 }}
            width={270}
            height={270}
          />

          {!data.isEnable && (
            <Box
              sx={{
                width: 270,
                bgcolor: 'red',
                color: 'white',
                py: 1,
                position: 'absolute',
                bottom: 4,
                textAlign: 'center',
                borderRadius: '0 0 20px 20px',
              }}
            >
              <Typography variant='body2'>Inactive</Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <Typography variant='h6'>{`${data.firstName} ${data.lastName} `}</Typography>

            <Grid item xs={12}>
              <List>
                <ListItem disableGutters disablePadding>
                  <ListItemText sx={sx.column1} primary='Employee ID:' />
                  <ListItemText sx={sx.column2} primary={data.id} />
                </ListItem>
                <ListItem disableGutters disablePadding>
                  <ListItemText sx={sx.column1} primary='Department:' />
                  <ListItemText sx={sx.column2} primary={data.department.name} />
                </ListItem>
                <ListItem disableGutters disablePadding>
                  <ListItemText sx={sx.column1} primary='Phone:' />
                  <ListItemText sx={sx.column2} primary={data.phone} />
                </ListItem>
                <ListItem disableGutters disablePadding>
                  <ListItemText sx={sx.column1} primary='Address:' />
                  <ListItemText sx={sx.column2} primary={data.address} />
                </ListItem>
              </List>
            </Grid>

            <DepartmentUpdate
              list={departments}
              departmentId={data.department.id}
              employeeId={data.id}
              enable={data.isEnable}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={2} sx={sx.changeDirection}>
          <Typography variant='subtitle1'>Hire Date:</Typography>
          <Typography>{dayjs(data.hireDate).format('MMMM D, YYYY')}</Typography>
          <Typography>{calculateDuration(data.hireDate)}</Typography>

          <form action={toggle.bind(null, data.id)}>
            <EmployeeToggle isEnable={data.isEnable} />
          </form>
        </Grid>
      </Grid>

      <DepartmentHistory employeeId={data.id} />
    </>
  )
}

export default EmployeeDetails
