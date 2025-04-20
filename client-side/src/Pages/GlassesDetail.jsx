import { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { getProduct } from '../services/product';
import '../CSS/ProductDetail.css';
import plusIcon from '../Components/Assets/plus-solid.svg';

const GlassesDetail = () => {
  const { user } = useContext(AuthContext);
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (user) getProduct(slug).then(setProduct).catch(console.error);
  }, [user, slug]);

  if (!user)      return <Navigate to="/login" replace />;
  if (!product)   return <div>Loading…</div>;

  return (
    <div className="main">
      <header className="top-p"><p>Product Detail</p></header>
      <div className="product-detail-container">
        <section className="left-pd">
          <img src={`http://localhost:3056/${product.product_image}`.replace(/\\/g,'/')} alt={product.product_name}/>
          <h1>{product.product_name}</h1>
          <p>Price: ${product.product_price}</p>
          <p>{product.product_description}</p>
          <p>Gender: {product.product_genderOptions}</p>
          {/* <p>ID: {product.product_id}</p> */}
          <button>Add to cart</button>
        </section>
        <section className="right-pd">
          <Accordion title="PRODUCT INFO"/>
          <Accordion title="RETURN & REFUND POLICY"/>
          <Accordion title="SHIPPING INFO"/>
        </section>
      </div>
    </div>
  );
};

const Accordion = ({ title }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="product-des">
      <div>
        <p>{title}</p>
        <button onClick={() => setOpen(o => !o)}>
          <img src={plusIcon} alt="toggle"/>
        </button>
      </div>
      <p id="desc" className={open ? 'show-desc' : 'hidden-desc'}>
        …
      </p>
    </div>
  );
};

export default GlassesDetail;
