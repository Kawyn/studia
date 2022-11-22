-- 1
CREATE DATABASE `db-aparaty` CHARACTER SET utf8 ;
CREATE USER '268457'@'localhost' IDENTIFIED BY 'kewin457';
GRANT SELECT, INSERT, UPDATE ON `db-aparaty`.* TO '268457'@'localhost';
FLUSH PRIVILEGES;

-- 2
CREATE TABLE Aparat (
    model varchar(30) PRIMARY KEY,
    producent int NOT NULL,
    matryca int NOT NULL, 
    obiektyw int NOT NULL, 
    typ enum(
        'kompaktowy', 'lustrzanka', 'profesjonalny', 'inny'
    ) NOT NULL
);

CREATE TABLE Matryca ( 
    ID int PRIMARY KEY AUTO_INCREMENT, 
    przekatna decimal(4, 2) NOT NULL, 
    rozdzielczosc decimal(3, 1) NOT NULL, 
    typ varchar(10), 
    
    CHECK(przekatna >= 0), 
    CHECK(rozdzielczosc >= 0)
);

ALTER TABLE Matryca AUTO_INCREMENT=100;

CREATE TABLE Obiektyw (
    ID int PRIMARY KEY AUTO_INCREMENT,
    model varchar(30) NOT NULL, 
    minPrzeslona float NOT NULL,
    maxPrzeslona float NOT NULL,
    
    CHECK(minPrzeslona >= 0),
    CHECK(maxPrzeslona >= 0),
    CHECK(minPrzeslona < maxPrzeslona)
);

CREATE TABLE Producent (
    ID int PRIMARY KEY AUTO_INCREMENT,
    nazwa varchar(50),
    kraj varchar(20)
);

ALTER TABLE Aparat ADD FOREIGN KEY (producent) REFERENCES Producent(ID);
ALTER TABLE Aparat ADD FOREIGN KEY (matryca) REFERENCES Matryca(ID);
ALTER TABLE Aparat ADD FOREIGN KEY (obiektyw) REFERENCES Obiektyw(ID);

-- 3
INSERT INTO matryca (przekatna, rozdzielczosc, typ) VALUES 
    (1.1, 1.1, 'Lorem'), 
    (2.2, 2.2, 'Ipsum'), 
    (3.3, 3.3, 'Dolor'), 
    (4.4, 4.4, 'Sit'),
    (5.5, 5.5, 'Amet'),
    (6.6, 6.6, 'Lorem'),
    (7.7, 7.7, 'Ipsum'),
    (8.8, 8.8, 'Dolor'), 
    (9.9, 9.9, 'Sit'), 
    (10.10, 10.1, 'Amet'), 
    (11.11, 11.1, 'Lorem'), 
    (12.12, 12.1, 'Ipsum'), 
    (13.13, 13.1, 'Dolor'), 
    (14.14, 14.1, 'Amet'),
    (15.15, 15.1, 'Sit'); 
    
INSERT INTO obiektyw (model, minPrzeslona, maxPrzeslona) VALUES 
    ('W starym albumie', 10, 110), 
    ('U mego dziaka', 1, 2),
    ('Jest takie zdjęcie', 1151, 2951), 
    ('Istny cud', 14, 1935),
    ('Płynacy w falach', 1410, 1939), 
    ('Wśrod mewek stadka', 152, 194), 
    ('Statek na parę', 94, 821),
    ('Sprzed lat stu', 1922, 2022), 
    ('Tłum marynarzy', 0, 1),
    ('Pokład mu zdobi', 1, 20),
    ('Słonce na gorze', 125, 851),
    ('Pięknie lśni', 19, 591),
    ('Dobry fotograf', 104, 158),
    ('To zdjęcie zrobił', 1294, 5193), 
    ('Wszystko jak zywe', 149, 58151),
    ('Az się ckni', 10, 11),
    ('PAROSTATKIEM W PIEKNY REJS', 1, 2);

INSERT INTO producent (nazwa, kraj) VALUES
    ('Alfa', 'Argentyna'), 
    ('Beta', 'Białoruś'),
    ('Gamma', 'Grecja'), 
    ('Delta', 'Dania'),
    ('Epsilon', 'Ekwador'), 
    ('Dzeta', 'Demokratyczna Republika Konga'), 
    ('Eta', 'Estonia'),
    ('Theta', 'Turcja'), 
    ('Jota', 'Japonia'), 
    ('Kappa', 'Kamerun'),
    ('Lambda', 'Litwa'), 
    ('My', 'Chiny'), 
    ('Ny', 'Chiny'),
    ('Ksi', 'Chiny'),
    ('Omikron', 'Chiny'),
    ('Pi', 'Chiny');


