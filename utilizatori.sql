CREATE TYPE roluri AS ENUM('admin', 'moderator', 'comun');


CREATE TABLE IF NOT EXISTS utilizatori (
   id serial PRIMARY KEY,
   username VARCHAR(50) UNIQUE NOT NULL,
   nume VARCHAR(100) NOT NULL,
   prenume VARCHAR(100) NOT NULL,
   parola VARCHAR(500) NOT NULL,
   reintroducere_parola VARCHAR(500) NOT NULL,
   rol roluri NOT NULL DEFAULT 'comun',
   email VARCHAR(100) NOT NULL,
   an_nastere integer, --adaugat de mine
   culoare_chat VARCHAR(50) DEFAULT 'black',
   data_adaugare TIMESTAMP DEFAULT current_timestamp,
   cod character varying(200),
   confirmat_mail boolean DEFAULT false,
   poza VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS accesari (
   id serial PRIMARY KEY,
   ip VARCHAR(100) NOT NULL,
   user_id INT NULL REFERENCES utilizatori(id),
   pagina VARCHAR(500) NOT NULL,
   data_accesare TIMESTAMP DEFAULT current_timestamp
);

GRANT ALL PRIVILEGES ON DATABASE legumicofruct TO legumicofruct ;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO legumicofruct;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO legumicofruct;