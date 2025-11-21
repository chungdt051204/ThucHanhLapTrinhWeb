import { useContext } from "react";
import AppContext from "./AppContext";
import Carousel from "./Carousel";
import Category from "./Category";
import NavBar from "./NavBar";
import CategoryFilter from "./CategoryFilter";
import Footer from "./Footer";
export default function Home({ component }) {
  const { user, isLogin } = useContext(AppContext);
  return (
    <>
      <NavBar />
      {isLogin && <h2>Xin chào {user.email}</h2>}
      <Category />
      <CategoryFilter />
      {component}
      <Carousel />
      <Footer />
    </>
  );
}
