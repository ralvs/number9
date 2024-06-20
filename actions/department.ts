'use server'

import { db } from 'server/db'

export const getAll = async () => {
  return db.department.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } })
}
