import { useDispatch } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Filter from "../../components/Filter/Filter";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect } from "react";
import { getDogs } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <h1>Titulo: Pi Dog</h1>
      <Filter />
      <SearchBar />
      <CardsContainer />
    </>
  );
}
