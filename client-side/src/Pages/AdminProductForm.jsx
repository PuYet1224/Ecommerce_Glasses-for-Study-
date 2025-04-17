import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { fetchOne, saveProduct } from '../services/adminProduct';
import '../CSS/AdminProductForm.css'
const init = {
  product_name:'', product_type:'Glasses', product_price:0,
  product_description:'', product_genderOptions:'unisex',
  product_status:'active', product_image:null
};

export default function AdminProductForm() {
  const { user }   = useContext(AuthContext);
  const { id: slug } = useParams();         
  const nav        = useNavigate();
  const [v,setV]   = useState(init);

  /* load khi edit */
  useEffect(()=>{
    if (user && slug)
      fetchOne(slug).then(d=>setV({...d, product_image:null}));
  },[user,slug]);

  if (!user) return <Navigate to="/login" replace/>;

  const onChange = e =>{
    const {name,value,files} = e.target;
    setV(s=>({...s,[name]: files? files[0] : value}));
  };

  const onSubmit = async e =>{
    e.preventDefault();
    const fd = new FormData();
    Object.entries(v).forEach(([k,val])=>{
      if (val!==null && val!=='') fd.append(k,val);
    });
    if (v.product_id) fd.append('product_id', v.product_id); // khi sửa
    await saveProduct(fd);
    nav('/admin/products');
  };

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2>{slug ? 'Edit' : 'New'} Product</h2>

      <label>Name
        <input type="text" name="product_name" value={v.product_name} onChange={onChange} required/>
      </label>

      <label>Type
        <select name="product_type" value={v.product_type} onChange={onChange}>
          {['Glasses','Sunglasses','Optics'].map(t=><option key={t}>{t}</option>)}
        </select>
      </label>

      <label>Price
        <input type="number" name="product_price" value={v.product_price} onChange={onChange} required/>
      </label>

      <label>Gender
        <select name="product_genderOptions" value={v.product_genderOptions} onChange={onChange}>
          {['male','female','unisex'].map(g=><option key={g}>{g}</option>)}
        </select>
      </label>

      <label>Status
        <select name="product_status" value={v.product_status} onChange={onChange}>
          {['active','inactive'].map(s=><option key={s}>{s}</option>)}
        </select>
      </label>

      <label>Description
        <textarea name="product_description" value={v.product_description} onChange={onChange}/>
      </label>

      <label>Image
        <input type="file" name="product_image" accept="image/*" onChange={onChange}/>
      </label>

      <button type="submit">Save</button>
      <button type="button" onClick={()=>nav(-1)}>Cancel</button>
    </form>
  );
}
