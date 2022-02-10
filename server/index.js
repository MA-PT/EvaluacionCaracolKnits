const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"",
    database:"evaluacion",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/getClients", (req, res) => {
    const selClients = "SELECT * FROM clients;";
    db.query(selClients, (err, result) => {
        res.send(result);
    });
});

app.get("/api/getProducts", (req, res) => {
    const selProducts = "SELECT * FROM products;";
    db.query(selProducts, (err, result) => {
        res.send(result);
    });
});

app.post("/api/searchOrder", (req, res) => {
    const search = req.body.search;
    db.query("SELECT * FROM orders WHERE id = ?;",[search],(err, result) => {
        res.send(result);
    });
});

app.post("/api/newOrder", (req, res) => {
    const vendedor = req.body.vendedor;
    const cliente = req.body.cliente;
    const producto = req.body.producto;
    const cantidad = req.body.cantidad;
    const estado = "Registrado";
    const fecha = new Date();
    const hoy = fecha.toISOString();
    
    /*const sql="INSERT INTO orders (salesman, client, product, quantity, condition) VALUES (?,?,?,?,?);";*/
    db.query("INSERT INTO orders (salesman, client, product, quantity, date, status) VALUES (?,?,?,?,?,?);",[vendedor,cliente,producto,cantidad,hoy,estado], (err, result)=>{
        console.log(result);
    });
});

app.listen(3001,()=>{
    console.log("Running on port 3001");
});