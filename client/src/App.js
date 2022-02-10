import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [buscar, setBuscar] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [cliente, setCliente] = useState("");
  const [cbCliente, setCbCliente] = useState("");
  const [producto, setProducto] = useState("");
  const [cbProducto, setCbProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [listaPedido, setListaPedido] = useState("");

  useEffect(() => {
    getClients();
    getProducts();
  }, []);

  const getClients = async () => {
    const response = await Axios.get("http://localhost:3001/api/getClients");
    setCbCliente(response.data);
  } 

  const getProducts = async () => {
    const response = await Axios.get("http://localhost:3001/api/getProducts");
    setCbProducto(response.data);
  }

  const searchOrder = () => {
    Axios.post("http://localhost:3001/api/searchOrder", {search: buscar}).then((response) =>{
      setListaPedido(response.data);
    });
  }

  const registrar = () => {
    Axios.post("http://localhost:3001/api/newOrder",{
      vendedor: vendedor,
      cliente: cliente,
      producto: producto,
      cantidad: cantidad,
    }).then(() => {
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
          <option value='Seleccione el Producto...'>Seleccione el Producto...</option>
          {cbProducto && cbProducto.map((val) => {
              return (
                <option key={val.id} value={val.name}>
                  {val.name}
                </option>
              );
            })}
        </select>

        <input type='number' pattern='^[0-9]+' min='1' name='cantidad' placeholder='Cantidad' onChange={(e)=>{
          setCantidad(e.target.value);
        }}/>

        <select id='cliente' onChange={(e)=>{
          setCliente(e.target.value);
        }}>
          <option value='Seleccione el Cliente...'>Seleccione el Cliente...</option>
          {cbCliente && cbCliente.map((val) => {
              return (
                <option key={val.id} value={val.name}>
                  {val.name}
                </option>
              );
            })}
        </select>

        <button onClick={registrar}>Registrar Pedido</button>
      </div>

      <div>
        <h3>Supervisor de Ventas</h3>
        <input type='text' placeholder='Search' name='buscar' onChange={(e)=>{
          setBuscar(e.target.value);
        }}/>
        
        <button onClick={searchOrder}>Buscar</button>
        
        {listaPedido && listaPedido.map((val, key)=>{
          return <div key={key}>
          <div> 
            <h3>Vendedor: {val.salesman}</h3>
            <h3>Producto: {val.product}</h3>
            <h3>Cantidad: {val.quantity}</h3>
            <h3>Fecha: {val.date}</h3>
            <h3>Cliente: {val.client}</h3>
          </div>
       </div>
        })}
      </div>
    </div>
  );
}

export default App;
