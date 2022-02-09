import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [vendedor, setVendedor] = useState("");
  const [cliente, setCliente] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");

  const Registrar = () => {
    Axios.post("http://localhost:3001/api/insert",{
      vendedor:vendedor,
      cliente:cliente,
      producto:producto,
      cantidad:cantidad
    }).then(()=>{
      alert("Done");
    });
  }

  return (
    <div className="App">
      <h1>Asignaciones de la Evaluación</h1>
      <div>
        <h3>Vendedor</h3>
        <input type='text' placeholder='Nombre del Vendedor' name='vendedor' onChange={(e)=>{
          setVendedor(e.target.value);
        }}/>
        <select id='producto' onChange={(e)=>{
          setProducto(e.target.value);
        }}>
          <option>Seleccione el Producto...</option>
        </select>
        <input type='number' pattern='^[0-9]+' min='1' name='cantidad' placeholder='Cantidad' onChange={(e)=>{
          setCantidad(e.target.value);
        }}/>
        <select id='cliente' onChange={(e)=>{
          setCliente(e.target.value);
        }}>
          <option>Seleccicione el Cliente...</option>
        </select>
        <button onClick={Registrar}>Registrar</button>
      </div>
    </div>
  );
}

export default App;
