import { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { getProduct } from '../services/product';
import '../CSS/ProductDetail.css';
import plusIcon from '../Components/Assets/plus-solid.svg';

const SunglassesDetail = () => {
  const { user } = useContext(AuthContext);
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [o, setO] = useState({ info: true, refund: false, ship: false });

  useEffect(() => {
    if (user) getProduct(slug).then(setP).catch(console.error);
  }, [user, slug]);

  if (!user) return <Navigate to="/login" replace />;
  if (!p)    return <div>Loading…</div>;

  return (
    <div className="main">
      <header className="top-p"><p>Product Detail</p></header>
      <div className="product-detail-container">
        <section className="left-pd">
          <img src={`http://localhost:3056/${p.product_image}`.replace(/\\/g, '/')} alt={p.product_name}/>
          <h1>{p.product_name}</h1>
          <p>Price: ${p.product_price}</p>
          <p>{p.product_description}</p>
          <p>Gender: {p.product_genderOptions}</p>
          <p>ID: {p.product_id}</p>
          <button>Add to cart</button>
        </section>

        <section className="right-pd">
          {['info', 'refund', 'ship'].map((k, i) => (
            <div className="product-des" key={k}>
              <div>
                <p>{['PRODUCT INFO', 'RETURN & REFUND POLICY', 'SHIPPING INFO'][i]}</p>
                <button onClick={() => setO(s => ({ ...s, [k]: !s[k] }))}>
                  <img src={plusIcon} alt="toggle"/>
                </button>
              </div>
              <p id="desc" className={o[k] ? 'show-desc' : 'hidden-desc'}>…</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SunglassesDetail;
