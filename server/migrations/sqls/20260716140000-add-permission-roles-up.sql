/* Replace with your SQL commands */

INSERT INTO public.permissions (id, name) VALUES 
(104, 'view_students'),
(105, 'view_own_profile')
ON CONFLICT (id) DO NOTHING;