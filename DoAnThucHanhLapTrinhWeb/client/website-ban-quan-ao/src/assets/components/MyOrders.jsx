import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "./AppContext";
import UserNavBar from "./UserNavbar";
import Footer from "./Footer";
import "./MyOrders.css";

export default function MyOrders() {
  const { user, refresh, setRefresh } = useContext(AppContext);
  const [ordersWithUserId, setOrdersWithUserId] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php?user_id=${user.user_id}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setOrdersWithUserId(data);
      })
      .catch();
  }, [refresh, user.user_id]);
  const handleCancelOrder = (id) => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php?order_id=${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(() => {
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        alert(message);
      });
  };
  return (
    <>
      <UserNavBar />
      <div className="my-orders-page">
        <h2>Đơn hàng của tôi</h2>
        <table className="my-orders-table">
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
          {ordersWithUserId.length > 0 &&
            ordersWithUserId.map((value, index) => (
              <tr key={index}>
                <td>{value.order_id}</td>
                <td>{value.created_at}</td>
                <td>{value.total_amount}000 VND</td>
                <td className={`order-status ${value.status}`}>
                  {value.status}
                </td>
                <td className="order-actions">
                  <Link to={`/my-order?order_id=${value.order_id}`}>
                    <button className="btn-detail">Xem chi tiết</button>
                  </Link>
                  {(value.status === "PENDING" ||
                    value.status === "OUT_OF_STOCK") && (
                    <button
                      className="btn-cancel"
                      onClick={() => handleCancelOrder(value.order_id)}
                    >
                      Hủy
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </table>
      </div>
      <Footer />
    </>
  );
}
