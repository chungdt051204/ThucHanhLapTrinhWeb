import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "./AppContext";
import UserNavBar from "./UserNavbar";
import Footer from "./Footer";
export default function MyOrders() {
  const { user, refresh, setRefresh } = useContext(AppContext);
  const [ordersWithUserId, setOrdersWithUserId] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:3000/server/order/order.php?user_id=${user.user_id}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        console.log(data);
        setOrdersWithUserId(data);
      })
      .catch();
  }, [refresh, user.user_id]);
  const handleCancelOrder = (id) => {
    fetch(`http://localhost:3000/server/order/order.php?order_id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "CANCELLED" }),
    })
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
      <UserNavBar></UserNavBar>
      <h2>Đơn hàng của tôi</h2>
      <table border={1}>
        <tr>
          <th>Mã đơn hàng</th>
          <th>Ngày đặt hàng</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
        {ordersWithUserId.length > 0 &&
          ordersWithUserId.map((value, index) => {
            return (
              <tr>
                <td>{value.order_id}</td>
                <td>{value.created_at}</td>
                <td>{value.total_amount}000 VND</td>
                <td>{value.status}</td>
                <td>
                  <Link to={`/my-order?order_id=${value.order_id}`}>
                    <button>Xem chi tiết</button>
                  </Link>
                  {value.status === "PENDING" && (
                    <button onClick={() => handleCancelOrder(value.order_id)}>
                      Hủy
                    </button>
                  )}
                  {value.status === "OUT_OF_STOCK" && (
                    <button onClick={() => handleCancelOrder(value.order_id)}>
                      Hủy
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
      </table>
      <Footer></Footer>
    </>
  );
}
