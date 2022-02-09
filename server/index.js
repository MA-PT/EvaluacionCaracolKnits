const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"",
    database:"evaluation",
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/insert", (req, res) => {
    const vendedor= req.body.vendedor;
    const cliente= req.body.cliente;
    const producto= req.body.producto;
    const cantidad= req.body.cantidad;
    
    const sql="INSERT INTO orders (salesman, product, quantity, client, condition) VALUES (?,?,?,?, 'Registrado')";
    db.query(sql,[vendedor,cliente,producto,cantidad], (err, result)=>{
        console.log(result);
    });
});

app.get("/", (req, res)=>{
    res.send("Hello");
});

app.listen(3001,()=>{
    console.log("Running on port 3001");
});