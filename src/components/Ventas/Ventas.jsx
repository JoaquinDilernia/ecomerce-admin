import { useState, useEffect } from 'react';
import './Ventas.css'

import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import NavBar from '../NavBar/NavBar';


const firebaseConfig = {
  apiKey: "AIzaSyA3hK_dngP0EX1goxTYupHZCDWYHFHKKAI",
  authDomain: "pedidos-lett-2.firebaseapp.com",
  projectId: "pedidos-lett-2",
  storageBucket: "pedidos-lett-2.appspot.com",
  messagingSenderId: "459720672669",
  appId: "1:459720672669:web:9cdbd5329a4cc1c7219b74"
};


// Initialize Firebase
const db = getFirestore(initializeApp(firebaseConfig));

const Ventas = () => {

    const [ventas, setVentas] = useState([])
    const [search, setSearch] = useState('')
    const [filteredVentas, setFilteredVentas] = useState([])

 

 
    useEffect(() => {
        const getVentas = async () => {
            const ventas = await getDocs(collection(db, "orders"));
            setVentas(ventas.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getVentas()
    }, [])

    const deleteVenta = async (id) => {
        await deleteDoc(doc(db, "orders", id));
        const newVentas = ventas.filter(venta => venta.id !== id)
        setVentas(newVentas)
    }

    const changeState = async (id) => {
        const docRef = doc(db, "orders", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await setDoc(doc(db, "orders", id), {
                ...docSnap.data(),
                estado: "Entregado"
            });
        } else {
            console.log("No such document!");
        }
    }


    const url = 'https://apimocha.com/lettproduct/clientes'
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setClientes(json))
    }

        , [])

    const searchClient = (id) => {
        const vendedor = clientes.filter(cliente => cliente.id === parseInt(id)).map((cliente) => (
            cliente.vendedor
        ))
        return vendedor
    }
  
  

    return (

        
        <div className='contenedor'>
            <NavBar />
            <div className='ventas'>
                <div className='ventas__search'>
                    <input type='text' placeholder='Buscar venta' onChange={e => setSearch(e.target.value)} />
                </div>
                <div className='ventas__table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Apellido</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Vendedor</th>
                                <th>Acciones</th>
  
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.filter((val) => {
                                if (search === '') {
                                    return val
                                } else if (val.cliente.toLowerCase().includes(search.toLowerCase())) {
                                    return val
                                }
                            }).map((venta) => (
                                <tr key={venta.id}>
                                    <td>{venta.apellido}</td>
                                    <td>{venta.fechaActual}</td>
                                    <td>{venta.estado}</td>
                                    <td>{searchClient(venta.idcliente)}</td>



                                    <td>
                                        <button onClick={() => changeState(venta.id)}>Entregado</button>
                                        <button onClick={() => deleteVenta(venta.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default Ventas