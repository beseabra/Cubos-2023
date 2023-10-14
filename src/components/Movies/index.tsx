"use client";

import Image from "next/image";
import styles from "./movie.module.css";
import Link from "next/link";
import React, { useState } from "react";
import useSearch from "@/hook/useSearch";

export default function Movies() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const { results, totalPages } = useSearch({ query: searchInput, page });

  return (
    <>
      <section>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Busque um filme por nome, ano ou gênero..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </section>
      <section className={styles.movie}>
        <div className={styles.imageMovie}>
          <Image
            src="/transformers_PNG16.png"
            alt="avengers"
            fill={true}
            objectFit="cover"
          />
        </div>
        <div className={styles.infosMovie}>
          <div className={styles.titleMovie}>
            <div className={styles.circle}>
              <span>75%</span>
            </div>
            <span className={styles.title}>
              <Link href="/movieDescription/0" className={styles.navigation}>
                <h2>Transformers</h2>{" "}
              </Link>
            </span>
          </div>
          <span className={styles.date}>03/06/1997</span>
          <div className={styles.descriptionMovies}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              inventore esse atque! Sit fugit, voluptate quia est cum
              exercitationem quas saepe ipsa modi fuga quibusdam distinctio
              omnis dolorum repudiandae illo?. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Non enim neque autem, obcaecati
              porro qui. Quam dolore possimus cum labore, hic iusto harum sed,
              beatae nemo culpa sunt voluptatibus officiis!
            </p>
            <div className={styles.categoryContainer}>
              <span className={styles.category}>Ação</span>
              <span className={styles.category}>Ação</span>
              <span className={styles.category}>Ação</span>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.pagination}>
        <div className={styles.circlePagination}>
          <span>1</span>
        </div>
      </section>
    </>
  );
}
