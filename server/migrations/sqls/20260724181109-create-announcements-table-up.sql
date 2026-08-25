/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.announcements
(
    announcements_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title character varying COLLATE pg_catalog."default",
    content character varying COLLATE pg_catalog."default",
    created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    creator_id integer REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "article_pkey" PRIMARY KEY (announcements_id)
);