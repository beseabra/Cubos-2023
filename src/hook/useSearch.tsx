import { set } from "date-fns";
import { useEffect, useState } from "react";

interface SearchResults {
  page: number;
  results: [
    {
      adult: boolean;
      backdrop_path: string;
      genre_ids: [number];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }
  ];
  total_pages: number;
  total_results: number;
}

export default function useSearch({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const [dataByTitle, setDataByTitle] = useState<SearchResults | undefined>();

  const totalPagesByTitle = dataByTitle?.total_pages
    ? dataByTitle?.total_pages * 4
    : 1;

  const apiPageByTitle = Math.ceil(
    (Math.min(page, totalPagesByTitle) * 5) / 20
  );

  useEffect(() => {
    setDataByTitle(undefined);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=${apiPageByTitle}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) return;
        setDataByTitle(data);
      });
  }, [query, apiPageByTitle]);

  const startItemByTitle = ((page - 1) * 5) % 20;

  const resultsByTitle =
    page <= totalPagesByTitle
      ? dataByTitle?.results?.slice(startItemByTitle, startItemByTitle + 5) ??
        []
      : [];

  const [dataByGenre, setDataByGenre] = useState<SearchResults | undefined>();

  const totalPagesByGenre = dataByGenre?.total_pages
    ? dataByGenre?.total_pages * 4
    : 1;

  const apiPageByGenre =
    0 < page - totalPagesByTitle
      ? Math.ceil(((page - totalPagesByTitle) * 5) / 20)
      : 1;

  console.log("apiPageByGenre", apiPageByGenre);

  useEffect(() => {
    setDataByGenre(undefined);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${apiPageByGenre}&sort_by=popularity.desc&with_genres=${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) return;
        const total_pages = data.total_pages > 500 ? 500 : data.total_pages;
        setDataByGenre({ ...data, total_pages });
      });
  }, [query, apiPageByGenre]);

  const startItemByGenre = ((page - totalPagesByTitle - 1) * 5) % 20;
  const itemsByGenreNumber =
    page < totalPagesByTitle
      ? 0
      : page === totalPagesByTitle
      ? 5 - (resultsByTitle?.length ?? 0)
      : 5;

  const resultsByGenre =
    dataByGenre?.results?.slice(
      startItemByGenre,
      startItemByGenre + itemsByGenreNumber
    ) ?? [];

  const results = [...resultsByTitle, ...resultsByGenre];

  const totalPages = results.length ? totalPagesByTitle + totalPagesByGenre : 0;

  return { results, totalPages };
}
