-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DepartmentHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "DepartmentHistory_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DepartmentHistory_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DepartmentHistory" ("createdAt", "departmentId", "employeeId", "id", "updatedAt") SELECT "createdAt", "departmentId", "employeeId", "id", "updatedAt" FROM "DepartmentHistory";
DROP TABLE "DepartmentHistory";
ALTER TABLE "new_DepartmentHistory" RENAME TO "DepartmentHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
