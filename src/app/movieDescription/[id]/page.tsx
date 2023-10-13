import Header from "@/components/Header";
import styles from "./page.module.css";
import Image from "next/image";
interface MovieDescription {
  title?: string;
  overview?: string;
  poster_path?: string;
  genres?: {
    name: string;
  }[];
  runtime?: number;
  release_date?: string;
  popularity?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  original_language?: string;
  videos?: {
    results: {
      site: string;
      key: string;
    }[];
  };
}

export default async function movieDescription({
  params,
}: {
  params: { id: string };
}) {
  const movie_id = parseInt(params.id);

  async function getMoviesId(movie_id: number) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=videos&language=pt-BR`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }

  const data = (await getMoviesId(movie_id)) as MovieDescription;

  const youtubeVideoKey = data.videos?.results.find(
    (video) => video.site === "YouTube"
  )?.key;

  function formatData(dateString?: string) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  const formattedPopularity = formatData(data.release_date);

  const roundedPopularity = data.popularity ? Math.floor(data.popularity) : "?";

  const formattedBudget = data.budget
    ? data.budget.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      })
    : "";

  const formattedRevenue = data.revenue
    ? data.revenue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      })
    : "";

  const formattedProfit =
    data.revenue && data.budget
      ? (data.revenue - data.budget).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })
      : "";

  const formattedRuntime = data.runtime
    ? `${Math.floor(data.runtime / 60)}h${data.runtime % 60}min`
    : "";

  return (
    <body className={styles.main}>
      <Header />
      <section className={styles.section}>
        <div className={styles.title}>
          <h2 className={styles.movieTitle}>{data.title}</h2>
          <span className={styles.year}>{formattedPopularity}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.informationMovie}>
            <h3 className={styles.sinopse}>Sinopse</h3>
            <p className={styles.description}>{data.overview}</p>
            <h3 className={styles.sinopse}>Informações</h3>

            <div className={styles.information}>
              <h4 className={styles.info}>
                Situação{" "}
                <p className={styles.infoAdditional}>
                  {data.status === "Released" ? "Lançado" : "não lançado"}
                </p>
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
                Duração{" "}
                <p className={styles.infoAdditional}>{formattedRuntime}</p>
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
                {data.genres?.map((genre, index) => (
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
              src={"https://image.tmdb.org/t/p/original" + data.poster_path}
              alt={data.title ?? ""}
              fill={true}
              objectFit="cover"
            />
          </div>
        </div>
      </section>
      {youtubeVideoKey ? (
        <div className={styles.movieYoutube}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeVideoKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ) : null}
    </body>
  );
}
