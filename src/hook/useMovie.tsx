import { useEffect, useState } from "react";

export default function useMovie(id: number) {
  const [data, setData] = useState(null);

  async function getMoviesId(movie_id: number) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?language=pt-BR`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getMoviesId(id);
  }, [id]);

  return { data };
}
