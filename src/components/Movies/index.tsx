"use client";

import Image from "next/image";
import styles from "./movie.module.css";
import Link from "next/link";
import React, { useState } from "react";
import useSearch from "@/hook/useSearch";

export default function Movies() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { results, totalPages } = useSearch({ query: searchQuery, page });

  function formatData(dateString?: string) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  return (
    <>
      <section>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Busque um filme por nome ou gênero."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchQuery(searchInput);
              setPage(1);
            }
          }}
        />
      </section>
      <section>
        {results.map((movie, index) => (
          <div key={index} className={styles.movie}>
            <div className={styles.imageMovie}>
              <Image
                src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
                alt={movie.title}
                fill={true}
                objectFit="cover"
                unoptimized
              />
            </div>
            <div className={styles.infosMovie}>
              <div className={styles.titleMovie}>
                <div className={styles.circle}>
                  <span>{Math.round(movie.vote_average * 10)}%</span>
                </div>
                <span className={styles.title}>
                  <Link
                    href={`/movieDescription/${movie.id}`}
                    className={styles.navigation}
                  >
                    <h2>{movie.title}</h2>
                  </Link>
                </span>
              </div>
              <span className={styles.date}>
                {formatData(movie.release_date)}
              </span>
              <div className={styles.descriptionMovies}>
                <p>{movie.overview}</p>
                <div className={styles.categoryContainer}>
                  {movie.genre_ids.map((genre, index) => (
                    <span key={index} className={styles.category}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className={styles.pagination}>
        {page > 2 && (
          <span
            onClick={() => setPage(page - 2)}
            className={styles.numberPagination}
          >
            {page - 2}
          </span>
        )}
        {page > 1 && (
          <span
            onClick={() => setPage(page - 1)}
            className={styles.numberPagination}
          >
            {page - 1}
          </span>
        )}
        <div className={styles.circlePagination}>
          <span>{page}</span>
        </div>
        {page < totalPages && (
          <span
            onClick={() => setPage(page + 1)}
            className={styles.numberPagination}
          >
            {page + 1}
          </span>
        )}
        {page < totalPages - 1 && (
          <span
            onClick={() => setPage(page + 2)}
            className={styles.numberPagination}
          >
            {page + 2}
          </span>
        )}
      </section>
    </>
  );
}
