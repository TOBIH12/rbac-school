/* Replace with your SQL commands */

-- Map Permissions (100, 101, 102, 103) to Admin Role (10)

INSERT INTO public.role_permissions (role_id, permission_id) VALUES 
(10, 100),
(10, 101),
(10, 102),
(10, 103),

-- Map Permissions (103, 104) to Lecturer Role (11)
(11, 103),
(11, 104),

-- Map Permissions (105, 106) to Student Role (12)
(12, 105),
(12, 106);

