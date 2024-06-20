import dayjs from 'dayjs'

import { departmentHistory } from '@/server/actions/employee'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

const sx = {
  column1: { flexBasis: '10%' },
  column2: { flexBasis: '33.33%' },
}

const DepartmentHistory = async ({ employeeId }: { employeeId: number }) => {
  const history = await departmentHistory(employeeId)

  return (
    <>
      <Typography sx={{ pt: 8, pb: 4 }} variant='h6' color='primary'>
        Department History
      </Typography>
      <List>
        <ListItem disableGutters disablePadding key={-1}>
          <ListItemText sx={sx.column1} primary='Date' primaryTypographyProps={{ variant: 'subtitle2' }} />
          <ListItemText
            sx={sx.column2}
            primary='Department'
            primaryTypographyProps={{ variant: 'subtitle2' }}
          />
        </ListItem>

        {history.map(entry => (
          // I would utilize 'createdAt' in production
          <ListItem disableGutters key={entry.updatedAt.getTime()}>
            <ListItemText sx={sx.column1} primary={dayjs(entry.updatedAt).format('MMMM D, YYYY')} />
            <ListItemText sx={sx.column2} primary={`${entry.department.name}`} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default DepartmentHistory
