import React, { useState, useEffect } from "react";
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

import { Bar, BarChart, ResponsiveContainer, Legend, CartesianGrid, Tooltip, YAxis, XAxis } from 'recharts';

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



const BarChartVentas = () => {

  const [ventas, setVentas] = useState([]);

// funciona para generar un objeto data para el grafico de ventas por mes

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
        total: venta.totalAmount,
        mes: venta.mes,
        año: venta.año
    }
})

// crear un objeto data2 para el grafico de ventas por mes y sumar los totales de cada mes

const data2 = data.reduce((acc, item) => {
  const found = acc.find((x) => x.mes === item.mes);
  if (found) {
    found.total += item.total;
  } else {
    acc.push(item);
  }
  return acc;
}
, []);

// acomodar el objeto data2 de menor a mayor por mes

data2.sort((a, b) => {
  if (a.mes > b.mes) {
    return 1;
  }
  if (a.mes < b.mes) {
    return -1;
  }
  return 0;
}
);

// filtrar el objeto data2 para que solo muestre los meses del año 2023

const data3 = data2.filter((item) => {
  return item.año === 2023
}
);


  return (

    <div className='ventas-mes'>
      <h2>Facturacion por mes</h2>
        <BarChart width={800} height={500} data={data3}>
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />           
          <Legend />
          <Bar dataKey="total" fill="#324b77" />
        </BarChart>
    </div>
  )
}

export default BarChartVentas