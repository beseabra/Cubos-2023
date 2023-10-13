import Header from "@/components/Header";
import styles from "./page.module.css";
import Image from "next/image";
import { format } from "date-fns";

interface MovieDescription {
  title: string;
  overview: string;
  poster_path: string;
  genres: {
    name: string;
  }[];
  runtime: number;
  release_date: string;
  popularity: number;
  budget: number;
  revenue: number;
  status: string;
  original_language: string;
}

export default async function movieDescription() {
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
    return data;
  }

  const data = (await getMoviesId(11)) as MovieDescription;
  console.log(data);

  function formatDataPopularity(dateString: string) {
    const [year, month, day] = dateString.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  const formattedPopularity = formatDataPopularity(data.release_date);

  const roundedPopularity = Math.floor(data.popularity);

  const formattedBudget = data.budget.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const formattedRevenue = data.revenue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const formattedProfit = (data.revenue - data.budget).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return (
    <body className={styles.main}>
      <Header />
      <section className={styles.section}>
        <div className={styles.title}>
          <h2 className={styles.movieTitle}>{data.title}</h2>
          <span className={styles.year}>{formattedPopularity}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <div>
            <h3 className={styles.sinopse}>Sinopse</h3>
            <p className={styles.description}>{data.overview}</p>
            <h3 className={styles.sinopse}>Informações</h3>

            <div className={styles.information}>
              <h4 className={styles.info}>
                Situação <p className={styles.infoAdditional}>{data.status}</p>
              </h4>
              <h4 className={styles.info}>
                Idioma{" "}
                <p className={styles.infoAdditional}>
                  {data.original_language === "en"
                    ? "Inglês"
                    : data.original_language === "pt"
                    ? "Português"
                    : data.original_language === "es"
                    ? "Espanhol"
                    : data.original_language === "fr"
                    ? "Francês"
                    : data.original_language === "ja"
                    ? "Japonês"
                    : data.original_language === "it"
                    ? "Italiano"
                    : data.original_language === "de"
                    ? "Alemão"
                    : data.original_language === "ru"
                    ? "Russo"
                    : data.original_language === "zh"
                    ? "Chinês"
                    : data.original_language === "ko"
                    ? "Coreano"
                    : data.original_language === "hi"
                    ? "Hindi"
                    : data.original_language === "ar"
                    ? "Árabe"
                    : data.original_language === "tr"
                    ? "Turco"
                    : data.original_language === "cn"
                    ? "Cantonês"
                    : data.original_language === "ab"
                    ? "Abcázio"
                    : data.original_language === "af"
                    ? "Africâner"
                    : data.original_language === "am"
                    ? "Amárico"
                    : "Desconhecido"}
                </p>
              </h4>
              <h4 className={styles.info}>
                Duração <p className={styles.infoAdditional}>{data.runtime}</p>
              </h4>
              <h4 className={styles.info}>
                Orçamento{" "}
                <p className={styles.infoAdditional}>{formattedBudget}</p>
              </h4>
              <h4 className={styles.info}>
                Receita{" "}
                <p className={styles.infoAdditional}>{formattedRevenue}</p>
              </h4>
              <h4 className={styles.info}>
                Lucro <p className={styles.infoAdditional}>{formattedProfit}</p>
              </h4>
            </div>

            <div className={styles.categoryContainer}>
              <div>
                {data.genres.map((genre, index) => (
                  <span key={index} className={styles.category}>
                    {genre.name}
                  </span>
                ))}
              </div>
              <div>
                <div className={styles.circle}>
                  <span>{roundedPopularity}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.imageMovie}>
            <Image
              src={"/transformers_PNG16.png"}
              alt={data.title}
              fill={true}
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </body>
  );
}
