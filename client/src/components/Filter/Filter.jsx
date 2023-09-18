import { useTemperament } from "../../hooks/useTemperament";

export default function Filter() {
  const handlerChange = () => {};
  const { temperament, loading } = useTemperament("http://localhost:3001/");

  return (
    <form>
      <label>
        Origin Dogs :
        <select name="filterCreated" onChange={handlerChange}>
          <option value="all">All </option>
          <option value={"base"}>Created </option>
          <option value={"api"}>Api </option>
        </select>
      </label>
      <label> Temperament : </label>
      {loading
        ? "Loading..."
        : temperament.map((t, index) => <p key={index}>{t}</p>)}

      <h1>Aqui van los filtros</h1>
    </form>
  );
}
