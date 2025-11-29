import React, { useState } from "react";
import "./Checkout.css";

export default function Checkout({ items, totalNumber, onClose, onConfirm }) {
  const [note, setNote] = useState("");
  const [shipping, setShipping] = useState(28000);
  const [payment, setPayment] = useState("cod");

  const finalTotalNumber = totalNumber + shipping;

  function handleSubmit() {
    const payload = {
      items,
      note,
      shipping,
      payment,
      finalTotal: finalTotalNumber
    };
    onConfirm(payload);
  }

  return (
    <div className="sp-container">
      <div className="sp-header">
        <h2>Thanh Toán</h2>
        <button className="sp-close" onClick={onClose}>×</button>
      </div>

      <div className="sp-box address-box">
        <h3>📍 Địa Chỉ Nhận Hàng</h3>
        <div className="addr-info">
          <strong>Nhân sóc lọ Duy khoái quá trời</strong> | 069696969
          <div>Cao Lỗ, Quận 8, Trường Đại Học STU</div>
        </div>
        <button className="change-btn">Thay đổi</button>
      </div>

      <div className="sp-box">
        <h3>Sản phẩm</h3>
        {items.map((it, idx) => (
          <div className="sp-item" key={idx}>
            <img src={it.image} alt={it.name} />
            <div className="sp-info">
              <div className="name">{it.name}</div>
              <div className="variant">{it.variant}</div>
            </div>
            <div className="price">{it.price}</div>
            <div className="qty">x{it.qty}</div>
            <div className="total">
              {(it.priceNumber * it.qty).toLocaleString()}₫
            </div>
          </div>
        ))}
      </div>

      <div className="sp-box">
        <h3>Lời nhắn</h3>
        <input
          placeholder="Lưu ý cho Người bán…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="sp-box shipping-box">
        <h3>Phương thức vận chuyển</h3>

        <div className="ship-opt">
          <label>
            <input
              type="radio"
              name="ship"
              checked={shipping === 28000}
              onChange={() => setShipping(28000)}
            />
            Nhanh – 28.000₫ (Nhận trong 1–2 ngày)
          </label>

          <label>
            <input
              type="radio"
              name="ship"
              checked={shipping === 35000}
              onChange={() => setShipping(35000)}
            />
            Hỏa Tốc – 35.000₫ (Nhận trong 4 giờ)
          </label>
        </div>
      </div>

      <div className="sp-box payment-box">
        <h3>Phương thức thanh toán</h3>

        <label>
          <input
            type="radio"
            name="pay"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
          />
          Thanh toán khi nhận hàng (COD)
        </label>

        <label>
          <input
            type="radio"
            name="pay"
            checked={payment === "bank"}
            onChange={() => setPayment("bank")}
          />
          Chuyển khoản ngân hàng
        </label>
      </div>

      <div className="sp-summary">
        <div className="row">
          <span>Tổng tiền hàng</span>
          <span>{totalNumber.toLocaleString()}₫</span>
        </div>

        <div className="row">
          <span>Phí vận chuyển</span>
          <span>{shipping.toLocaleString()}₫</span>
        </div>

        <div className="row total-row">
          <strong>Tổng thanh toán</strong>
          <strong>{finalTotalNumber.toLocaleString()}₫</strong>
        </div>

        <button className="order-btn" onClick={handleSubmit}>
          Đặt hàng
        </button>
      </div>
    </div>
  );
}
