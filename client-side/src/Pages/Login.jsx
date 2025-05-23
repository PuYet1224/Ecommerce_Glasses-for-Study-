import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { login as loginApi } from '../services/auth';
import { AuthContext } from '../Context/AuthContext';
import '../CSS/Login.css';
import facebook_icon from '../Components/Assets/facebook-img.png';
import google_icon   from '../Components/Assets/google-img.png';

const Login = () => {
  const [v, setV] = useState({ email: '', password: '' });
  const [e, setE] = useState({});
  const nav        = useNavigate();
  const { user, login } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const validate = o => {
    const r = {};
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!o.email)        r.email    = 'Email is required';
    else if (!re.test(o.email)) r.email = 'Invalid email';
    if (!o.password)     r.password = 'Password is required';
    return r;
  };

  const submit = async f => {
    f.preventDefault();
    const er = validate(v);
    setE(er);
    if (Object.keys(er).length) return;

    try {
      const { metadata } = await loginApi(v.email, v.password);
      localStorage.setItem('accessToken',  metadata.tokens.accessToken);
      localStorage.setItem('refreshToken', metadata.tokens.refreshToken);
      login({ id: metadata.admin._id, name: metadata.admin.name });
      nav('/');
    } catch (err) {
      setE({ server: err.response?.data?.message || 'Login failed' });
    }
  };

  return (
    <div className="container">
      <form onSubmit={submit}>
        <h1>Login</h1>
        <div className="ui form">
          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={v.email}
              onChange={e => setV({ ...v, email: e.target.value })}
            />
          </div>
          <p className="error">{e.email}</p>

          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={v.password}
              onChange={e => setV({ ...v, password: e.target.value })}
            />
          </div>
          <p className="error">{e.password}</p>

          <button className="fluid ui button blue">Login</button>
          <p className="server-error">{e.server}</p>
        </div>
      </form>

      <div className="text">
        Don't have an account?&nbsp;
        <span
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => nav('/signup')}
        >
          Sign Up
        </span>
      </div>

      <div className="hint">or login with</div>
      <div className="fb-gg-icon">
        <img src={facebook_icon} alt="facebook login"/>
        <img src={google_icon}   alt="google login"/>
      </div>
    </div>
  );
};

export default Login;
