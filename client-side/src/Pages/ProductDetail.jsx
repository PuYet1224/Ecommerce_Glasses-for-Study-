import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import plusIcon from '../Components/Assets/plus-solid.svg';
import '../CSS/ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState({ info: true, refund: false, ship: false });

  useEffect(() => {
    API.post(`/product/publish/slug/${slug}`)
      .then(res => setProduct(res.data.metadata))
      .catch(console.error);
  }, [slug]);

  if (!product) return <div>Loading…</div>;

  return (
    <div className="main">
      <header className="top-p"><p>Product Detail</p></header>
      <div className="product-detail-container">
        <section className="left-pd">
          <img
            src={`http://localhost:3056/${product.product_image}`.replace(/\\/g, '/')}
            alt={product.product_name}
          />
          <h1>{product.product_name}</h1>
          <p>Price: ${product.product_price}</p>
          <p>{product.product_description}</p>
          <p>Gender: {product.product_genderOptions}</p>
          <p>ID: {product.product_id}</p>
          <button>Add to cart</button>
        </section>
        <section className="right-pd">
          {[
            { key: 'info', title: 'PRODUCT INFO' },
            { key: 'refund', title: 'RETURN & REFUND POLICY' },
            { key: 'ship', title: 'SHIPPING INFO' }
          ].map(({ key, title }) => (
            <div className="product-des" key={key}>
              <div>
                <p>{title}</p>
                <button onClick={() => setOpen(prev => ({ ...prev, [key]: !prev[key] }))}>
                  <img src={plusIcon} alt="" />
                </button>
              </div>
              <p id="desc" className={open[key] ? 'show-desc' : 'hidden-desc'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
