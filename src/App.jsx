import './App.css'
import Login from './components/Login/Login'
import { Routes, Route  } from 'react-router-dom'
import Home from './components/Home/Home'
import Productos from './components/Productos/Productos'
import Ventas from './components/Ventas/Ventas'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/ventas" element={<Ventas />} />

    </Routes>
    
    </>
  )
}

export default App
