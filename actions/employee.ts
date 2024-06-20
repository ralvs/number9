'use server'

import { revalidatePath } from 'next/cache'
import { db } from 'server/db'

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
  const employee = await byId(id)
  if (!employee) return false

  await db.employee.update({
    where: { id },
    data: { isEnable: !employee.isEnable },
  })

  revalidatePath(`/employee/${id}`)
}

export const departmentHistory = async (employeeId: number) => {
  return db.departmentHistory.findMany({
    where: { employeeId },
    select: {
      createdAt: true,
      department: { select: { name: true } },
    },
  })
}

export const remove = async (id: number) => {
  await db.employee.delete({ where: { id } })
  revalidatePath('/')
}
