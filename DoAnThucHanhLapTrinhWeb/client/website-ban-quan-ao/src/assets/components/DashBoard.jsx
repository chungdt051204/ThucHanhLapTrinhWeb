import { useEffect, useState, useContext } from "react";
import AppContext from "./AppContext";
import DailyRevenueChart from "./DailyRevenueChart";
import "./DashBoard.css";
export default function DashBoard() {
  const { refresh } = useContext(AppContext);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [bestSheller, setBestSheller] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/server/admin/quanLyThongKe.php")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ data, data1, data2, data3, data4, data5 }) => {
        console.log({ data, data1, data2, data3, data4, data5 });
        setTotalProduct(data);
        setTotalUser(data1);
        setTotalOrder(data2);
        setTotalRevenue(data3);
        setDailyRevenue(data4);
        setBestSheller(data5);
      });
  }, [refresh]);
  return (
    <>
      <div className="dashboard-container">
        <h2>Tổng quan Thống kê</h2>
        <div className="dashboard-stats-grid">
          <div className="stats-card product-card">
            <div className="card-title">Tổng Sản phẩm</div>
            <div className="card-value">{totalProduct.tongSanPham}</div>
          </div>
          <div className="stats-card user-card">
            <div className="card-title">Tổng Người dùng</div>
            <div className="card-value">{totalUser.tongNguoiDung}</div>
          </div>
          <div className="stats-card order-card">
            <div className="card-title">Tổng Đơn hàng</div>
            <div className="card-value">{totalOrder.tongDonHang}</div>
          </div>
          <div className="stats-card revenue-card">
            <div className="card-title">Tổng Doanh thu</div>
            <div className="card-value">
              {Number(totalRevenue.tong) * 1000} VNĐ
            </div>
          </div>
        </div>
        <div className="dashboard-chart-area">
          <DailyRevenueChart data={dailyRevenue} />
        </div>
        {bestSheller.length > 0 && (
          <div className="bestseller-table-container">
            <h3>🏆 Top 5 Sản phẩm Bán chạy</h3>
            <table className="bestseller-table">
              <thead>
                <tr>
                  <th className="table-header product-name-col">Sản phẩm</th>
                  <th className="table-header quantity-col">
                    Số lượng bán được
                  </th>
                </tr>
              </thead>
              <tbody>
                {bestSheller.map((value, index) => {
                  return (
                    <tr key={index} className="table-row">
                      <td className="product-cell name-cell">{value.name}</td>
                      <td className="product-cell quantity-cell">
                        {value.soLuongBanDuoc}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
