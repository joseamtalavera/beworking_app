--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Homebrew)
-- Dumped by pg_dump version 14.10 (Homebrew)

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
-- Name: users; Type: TABLE; Schema: public; Owner: josemolinatalavera
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    google_id character varying(255),
    confirmation_token character varying(255),
    email_confirmed boolean DEFAULT false,
    is_admin boolean DEFAULT false,
    commercial_name character varying(255),
    contact_person character varying(255),
    phone character varying(255),
    type character varying(255),
    category character varying(255),
    status character varying(255),
    street_and_number character varying(255),
    post_code character varying(255),
    county character varying(255),
    country character varying(255),
    registered_name character varying(255),
    vat character varying(255),
    payment_method character varying(255),
    additional_data text
);


ALTER TABLE public.users OWNER TO josemolinatalavera;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: josemolinatalavera
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO josemolinatalavera;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: josemolinatalavera
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: josemolinatalavera
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: josemolinatalavera
--

COPY public.users (id, email, password, google_id, confirmation_token, email_confirmed, is_admin, commercial_name, contact_person, phone, type, category, status, street_and_number, post_code, county, country, registered_name, vat, payment_method, additional_data) FROM stdin;
1	test@example.com	testpassword	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
4	jose@test.com	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
5	jay@test.com	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
6	me@test.com	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
7	jose@mail.ru	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
8	lol@team.es	4321	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
9	teo@does.com	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
10	jose@manaager.com	223344	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
11	joe@molina.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
12	tala@vera.es	654321	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
13	lucas@gago.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
14	luc@molina.uk	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
15	real@madrid.com	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
16	juju@luc.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
17	ale@matin.es	1212	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
18	ramon@ramon.es 	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
20	jose@be-working.com	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
21	elias@elmangui.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
22	eli@ludopata.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
23	jose@works.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
24	jose1234@1234.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
25	erro.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
26	jose@jose.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
27	jose@jose.jose	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
28	maria@be-working.com	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
29	luis@mail.es	1234	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
30	silvi@molina.es	$2b$10$BbQ4Wbjtdhr4sEA2fn6Dre/LcQgaeScu8VHkBDZ3uwstgp/L9xrqG	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
31	jose@russian.es	$2b$10$ReBOSe59Qn/2AuKoXYgScOBFsOHQTA.ga1h1IEpwnMowwXKyX4C2C	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
32	jose@sas.es	$2b$10$usi8IZ3nCR3T8r2t2Va0vO/srV8FN9hc9ri4bBa/BDBslu55rlI7a	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
33	jose@email.com	$2b$10$d83VxRy6GwdKTyL59QmzO.oGjTRkLgZJ2WnM18Xg33x6xMQMpTpXq	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
34	jose@try.es	$2b$10$0CiYuZixPQRHsWcLnEyPa.TH2qT59Zv5ywL7bHLQMdm1BSpEGvQBe	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
35	info@be-working.com	$2b$10$GirHPPMnTICL4Xps22ZiRu3s.zFSAHSITpE.0MqgjWKlATFTG2mUK	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
62	jose.molina.talavera@gmail.com	$2b$10$cPXhSINZT7NmS.5KBrwAjeDjr0lF5zFsG7E26eWJRE/lpwP0bFWBi	\N	9cc35090976840d3cdf17cdffeb27dea3b6d5d9d	t	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: josemolinatalavera
--

SELECT pg_catalog.setval('public.users_id_seq', 62, true);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: josemolinatalavera
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_google_id_key; Type: CONSTRAINT; Schema: public; Owner: josemolinatalavera
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_google_id_key UNIQUE (google_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: josemolinatalavera
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

