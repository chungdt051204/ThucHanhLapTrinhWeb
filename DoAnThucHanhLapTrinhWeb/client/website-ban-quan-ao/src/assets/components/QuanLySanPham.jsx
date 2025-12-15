import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import AppContext from "./AppContext";
import "./QuanLySanPham.css";

export default function QuanLySanPham({ data }) {
  const navigate = useNavigate();
  const { categories, setRefresh } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const addDialog = useRef();
  const updateDialog = useRef();
  const [name, setName] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [price, setPrice] = useState("");
  const addImage = useRef();
  const updateImage = useRef();
  const categoryFilterRef = useRef();
  const [errName, setErrName] = useState("");
  const [errCategory, setErrCategory] = useState("");
  const [errPrice, setErrPrice] = useState("");
  const [errFile, setErrImage] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [productsWithCategory_Id, setProductWithCategory_Id] = useState([]);
  const [productWithId, setProductWithId] = useState("");
  const handleCategorySelected = () => {
    if (categoryFilterRef.current.value != "") {
      navigate(`/admin/product?category_id=${categoryFilterRef.current.value}`);
      setCategoryId(categoryFilterRef.current.value);
      fetch(
        `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getProducts.php?category_id=${categoryFilterRef.current.value}`
      )
        .then((res) => {
          if (res.ok) return res.json();
          throw res;
        })
        .then((data) => {
          console.log(data);
          setProductWithCategory_Id(data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/admin/product");
      setCategoryId("");
    }
  };
  const handleAddSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi submit form mặc định (tải lại trang)
    // Validation (Kiểm tra dữ liệu đầu vào)
    if (name === "") {
      // Kiểm tra trường tên sản phẩm
      setErrName("Vui lòng nhập tên sản phẩm");
      return;
    } else if (categorySelected == 0) {
      // Kiểm tra trường loại sản phẩm
      setErrCategory("Bạn chưa chọn loại sản phẩm");
      return;
    } else if (price === "") {
      // Kiểm tra trường Giá
      setErrPrice("Vui lòng nhập giá");
      return;
    } else if (!addImage.current.files[0]) {
      // Kiểm tra file (Image) có tồn tại không
      setErrImage("Bạn chưa chọn file");
      return;
    }
    // Chuẩn bị và Gửi Request
    const formData = new FormData(); // Tạo đối tượng FormData để gửi dữ liệu form và file
    formData.append("name", name); // Thêm dữ liệu tiêu đề
    formData.append("categoryId", categorySelected); // Thêm ID loại sản phẩm
    formData.append("price", price); // Thêm giá
    formData.append("image", addImage.current.files[0]); // Thêm file hình ảnh (lấy từ Ref)
    // Gửi yêu cầu POST đến API để thêm sản phẩm
    fetch("http://localhost:3000/server/admin/quanLySanPham.php", {
      method: "POST",
      body: formData, // Đính kèm FormData
    })
      .then((res) => {
        if (res.ok) return res.json(); // Nếu HTTP status 2xx, parse JSON
        throw res; // Nếu status lỗi  ném Response object để xử lý lỗi
      })
      .then(({ message }) => {
        // --- Xử lý Thành công (201 Created) ---
        alert(message); // Hiển thị thông báo thành công từ server
        setRefresh((prev) => prev + 1); // Kích hoạt tải lại dữ liệu (refresh data)
        addDialog.current.close(); // Đóng modal/dialog Thêm mới
      })
      .catch(async (err) => {
        const { message } = await err.json(); // Đọc body lỗi để lấy thông báo chi tiết
        alert(message); // Hiển thị thông báo lỗi chi tiết
      });
  };
  const handleClickUpdate = (id) => {
    fetch(
      `http://localhost:3000/server/product/getProducts.php?product_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductWithId(data);
        updateDialog.current.showModal();
      });
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn submit form mặc định
    // Chuẩn bị và Gửi Request
    const formData = new FormData(); // Tạo FormData
    // Thêm dữ liệu State
    formData.append("name", name);
    formData.append("categoryId", categorySelected);
    formData.append("price", price);
    // Thêm file hình ảnh mới (lấy từ Ref)
    formData.append("image", updateImage.current.files[0]);
    // Gửi yêu cầu PUT (Cập nhật) đến API, đính kèm ID sản phẩm vào query string
    fetch(`http://localhost:3000/server/admin/quanLySanPham.php?id=${id}`, {
      method: "POST",
      body: formData, // Đính kèm FormData
    })
      .then((res) => {
        if (res.ok) return res.json(); // Nếu HTTP status 2xx, parse JSON
        throw res; // Nếu status lỗi (4xx, 5xx), ném Response object
      })
      .then(({ message }) => {
        // Xử lý Thành công
        alert(message); // Hiển thị thông báo thành công
        setRefresh((prev) => prev + 1); // Kích hoạt tải lại dữ liệu
        updateDialog.current.close(); // Đóng modal Cập nhật
      })
      .catch(async (err) => {
        //Xử lý Lỗi
        const { message } = await err.json(); // Lấy thông báo lỗi chi tiết từ body
        alert(message); // Hiển thị thông báo lỗi chi tiết
      });
  };
  const handleDelete = (id) => {
    //Gửi yêu cầu DELETE đến API, đính kèm ID sản phẩm vào query string
    fetch(`http://localhost:3000/server/admin/quanLySanPham.php?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        //Kiểm tra Response: Nếu thành công (status 2xx), parse JSON
        if (res.ok) return res.json();
        // Nếu lỗi (status 4xx, 5xx), ném Response object để xử lý lỗi
        throw res;
      })
      .then(({ message }) => {
        // Xử lý thành công: Hiển thị thông báo
        alert(message);
        // Cập nhật dữ liệu để component hiển thị danh sách mới
        setRefresh((prev) => prev + 1);
      })
      .catch(async (err) => {
        // Xử lý lỗi: Lấy thông báo lỗi chi tiết từ body của Response object đã ném
        const { message } = await err.json();
        alert(message); // Hiển thị thông báo lỗi
      });
  };
  return (
    <>
      <h2>Quản lý sản phẩm</h2>
      <div className="product-page">
        <div>
          <div className="product-controls">
            <button
              className="add-product-btn"
              onClick={() => {
                addDialog.current.showModal();
              }}
            >
              Thêm sản phẩm
            </button>
            <input
              type="text"
              className="product-search-input"
              placeholder="Tìm sản phẩm"
            />
            <select
              className="product-filter-select"
              ref={categoryFilterRef}
              onChange={handleCategorySelected}
            >
              <option value="">Chọn loại sản phẩm</option>
              {categories.length > 0 &&
                categories.map((value, index) => (
                  <option key={index} value={value.category_id}>
                    {value.category_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="product-table-container">
            <table>
              <thead>
                <tr>
                  <th className="product-col">Sản phẩm</th>
                  <th>Loại sản phẩm</th>
                  <th>Giá</th>
                  <th className="action-col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {!categoryId && data.length > 0
                  ? data.map((value, index) => {
                      const image = value.image_url.includes("https")
                        ? value.image_url
                        : `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/images/product/${value.image_url}`;
                      const isSelected = index === 0 ? "selected" : "";
                      return (
                        <tr key={index} className={isSelected}>
                          <td className="product-title-cell">
                            <img
                              src={image}
                              alt=""
                              className="product-image"
                              width={50}
                              height={50}
                            />
                            <span className="product-name">{value.name}</span>
                          </td>
                          <td>{value.category_name}</td>
                          <td className="price-cell">{value.price}000 VND</td>
                          <td className="action-cell">
                            <Link to={`/admin/product?id=${value.product_id}`}>
                              <i
                                onClick={() =>
                                  handleClickUpdate(value.product_id)
                                }
                                className="fa-solid fa-pen"
                              ></i>
                            </Link>
                            <i
                              onClick={() => handleDelete(value.product_id)}
                              className="fa-solid fa-trash"
                            ></i>
                          </td>
                        </tr>
                      );
                    })
                  : productsWithCategory_Id.length > 0 &&
                    productsWithCategory_Id.map((value, index) => {
                      const image1 = value.image_url.includes("https")
                        ? value.image_url
                        : `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/images/product/${value.image_url}`;
                      const isSelected = index === 0 ? "selected" : "";
                      return (
                        <tr key={index} className={isSelected}>
                          <td className="product-title-cell">
                            <img
                              src={image1}
                              alt=""
                              className="product-image"
                              width={50}
                              height={50}
                            />
                            <span className="product-name">{value.name}</span>
                          </td>
                          <td>{value.category_name}</td>
                          <td className="price-cell">{value.price}000 VND</td>
                          <td className="action-cell">
                            <Link to={`/admin/product?id=${value.product_id}`}>
                              <i
                                onClick={() =>
                                  handleClickUpdate(value.product_id)
                                }
                                className="fa-solid fa-pen"
                              ></i>
                            </Link>
                            <i
                              onClick={() => handleDelete(value.product_id)}
                              className="fa-solid fa-trash"
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
        <dialog ref={addDialog}>
          <form action="" method="dialog" onSubmit={handleAddSubmit}>
            Tên sản phẩm:
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
                setErrName("");
              }}
              placeholder="Nhập tên sản phẩm"
            />
            {errName && <span>{errName}</span>}
            <br />
            Loại sản phẩm:
            <select
              onChange={(e) => {
                setCategorySelected(e.target.value);
                setErrCategory("");
              }}
            >
              <option value="0">Chọn loại sản phẩm</option>
              {categories.map((value, index) => (
                <option key={index} value={value.category_id}>
                  {value.category_name}
                </option>
              ))}
            </select>
            {errCategory && <span>{errCategory}</span>}
            <br />
            Giá:
            <input
              type="text"
              onChange={(e) => {
                setPrice(e.target.value);
                setErrPrice("");
              }}
              placeholder="Nhập giá"
            />
            {errPrice && <span>{errPrice}</span>}
            <br />
            Image:
            <input
              type="file"
              onChange={() => setErrImage("")}
              ref={addImage}
            />
            <br />
            <button>Thêm</button>
          </form>
        </dialog>
        <dialog ref={updateDialog}>
          <form action="" method="dialog" onSubmit={handleUpdateSubmit}>
            Tên sản phẩm:
            <input
              type="text"
              defaultValue={productWithId.name}
              onChange={(e) => {
                setName(e.target.value);
                setErrName("");
              }}
            />
            {errName && <span>{errName}</span>}
            <br />
            Loại sản phẩm:
            <select
              onChange={(e) => {
                setCategorySelected(e.target.value);
                setErrCategory("");
              }}
            >
              <option value="">{productWithId.category_name}</option>
              {categories.map((value, index) => (
                <option key={index} value={value.category_id}>
                  {value.category_name}
                </option>
              ))}
            </select>
            {errCategory && <span>{errCategory}</span>}
            <br />
            Giá:
            <input
              type="text"
              defaultValue={productWithId.price}
              onChange={(e) => {
                setPrice(e.target.value);
                setErrPrice("");
              }}
            />
            {errPrice && <span>{errPrice}</span>}
            <br />
            Image:
            <input
              type="file"
              onChange={() => setErrImage("")}
              ref={updateImage}
            />
            {errFile && <span>{errFile}</span>}
            <br />
            <button>Cập nhật</button>
          </form>
        </dialog>
        {/* <div style={{ display: "flex" }}>
          <Link to="/admin/product">
            <button>Trước</button>
          </Link>
          <Link to="/admin/product-page2">
            <button>Sau</button>
          </Link>
        </div> */}
      </div>
    </>
  );
}
