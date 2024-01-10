import { useState, useEffect } from "react";
import "./Ventas.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
import NavBar from "../NavBar/NavBar";

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

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredVentas, setFilteredVentas] = useState([]);

  useEffect(() => {
    const getVentas = async () => {
      const ventas = await getDocs(collection(db, "orders"));
      setVentas(ventas.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getVentas();
  }, []);

  const changeStateCancelado = async (id) => {
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(doc(db, "orders", id), {
        ...docSnap.data(),
        estado: "Cancelado",
      });
      notify1()
      setTimeout(function () {
        window.location.reload();
      }, 2000);

    } else {
      notify2()
      
    }
  };

  const changeStateEntregado = async (id) => {
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(doc(db, "orders", id), {
        ...docSnap.data(),
        estado: "Entregado",
      });
      notify1()
      setTimeout(function () {
        window.location.reload();
      }, 2000);

    } else {
      notify2()
      
    }
  };

  const changeStateArchivado = async (id) => {
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(doc(db, "orders", id), {
        ...docSnap.data(),
        estado: "Archivado",
      });
      notify1()
      setTimeout(function () {
        window.location.reload();
      }, 2000);

    } else {
      notify2()
      
    }
  };

  const url = "https://apimocha.com/lettproduct/clientes";
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setClientes(json));
  }, []);

  const searchClient = (id) => {
    const vendedor = clientes
      .filter((cliente) => cliente.id === parseInt(id))
      .map((cliente) => cliente.vendedor);
    return parseInt(vendedor);
  };

 
// funcion para filtrar por estado y vendedor 

  const filterestado = (estado) => {

    if (estado === "todos" ) {
      setFilteredVentas(ventas);
    }
    else {
      setFilteredVentas(ventas.filter(venta => venta.estado === estado  ));
    }
  }

  const filtervendedor = (vendedor) => {
      
      if (vendedor === "todos"  ) {
        setFilteredVentas(ventas);
      }
      else {
        setFilteredVentas(ventas.filter(venta => searchClient(venta.idcliente) === parseInt(vendedor)));
      }
    }

    const notify1 = () =>  toast.success('Estado actualizado', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

      const notify2 = () => toast.error('Error! no se pudo actualziar el estado', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });


  return (
    <div className="contenedor">
      <NavBar />
      <div className="ventas">
        <div className="ventas__filtros">
          <select
            name="estado"
            id="estado"
            onChange={(e) => filterestado(e.target.value, document.getElementById("estado").value)}
          >
            <option value="todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Archivado">Archivado</option>
          </select>
          <select
            name="vendedor"
            id="vendedor"
            onChange={(e) => filtervendedor(e.target.value, document.getElementById("vendedor").value)}
          >
            <option value="todos">Todos</option>
            <option value="1">Matias</option>
            <option value="2">Marcos</option>
            <option value="3">Lucas</option>
            <option value="4">Juan</option>
            <option value="5">Maria</option>
          </select>
        </div>

         
         

        <div className="ventas__table">
          <table>
            <thead>
              <tr>
                <th>Numero de venta</th>
                <th>Apellido</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>hora</th>
                <th>Estado</th>
                <th>Vendedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredVentas.length === 0 && ventas.length > 0 && ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.idventa}</td>
                    <td>{venta.apellido}</td>
                    <td>{venta.total}</td>
                    <td>{venta.fechaActual}</td>
                    <td>{venta.horacompleta}</td>
                    <td>
                      {venta.estado === "Cancelado" ? (
                        <p className="cancelado">{venta.estado}</p>
                      ) : null}
                      {venta.estado === "Entregado" ? (
                        <p className="entregado">{venta.estado}</p>
                      ) : null}
                      {venta.estado === "Pendiente" ? (
                        <p className="pendiente">{venta.estado}</p>
                      ) : null}
                                            {venta.estado === "Archivado" ? (
                        <p className="Archivado">{venta.estado}</p>
                      ) : null}

                    </td>
                    <td>
                      {searchClient(venta.idcliente) === 1 ? (
                        <p className="vendedor"> matias</p>
                      ) : null}
                      {searchClient(venta.idcliente) === 2 ? (
                        <p className="vendedor"> marcos</p>
                      ) : null}
                      {searchClient(venta.idcliente) === 3 ? (
                        <p className="vendedor"> lucas</p>
                      ) : null}
                      {searchClient(venta.idcliente) === 4 ? (
                        <p className="vendedor"> juan</p>
                      ) : null}
                      {searchClient(venta.idcliente) === 5 ? (
                        <p className="vendedor"> maria</p>
                      ) : null}
                    </td>
                        
                    <td>
                      <button onClick={() => changeStateEntregado(venta.id)}>
                        Entregado
                      </button>
                      <button onClick={() => changeStateCancelado(venta.id)}>
                        Cancelar
                      </button>
                      <button onClick={() => changeStateArchivado(venta.id)}>Archivar</button>
                    </td>
                  </tr>
                ))}

              
              {filteredVentas.length > 0 && filteredVentas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.idventa}</td>
                    <td>{venta.apellido}</td>
                    <td>{venta.totalAmount}</td>
                    <td>{venta.fechaActual}</td>
                    <td>{venta.horacompleta}</td>
                    <td>
                      {venta.estado === "Cancelado" ? (
                        <p className="cancelado">{venta.estado}</p>
                      ) : null}
                      {venta.estado === "Entregado" ? (
                        <p className="entregado">{venta.estado}</p>
                      ) : null}
                      {venta.estado === "Pendiente" ? (
                        <p className="pendiente">{venta.estado}</p>
                      ) : null}
                                            {venta.estado === "Archivado" ? (
                        <p className="Archivado">{venta.estado}</p>
                      ) : null}

                    </td>
                    <td>
                      {searchClient(venta.idcliente) === 1 ? (
                        <p className="vendedor"> matias</p>
                      ) : null}
                      {searchClient(venta.idcliente) === 2 ? (
                        <p className="vendedor"> marcos</p>
                      ) : null}
                      {searchClient(venta.idcliente) === 3 ? (
                        <p className="vendedor"> lucas</p>
                      ) : null}
                      {searchClient(venta.idcliente) === 4 ? (
                        <p className="vendedor"> juan</p>
                      ) : null}
                      {searchClient(venta.idcliente) === 5 ? (
                        <p className="vendedor"> maria</p>
                      ) : null}
                    </td>

                    <td>

                      
                      <button onClick={() => changeStateEntregado(venta.id)}>
                        Entregado
                      </button>
                      <button onClick={() => changeStateCancelado(venta.id)}>
                        Cancelar
                      </button>
                      <button onClick={() => changeStateArchivado(venta.id)}>Archivar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<ToastContainer />
    </div>
  );
};

export default Ventas;
