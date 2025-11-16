import { useEffect, useState } from "react";
import Products from "./Products";

export default function GetMenProducts() {
  const [menProducts, setMenProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/ket_noi_database/model/getMenProducts.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMenProducts(data);
      });
  }, []);
  return (
    <>
      <Products data={menProducts} />
    </>
  );
}
