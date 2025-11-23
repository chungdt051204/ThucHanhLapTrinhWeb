import { useContext } from "react";
import AppContext from "./AppContext";
import Products from "./Products";

export default function GetCosmeticsProducts() {
  const { cosmeticsProducts } = useContext(AppContext);
  return (
    <>
      <Products data={cosmeticsProducts} />
    </>
  );
}
