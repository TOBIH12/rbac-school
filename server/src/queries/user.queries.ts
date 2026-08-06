
export const getUserPermissionsQuery = `SELECT p.name 
    FROM permissions p
    JOIN role_permissions rp ON p.id = rp.permission_id
    WHERE rp.role_id = $1 AND p.name = $2;`;

export const fetchUserByIdQuery = `SELECT * FROM "users" WHERE "id" = $1`;

export const fetchUserByEmailQuery = `SELECT u.id as user_id, u.first_name, u.last_name, u.email, u.password, ur.role_id FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id WHERE "email" = $1`;

export const fetchUserRoleByIdQuery = `SELECT role_id FROM user_roles WHERE "user_id" = $1`;

export const insertUserQuery = `INSERT INTO "users" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`

export const inputUserRoleValuesQuery = `INSERT INTO "user_roles" (user_id, role_id) VALUES ($1, $2) RETURNING *`

export const getUsersCountQuery = `SELECT COUNT(*) AS total_users FROM users`;

export const getAllUsersQuery = `SELECT u.id as user_id, u.first_name, u.last_name, u.email, ur.role_id FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id ORDER BY u.id LIMIT $1 OFFSET $2`;

export const getLecturerStudentsCount = `SELECT COUNT(e.student_id) AS total_students FROM enrollments e WHERE course_id IN (SELECT course_id FROM courses WHERE lecturer_id = $1)`

export const getLecturerStudentsQuery = `
SELECT c.id as course_id, c.course_code, c.title, e.student_id, u.first_name, u.last_name 
FROM courses c LEFT JOIN enrollments e ON c.id = e.course_id 
LEFT JOIN users u ON e.student_id = u.id 
WHERE c.course_code IN (SELECT course_code FROM courses WHERE lecturer_id = $1)
AND e.student_id IS NOT NULL
ORDER BY c.course_code 
LIMIT $2 OFFSET $3`;

export const deleteUserQuery = `DELETE FROM users WHERE id = $1 RETURNING *`;

export const deleteUserRoleQuery = `DELETE FROM user_roles WHERE user_id = $1 RETURNING *`;