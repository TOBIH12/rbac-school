/* Replace with your SQL commands */

-- 1. Sync the Users sequence
SELECT setval(
    'users_id_seq', 
    COALESCE((SELECT MAX(id) FROM users), 0) + 1, 
    false
);

-- 2. Sync the Roles sequence
SELECT setval(
    'roles_id_seq', 
    COALESCE((SELECT MAX(id) FROM roles), 0) + 1, 
    false
);

-- 3. Sync the Permissions sequence
SELECT setval(
    'permissions_id_seq', 
    COALESCE((SELECT MAX(id) FROM permissions), 0) + 1, 
    false
);

-- 4. Sync the Courses sequence
SELECT setval(
    'courses_id_seq', 
    COALESCE((SELECT MAX(id) FROM courses), 0) + 1, 
    false
);

-- 5. Sync the Grades sequence (if any were seeded)
SELECT setval(
    'grades_id_seq', 
    COALESCE((SELECT MAX(id) FROM grades), 0) + 1, 
    false
);