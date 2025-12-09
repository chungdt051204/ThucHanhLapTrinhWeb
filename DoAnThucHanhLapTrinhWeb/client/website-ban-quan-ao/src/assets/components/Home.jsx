import { useContext } from "react";
import AppContext from "./AppContext";
import Carousel from "./Carousel";
import Category from "./Category";
import UserNavbar from "./UserNavbar";
import CategoryFilter from "./CategoryFilter";
import Footer from "./Footer";
import GetProductWithQueryString from "./GetProductsWithQueryString";
import { useSearchParams } from "react-router-dom";
import PaginationButton from "./PaginationButton";
export default function Home({ component }) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("category_id");
  const { user, isLogin } = useContext(AppContext);
  return (
    <>
      <UserNavbar />
      {isLogin && <h2>Xin chào {user.fullName}</h2>}
      <Category />
      <CategoryFilter />
      {component}
      {id === null && <PaginationButton />}
      <Carousel />
      <Footer />
    </>
  );
}
