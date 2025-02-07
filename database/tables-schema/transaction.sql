-- public.transactions definition

-- Drop table

-- DROP TABLE public.transactions;

CREATE TABLE public.transactions (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	updated_at timestamp DEFAULT now() NOT NULL,
	deleted_at timestamp NULL,
	user_id uuid NOT NULL,
	transaction_id varchar NOT NULL,
	reference varchar NOT NULL,
	current_balance numeric NOT NULL,
	amount numeric NOT NULL,
	"type" public.transactions_type_enum NOT NULL,
	CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY (id),
	CONSTRAINT "UQ_9162bf9ab4e31961a8f7932974c" UNIQUE (transaction_id),
	CONSTRAINT "UQ_dd85cc865e0c3d5d4be095d3f3f" UNIQUE (reference)
);


-- public.transactions foreign keys

ALTER TABLE public.transactions ADD CONSTRAINT transactions_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);