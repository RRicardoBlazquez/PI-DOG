import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_URL_BASE;

export default function useDogById(id) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}dog/${id}`).then(({ data }) => {
      setCharacter(data);
      setLoading(false);
    });
    return setCharacter({});
  }, [id]);

  return { ...{ character, loading } };
}
