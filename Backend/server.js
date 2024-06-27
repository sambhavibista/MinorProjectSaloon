const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
     host: "localhost",
     user:"root",
     password:"",
     database:"signup"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

app.post('/signup', (req,res) =>{
    const sql = "INSERT INTO login (name, email, password) VALUES (?)";
    const values= [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err, data) =>{
        if(err){
            return res.json("error");
        }
        return res.json(data);
    })
})

app.post('/login', (req,res) =>{
    const sql = "SELECT * from login WHERE email= ? AND password = ?";
    
    db.query(sql, [req.body.email, req.body.password],(err, data) =>{
        if(err){
            return res.json("error");
        }
        if(data.length > 0 ){
            return res.json('Success');
        }else{
            return res.json("fail");
        }
    })
})


app.listen(8081, ()=> {
    console.log("listening");
})