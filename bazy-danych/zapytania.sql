CREATE OR REPLACE TABLE ludzie(
	czlowiek_id int PRIMARY KEY AUTO_INCREMENT,
	PESEL varchar(11),
	imie varchar(30) NOT NULL,
	nazwisko varchar(30) NOT NULL,
	data_urodzenia date NOT NULL,
	plec enum('K', 'M') NOT NULL,
	CHECK(
            (10 - ((
                (CAST(SUBSTRING(PESEL, 1, 1) AS int) * 1) %  10 +
                (CAST(SUBSTRING(PESEL, 2, 1) AS int) * 3) %  10 + 
                (CAST(SUBSTRING(PESEL, 3, 1) AS int) * 7) %  10 +
                (CAST(SUBSTRING(PESEL, 4, 1) AS int) * 9) %  10 + 
                (CAST(SUBSTRING(PESEL, 5, 1) AS int) * 1) %  10 + 
                (CAST(SUBSTRING(PESEL, 6, 1) AS int) * 3) %  10 + 
                (CAST(SUBSTRING(PESEL, 7, 1) AS int) * 7) %  10 + 
                (CAST(SUBSTRING(PESEL, 8, 1) AS int) * 9) %  10 + 
                (CAST(SUBSTRING(PESEL, 9, 1) AS int) * 1) %  10 + 
                (CAST(SUBSTRING(PESEL, 10, 1) AS int) * 3) %  10
            ) % 10)) % 10= CAST(SUBSTRING(PESEL, 11, 1) AS int)
        ),
	CHECK(CAST(SUBSTRING(PESEL, 10, 1) AS int) % 2 = plec-1),
	CHECK(
            YEAR(data_urodzenia) % 100 = CAST(SUBSTRING(PESEL, 1, 2) AS int) AND
            MONTH(data_urodzenia) = CAST(SUBSTRING(PESEL, 3, 2) AS int)  % 20 AND
            DAY(data_urodzenia) = CAST(SUBSTRING(PESEL, 5, 2) AS int)
        )
);



CREATE OR REPLACE TABLE pracownicy(
	pracownik_id int PRIMARY KEY AUTO_INCREMENT, 
	czlowiek_id int NOT NULL,
	zawod_id int NOT NULL,
	pensja float NOT NULL,
	
	CHECK(pensja > 0),
    CONSTRAINT fk_pracownicy_ludzie FOREIGN KEY (czlowiek_id) REFERENCES ludzie (czlowiek_id),	
    CONSTRAINT fk_pracownicy_zawody FOREIGN KEY (zawod_id) REFERENCES zawody (zawod_id)
);

INSERT INTO zawody (nazwa, pensja_min, pensja_max) VALUES 
    ('polityk', 3010, 20000),
    ('nauczyciel', 3010, 8000),
    ('lekarz', 3010, 80000), 
    ('informatyk', 3010, 30000);
    
DELIMITER //
CREATE OR REPLACE PROCEDURE nadajZawody()
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE id INT;
  DECLARE v_data_urodzenia date;
  DECLARE v_plec int;
  DECLARE zawod INT;
  DECLARE ludz CURSOR FOR SELECT czlowiek_id, data_urodzenia, plec FROM ludzie;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN ludz;
 
  read_loop: LOOP
    FETCH ludz INTO id, v_data_urodzenia, v_plec;

    IF done THEN
        LEAVE read_loop;
    END IF;
        
    IF NOT TIMESTAMPDIFF(YEAR, v_data_urodzenia, CURDATE()) < 18 THEN

     SELECT zawod_id INTO zawod FROM zawody ORDER BY RAND() LIMIT 1;
    
     a: WHILE (SELECT nazwa FROM zawody WHERE zawody.zawod_id = zawod) = 'lekarz' AND ((v_plec = 1 AND TIMESTAMPDIFF(YEAR, v_data_urodzenia, CURDATE()) > 60) OR (v_plec = 2 AND TIMESTAMPDIFF(YEAR, v_data_urodzenia, CURDATE()) > 65))  DO
        SELECT zawod_id INTO zawod FROM zawody ORDER BY RAND() LIMIT 1;
    END WHILE a;
    

      INSERT INTO pracownicy (czlowiek_id, zawod_id, pensja) VALUES (id, zawod, FLOOR((SELECT pensja_min FROM zawody WHERE zawod_id = zawod) + RAND() * ((SELECT pensja_max FROM zawody WHERE zawod_id = zawod) - (SELECT pensja_min FROM zawody WHERE zawod_id = zawod)+1)));
   END IF;

  END LOOP;

  CLOSE ludz;
END; //

DELIMITER ;


CREATE INDEX idx_plec_imie ON ludzie(plec, imie);
CREATE INDEX idx_pensja ON pracownicy(pensja);

SELECT * FROM ludzie WHERE plec = 'K' AND imie LIKE 'A%';
SELECT * FROM ludzie WHERE plec = 'K';
SELECT * FROM ludzie WHERE imie LIKE 'K%';
SELECT * FROM ludzie JOIN pracownicy ON ludzie.czlowiek_id = pracownicy.czlowiek_id WHERE pensja > 2000;

SELECT * FROM ludzie JOIN pracownicy ON ludzie.czlowiek_id = pracownicy.czlowiek_id WHERE plec = 'M' AND zawod_id IN (SELECT zawod_id FROM zawody WHERE nazwa = 'informatyk') AND pensja > 10000;

DELIMITER //
CREATE OR REPLACE PROCEDURE podniesPensje(nazwa_zawodu varchar(30))
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN 
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE pracownicy SET pensja = pensja * 1.05 WHERE zawod_id IN (SELECT zawod_id FROM zawody WHERE nazwa = nazwa_zawodu);

    IF NOT (SELECT * FROM pracownicy JOIN zawody ON pracownicy.zawod_id = zawody.zawod_id WHERE pensja > pensja_max && nazwa = nazwa_zawodu) = NULL THEN
        ROLLBACK;
    END IF;
  
    COMMIT;
END; //

DELIMITER ;


mysqldump trzecia > trzecia.sql -u root -p;
drop database trzecia;
create database trzecia;

mysql trzecia <   trzecia.sql -u root -p;