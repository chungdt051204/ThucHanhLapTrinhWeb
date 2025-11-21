import { useContext } from "react";
import AppContext from "./AppContext";
import Products from "./Products";

export default function GetKidProducts() {
  const { kidProducts } = useContext(AppContext);
  return (
    <>
      <Products data={kidProducts} />
    </>
  );
}
