DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS cars(
    regnr     VARCHAR(6) NOT NULL PRIMARY KEY
  ,brand     VARCHAR(16) NOT NULL
  ,model     VARCHAR(9) NOT NULL
  ,price     INTEGER NOT NULL
  ,yearmodel INTEGER NOT NULL
  ,color     VARCHAR(6) NOT NULL
);

INSERT INTO cars(regnr,brand,model,price,yearmodel,color) VALUES ('MZU512','Volvo','XC70',270000,2016,'black');
INSERT INTO cars(regnr,brand,model,price,yearmodel,color) VALUES ('ERF123','Kia','Ceed',27000,2010,'yellow');
INSERT INTO cars(regnr,brand,model,price,yearmodel,color) VALUES ('OBJ896','Volksvagen','Passat',296000,2019,'blue');
INSERT INTO cars(regnr,brand,model,price,yearmodel,color) VALUES ('GRE324','Volvo','740',120000,1999,'blue');
INSERT INTO cars(regnr,brand,model,price,yearmodel,color) VALUES ('OFC407','Kia','Ceed',120000,2016,'black');
INSERT INTO cars(regnr,brand,model,price,yearmodel,color) VALUES ('WYL325','Kia','Rio',89000,2004,'black');
INSERT INTO cars(regnr,brand,model,price,yearmodel,color) VALUES ('PRO309','Audi','Q7',95000,2009,'black');

select * from cars;