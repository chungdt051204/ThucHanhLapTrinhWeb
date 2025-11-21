import { useContext } from "react";
import AppContext from "./AppContext";
import Products from "./Products";

export default function GetAllProducts() {
  const { products } = useContext(AppContext);
  return (
    <>
      <Products data={products} />
    </>
  );
}
