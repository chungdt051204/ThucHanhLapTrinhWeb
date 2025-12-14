import UserNavbar from "./UserNavbar";
import Footer from "./Footer";
import { useSearchParams } from "react-router-dom";
import PaginationButton from "./PaginationButton";
export default function Home({ category, filter, component, carousel }) {
  const [searchParams] = useSearchParams();
  return (
    <>
      <UserNavbar />
      {category}
      {filter}
      {component}
      {searchParams === null && <PaginationButton />}
      {carousel}
      <Footer />
    </>
  );
}
