// src/Components/Navbar/Navbar.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

import './Navbar.css';
import logo      from '../Assets/logo.png';
import userIcon  from '../Assets/circle-user-solid.png';
import cartIcon  from '../Assets/cart-shopping-solid.png';
import barsIcon  from '../Assets/bars-solid (2).svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const close = () => setOpen(false);

  const onLogout = () => {
    logout();
    nav('/login');
    close();
  };

  return (
    <header className="nav-container">
      {/* logo */}
      <Link className="logo-container" to="/" onClick={close}>
        <img src={logo} alt="logo"/>
      </Link>

      {/* desktop / mobile menu */}
      <nav className={`menu-items ${open ? 'open' : ''}`}>
        <ul>
          <li><Link to="/"           onClick={close}>HOME</Link></li>
          <li><Link to="/sunglasses" onClick={close}>SUNGLASSES</Link></li>
          <li><Link to="/optics"     onClick={close}>OPTICS</Link></li>
          <li><Link to="/about"      onClick={close}>ABOUT</Link></li>
          <li><Link to="/contact"    onClick={close}>CONTACT</Link></li>
          <li><Link to="/glasses"    onClick={close}>GLASSES</Link></li>

          {/* chỉ admin đăng nhập mới thấy */}
          {user && (
            <li><Link to="/admin/products" onClick={close}>ADMIN</Link></li>
          )}
        </ul>
      </nav>

      {/* user + cart */}
      <div className="user-cart">
        <div className="user">
          <img src={userIcon} alt="user"/>
          {user
            ? <span onClick={onLogout} style={{cursor:'pointer'}}>Logout</span>
            : <Link to="/login">Log In</Link>}
        </div>

        <div className="cart">
          <Link to="/cart" onClick={close}>
            <img src={cartIcon} alt="cart"/>
            <div className="counter">0</div>
          </Link>
        </div>
      </div>

      {/* hamburger */}
      <img className="bars" src={barsIcon} alt="menu" onClick={() => setOpen(o=>!o)}/>
    </header>
  );
}
