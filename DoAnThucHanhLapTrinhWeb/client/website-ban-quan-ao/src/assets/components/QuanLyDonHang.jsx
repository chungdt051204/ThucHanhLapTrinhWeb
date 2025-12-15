import { useEffect, useContext, useState } from "react";
import AppContext from "./AppContext";
import { Link, useNavigate } from "react-router-dom";
import "./QuanLyDonHang.css";
import { fetchApi } from "../services/api";
export default function QuanLyDonHang() {
  const navigate = useNavigate();
  const { refresh, setRefresh } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [orderStatusSelected, setOrderStatusSelected] = useState("");
  useEffect(() => {
    fetchApi({
      url: "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php",
      setData: setOrders,
    });
  }, [refresh]);
  const handleOrderStatusSelected = (value) => {
    setOrderStatusSelected(value);
    if (value !== "") {
      navigate(`/admin/order?status=${value}`);
      fetchApi({
        url: `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php?status=${value}`,
        setData: setOrders,
      });
    } else {
      navigate("/admin/order");
      fetchApi({
        url: "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php",
        setData: setOrders,
      });
    }
  };
  const handleConfirmOrder = (id) => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php?order_id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "PROCESSING" }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        console.log(data);
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json(); // Đọc body lỗi để lấy thông báo chi tiết
        alert(message);
        setRefresh((prev) => prev + 1); // Hiển thị thông báo lỗi chi tiết
      });
  };
  const handleCancelOrder = (id) => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php?order_id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "CANCELLED" }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        console.log(data);
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json(); // Đọc body lỗi để lấy thông báo chi tiết
        alert(message); // Hiển thị thông báo lỗi chi tiết
      });
  };
  const handleShipping = (id) => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php?order_id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "SHIPPING" }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        console.log(data);
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json(); // Đọc body lỗi để lấy thông báo chi tiết
        alert(message); // Hiển thị thông báo lỗi chi tiết
      });
  };
  const handleCompleted = (id) => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php?order_id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "COMPLETED" }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        console.log(data);
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json(); // Đọc body lỗi để lấy thông báo chi tiết
        alert(message); // Hiển thị thông báo lỗi chi tiết
      });
  };
  return (
    <>
      <div className="order-admin-page">
        <h2>Quản lý đơn hàng</h2>
        <div className="filter-container">
          <select
            value={orderStatusSelected}
            onChange={(e) => handleOrderStatusSelected(e.target.value)}
          >
            <option value="">Chọn trạng thái đơn hàng</option>
            <option value="PENDING">Chờ xác nhận</option>
            <option value="OUT_OF_STOCK">Hết hàng</option>
            <option value="PROCESSING">Đang xử lý</option>
            <option value="SHIPPING">Đang vận chuyển</option>
            <option value="COMPLETED">Đã hoàn thành</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
        <h3>Tổng đơn hàng {orders.length}</h3>
        <table border={1}>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Người đặt hàng</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ giao hàng</th>
            <th>Tổng tiền đơn hàng</th>
            <th>Phương thức thanh toán</th>
            <th>Trạng thái</th>
            <th>Ngày tạo đơn</th>
            <th>Hành động</th>
            <th>Chi tiết</th>
          </tr>
          {orders.length > 0 &&
            orders.map((value, index) => {
              return (
                <tr key={index}>
                  <td style={{ fontWeight: "bold" }}>{value.order_id}</td>
                  <td>{value.fullName}</td>
                  <td>{value.phone}</td>
                  <td>{value.shipping_address}</td>
                  <td style={{ color: "green" }}>
                    {value.total_amount}000 VND
                  </td>
                  <td style={{ color: "green" }}>{value.paymentMethod}</td>
                  <td
                    style={{
                      color:
                        value.status === "CANCELLED" ||
                        value.status === "OUT_OF_STOCK"
                          ? "red"
                          : "green",
                    }}
                  >
                    {value.status}
                  </td>
                  <td>{value.created_at}</td>
                  <td>
                    {value.status === "PENDING" && (
                      <div>
                        <button
                          onClick={() => {
                            handleConfirmOrder(value.order_id);
                          }}
                        >
                          Xác nhận đơn hàng
                        </button>
                        <button
                          onClick={() => handleCancelOrder(value.order_id)}
                        >
                          Hủy đơn hàng
                        </button>
                      </div>
                    )}
                    {value.status === "OUT_OF_STOCK" && (
                      <button onClick={() => handleCancelOrder(value.order_id)}>
                        Hủy đơn hàng
                      </button>
                    )}
                    {value.status === "PROCESSING" && (
                      <div>
                        <button onClick={() => handleShipping(value.order_id)}>
                          Bàn giao cho đơn vị vận chuyển
                        </button>
                        <button
                          onClick={() => handleCancelOrder(value.order_id)}
                        >
                          Hủy đơn hàng
                        </button>
                      </div>
                    )}
                    {value.status === "SHIPPING" && (
                      <div>
                        <button onClick={() => handleCompleted(value.order_id)}>
                          Đã giao thành công
                        </button>
                        <button
                          onClick={() => handleCancelOrder(value.order_id)}
                        >
                          Hủy đơn hàng
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/admin/order/order-item?order_id=${value.order_id}`}
                    >
                      <button>Xem chi tiết</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </>
  );
}
