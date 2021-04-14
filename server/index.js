const express = require('express');
const app = express();
const mysql= require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"projet"

});

app.get('/event',(req,res)=>{
    db.query("select * from event",(err, result)=>{
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/*
app.get('/evenement/:nom',(req,res)=>{
  db.query("select * from event WHERE nom = ?", nom,(err, result)=>{
      if (err){
          console.log(err);
      } else {
          res.send(result);
      }
  });
});*/


app.post('/ajoutEvent',(req,res)=>{
    const nom=req.body.nom;
    const description=req.body.description;
    const lieu=req.body.lieu;
    const date=req.body.date;
    const heure=req.body.heure;
    

    db.query("insert into event (nom,description,lieu,heure,date) values(?,?,?,?,?)",[nom,description,lieu,heure,date],(err,result)=>{
        if (err){
            console.log(err);
        } else {
            res.send("inserert");
        }
    })
})


app.delete("/supprimeEvent/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM event WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });



/*
  app.put("/update/:nom", (req, res) => {
    const nomch = req.params.nom;
    const nom = req.body.nom;
    const description = req.body.description;
    db.query(
      "UPDATE event SET nom = ? ,description=? WHERE nom = ?",
      [nom, description,nomch],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });*/



/*
app.put("/sendUpdate:nom", (req, res) => {
  const nomchg = req.params.nom;
    const nom = req.body.nom;
    const description = req.body.description;
    db.query(
      "UPDATE event SET nom = ? , description= ? WHERE nom = ?",
      [nomchg,description,nom],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });*/



app.listen('3001', () =>{
    console.log('on port 3001');
})



    /*
const sqlQuery="insert into event (nom,description) values ('hhh','bbb');"    
db.query(sqlQuery,(err,result)=>{
    res.send("hello hh");*/
/*

app.listen(3001, () =>{
    console.log("on port 3001");
}) ;*/