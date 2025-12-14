import { useContext, useEffect, useRef } from "react";
import AppContext from "./AppContext";
import React, { useState } from "react";
import Footer from "./Footer";
import UserNavbar from "./UserNavbar";
import "./Cart.css";
export default function Cart_page() {
  const { user, refresh, setRefresh } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [arrIdItemSelected, setArrIdItemSelected] = useState([]);
  const dialog = useRef();
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  let tong = 0;
  cartItems.forEach((value) => {
    if (arrIdItemSelected.includes(value.cart_item_id))
      tong = tong + parseFloat(value.price * value.quantity);
  });
  useEffect(() => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php?user_id=${user.user_id}`
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
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php?id=${id}`,
      {
        method: "DELETE",
      }
    )
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
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ arrId: arrIdItemSelected }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        setArrIdItemSelected([]); // Xóa các item đã chọn khỏi danh sách
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        alert(message);
      });
  };
  const handleIncrementQuantity = (quantity, id) => {
    const newQuantity = quantity + 1;
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newQuantity: newQuantity }),
      }
    )
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
      fetch(
        `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newQuantity: newQuantity }),
        }
      )
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
  const handleCheckout = () => {
    if (tong == 0) {
      alert("Bạn chưa chọn sản phẩm cần mua");
      return;
    } else {
      dialog.current.showModal();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newArr = cartItems.filter((value) =>
      arrIdItemSelected.includes(value.cart_item_id)
    );
    const orderData = {
      fullName: fullNameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      paymentMethod: paymentMethod,
      user_id: user.user_id,
      tong: tong,
      arrItem: newArr,
    };
    fetch("http://localhost:3000/server/order/order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        dialog.current.close();
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        console.log(message);
      });
  };
  return (
    <section className="cart">
      <UserNavbar />
      <table className="cart-table">
        <thead>
          <tr>
            <th className="cart-col product">Sản Phẩm</th>
            <th className="cart-col price">Đơn Giá</th>
            <th className="cart-col quantity">Số Lượng</th>
            <th className="cart-col total">Số Tiền</th>
            <th className="cart-col action">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 &&
            cartItems.map((value, index) => {
              return (
                <tr key={index} className="cart-item">
                  <td className="cart-product">
                    <input
                      type="checkbox"
                      checked={arrIdItemSelected.includes(value.cart_item_id)}
                      onChange={() => handleItemChecked(value.cart_item_id)}
                      className="cart-checkbox"
                    />
                    <img
                      src={value.image_url}
                      className="cart-image"
                      alt={value.name}
                    />
                    <div className="cart-info">
                      <h4 className="cart-name">{value.name}</h4>
                    </div>
                  </td>
                  <td className="cart-price">{value.price}000 VND</td>
                  <td className="cart-quantity">
                    <button
                      onClick={() => {
                        handleDecrementQuantity(
                          value.quantity,
                          value.cart_item_id
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
                          value.cart_item_id
                        );
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td className="cart-total">{value.total}000 VND</td>
                  <td className="cart-action">
                    <button
                      onClick={() => handleDelete(value.cart_item_id)}
                      className="remove-btn"
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
          <span className="total-price">
            {tong > 0 ? tong + "000 VND" : "0 VND"}
          </span>
          <button className="checkout-btn" onClick={handleCheckout}>
            Mua Hàng
          </button>
        </div>
      </div>
      <dialog ref={dialog}>
        <div className="dialog-content">
          <h2>Xác nhận Thanh toán</h2>
          <form
            className="checkout-form"
            method="dialog"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend>1. Thông tin Người nhận</legend>
              <div className="form-group">
                <label htmlFor="hoTen">Họ và Tên (*):</label>
                <input type="text" ref={fullNameRef} required />
              </div>
              <div className="form-group">
                <label htmlFor="sdt">Số Điện Thoại (*):</label>
                <input ref={phoneRef} type="tel" required />
              </div>
              <div className="form-group">
                <label htmlFor="diaChi">Địa Chỉ Giao Hàng (*):</label>
                <textarea ref={addressRef} required rows="3"></textarea>
              </div>
            </fieldset>
            <fieldset>
              <legend>2. Phương thức Thanh toán</legend>
              <div className="form-group radio-group">
                <input
                  type="radio"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                  value="COD"
                />
                <label htmlFor="cod">COD (Thanh toán khi nhận hàng)</label>
                <input
                  type="radio"
                  checked={paymentMethod === "Online"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                  value="Online"
                />
                <label htmlFor="cod">Thanh toán trực tuyến</label>
              </div>
            </fieldset>
            <fieldset>
              <p>{tong}</p>
              <legend>3. Xác nhận</legend>
              <table border={1}>
                <tr>
                  <th colSpan={2}>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                </tr>
                {cartItems.length > 0 &&
                  cartItems.map((value, index) => {
                    if (arrIdItemSelected.includes(value.cart_item_id)) {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={value.image_url}
                              alt=""
                              width={50}
                              height={50}
                            />
                          </td>
                          <td>{value.name}</td>
                          <td>{value.price}000 VND</td>
                          <td>{value.quantity}</td>
                          <td>{value.total}000VND</td>
                        </tr>
                      );
                    }
                  })}
              </table>
              <div className="form-group summary total">
                <label>Tổng thanh toán:</label>
                <input
                  type="text"
                  name="tongThanhToan"
                  value={tong + "000 VND"}
                  readOnly
                />
              </div>
              <div className="dialog-actions">
                <button className="submit-btn">Đặt hàng / Xác nhận</button>
                <button
                  onClick={() => {
                    dialog.current.close();
                  }}
                  className="cancel-btn"
                >
                  Hủy
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </dialog>
      <Footer />
    </section>
  );
}
