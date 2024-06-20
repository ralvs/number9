import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import ClearIcon from '@mui/icons-material/Clear'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Badge, Box, Button, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material'

import { calculateDuration } from '@/lib/helpers'
import { getAll } from '@/server/actions/employee'

const Employees = async () => {
  const data = await getAll()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button variant='contained' color='primary' sx={{ width: 200, alignSelf: 'flex-end' }}>
        New Employee
      </Button>

      {data.map(employee => (
        <Paper key={employee.id} elevation={4} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Badge
                invisible={employee.isEnable}
                color='error'
                badgeContent=''
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Tooltip title={employee.isEnable ? '' : 'Inactive'} placement='bottom-end'>
                  <Image
                    priority
                    src={employee.avatar || '/dummy-image.png'}
                    alt={employee.firstName}
                    style={{ borderRadius: 20, height: '100%' }}
                    width={100}
                    height={100}
                  />
                </Tooltip>
              </Badge>
            </Grid>

            <Grid item xs={8} container direction='column' justifyContent='space-between'>
              <Typography variant='h6'>
                {`${employee.firstName} ${employee.lastName} `}
                <Typography variant='body1' component='span'>
                  ({employee.department.name})
                </Typography>
              </Typography>

              <div>
                <Typography variant='body1'>Hire Date</Typography>
                <Typography variant='body2'>
                  {dayjs(employee.hireDate).format('MMMM D, YYYY') + calculateDuration(employee.hireDate)}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={1} container justifyContent='center' alignItems='center'>
              <Link href={`/employee/${employee.id}`}>
                <Tooltip title='View Details'>
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Grid>

            <Grid item xs={1} container justifyContent='center' alignItems='center'>
              <Tooltip title='Delete'>
                <IconButton>
                  <ClearIcon color='error' />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  )
}

export default Employees
