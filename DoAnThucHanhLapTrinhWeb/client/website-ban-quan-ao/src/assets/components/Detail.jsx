import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AppContext from "./AppContext";
import Footer from "./Footer";
import UserNavBar from "./UserNavbar";
import "./Detail.css";
export default function Detail() {
  const { user, isLogin } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getProducts.php?product_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
      })
      .catch();
  }, [id]);
  const handleClick = (product) => {
    if (!isLogin) {
      alert("Bạn chưa đăng nhập");
      return;
    }
    const formData = new FormData();
    formData.append("user_id", user.user_id);
    formData.append("product_id", id);
    formData.append("product_name", product.name);
    formData.append("product_image", product.image_url);
    formData.append("product_price", product.price);
    formData.append("quantity", quantity);
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        alert(data);
      });
  };
  return (
    <>
      <UserNavBar />
      <div className="product-container">
        <div className="product-image">
          <img src={product.image_url} alt="" />
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price}000 VND</p>
          <div className="add-cart">
            <div className="qty">
              <button
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
              >
                -
              </button>
              <input
                type="text"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                value={quantity}
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button onClick={() => handleClick(product)}>ADD TO CART</button>
          </div>
          <div className="availability">
            <strong>Status:</strong>
            <p>{product.stock_quantity > 0 ? "Còn hàng" : "Hết hàng"}</p>
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
