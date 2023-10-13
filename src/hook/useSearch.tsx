import { useEffect, useState } from "react";

export default function useSearch() {
  const [data, setData] = useState(null);
  console.log(data);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/search/movie?query=acao&include_adult=false&language=pt-BR&page=1",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return [data];
}
