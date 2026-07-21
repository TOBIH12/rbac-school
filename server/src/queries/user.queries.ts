
export const getUserPermissionsQuery = `SELECT p.name 
    FROM permissions p
    JOIN role_permissions rp ON p.id = rp.permission_id
    WHERE rp.role_id = $1 AND p.name = $2;`;

export const fetchUserByIdQuery = `SELECT * FROM "users" WHERE "id" = $1`;

export const fetchUserByEmailQuery = `SELECT u.id as user_id, u.first_name, u.last_name, u.email, u.password, ur.role_id FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id WHERE "email" = $1`;

export const insertUserQuery = `INSERT INTO "users" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`

export const inputUserRoleValuesQuery = `INSERT INTO "user_roles" (user_id, role_id) VALUES ($1, $2) RETURNING *`