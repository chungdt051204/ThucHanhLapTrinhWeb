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
  // 1. Thêm state để điều khiển dialog
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);

  let tong = 0;
  cartItems.forEach((value) => {
    tong = tong + parseFloat(value.total);
  });
  useEffect(() => {
    fetch(
      // Chú ý: Bạn nên sử dụng biến môi trường cho URL này
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
    fetch(`http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php?id=${id}`, {
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
    fetch(`http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php`, {
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
    fetch(`http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php?id=${id}`, {
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
      fetch(`http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/cart/quanLyGioHang.php?id=${id}`, {
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

  // 2. Thêm hàm để mở dialog
  const handleCheckout = () => {
    // Chỉ cho phép thanh toán khi có sản phẩm trong giỏ hàng
    if (cartItems.length > 0) {
        setShowCheckoutDialog(true);
    } else {
        alert("Giỏ hàng của bạn đang trống.");
    }
  };

  const handleCloseDialog = () => {
    setShowCheckoutDialog(false);
  }

  // Hàm xử lý khi submit form (chưa cần xử lý logic backend ở đây)
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert("Xác nhận Đặt Hàng (Chức năng này sẽ được phát triển tiếp)");
    handleCloseDialog();
  }

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
                      checked={arrIdItemSelected.includes(value.order_item_id)}
                      onChange={() => handleItemChecked(value.order_item_id)}
                      className="cart-checkbox"
                    />
                    {/* Giả định image_url là đường dẫn hợp lệ */}
                    <img src={value.image_url} className="cart-image" alt={value.name} />
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
                  <td className="cart-total">{value.total}000 VND</td>
                  <td className="cart-action">
                    <button
                      onClick={() => handleDelete(value.order_item_id)}
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
          {/* Cập nhật lại logic chọn tất cả nếu cần */}
          <input type="checkbox" />
          <span>Chọn tất cả</span>
          <button onClick={handleDeleteItemsSelected} className="delete-all">
            Xóa
          </button>
        </div>

        <div className="right">
          <span className="total-label">Tổng cộng sản phẩm:</span>
          <span className="total-price">{tong}000 VND</span>
          {/* Thêm sự kiện onClick để mở dialog */}
          <button className="checkout-btn" onClick={handleCheckout}>
            Mua Hàng
          </button>
        </div>
      </div>

      {/* 3. Thêm dialog thanh toán */}
      {showCheckoutDialog && (
        <dialog open id="checkout-dialog">
          <div className="dialog-content">
            <h2>Xác nhận Thanh toán</h2>
            <form className="checkout-form" onSubmit={handleSubmitOrder}>
              {/* 1. Thông tin Người nhận (Bắt buộc) */}
              <fieldset>
                <legend>1. Thông tin Người nhận</legend>
                <div className="form-group">
                  <label htmlFor="hoTen">Họ và Tên (*):</label>
                  <input type="text" id="hoTen" name="hoTen" required />
                </div>
                <div className="form-group">
                  <label htmlFor="sdt">Số Điện Thoại (*):</label>
                  <input type="tel" id="sdt" name="sdt" required />
                </div>
                <div className="form-group">
                  <label htmlFor="diaChi">Địa Chỉ Giao Hàng (*):</label>
                  <textarea id="diaChi" name="diaChi" required rows="3"></textarea>
                </div>
              </fieldset>

              {/* 2. Phương thức Thanh toán */}
              <fieldset>
                <legend>2. Phương thức Thanh toán</legend>
                <div className="form-group radio-group">
                  <input type="radio" id="cod" name="paymentMethod" value="COD" defaultChecked />
                  <label htmlFor="cod">COD (Thanh toán khi nhận hàng)</label>
                </div>
                {/* Có thể thêm các phương thức khác */}
              </fieldset>

              {/* 3. Tóm tắt & Xác nhận */}
              <fieldset>
                <legend>3. Tóm tắt & Xác nhận</legend>
                <div className="form-group summary">
                  <label>Tổng tiền hàng:</label>
                  {/* Lấy giá trị biến tong, thêm readOnly */}
                  <input type="text" name="tongTienHang" defaultValue={`${tong}000 VND`} readOnly />
                </div>
                <div className="form-group summary">
                  <label>Phí vận chuyển:</label>
                  {/* Phí vận chuyển đặt là 0 VND */}
                  <input type="text" name="phiVanChuyen" defaultValue="0 VND" readOnly />
                </div>
                <div className="form-group summary total">
                  <label>Tổng thanh toán:</label>
                  {/* Lấy giá trị biến tong, thêm readOnly */}
                  <input type="text" name="tongThanhToan" defaultValue={`${tong}000 VND`} readOnly />
                </div>

                <div className="dialog-actions">
                    <button type="submit" className="submit-btn">
                        Đặt hàng / Xác nhận
                    </button>
                    {/* Thêm nút Hủy để đóng dialog */}
                    <button type="button" onClick={handleCloseDialog} className="cancel-btn">
                        Hủy
                    </button>
                </div>
              </fieldset>
            </form>
          </div>
        </dialog>
      )}

      <Footer />
    </section>
  );
}