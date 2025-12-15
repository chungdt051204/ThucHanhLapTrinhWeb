import { useEffect, useState } from "react";
import "./QuanLyNguoiDung.css";
import { fetchApi } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function QuanLyNguoiDung() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const [users, setUsers] = useState([]);
  const [roleSelected, setRoleSelected] = useState("");

  useEffect(() => {
    fetchApi({
      url: "http://localhost:3000/server/admin/quanLyNguoiDung.php",
      setData: setUsers,
    });
  }, [refresh]);

  const handleRoleSelected = (value) => {
    setRoleSelected(value);
    if (value !== "") {
      navigate(`/admin/user?role=${value}`);
      fetchApi({
        url: `http://localhost:3000/server/admin/quanLyNguoiDung.php?role=${value}`,
        setData: setUsers,
      });
    } else {
      navigate("/admin/user");
      fetchApi({
        url: "http://localhost:3000/server/admin/quanLyNguoiDung.php",
        setData: setUsers,
      });
    }
  };

  const handleSetStatusUser = (user) => {
    const newStatus = user.status === "active" ? "inactive" : "active";

    fetch(
      `http://localhost:3000/server/admin/quanLyNguoiDung.php?user_id=${encodeURIComponent(
        user.user_id ?? user._id
      )}`,
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

    fetch(
      `http://localhost:3000/server/admin/quanLyNguoiDung.php?user_id=${encodeURIComponent(
        id
      )}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id }),
      }
    )
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
        <select
          value={roleSelected}
          onChange={(e) => handleRoleSelected(e.target.value)}
        >
          <option value="">Chọn vai trò</option>
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