INSERT INTO aparat VALUES
    ('A', 101, 5, 3, 'inny'),
    ('B', 102, 1, 4, 'profesjonalny'),
    ('C', 110, 10, 10, 'kompaktowy'),
    ('D', 115, 2, 9, 'lustrzanka'),
    ('E', 111, 6, 9, 'inny'), 
    ('F', 102, 11, 4, 'profesjonalny'), 
    ('G', 111, 11, 11, 'kompaktowy'),
    ('H', 111, 2, 9, 'lustrzanka'),
    ('I', 101, 5, 13, 'inny'),
    ('J', 102, 1, 3, 'profesjonalny'),
    ('K', 115, 13, 3, 'kompaktowy'),
    ('L', 101, 12, 9, 'lustrzanka'),  
    ('M', 101, 2, 13, 'inny'),
    ('N', 112, 11, 14, 'profesjonalny'), 
    ('O', 101, 4, 1, 'kompaktowy');

-- 4
DELIMITER $$
CREATE PROCEDURE generateAparats()
BEGIN 
	DECLARE p int;
	DECLARE m int;
	DECLARE o int;
	DECLARE t varchar(30);

	DECLARE i int;
	SET i = 0;

	a: WHILE i < 100 DO

		SELECT ID INTO p FROM producent ORDER BY RAND() LIMIT 1;
		SELECT ID INTO m FROM matryca ORDER BY RAND() LIMIT 1;
		SELECT ID INTO o FROM obiektyw ORDER BY RAND() LIMIT 1;
		SELECT DISTINCT typ INTO t FROM aparat ORDER BY RAND() LIMIT 1;

		INSERT INTO aparat (model, producent, matryca, obiektyw, typ) VALUE (CONCAT(t, p, m, o), p, m, o, t);
		SET i = i + 1;
	END WHILE a; 
END$$
DELIMITER ;

-- CALL generateAparats;
-- 5
DELIMITER $$
CREATE FUNCTION aparatWithBiggestPrzekatnaMatrycy(ID int) RETURNS varchar(30) DETERMINISTIC
BEGIN 
	RETURN (SELECT model FROM aparat JOIN matryca ON aparat.matryca = matryca.ID WHERE aparat.producent = ID ORDER BY przekatna DESC LIMIT 1);
END$$
DELIMITER ;

-- 6
DELIMITER $$
CREATE TRIGGER autoProducentCreator BEFORE INSERT ON aparat
FOR EACH ROW
BEGIN 
	IF NEW.producent NOT IN (SELECT ID FROM producent) THEN
		INSERT INTO producent (ID) VALUE (NEW.producent);
	END IF;
END$$
DELIMITER ;

-- 7
DELIMITER $$
CREATE FUNCTION countModeleForMatryca(ID int)
RETURNS int DETERMINISTIC
BEGIN 
	RETURN (SELECT count(*) FROM aparat WHERE matryca = ID);
END$$
DELIMITER ;

-- 8
DELIMITER $$
CREATE TRIGGER autoMatrycaRemover AFTER DELETE ON aparat
FOR EACH ROW
BEGIN 
	IF countModeleForMatryca(OLD.matryca) = 0 THEN
		DELETE FROM matryca WHERE matryca.ID = OLD.matryca;
	END IF;
END$$
DELIMITER ;

-- 9
CREATE VIEW lustrzankiNotFromChiny AS SELECT aparat.model, producent.nazwa, matryca.przekatna, matryca.rozdzielczosc, obiektyw.minPrzeslona, obiektywn.maxPrzeslona FROM aparat JOIN producent ON aparat.producent = producent.ID JOIN obiektyw ON aparat.obiektyw = obiektyw.ID WHERE producent.kraj <> 'Chiny' AND aparat.typ = 'lustrzanka';

-- 10
CREATE VIEW nazwaKrajModel AS SELECT producent.nazwa, producent.kraj, aparat.model FROM aparat JOIN producent ON aparat.producent = producent.ID;

SELECT * FROM nazwaKrajModel;
DELETE FROM aparat WHERE producent IN (SELECT ID FROM producent WHERE kraj = 'Chiny');
SELECT * FROM nazwaKrajModel;

-- 11
DELIMITER $$
CREATE TRIGGER liczbaModeliUpdateAfterInsert AFTER INSERT ON aparat
FOR EACH ROW
BEGIN 
	UPDATE producent SET liczbaModeli = (SELECT COUNT(*) FROM aparat WHERE aparat.producent = producent.ID);
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER liczbaModeliUpdateAfterDelete AFTER DELETE ON aparat
FOR EACH ROW
BEGIN 
	UPDATE producent SET liczbaModeli = (SELECT COUNT(*) FROM aparat WHERE aparat.producent = producent.ID);
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER liczbaModeliUpdateAfterUpdate AFTER UPDATE ON aparat
FOR EACH ROW
BEGIN 
	UPDATE producent SET liczbaModeli = (SELECT COUNT(*) FROM aparat WHERE aparat.producent = producent.ID);
END$$
DELIMITER ;
