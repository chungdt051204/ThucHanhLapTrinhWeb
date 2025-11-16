import { useEffect, useState } from "react";
import Products from "./Products";

export default function GetWomenProducts() {
  const [womenProducts, setWomenProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/ket_noi_database/model/getWomenProducts.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWomenProducts(data);
      });
  }, []);
  return (
    <>
      <Products data={womenProducts} />
    </>
  );
}
