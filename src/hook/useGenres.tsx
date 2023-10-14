import { useEffect, useState } from "react";

interface GenreResults {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export default function useGenres() {
  const [data, setData] = useState<GenreResults | undefined>();

  async function getMoviesId() {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=pt",
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
    getMoviesId();
  }, []);

  const genresByIdMap = new Map<number, string>(
    data?.genres.map((genre) => [genre.id, genre.name])
  );

  return { genresByIdMap };
}
