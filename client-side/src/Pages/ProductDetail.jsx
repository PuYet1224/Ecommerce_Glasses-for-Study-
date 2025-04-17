import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/ProductDetail.css";
import plus_icon from "../Components/Assets/plus-solid.svg";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [showProductInfo, setShowProductInfo] = useState(true);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);

  const toggleProductInfo = () => {
    setShowProductInfo(!showProductInfo);
  };

  const toggleReturnPolicy = () => {
    setShowReturnPolicy(!showReturnPolicy);
  };

  const toggleShippingInfo = () => {
    setShowShippingInfo(!showShippingInfo);
  };

  useEffect(() => {
    fetch(`http://localhost:3056/api/sunglasses/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="main">
      <div className="top-p">
        <p>Product Detail</p>
        <div></div>
        <div></div>
      </div>
      <div className="product-detail-container">
        <div className="left-pd">
          <img
            src={`http://localhost:3056/uploads/${product.imageUrl}`}
            alt={product.name}
          />
          <h1>{product.name}</h1>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <p>ID: {product._id}</p>
          <button>Add to cart</button>
        </div>
        <div className="right-pd">
          <div className="product-des">
            <div>
              <p>PRODUCT INFO</p>
              <button onClick={toggleProductInfo}>
                <img src={plus_icon} alt="" />
              </button>
            </div>
            <p
              id="desc"
              className={showProductInfo ? "show-desc" : "hidden-desc"}
            >
              I'm a product detail. I'm a great place to add more information
              about your product such as sizing, material, care and cleaning
              instructions. This is also a great space to write what makes this
              product special and how your customers can benefit from this item.
              Buyers like to know what they’re getting before they purchase, so
              give them as much information as possible so they can buy with
              confidence and certainty.
            </p>
          </div>
          <div className="product-des">
            <div>
              <p>RETURN & REFUND POLICY</p>
              <button onClick={toggleReturnPolicy}>
                <img src={plus_icon} alt="" />
              </button>
            </div>
            <p
              id="desc"
              className={showReturnPolicy ? "show-desc" : "hidden-desc"}
            >
              I’m a Return and Refund policy. I’m a great place to let your
              customers know what to do in case they are dissatisfied with their
              purchase. Having a straightforward refund or exchange policy is a
              great way to build trust and reassure your customers that they can
              buy with confidence.
            </p>
          </div>
          <div className="product-des">
            <div>
              <p>SHIPPING INFO</p>
              <button onClick={toggleShippingInfo}>
                <img src={plus_icon} alt="" />
              </button>
            </div>
            <p
              id="desc"
              className={showShippingInfo ? "show-desc" : "hidden-desc"}
            >
              I'm a shipping policy. I'm a great place to add more information
              about your shipping methods, packaging and cost. Providing
              straightforward information about your shipping policy is a great
              way to build trust and reassure your customers that they can buy
              from you with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
