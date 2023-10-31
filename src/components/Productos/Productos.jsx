
import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'

import './Productos.css'



const Productos = () => {

    const url = 'https://apimocha.com/lettproduct/products'
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setProducts(json))
  }
  , [])
    
  return (
    <div className='contenedor'>
    <NavBar />
    <div className='productos'>
      <div className='productos__search'>
        <input type='text' placeholder='Buscar producto' onChange={e => setSearch(e.target.value)} />
      </div>
      <div className='productos__table'>
        <table>
          <thead>
            <tr>
            <th>Imagen</th>
              <th>Nombre</th>
              <th>Comercio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.filter((val) => {
              if (search === '') {
                return val
              } else if (val.nombre.toLowerCase().includes(search.toLowerCase())) {
                return val
              }
            }).map((product) => (
              <tr key={product.id}>
                <td><img className='image' src={product.image} alt="" /></td>
                <td>{product.nombre}</td>
                <td>{product.comercio}</td>
                <td>{product.estado}</td>
                <td>
                  <button>Editar</button>
                  <button>Eliminar</button>
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

export default Productos