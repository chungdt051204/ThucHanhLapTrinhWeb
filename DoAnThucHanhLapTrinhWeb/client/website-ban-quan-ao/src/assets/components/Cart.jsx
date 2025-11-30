import { useContext, useEffect } from "react";
import AppContext from "./AppContext";
import React, { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./Cart.css";

export default function Cart_page() {
  const { user } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/server/cart/cart.php?user_id=${user.user_id}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setCartItems(data);
      })
      .catch();
  }, [user.user_id]);
  return (
    <section className="cart">
      <NavBar />
      <table class="cart-table">
        <thead>
          <tr>
            <th class="cart-col product">Sản Phẩm</th>
            <th class="cart-col price">Đơn Giá</th>
            <th class="cart-col quantity">Số Lượng</th>
            <th class="cart-col total">Số Tiền</th>
            <th class="cart-col action">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 &&
            cartItems.map((value, index) => {
              return (
                <tr key={index} class="cart-item">
                  <td class="cart-product">
                    <input type="checkbox" class="cart-checkbox" />
                    <img src={value.image_url} class="cart-image" />
                    <div class="cart-info">
                      <h4 class="cart-name">{value.name}</h4>
                    </div>
                  </td>
                  <td class="cart-price">{value.price}000 VND</td>

                  <td class="cart-quantity">
                    <input type="text" defaultValue={value.quantity} />
                  </td>

                  <td class="cart-total">{value.total}000 VND</td>

                  <td class="cart-action">
                    <button class="remove-btn">Xóa</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="cart-footer">
        <div className="left">
          <input type="checkbox" />
          <span>Chọn tất cả</span>
          <button className="delete-all">Xóa</button>
        </div>

        <div className="right">
          <span className="total-label">Tổng cộng sản phẩm:</span>
          <span className="total-price">₫</span>
          <button className="checkout-btn">Mua Hàng</button>
        </div>
      </div>

      <Footer />
    </section>
  );
}
