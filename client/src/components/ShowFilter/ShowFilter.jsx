import { useSelector } from "react-redux";

function ShowFilter() {
  //const showFilter = useSelector(state => state.showFilter);
  const showFilter = useSelector((state) => state.showFilter);

  return (
    <div>
      {showFilter &&
        showFilter.map((filtro, index) => {
          return <button key={index}>{filtro}</button>;
        })}
    </div>
  );
}

export default ShowFilter;
