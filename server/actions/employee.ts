'use server'

import type { Employee } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { db } from 'server/db'
import { EmployeeSchema } from '../formSchemas'

export const getAll = async () => {
  return db.employee.findMany({ include: { department: { select: { name: true } } } })
}

export const byId = async (id: number) => {
  return db.employee.findUnique({
    where: { id },
    include: { department: { select: { id: true, name: true } } },
  })
}

export const toggle = async (id: number) => {
  // simulate server delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const employee = await db.employee.findUnique({ where: { id } })
  if (!employee) return false

  await db.employee.update({
    where: { id },
    data: { isEnable: !employee.isEnable },
  })

  revalidatePath('/employee')
}

export const create = async (data: Partial<Employee>) => {
  // simulate server delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  const valid = EmployeeSchema.safeParse(data)

  if (!valid.success) {
    return { success: false, msg: valid.error.flatten().fieldErrors }
  }

  try {
    await db.employee.create({ data: valid.data })

    revalidatePath('/employee')
    return { success: true, msg: 'Employee created' }
  } catch (err) {
    console.log(`${Date()} --->>>`, err)
    return { success: false, msg: 'Error creating employee' }
  }
}

export const updateDepartment = async (id: number, departmentId: number) => {
  // simulate server delay
  await new Promise(resolve => setTimeout(resolve, 3000))

  const oldDepartment = await db.employee.findUnique({ where: { id }, select: { departmentId: true } })

  try {
    await db.employee.update({
      where: { id },
      data: { departmentId },
    })

    if (departmentId !== oldDepartment?.departmentId) {
      await db.departmentHistory.create({
        data: {
          employee: { connect: { id } },
          department: { connect: { id: oldDepartment?.departmentId } },
        },
      })
    }

    revalidatePath(`/employee/${id}`)
    return { success: true, msg: 'Employee department updated' }
  } catch (err) {
    console.log(`${Date()} --->>>`, err)
    return { success: false, msg: 'Error updating employee department' }
  }
}

export const departmentHistory = async (employeeId: number) => {
  return db.departmentHistory.findMany({
    where: { employeeId },
    select: {
      updatedAt: true,
      department: { select: { name: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })
}

export const remove = async (id: number) => {
  // simulate server delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  await db.employee.delete({ where: { id } })
  revalidatePath('/employee')
}
