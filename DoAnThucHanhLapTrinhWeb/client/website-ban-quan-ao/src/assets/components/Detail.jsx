import Footer from "./Footer";
import NavBar from "./NavBar";
import "./Detail.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState("");
  useEffect(() => {
    fetch(`http://localhost:3000/server/product/getDetailProduct.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
      })
      .catch();
  }, [id]);
  return (
    <>
      <NavBar />
      <div className="product-container">
        <div className="product-image">
          <img src={product.image_url} alt="" />
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price}000 VND</p>
          <div className="add-cart">
            <div className="qty">
              <button>-</button>
              <input type="text" value="1" readOnly />
              <button>+</button>
            </div>
            <button>ADD TO CART</button>
          </div>
          <div className="availability">
            <strong>Availability:</strong>
            <p>{product.stock_quantity}</p>
          </div>
          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
