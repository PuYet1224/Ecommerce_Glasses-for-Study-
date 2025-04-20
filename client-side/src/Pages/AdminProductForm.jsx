import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { fetchOne, saveProduct } from '../services/adminProduct';
import '../CSS/AdminProductForm.css';

const init = {
  product_id: '',
  product_name: '',
  product_type: 'Glasses',
  product_price: 0,
  product_description: '',
  product_genderOptions: 'unisex',
  product_status: 'active',
  product_image: null  
};

export default function AdminProductForm() {
  const { user }   = useContext(AuthContext);
  const { id: slug } = useParams();    
  const nav        = useNavigate();
  const [v, setV]  = useState(init);


  useEffect(() => {
    if (user && slug) {
      fetchOne(slug).then(data => {
        setV({
          product_id: data.product_id,
          product_name: data.product_name,
          product_type: data.product_type,
          product_price: data.product_price,
          product_description: data.product_description,
          product_genderOptions: data.product_genderOptions,
          product_status: data.product_status,
          product_image: null
        });
      }).catch(console.error);
    }
  }, [user, slug]);

  if (!user) return <Navigate to="/login" replace />;

  const onChange = e => {
    const { name, files, value } = e.target;
    setV(s => ({
      ...s,
      [name]: files ? files[0] : value
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('product_name', v.product_name);
    fd.append('product_type', v.product_type);
    fd.append('product_price', v.product_price);
    fd.append('product_description', v.product_description);
    fd.append('product_genderOptions', v.product_genderOptions);
    fd.append('product_status', v.product_status);
    if (v.product_id) fd.append('product_id', v.product_id);
    if (v.product_image instanceof File) {
      fd.append('product_image', v.product_image);
    }
    await saveProduct(fd);
    nav('/admin/products');
  };

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2>{slug ? 'Edit' : 'New'} Product</h2>

      <label>
        Name
        <input
          type="text"
          name="product_name"
          value={v.product_name}
          onChange={onChange}
          required
        />
      </label>

      <label>
        Type
        <select
          name="product_type"
          value={v.product_type}
          onChange={onChange}
        >
          {['Glasses','Sunglasses','Optics'].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>

      <label>
        Price
        <input
          type="number"
          name="product_price"
          value={v.product_price}
          onChange={onChange}
          required
        />
      </label>

      <label>
        Gender
        <select
          name="product_genderOptions"
          value={v.product_genderOptions}
          onChange={onChange}
        >
          {['male','female','unisex'].map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </label>

      <label>
        Status
        <select
          name="product_status"
          value={v.product_status}
          onChange={onChange}
        >
          {['active','inactive'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <label>
        Description
        <textarea
          name="product_description"
          value={v.product_description}
          onChange={onChange}
        />
      </label>

      <label>
        {slug ? 'Change Image' : 'Upload Image'}
        <input
          type="file"
          name="product_image"
          accept="image/*"
          onChange={onChange}
        />
      </label>

      <button type="submit">Save</button>
      <button type="button" onClick={() => nav(-1)}>Cancel</button>
    </form>
  );
}
