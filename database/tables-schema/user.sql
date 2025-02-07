-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp DEFAULT now() NOT NULL,
	deleted_at timestamp NULL,
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	birth_date date NOT NULL,
	balance numeric DEFAULT 0 NOT NULL,
	CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
	CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email)
);