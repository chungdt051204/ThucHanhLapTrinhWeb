import { useContext, useEffect } from "react";
import AppContext from "./AppContext";
import React, { useState } from "react";
import Footer from "./Footer";
import UserNavbar from "./UserNavbar";
import "./Cart.css";

export default function Cart_page() {
  const { user, refresh, setRefresh } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [arrIdItemSelected, setArrIdItemSelected] = useState([]);
  let tong = 0;
  cartItems.forEach((value) => {
    tong = tong + parseFloat(value.total);
  });
  useEffect(() => {
    fetch(
      `http://localhost:3000/server/cart/quanLyGioHang.php?user_id=${user.user_id}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        console.log(data);
        setCartItems(data);
      })
      .catch();
  }, [user.user_id, refresh]);
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/server/cart/quanLyGioHang.php?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        setRefresh((prev) => prev + 1);
      })
      .catch();
  };
  const handleItemChecked = (id) => {
    if (!arrIdItemSelected.includes(id)) {
      setArrIdItemSelected([...arrIdItemSelected, id]);
    } else {
      const newArr = arrIdItemSelected.filter((value) => value != id);
      setArrIdItemSelected(newArr);
    }
  };
  const handleDeleteItemsSelected = () => {
    fetch(`http://localhost:3000/server/cart/quanLyGioHang.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ arrId: arrIdItemSelected }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        alert(message);
      });
  };
  const handleIncrementQuantity = (quantity, id) => {
    const newQuantity = quantity + 1;
    fetch(`http://localhost:3000/server/cart/quanLyGioHang.php?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newQuantity: newQuantity }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        console.log(message);
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        console.log(message);
      });
  };
  const handleDecrementQuantity = (quantity, id) => {
    if (quantity <= 1) return;
    else {
      const newQuantity = quantity - 1;
      fetch(`http://localhost:3000/server/cart/quanLyGioHang.php?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newQuantity: newQuantity }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw res;
        })
        .then(({ message }) => {
          console.log(message);
          setRefresh((prev) => prev + 1);
        })
        .catch(async (err) => {
          const { message } = await err.json();
          console.log(message);
        });
    }
  };
  return (
    <section className="cart">
      <UserNavbar />
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
                    <input
                      type="checkbox"
                      checked={arrIdItemSelected.includes(value.order_item_id)}
                      onChange={() => handleItemChecked(value.order_item_id)}
                      class="cart-checkbox"
                    />
                    <img src={value.image_url} class="cart-image" />
                    <div class="cart-info">
                      <h4 class="cart-name">{value.name}</h4>
                    </div>
                  </td>
                  <td class="cart-price">{value.price}000 VND</td>
                  <td class="cart-quantity">
                    <button
                      onClick={() => {
                        handleDecrementQuantity(
                          value.quantity,
                          value.order_item_id
                        );
                      }}
                    >
                      -
                    </button>
                    <input type="text" value={value.quantity} readOnly />
                    <button
                      onClick={() => {
                        handleIncrementQuantity(
                          value.quantity,
                          value.order_item_id
                        );
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td class="cart-total">{value.total}000 VND</td>
                  <td class="cart-action">
                    <button
                      onClick={() => handleDelete(value.order_item_id)}
                      class="remove-btn"
                    >
                      Xóa
                    </button>
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
          <button onClick={handleDeleteItemsSelected} className="delete-all">
            Xóa
          </button>
        </div>

        <div className="right">
          <span className="total-label">Tổng cộng sản phẩm:</span>
          <span className="total-price">{tong}000 VND</span>
          <button className="checkout-btn">Mua Hàng</button>
        </div>
      </div>
      <Footer />
    </section>
  );
}
