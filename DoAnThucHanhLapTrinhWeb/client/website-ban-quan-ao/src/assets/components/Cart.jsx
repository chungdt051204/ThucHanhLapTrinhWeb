import Footer from "./Footer";
import NavBar from "./NavBar";
import { useState } from "react";
import "./Cart.css";
import Modal from "./Modal";
import Checkout from "./Checkout";

export default function Cart_page() {
    const [open, setOpen] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const items = [
        {
            id: 1,
            name: "Áo thun form rộng Unisex",
            variant: "Màu: Đen · Size: L",
            price: "120.000₫",
            qty: 1,
            image: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-iisjvfz8j8jv93"
        }
    ];

    const total = "120.000₫";

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleConfirm(payload) {
        setOrderData(payload);
        setOpen(false);
        console.log("Order confirmed:", payload);
        // TODO: call API or navigate to thank-you page
    }

    return (
        <>
            <NavBar />
            <div className="cart-container">
                <div className="cart-header">
                    <div className="cart-col product">Sản Phẩm</div>
                    <div className="cart-col price">Đơn Giá</div>
                    <div className="cart-col quantity">Số Lượng</div>
                    <div className="cart-col total">Số Tiền</div>
                    <div className="cart-col action">Thao Tác</div>
                </div>

                {items.map((it) => (
                    <div className="cart-item" key={it.id}>
                        <div className="cart-product">
                            <input type="checkbox" className="cart-checkbox" />
                            <img src={it.image} className="cart-image" alt={it.name} />
                            <div className="cart-info">
                                <h4 className="cart-name">{it.name}</h4>
                                <p className="cart-variant">{it.variant}</p>
                            </div>
                        </div>

                        <div className="cart-price">{it.price}</div>

                        <div className="cart-quantity">
                            <button>-</button>
                            <input type="text" defaultValue={it.qty} />
                            <button>+</button>
                        </div>

                        <div className="cart-total">{it.price}</div>

                        <div className="cart-action">
                            <button className="remove-btn">Xóa</button>
                        </div>
                    </div>
                ))}

                <div className="cart-footer">
                    <div className="left">
                        <input type="checkbox" />
                        <span>Chọn tất cả</span>
                        <button className="delete-all">Xóa</button>
                    </div>

                    <div className="right">
                        <span className="total-label">Tổng cộng ({items.length} sản phẩm):</span>
                        <span className="total-price">{total}</span>
                        <button className="checkout-btn" onClick={handleOpen}>Mua Hàng</button>
                    </div>
                </div>

                <Modal open={open} onClose={handleClose}>
                    <Checkout
                        items={items}
                        total="120.000đ"
                        onClose={handleClose}
                        onConfirm={handleConfirm}
                    />
                </Modal>
            </div>
            <Footer />
        </>
    );
}
