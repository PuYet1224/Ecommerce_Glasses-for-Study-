// src/Components/Navbar/Navbar.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

import './Navbar.css';
import logo      from '../Assets/logo.png';
import userIcon  from '../Assets/circle-user-solid.png';

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
          <Link to="/"           onClick={close}><li>HOME</li></Link>
          <Link to="/sunglasses" onClick={close}><li>SUNGLASSES</li></Link>
          <Link to="/optics"     onClick={close}><li>OPTICS</li></Link>
          <Link to="/glasses"    onClick={close}><li>GLASSES</li></Link>
          <Link to="/about"      onClick={close}><li>ABOUT</li></Link>
          <Link to="/contact"    onClick={close}><li>CONTACT</li></Link>

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
      </div>
    </header>
  );
}
