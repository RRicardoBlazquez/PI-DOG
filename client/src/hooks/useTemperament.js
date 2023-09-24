import axios from "axios";
import { useMemo, useState } from "react";

export const useTemperament = (url) => {
  const [temperament, setTemperament] = useState(null);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    axios.get(`${url}temperament/`).then(({ data }) => {
      setTemperament(data);
      setLoading(false);
    });
  }, [url]);

  return { ...{ temperament, loading } };
};
