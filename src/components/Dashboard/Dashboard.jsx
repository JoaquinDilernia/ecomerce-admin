import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'


import './Dashboard.css'
import BarChartVentas from '../BarChart/BarChartVentas';
import { MdOutlineAttachMoney } from 'react-icons/md'

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    getDoc,
    setDoc,
  } from "firebase/firestore";
  import { initializeApp } from "firebase/app";
  
  
  const firebaseConfig = {
    apiKey: "AIzaSyA3hK_dngP0EX1goxTYupHZCDWYHFHKKAI",
    authDomain: "pedidos-lett-2.firebaseapp.com",
    projectId: "pedidos-lett-2",
    storageBucket: "pedidos-lett-2.appspot.com",
    messagingSenderId: "459720672669",
    appId: "1:459720672669:web:9cdbd5329a4cc1c7219b74",
  };
  
  // Initialize Firebase
  const db = getFirestore(initializeApp(firebaseConfig));




const Dashboard = () => {
    const url = 'https://apimocha.com/lettproduct/clientes'
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setClientes(json))
    }
        , [])

        // contar la cantidad de clientes
        const cantidadClientes = clientes.length

       
        const [ventas, setVentas] = useState([]);

        useEffect(() => {
            const getVentas = async () => {
              const ventas = await getDocs(collection(db, "orders"));
              setVentas(ventas.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            };
            getVentas();
          }, []);

          const data = ventas.map((venta) => {
            return {
                venta: venta.idventa,
                total: venta.total,
                mes: venta.mes,
                año: venta.año
            }
        })

        // sumar en una variable el total de ventas del año 2023

        let totalVentas = 0
        data.forEach(venta => {
            if (venta.año === 2023) {
                totalVentas += venta.total
            }
        })

        let cantidadVentas = 0
        data.forEach(venta => {
            if (venta.año === 2023) {
                cantidadVentas += 1
            }
        })

        // filtrar por mes para las card de ventas, clientes y facturacion 

        const [mes, setMes] = useState(0)
        const [ventasFiltradas, setVentasFiltradas] = useState([])
        const [clientesFiltrados, setClientesFiltrados] = useState([])
        const [totalVentasFiltradas, setTotalVentasFiltradas] = useState(0)

        useEffect(() => {
            setVentasFiltradas(data.filter(venta => venta.mes == mes))
        }
            , [mes])

        useEffect(() => {
            setClientesFiltrados(clientes.filter(cliente => cliente.mes == mes))
        }
            , [mes])

        useEffect(() => {
            let total = 0
            ventasFiltradas.forEach(venta => {
                total += venta.total
            })
            setTotalVentasFiltradas(total)
        }
            , [ventasFiltradas])

        const cantidadVentasFiltradas = ventasFiltradas.length



  return (
    <div className="contenedor">
      <NavBar />
    <div className='dashboard'>
        <h1>ESTADISTICAS 2023</h1>
        <div className='ventas__filtros'>

            <select  onChange={(e) => setMes(e.target.value)}>
                <option value='0'>Todos los meses</option>
                <option value='1'>Enero</option>
                <option value='2'>Febrero</option>
                <option value='3'>Marzo</option>
                <option value='4'>Abril</option>
                <option value='5'>Mayo</option>
                <option value='6'>Junio</option>
                <option value='7'>Julio</option>
                <option value='8'>Agosto</option>
                <option value='9'>Septiembre</option>
                <option value='10'>Octubre</option>
                <option value='11'>Noviembre</option>
                <option value='12'>Diciembre</option>
            </select>
        </div>
        <div className='dashboard__container-card'>
            <div className='dashboard__container-card-item'>
                <h2>Ventas</h2>
                <h3>{cantidadVentasFiltradas}</h3>
            </div>
            <div className='dashboard__container-card-item'>
                <h2>Clientes</h2>
                <h3>{cantidadClientes}</h3>
                </div>
            <div className='dashboard__container-card-item'>
                <h2>Facturacion</h2>
                <h3>{totalVentasFiltradas}</h3>
                </div>    
       </div>

       <div className='dashboard__container-grafico'>
        <BarChartVentas /> 
            
       </div>

    </div>
    </div>




  )
}

export default Dashboard