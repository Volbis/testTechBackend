--
-- PostgreSQL database dump
--

\restrict b1OwdqnJDSr0DinAgqgwLxJO3bGsq24D77143n8MDk0a6KHMbLKXvMjiNwY6TbH

-- Dumped from database version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: mini_user
--

CREATE TABLE public."Transaction" (
    id integer NOT NULL,
    amount double precision NOT NULL,
    status text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Transaction" OWNER TO mini_user;

--
-- Name: Transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: mini_user
--

CREATE SEQUENCE public."Transaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Transaction_id_seq" OWNER TO mini_user;

--
-- Name: Transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mini_user
--

ALTER SEQUENCE public."Transaction_id_seq" OWNED BY public."Transaction".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: mini_user
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL
);


ALTER TABLE public."User" OWNER TO mini_user;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: mini_user
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO mini_user;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mini_user
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: mini_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO mini_user;

--
-- Name: Transaction id; Type: DEFAULT; Schema: public; Owner: mini_user
--

ALTER TABLE ONLY public."Transaction" ALTER COLUMN id SET DEFAULT nextval('public."Transaction_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: mini_user
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: mini_user
--

COPY public."Transaction" (id, amount, status, date, "userId") FROM stdin;
1	150.5	completed	2025-12-16 17:45:00	1
2	150.5	completed	2025-12-16 17:45:00	1
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: mini_user
--

COPY public."User" (id, name, email, phone) FROM stdin;
1	Coulibaly Nahouo ALbert	root.okay@example.com	+2250412345678
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: mini_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f1a3d59e-fd54-494d-ad05-41c348caefd7	ed4f565b2b3339d2c5e8f95a4d70b76e7d654af92b8254f3414f5ab83e7a3d98	2025-12-16 17:08:23.134976+00	20251216170823_init	\N	\N	2025-12-16 17:08:23.1105+00	1
\.


--
-- Name: Transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mini_user
--

SELECT pg_catalog.setval('public."Transaction_id_seq"', 2, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mini_user
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: mini_user
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: mini_user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: mini_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: mini_user
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Transaction Transaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mini_user
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict b1OwdqnJDSr0DinAgqgwLxJO3bGsq24D77143n8MDk0a6KHMbLKXvMjiNwY6TbH

