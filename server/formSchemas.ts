import { z } from 'zod'

export const EmployeeSchema = z.object({
  id: z.number().optional(),
  isEnable: z.boolean().default(true),
  avatar: z.string().nullable(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  hireDate: z.date(),
  departmentId: z.number(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
})

export type EmployeeType = z.infer<typeof EmployeeSchema>
