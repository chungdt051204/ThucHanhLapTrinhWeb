import { useEffect, useState } from "react";
import Products from "./Products";

export default function GetKidProducts() {
  const [kidProducts, setKidProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/model/getKidProducts.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setKidProducts(data);
      });
  }, []);
  return (
    <>
      <Products data={kidProducts} />
    </>
  );
}
