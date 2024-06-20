import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import ChevronLeft from '@mui/icons-material/ChevronLeft'
import { Box, Button, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'

import { getAll } from '@/actions/department'
import { byId } from '@/actions/employee'
import DepartmentHistory from '@/components/DepartmentHistory'
import DepartmentUpdate from '@/components/DepartmentUpdate'
import EmployeeToggle from '@/components/EmployeeToggle'
import { calculateDuration } from '@/lib/helpers'

const sx = {
  column1: { flexBasis: '10%' },
  column2: { flexBasis: '33.33%' },
}

const EmployeeDetails = async ({ params: { id = '' } }: { params: { id: string } }) => {
  const data = await byId(Number(id))
  const departments = await getAll()

  if (!data) return <Typography>Employee not found</Typography>

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

        <Grid item xs={12} sm={4} position='relative'>
          <Image
            priority
            src={data.avatar || '/dummy-image.png'}
            alt={data.firstName}
            // style={{ borderRadius: 20, width: '100%', height: 'auto', maxWidth: 250 }}
            style={{ borderRadius: 20 }}
            width={250}
            height={250}
          />

          {!data.isEnable && (
            <Box
              sx={{
                width: 250,
                bgcolor: 'red', // Red strip background color
                color: 'white', // Text color
                py: 1, // Padding
                position: 'absolute',
                bottom: 0, // Position it at the bottom
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

            <DepartmentUpdate list={departments} id={data.department.id} enable={data.isEnable} />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Typography>Hire Date</Typography>
          <Typography>{dayjs(data.hireDate).format('MMMM D, YYYY')}</Typography>
          <Typography>{calculateDuration(data.hireDate)}</Typography>

          <EmployeeToggle id={data.id} isEnable={data.isEnable} />
        </Grid>
      </Grid>

      <DepartmentHistory employeeId={data.id} />
    </>
  )
}

export default EmployeeDetails
