import { useEffect, useState } from "react";
import style from "./Paginated.module.css";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
const NEXT = "NEXT";
const BACK = "BACK";
const INIT = 1;

function Paginated({ nPerPage, index, setIndex }) {
  //utilizo el dogFilter para tener la cantidad de razas a mostrar
  const dogFilter = useSelector((state) => state.dogFilter);
  const pageSize = Math.ceil(dogFilter.length / nPerPage);
  const [cantPage, setCantPage] = useState();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    setCantPage(pageSize);
    current > pageSize ? setPage(1) : setPage(current);
  }, [pageSize]);

  //en caso de pasar a una pagina siguiente modifico index para mostrar los datos entre esos indices
  const handlerButton = (name) => {
    const nextPage =
      name === NEXT ? current + 1 : name === BACK ? current - 1 : current;
    setPage(nextPage);
  };

  const handlerChange = (e) => {
    setPage(e);
  };

  const getNumPage = () => {
    return Array.from({ length: cantPage }, (_, i) => i + 1).map((nPage) => {
      return (
        <li className={style.containerPage} key={nPage}>
          <button
            className={nPage === current ? style.pageCurrent : style.page}
            onClick={() => handlerChange(nPage)}
          >
            {nPage}
          </button>
        </li>
      );
    });
  };
  const listPage = getNumPage();

  function setPage(pagina) {
    let firtPage = pagina * nPerPage - nPerPage;
    dogFilter.length < current * nPerPage
      ? setIndex({ ...index, firt: firtPage, last: dogFilter.length })
      : setIndex({ ...index, firt: firtPage, last: pagina * nPerPage });
    setCurrent(pagina);
  }

  return (
    <div>
      <button
        disabled={INIT === current ? true : false}
        className={INIT === current ? style.disable : style.page}
        onClick={() => handlerButton(BACK)}
      >
        BACK
      </button>
      <ul className={style.container}>{listPage}</ul>
      <button
        disabled={cantPage === current ? true : false}
        className={cantPage === current ? style.disable : style.page}
        onClick={() => handlerButton(NEXT)}
      >
        NEXT
      </button>
    </div>
  );
}

Paginated.propTypes = {
  nPerPage: PropTypes.number,
  index: PropTypes.object,
  setIndex: PropTypes.func,
};

export default Paginated;
