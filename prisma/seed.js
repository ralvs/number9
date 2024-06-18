import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Seed departments
  const departments = [
    'HR',
    'Finance',
    'Engineering',
    'Sales',
    'Marketing',
    'IT',
    'Customer Service',
    'Administration',
  ]

  const departmentRecords = await Promise.all(
    departments.map(name => prisma.department.create({ data: { name } })),
  )

  // Seed employees
  const employees = []
  for (let i = 0; i < 5; i++) {
    const employee = await prisma.employee.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        hireDate: faker.date.past({ years: Math.floor(Math.random() * 10) + 1 }),
        // @ts-ignore - this code is not important
        departmentId: departmentRecords[Math.floor(Math.random() * departmentRecords.length)].id,
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        avatar: faker.image.avatar(),
      },
    })
    employees.push(employee)
  }

  // Seed department histories
  const departmentHistories = []

  for (const employee of employees) {
    const numHistories = Math.floor(Math.random() * 7) + 2 // 2 to 8 histories
    for (let i = 0; i < numHistories; i++) {
      const startDate = faker.date.past({ years: Math.floor(Math.random() * 10) + 1 })
      const endDate = faker.date.between({ from: startDate, to: new Date() })

      const departmentHistory = await prisma.departmentHistory.create({
        data: {
          employeeId: employee.id,
          // @ts-ignore - this code is not important
          departmentId: departmentRecords[Math.floor(Math.random() * departmentRecords.length)].id,
          updatedAt: endDate,
        },
      })
      departmentHistories.push(departmentHistory)
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
