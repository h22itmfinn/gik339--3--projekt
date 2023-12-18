//körexpresspaketet och sqlite till variabler
const express = require('express');
const sqlite = require("sqlite3").verbose();

const server = express();

//kör databasen till variabel db
const db = new sqlite.Database("./cars.db");

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    // tilllåter att alla adresser, headers och metoder körs mot servern
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
  
    // skickar fråga vidare så att vi kan
    next();
    });

    //starta servern och lyssna på port:3000
server.listen(3000, () => {
    console.log("Server is running och http://localhost:3000");
});

// get frågan som retunerar alla rader i databasen
server.get("/cars", (req, res) => {
    const sql = "SELECT * FROM cars";
  
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(500).send(err); // 500 är serverfel och err är error objektet
      } else {
        res.send(rows); // retunerar de rader som finns
      }
    });
  });

// get fråga som returnerar en specifik bil baserat på regnr
server.get("/cars/:regnr", (req, res) => {
    const regnr = req.params.regnr;
    const sql = `SELECT * FROM cars WHERE regnr = ${regnr}`;
  
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(500).send(err); // 500 är serverfel och err är error objektet
      } else {
        res.send(rows); // 0:an gör att man får
      }
    });
  });

// post fråga
server.post("/cars", (req, res) => {
    const car = req.body;
    const sql = `INSERT INTO cars(regnr,brand,model,price,yearmodel,color) VALUES(?,?,?,?,?,?)`;
  
    db.run(sql, Object.values(car), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send("Bilen sparades");
      }
    }); // andra
  });

// update baserat på regnr

server.put("/cars", (req, res) => {
    //UPDATE users SET firstName="Mikaela",lastName="Hedberg" WHERE id=1
    const bodyData = req.body;
    const regnr = bodyData.regnr;
    const car = {
      brand: bodyData.brand,
      model: bodyData.model,
      price: bodyData.price,
      yearmodel: bodyData.yearmodel,
      color: bodyData.color,
    };
  
    let updateString = "";
    const columnsArray = Object.keys(car); // array av objektets nycklar
    columnsArray.forEach((column, i) => {
      updateString += `${column}="${car[column]}"`;
      if (i !== columnsArray.length - 1) updateString += ",";
    });
    const sql = `UPDATE cars SET ${updateString} WHERE regnr=${regnr}`;

    db.run(sql, (err) => {
    if (err) {
        console.log(err);
        res.status(500).send(err);
    } else {
        res.send("Bilen uppdaterades");
    }
    });
});

// Tar bort bil baserat på regnr
server.delete('/cars/:regnr', (req, res) => {
    const regnr = req.params.regnr;
    const sql = `DELETE FROM cars WHERE regnr = ${regnr}`;
    
    db.run(sql, (err) => {
        if (err) {
        console.log(err);
        res.status(500).send(err);
        } else {
        res.send('Bilen är borttagen');
        }
    });
});