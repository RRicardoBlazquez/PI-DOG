import { useDispatch, useSelector } from "react-redux";
import { deleteFilterTemperament, dogFilter } from "../../redux/actions";

function ShowFilter() {
  const filterOrigin = useSelector((state) => state.filterOrigin);
  const showFilter = useSelector((state) => state.showFilter);
  const dispatch = useDispatch();
  const handlerchange = (filtro) => {
    dispatch(deleteFilterTemperament(filtro));
    dispatch(dogFilter({ created: filterOrigin, temperament: showFilter }));
  };

  return (
    <div>
      {showFilter &&
        showFilter.map((filtro, index) => {
          return (
            <button key={index} onClick={() => handlerchange(filtro)}>
              {filtro}
            </button>
          );
        })}
    </div>
  );
}

export default ShowFilter;
