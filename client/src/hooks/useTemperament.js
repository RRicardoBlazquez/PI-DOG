import axios from "axios";
import { useEffect, useState } from "react";

/*
  const [temperam]
  useEffect(() => {
    axios.get(`${Url_base}/temperament/`);
  }, []); */

export const useTemperament = (url) => {
  const [temperament, setTemperament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${url}temperament/`).then(({ data }) => {
      setTemperament(data);
      setLoading(false);
    });
  }, [url]);

  return { temperament, loading };
};
