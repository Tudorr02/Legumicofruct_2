DROP TYPE IF EXISTS categ_produs;
DROP TYPE IF EXISTS tipuri_produse;
DROP TYPE IF EXISTS cal_nutritiva;

CREATE TYPE categ_produs AS ENUM( 'fructe romanesti','fructe exotice','legume romanesti', 'legume exotice', 'cosuri romanesti', 'cosuri exotice');
CREATE TYPE tipuri_produse AS ENUM('fructe', 'legume', 'cosuri');
CREATE TYPE cal_nutritiva AS ENUM ('A','B','C','D');


CREATE TABLE IF NOT EXISTS produse (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
	imagine VARCHAR(300),
	tip_produs tipuri_produse DEFAULT 'fructe',
	categorie categ_produs DEFAULT 'fructe romanesti',
   pret NUMERIC(8,2) NOT NULL,
   gramaj INT NOT NULL CHECK (gramaj>=0),
	data_adaugare TIMESTAMP DEFAULT current_timestamp,
	calitate_nutritiva cal_nutritiva DEFAULT 'B',
   vitamine VARCHAR [], 
   low_calorie BOOLEAN NOT NULL DEFAULT FALSE
   
);

-- DELETE FROM produse;
-- DROP TABLE produse;

INSERT INTO produse (nume, descriere, imagine, tip_produs, categorie, pret, gramaj, calitate_nutritiva, vitamine, low_calorie)
VALUES
   ('Mar', 'Marul este un fruct dulce și suculent, bogat în vitamina C.', 'mar.jpg', 'fructe', 'fructe romanesti', 2.50, 150, 'B', '{A,C}', FALSE),
('Portocala', 'Portocala este o fructă citrică bogată în vitamina C și fibre.', 'portocala.jpg', 'fructe', 'fructe romanesti', 3.20, 200, 'A', '{C}', FALSE),
('Banana', 'Banana este o fructă tropicală bogată în potasiu și fibre.', 'banana.jpg', 'fructe', 'fructe exotice', 1.80, 120, 'B', '{B,C}', FALSE),
('Mango', 'Mango este o fructă exotică cu o carne suculentă și dulce.', 'mango.jpg', 'fructe', 'fructe exotice', 4.50, 250, 'A', '{A,B,C}', FALSE),
('Cireșe', 'Cireșele sunt fructe mici și delicioase, bogate în antioxidanți.', 'cirese.jpg', 'fructe', 'fructe romanesti', 5.80, 100, 'A', '{A}', FALSE),
('Strugure', 'Strugurele este un fruct de culoare variată și gust dulce-acrișor.', 'strugure.jpg', 'fructe', 'fructe romanesti', 3.60, 300, 'B', '{C}', FALSE),
('Piersică', 'Piersica este un fruct suculent și aromat, bogat în vitamina A.', 'piersica.jpg', 'fructe', 'fructe romanesti', 2.90, 180, 'A', '{A}', FALSE),
('Prună', 'Prunul este un fruct dulce-acrișor și bogat în fibre.', 'pruna.jpg', 'fructe', 'fructe romanesti', 2.10, 160, 'C', '{B,C}', FALSE),
('Castravete', 'Castravetele este o legumă cu o textură crocantă și un gust răcoritor.', 'castravete.jpg', 'legume', 'legume romanesti', 1.50, 80, 'B', '{A,C}', FALSE),
('Morcov', 'Morcovul este o legumă rădăcinoasă bogată în vitamina A.', 'morcov.jpg', 'legume', 'legume romanesti', 1.20, 100, 'A', '{A,B}', FALSE),
('Broccoli', 'Broccoli este o legumă verde bogată în vitamine și minerale.', 'broccoli.jpg', 'legume', 'legume exotice', 2.30, 150, 'B', '{C}', FALSE);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO legumicofruct;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO legumicofruct;