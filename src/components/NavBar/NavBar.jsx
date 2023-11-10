import {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { BiHomeAlt2 } from 'react-icons/bi'
import { ImStatsBars } from 'react-icons/im'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { BsCalendar3 } from 'react-icons/bs'
import { MdOutlineLabel } from 'react-icons/md'
import { IoExitOutline } from 'react-icons/io5'




import './NavBar.css'

const NavBar = () => {
  


    
  return (
    <div className='navbar-lateral'>
      <div className='navbar-lateral__user'>
      </div>
      <div className='navbar-lateral__logo'>
        <Link to='/home'>
        <img src={logo} alt='logo' />
        </Link>
      </div>
      <div className='navbar__menu'>
        <ul>
          <li>
            <NavLink to='/home' className={({ isActive }) =>
                                "nav-links" + (isActive ? " activated" : "")
                            }>
                < BiHomeAlt2 color='#ffff'/>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard'  className={({ isActive }) =>
                                "nav-links" + (isActive ? " activated" : "")
                            }>
                                <ImStatsBars color='#ffff'/>
              <span>Estadisticas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/ventas' className={({ isActive }) =>
                                "nav-links" + (isActive ? " activated" : "")
                            }>
                                < MdOutlineAttachMoney color='#ffff'/>
              <span>Ventas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/clientes'  className={({ isActive }) =>
                                "nav-links" + (isActive ? " activated" : "")
                            }>
                                <BsFillPeopleFill color='#ffff'/>
              <span>Clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/evento'  className={({ isActive }) =>
                                "nav-links" + (isActive ? " activated" : "")
                            }>
                                < BsCalendar3 color='#ffff'/>
              <span>Evento</span>
            </NavLink>
          </li>
            <li>
                <NavLink to='/productos'  className={({ isActive }) =>
                                "nav-links" + (isActive ? " activated" : "")
                            }>
                                < MdOutlineLabel color='#ffff'/>
                <span>Productos</span>
                </NavLink>
            </li>
          <li>
            <NavLink to='/'   className={({ isActive }) =>
                                "nav-links" + (isActive ? " activated" : "")
                            }>
                                <IoExitOutline color='#ffff'/>
              <span>Salir</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    
    )
}

export default NavBar