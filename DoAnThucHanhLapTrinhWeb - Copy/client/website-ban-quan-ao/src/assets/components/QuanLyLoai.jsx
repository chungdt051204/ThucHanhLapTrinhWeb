import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import { useContext, useRef } from "react";
import AppContext from "./AppContext";
import "./QuanLyLoai.css";
export default function QuanLyLoai() {
  const { categories, setRefresh } = useContext(AppContext);
  const dialogAdd = useRef();
  const dialogEdit = useRef();
  const category_name = useRef();
  const editId = useRef(null);
  const editName = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/admin/quanLyLoai.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_name: category_name.current.value }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        setRefresh((prev) => prev + 1);
        dialogAdd.current.close();
      })
      .catch(async (err) => {
        const { message } = await err.json();
        alert(message);
      });
  };
  const handleDelete = (id) => {
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/admin/quanLyLoai.php?category_id=${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        alert(message);
      });
  };
  const openEdit = (id, name) => {
    editId.current = id;
    editName.current.value = name;
    dialogEdit.current.showModal();
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/admin/quanLyLoai.php?category_id=${editId.current}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_name: editName.current.value,
        }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        setRefresh((prev) => prev + 1);
        dialogEdit.current.close();
      })
      .catch(async (err) => {
        const { message } = await err.json();
        alert(message);
      });
  };
  return (
    <div className="ql-loai-container">
      <h2 className="title">Quản lý loại</h2>

      <button
        className="btn-them"
        onClick={() => dialogAdd.current.showModal()}
      >
        Thêm loại
      </button>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Tên loại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((value) => (
                <tr key={value.category_id}>
                  <td>{value.category_name}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() =>
                          openEdit(value.category_id, value.category_name)
                        }
                        className="action-btn btn-edit"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDelete(value.category_id)}
                        className="action-btn btn-delete"
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <dialog ref={dialogAdd} className="modal">
        <form onSubmit={handleSubmit}>
          <h3>Thêm loại</h3>
          <input type="text" ref={category_name} required />
          <div className="modal-actions">
            <button type="submit" className="modal-btn confirm">
              Thêm
            </button>
            <button
              type="button"
              className="modal-btn cancel"
              onClick={() => dialogAdd.current.close()}
            >
              Hủy
            </button>
          </div>
        </form>
      </dialog>

      <dialog ref={dialogEdit} className="modal">
        <form onSubmit={handleUpdate}>
          <h3>Sửa loại</h3>
          <input type="text" ref={editName} required />
          <div className="modal-actions">
            <button type="submit" className="modal-btn confirm">
              Cập nhật
            </button>
            <button
              type="button"
              className="modal-btn cancel"
              onClick={() => dialogEdit.current.close()}
            >
              Hủy
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
