/* Replace with your SQL commands */

UPDATE public.users 
SET password = '$2b$10$wOb0auu1aYAVd68eqkL4MedOH5jPu7eE79L5in.F5VBO4ajOeAwYe'
WHERE password IS NOT NULL;