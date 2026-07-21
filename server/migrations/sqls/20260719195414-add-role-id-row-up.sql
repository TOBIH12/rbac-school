/* Replace with your SQL commands */

ALTER TABLE IF EXISTS public.users
ADD COLUMN password VARCHAR(255);

UPDATE public.users 
SET password = '$2b$10$EpJXJSfO7szbEcsZ5EfMkuK6JgL.T8M8d6Kq9t1U4bE3.pE1aM8Ke'
WHERE password IS NULL;

ALTER TABLE public.users ALTER COLUMN password SET NOT NULL;
