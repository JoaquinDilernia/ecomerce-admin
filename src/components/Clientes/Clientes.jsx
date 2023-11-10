import { useState, useEffect } from "react"
import NavBar from "../NavBar/NavBar"

const Clientes = () => {

    const url = 'https://apimocha.com/lettproduct/clientes'
    const [clientes, setClientes] = useState([])
    const [search, setSearch] = useState('')
    const [filteredClientes, setFilteredClientes] = useState([])


    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setClientes(json))
    }
        , [])



  return (
    <div className='contenedor'>
    <NavBar />
    <div className='productos'>
      <div className='productos__search'>
        <input type='text' placeholder='Buscar cliente' onChange={e => setSearch(e.target.value)} />
      </div>
      <div className='productos__table'>
        <table>
          <thead>
            <tr>
            <th>Razon Social</th>
              <th>Tipo</th>
              <th>CUIT</th>
              <th>Vendedor</th>
            </tr>
          </thead>
          <tbody>
            {clientes.filter((val) => {
              if (search === '') {
                return val
              } else if (val.nombre.toLowerCase().includes(search.toLowerCase())) {
                return val
              }
            }).map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.razon_social}</td>
                <td>{cliente.tipo}</td>
                <td>{cliente.cuit}</td>
                <td>
                    {cliente.vendedor === 0 ? <p></p> : null}
                    {cliente.vendedor === 1 ? <p>Matias</p> : null }
                    {cliente.vendedor === 2 ? <p>Lucas</p> : null }
                    {cliente.vendedor === 3 ? <p>Agustin</p> : null }
                    {cliente.vendedor === 4 ? <p>Sebastian</p> : null }
                    {cliente.vendedor === 5 ? <p>Diego</p> : null }
                    {cliente.vendedor === 6 ? <p>Matias</p> : null }
                    {cliente.vendedor === 7 ? <p>Matias</p> : null }
                </td>
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

export default Clientes