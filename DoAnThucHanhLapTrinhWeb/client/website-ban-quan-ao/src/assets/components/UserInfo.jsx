import { useContext, useState } from "react";
import AppContext from "./AppContext";
import "./UserInfo.css";

export default function UserInfo() {
  const { user } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  return (
    <section className="userInfo-section">
      <div className="userInfo-container">
        <h2>Thông tin tài khoản</h2>
        <img
          src={
            user.avatar && user.avatar.includes("https")
              ? user.avatar
              : `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/images/user/${user.avatar}`
          }
          alt="avatar"
          className="userInfo-avatar"
        />
        <div className="info-group">
          <label>Họ tên:</label>
          <p>{user.fullName}</p>
        </div>
        <div className="info-group">
          <label>Username:</label>
          <p>{user.username}</p>
        </div>
        <div className="info-group">
          <label>Password:</label>
          <p>{"*".repeat(8)}</p>
        </div>
        <button className="update-btn" onClick={() => setEditMode(!editMode)}>
          Cập nhật
        </button>
        {editMode && (
          <div className="update-panel">
            <h3>Cập nhật thông tin</h3>
            <form>
              <input type="text" defaultValue={user.fullName} />
              <input type="text" defaultValue={user.username} />
              <input type="password" placeholder="Nhập mật khẩu mới" />
              <input type="file" />
              <button className="save-btn">Lưu lại</button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
