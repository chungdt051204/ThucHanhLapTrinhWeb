import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import AppContext from "./AppContext";
import "./QuanLySanPham.css";
import { fetchApi } from "../services/api";

export default function QuanLySanPham() {
  const navigate = useNavigate();
  const { categories, setRefresh, productsPage1, setProductsPage1 } =
    useContext(AppContext);
  const [searchParams] = useSearchParams();
  const product_id = searchParams.get("product_id");
  const addDialog = useRef();
  const updateDialog = useRef();
  const [inputSearch, setInputSearch] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const addImage = useRef();
  const updateImage = useRef();
  const [errName, setErrName] = useState("");
  const [errCategory, setErrCategory] = useState("");
  const [errPrice, setErrPrice] = useState("");
  const [errFile, setErrImage] = useState("");
  const [productWithId, setProductWithId] = useState("");
  const handleSearch = () => {
    if (inputSearch !== "") {
      navigate(`/admin/product?name=${inputSearch}`);
      fetchApi({
        url: `http://localhost:3000/server/product/getProducts.php?name=${encodeURIComponent(
          inputSearch
        )}`,
        setData: setProductsPage1,
      });
    } else {
      navigate("/admin/product");
      fetchApi({
        url: "http://localhost:3000/server/product/getProducts.php",
        setData: setProductsPage1,
      });
    }
  };
  const handleCategorySelected = (category_id) => {
    setCategorySelected(category_id);
    if (category_id && priceRange) {
      navigate(`/admin/product?category_id=${category_id}&price=${priceRange}`);
      fetchApi({
        url: `http://localhost:3000/server/product/getProducts.php?category_id=${category_id}&price=${priceRange}`,
        setData: setProductsPage1,
      });
    }
    //Trường hợp 2: Chọn loại sản phẩm và bỏ chọn giá
    else if (category_id && !priceRange) {
      navigate(`/admin/product?category_id=${category_id}`);
      fetchApi({
        url: `http://localhost:3000/server/product/getProducts.php?category_id=${category_id}`,
        setData: setProductsPage1,
      });
    }
    //Trường hợp 3: Chọn giá không chọn loại sản phẩm
    else if (priceRange && !category_id) {
      navigate(`/admin/product?price=${priceRange}`);
      fetchApi({
        url: `http://localhost:3000/server/product/getProducts.php?price=${priceRange}`,
        setData: setProductsPage1,
      });
    }
    //Trường hợp 4: Lấy tất cả
    else {
      setPriceRange("");
      navigate("/admin/product");
      fetchApi({
        url: `http://localhost:3000/server/product/getProducts.php`,
        setData: setProductsPage1,
      });
    }
  };
  const handlePriceRangeSelected = (price) => {
    setPriceRange(price);
    //Trường hợp 1: Chọn giá và chọn loại sản phẩm
    if (price && categorySelected) {
      navigate(`/admin/product?category_id=${categorySelected}&price=${price}`);
      fetchApi({
        url: `http://localhost:3000/server/product/getProducts.php?category_id=${categorySelected}&price=${price}`,
        setData: setProductsPage1,
      });
    }
    //Trường hợp 2: Chọn loại sản phẩm và bỏ chọn giá
    else if (!price && categorySelected) {
      navigate(`/admin/product?category_id=${categorySelected}`);
      fetchApi({
        url: `http://localhost:3000/server/product/getProducts.php?category_id=${categorySelected}`,
        setData: setProductsPage1,
      });
    }
    //Trường hợp 3: Chọn giá không chọn loại sản phẩm
    else if (price && !categorySelected) {
      navigate(`/admin/product?price=${price}`);
      fetchApi({
        url: `http://localhost:3000/server/product/getProducts.php?price=${price}`,
        setData: setProductsPage1,
      });
    }
    //Trường hợp 4: Lấy tất cả
    else {
      setPriceRange("");
      navigate("/admin/product");
      fetchApi({
        url: `http://localhost:3000/server/product/getProducts.php`,
        setData: setProductsPage1,
      });
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
    fetchApi({
      url: `http://localhost:3000/server/product/getProducts.php?product_id=${id}`,
      setData: setProductWithId,
    });
    updateDialog.current.showModal();
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
    fetch(
      `http://localhost:3000/server/admin/quanLySanPham.php?product_id=${product_id}`,
      {
        method: "POST",
        body: formData, // Đính kèm FormData
      }
    )
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
              onChange={(e) => setInputSearch(e.target.value)}
              className="product-search-input"
              placeholder="Tìm sản phẩm"
            />
            <button onClick={handleSearch}>Tìm</button>
            <select
              className="product-filter-select"
              value={categorySelected}
              onChange={(e) => handleCategorySelected(e.target.value)}
            >
              <option value="">Chọn loại sản phẩm</option>
              {categories.length > 0 &&
                categories.map((value, index) => (
                  <option key={index} value={value.category_id}>
                    {value.category_name}
                  </option>
                ))}
            </select>
            <select
              className="product-filter-select"
              value={priceRange}
              onChange={(e) => handlePriceRangeSelected(e.target.value)}
              name="price_range"
              id="price-filter"
            >
              <option value="">Chọn giá</option>
              <option value="low">Dưới 200.000 VND</option>
              <option value="medium">Từ 200.000 - 400.000 VND</option>
              <option value="high">Trên 400.000 VND</option>
            </select>
          </div>
          <h3>Tổng sản phẩm {productsPage1.length}</h3>
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
                {productsPage1.length > 0 &&
                  productsPage1.map((value, index) => {
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
                          <Link
                            to={`/admin/product?product_id=${value.product_id}`}
                          >
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
