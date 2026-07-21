/* Replace with your SQL commands */

-- Assign roles to users

INSERT INTO public.user_roles (user_id, role_id) VALUES 
(1, 10), -- Alice is and Administrator
(2, 11), -- Bob is a Lecturer
(3, 12); -- Charlie is a Student
