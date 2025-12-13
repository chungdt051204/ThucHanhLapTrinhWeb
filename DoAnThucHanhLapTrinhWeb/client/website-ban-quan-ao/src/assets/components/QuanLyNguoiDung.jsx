import AdminNavBar from "./AdminNavBar";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";
import "./QuanLyNguoiDung.css";

export default function QuanLyNguoiDung() {
  const [refresh, setRefresh] = useState(0);
  const [users, setUsers] = useState([]);
  const [roleSelected, setRoleSelected] = useState("");
  const roleSelectedRef = useRef();

  const API_URL =
    "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/admin/quanLyNguoiDung.php";

  useEffect(() => {
    let url = API_URL + "?_=" + Date.now();
    if (roleSelected) url += `&role=${roleSelected}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch(async (err) => {
        try {
          const errBody = await err.json();
          console.error("GET error body:", errBody);
        } catch (e) {
          console.error("GET error:", err);
        }
        setUsers([]);
      });
  }, [refresh, roleSelected]);

  const handleRoleSelected = () => {
    setRoleSelected(roleSelectedRef.current.value);
  };

  const handleSetStatusUser = (user) => {
    if (user.role === "admin") {
      alert("Không thể thay đổi trạng thái của Admin.");
      return;
    }

    const newStatus = user.status === "active" ? "inactive" : "active";
    const confirmMsg =
      newStatus === "inactive"
        ? `Bạn có chắc muốn vô hiệu hóa người dùng ${user.username}?`
        : `Bạn có chắc muốn kích hoạt người dùng ${user.username}?`;

    if (!window.confirm(confirmMsg)) return;

    fetch(
      `${API_URL}?user_id=${encodeURIComponent(user.user_id ?? user._id)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id ?? user._id,
          status: newStatus,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((json) => {
        alert(json.message || "Cập nhật thành công");
        setUsers((prev) =>
          prev.map((u) =>
            (u.user_id ?? u._id) === (user.user_id ?? user._id)
              ? { ...u, status: newStatus }
              : u
          )
        );
        setRefresh((p) => p + 1);
      })
      .catch(async (err) => {
        try {
          const errBody = await err.json();
          alert("Lỗi: " + (errBody.message || JSON.stringify(errBody)));
        } catch {
          alert("Lỗi khi cập nhật trạng thái (check console).");
        }
      });
  };

  const handleDelete = (user) => {
    const id = user.user_id ?? user._id;
    if (!window.confirm(`Bạn có chắc muốn xóa người dùng ${user.username}?`))
      return;

    fetch(`${API_URL}?user_id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: id }),
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((json) => {
        alert(json.message || "Xóa thành công");
        setUsers((prev) => prev.filter((u) => (u.user_id ?? u._id) !== id));
        setRefresh((p) => p + 1);
      })
      .catch(async (err) => {
        try {
          const errBody = await err.json();
          alert("Lỗi: " + (errBody.message || JSON.stringify(errBody)));
        } catch {
          alert("Lỗi khi xóa (check console).");
        }
      });
  };

  return (
    <div className="ql-nguoi-dung-container">
      {/* Tiêu đề */}
      <h2 className="title">Quản lý Người dùng</h2>

      {/* Khung combobox */}
      <div className="filter-container">
        <select onChange={handleRoleSelected} ref={roleSelectedRef}>
          <option value="">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Khung bao bảng để tạo khoảng trống */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((value) => {
                const id = value.user_id ?? value._id;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{value.username}</td>
                    <td>{value.email}</td>
                    <td>{value.role}</td>
                    <td>
                      <p
                        className={
                          value.status === "inactive"
                            ? "status-inactive"
                            : "status-active"
                        }
                      >
                        {value.status}
                      </p>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {value.role !== "admin" && (
                          <button
                            className={
                              value.status === "inactive"
                                ? "action-btn btn-activate"
                                : "action-btn btn-disable"
                            }
                            onClick={() => handleSetStatusUser(value)}
                          >
                            {value.status === "inactive"
                              ? "KÍCH HOẠT"
                              : "VÔ HIỆU HÓA"}
                          </button>
                        )}

                        {value.role !== "admin" && (
                          <button
                            className="action-btn btn-delete"
                            onClick={() => handleDelete(value)}
                          >
                            XÓA
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Không có người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
