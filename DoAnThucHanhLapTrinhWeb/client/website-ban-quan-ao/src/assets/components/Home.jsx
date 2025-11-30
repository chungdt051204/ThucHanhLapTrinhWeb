import { useContext } from "react";
import AppContext from "./AppContext";
import Carousel from "./Carousel";
import Category from "./Category";
import NavBar from "./NavBar";
import CategoryFilter from "./CategoryFilter";
import Footer from "./Footer";
export default function Home({ component, button }) {
  const { user, isLogin } = useContext(AppContext);
  return (
    <>
      <NavBar />
      {isLogin && <h2>Xin chào {user.fullName}</h2>}
      <Category />
      <CategoryFilter />
      {component}
      {button}
      <Carousel />
      <Footer />
    </>
  );
}
