import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import Footer from "./Footer";
import "./OrderItems.css";

export default function OrderItems({ component }) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("order_id");
  const { user } = useContext(AppContext);
  const [orderStatusHistoryWithOrderId, setOrderStatusHistoryWithOrderId] =
    useState([]);
  const [orderItemWithOrderId, setOrderItemWithOrderId] = useState([]);
  let status = "";
  useEffect(() => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/order/order.php?order_id=${id}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ data, data1 }) => {
        setOrderStatusHistoryWithOrderId(data);
        setOrderItemWithOrderId(data1);
      })
      .catch(() => {});
  }, [id]);
  return (
    <>
      {component}
      <div className="order-detail-page">
        <h2>Lịch sử trạng thái</h2>
        {orderStatusHistoryWithOrderId.length > 0 &&
          orderStatusHistoryWithOrderId.map((value, index) => {
            if (value.status_change_to === "PENDING")
              status = "Đơn hàng đang chờ xác nhận";
            else if (value.status_change_to === "OUT_OF_STOCK")
              status = "Tồn kho không đủ số lượng để đáp ứng đơn hàng của bạn";
            else if (value.status_change_to === "PROCESSING")
              status = "Đơn hàng đang được xử lý";
            else if (value.status_change_to === "SHIPPING")
              status = "Đơn hàng đang được bàn giao cho đơn vị vận chuyển";
            else if (value.status_change_to === "COMPLETED")
              status = "Đơn hàng đã được giao thành công";
            else if (value.status_change_to === "CANCELLED")
              status = "Đơn hàng đã bị hủy";
            return (
              <div key={index} style={{ display: "flex", gap: "20px" }}>
                <p>{value.timestamp}</p>
                <p>{status}</p>
              </div>
            );
          })}
        <h2>Chi tiết đơn hàng</h2>
        <table>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            {user.role === "admin" && <th className="col-stock">Tồn kho</th>}
          </tr>
          {orderItemWithOrderId.length > 0 &&
            orderItemWithOrderId.map((value, index) => (
              <tr key={index}>
                <td>
                  <img src={value.image_url} alt="" width={50} height={60} />
                  <p>{value.name}</p>
                </td>
                <td>{value.price}000 VND</td>
                <td>{value.quantity}</td>
                <td>{value.tong}000 VND</td>
                {user.role === "admin" && (
                  <td className="col-stock">{value.stock_quantity}</td>
                )}
              </tr>
            ))}
        </table>
      </div>
      <Footer />
    </>
  );
}
