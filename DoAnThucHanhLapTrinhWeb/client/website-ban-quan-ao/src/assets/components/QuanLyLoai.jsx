import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import { useContext, useRef } from "react";
import AppContext from "./AppContext";

export default function QuanLyLoai() {
  const { categories, setRefresh } = useContext(AppContext);
  const dialogAdd = useRef();
  const dialogEdit = useRef();
  const category_name = useRef();
  const editId = useRef(null);
  const editName = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/server/admin/quanLyLoai.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category_name: category_name.current.value }),
    })
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
      `http://localhost:3000/server/admin/quanLyLoai.php?category_id=${id}`,
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
      `http://localhost:3000/server/admin/quanLyLoai.php?category_id=${editId.current}`,
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
    <>
      <AdminNavbar />
      <h2>Quản lý loại</h2>

      <button className="them" onClick={() => dialogAdd.current.showModal()}>
        Thêm loại
      </button>

      <table border="1" cellPadding="10">
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
                  <button
                    onClick={() =>
                      openEdit(value.category_id, value.category_name)
                    }
                    style={{
                      marginRight: "10px",
                      padding: "8px 12px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    EDIT
                  </button>

                  <button
                    onClick={() => handleDelete(value.category_id)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <dialog ref={dialogAdd}>
        <form onSubmit={handleSubmit}>
          <h3>Thêm loại</h3>
          <input type="text" ref={category_name} required />
          <br />
          <br />
          <button type="submit">Thêm</button>
          <button type="button" onClick={() => dialogAdd.current.close()}>
            Hủy
          </button>
        </form>
      </dialog>

      <dialog ref={dialogEdit}>
        <form onSubmit={handleUpdate}>
          <h3>Sửa loại</h3>
          <input type="text" ref={editName} required />
          <br />
          <br />
          <button type="submit">Cập nhật</button>
          <button type="button" onClick={() => dialogEdit.current.close()}>
            Hủy
          </button>
        </form>
      </dialog>

      <Footer />
    </>
  );
}
