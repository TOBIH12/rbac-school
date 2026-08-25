/* Replace with your SQL commands */

INSERT INTO public.permissions (id, name) VALUES 
(100, 'manage_users'),
(101, 'manage_courses'),
(102, 'view_system_logs'),
(103, 'view_students'),
(106, 'view_grades');
ON CONFLICT (id) DO NOTHING;