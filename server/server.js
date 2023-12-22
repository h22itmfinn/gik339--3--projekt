//körexpresspaketet och sqlite till variabler
const express = require('express');
const sqlite = require("sqlite3").verbose();

const server = express();

//kör databasen till variabel db
const db = new sqlite.Database("./cars.db");

server
  .use(express.json()) //gör att vi kan ta emot json i req.body
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    // tilllåter att alla adresser, headers och metoder körs mot servern
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
  
    // skickar fråga vidare så att vi kan behandla den senare
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
server.get("/cars/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM cars WHERE id=${id}`;
  
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(500).send(err); // 500 är serverfel och err är error objektet
      } else {
        res.send(rows[0]); // 0:an gör att man får en rad
       }
    });
  });

// post fråga för att lägga till en bil med INSERT
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
    });
  });

//Put fråga för att uppdatera en befintlig bil
server.put("/cars", (req, res) => {
    const bodyData = req.body;      // läser in det som finns formuläret i bodyData variablen
    const id = bodyData.id;         // tar ut id variablen ur bodyData
    const car = {                   // skapar ett objekt som matchar req.body
      regnr: bodyData.regnr,
      brand: bodyData.brand,
      model: bodyData.model,
      price: bodyData.price,
      yearmodel: bodyData.yearmodel,
      color: bodyData.color,
    };
  
    let updateString = "";
    const columnsArray = Object.keys(car); // array av objektets nycklar
    columnsArray.forEach((column, i) => {
      updateString += `${column}="${car[column]}"`; // konkatenerar till en sträng med key/value
      if (i !== columnsArray.length - 1) updateString += ","; //lägger till ett komma mellan alla key/value par
    });
    const sql = `UPDATE cars SET ${updateString} WHERE id=${id}`;

    db.run(sql, (err) => {
    if (err) {
        console.log(err);
        res.status(500).send(err);
    } else {
        res.send("Bilen uppdaterades");
    }
    });
});


server.delete('/cars/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM cars WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Bilen borttagen');
    }
  });
});