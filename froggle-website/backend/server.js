const express = require('express');
const app = express();
app.use(express.json())

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// start server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});

//IMPORT DATABASE CONNECTION FUNCTION
const mysql = require("mysql");
const db = require("./dbConfig");

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});

/*API CONNEXION

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ? AND password = ?";

  db.query(sql, [req.body.email,req.body.password], (err, data) => {
    if(err) return res.json("Erreur d'authentication");
    
    if(data.length > 0) {
      return res.json("Authentification réussie")
    }else{
      return res.json("Authenfication échouée");
    }
  })
})*/