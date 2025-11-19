import { useEffect, useState } from "react";
import Products from "./Products";

export default function GetAccessoriesProducts() {
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/model/getAccessoriesProducts.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAccessoriesProducts(data);
      });
  }, []);
  return (
    <>
      <Products data={accessoriesProducts} />
    </>
  );
}
