import { useContext } from "react";
import AppContext from "./AppContext";
import Products from "./Products";

export default function GetWomenProducts() {
  const { womenProducts } = useContext(AppContext);
  return (
    <>
      <Products data={womenProducts} />
    </>
  );
}
