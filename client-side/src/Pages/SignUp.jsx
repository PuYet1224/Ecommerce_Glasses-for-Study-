import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth';
import '../CSS/SignUp.css';
import facebook_icon from '../Components/Assets/facebook-img.png';
import google_icon from '../Components/Assets/google-img.png';

const Signup = () => {
  const [v, setV] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [e, setE] = useState({});
  const nav = useNavigate();

  const validate = o => {
    const r = {};
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!o.name) r.name = 'Name is required';
    if (!o.email) r.email = 'Email is required';
    else if (!re.test(o.email)) r.email = 'Invalid email';
    if (!o.password) r.password = 'Password is required';
    if (!o.confirmPassword) r.confirmPassword = 'Confirm password is required';
    else if (o.password !== o.confirmPassword) r.confirmPassword = 'Passwords do not match';
    return r;
  };

  const submit = async f => {
    f.preventDefault();
    const er = validate(v);
    setE(er);
    if (Object.keys(er).length) return;
    try {
      await signup(v.name, v.email, v.password);
      nav('/login');
    } catch (err) {
      setE({ server: err.response?.data?.message || 'Signup failed' });
    }
  };

  return (
    <div className="container">
      <form onSubmit={submit}>
        <h1>Sign Up</h1>
        <div className="ui form">
          <div className="field">
            <input type="text" name="name" placeholder="Name" value={v.name} onChange={e => setV({ ...v, name: e.target.value })}/>
          </div>
          <p>{e.name}</p>
          <div className="field">
            <input type="text" name="email" placeholder="Email" value={v.email} onChange={e => setV({ ...v, email: e.target.value })}/>
          </div>
          <p>{e.email}</p>
          <div className="field">
            <input type="password" name="password" placeholder="Password" value={v.password} onChange={e => setV({ ...v, password: e.target.value })}/>
          </div>
          <p>{e.password}</p>
          <div className="field">
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={v.confirmPassword} onChange={e => setV({ ...v, confirmPassword: e.target.value })}/>
          </div>
          <p>{e.confirmPassword}</p>
          <button className="fluid ui button blue">Sign Up</button>
          <p style={{color:'red'}}>{e.server}</p>
        </div>
      </form>
      <div className="text">Already have an account? <span style={{cursor:'pointer',color:'blue'}} onClick={()=>nav('/login')}>Login</span></div>
      <div className="hint">or sign up with</div>
      <div className="fb-gg-icon">
        <img src={facebook_icon} alt="facebook"/>
        <img src={google_icon} alt="google"/>
      </div>
    </div>
  );
};
export default Signup;
