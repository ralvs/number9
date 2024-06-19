'use server'

import { revalidatePath } from 'next/cache'
import { db } from 'server/db'

export const getAll = async () => {
  return db.employee.findMany({ include: { department: { select: { name: true } } } })
}

export const deleteEmployee = async (id: number) => {
  await db.employee.delete({ where: { id } })
  revalidatePath('/')
}
