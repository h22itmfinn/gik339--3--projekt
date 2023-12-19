DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS cars(
  id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
  ,regnr     VARCHAR(6) NOT NULL
  ,brand     VARCHAR(16) NOT NULL
  ,model     VARCHAR(9) NOT NULL
  ,price     INTEGER NOT NULL
  ,yearmodel INTEGER NOT NULL
  ,color     VARCHAR(6) NOT NULL
);
INSERT INTO cars(id,regnr,brand,model,price,yearmodel,color) VALUES (1,'MZU512','Volvo','XC70',270000,2016,'black');
INSERT INTO cars(id,regnr,brand,model,price,yearmodel,color) VALUES (2,'ERF123','Kia','Ceed',27000,2010,'yellow');
INSERT INTO cars(id,regnr,brand,model,price,yearmodel,color) VALUES (3,'OBJ896','Volksvagen','Passat',296000,2019,'blue');
INSERT INTO cars(id,regnr,brand,model,price,yearmodel,color) VALUES (4,'GRE324','Volvo','740',120000,1999,'blue');
INSERT INTO cars(id,regnr,brand,model,price,yearmodel,color) VALUES (5,'OFC407','Kia','Ceed',120000,2016,'black');
INSERT INTO cars(id,regnr,brand,model,price,yearmodel,color) VALUES (6,'WYL325','Kia','Rio',89000,2004,'black');
INSERT INTO cars(id,regnr,brand,model,price,yearmodel,color) VALUES (7,'PRO309','Audi','Q7',95000,2009,'black');


select * from cars;