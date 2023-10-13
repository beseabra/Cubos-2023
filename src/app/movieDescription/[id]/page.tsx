import Header from "@/components/Header";
import styles from "./page.module.css";
import Image from "next/image";

export default function movieDescription() {
  return (
    <body className={styles.main}>
      <Header />
      <section className={styles.section}>
        <div className={styles.title}>
          <h2 className={styles.movieTitle}>Movie Title</h2>
          <span className={styles.year}>03/06/1997</span>
        </div>
        <div className={styles.descriptionContainer}>
          <div>
            <h3 className={styles.sinopse}>Sinopse</h3>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Exercitationem, non maxime est reiciendis, voluptas provident
              quisquam porro incidunt ipsum quo et minus nobis vitae debitis
              sint excepturi sit, quibusdam ex. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Ducimus beatae provident eaque
              blanditiis facilis adipisci. Porro magni enim dolorem nisi in,
              voluptates iusto hic aspernatur corporis labore nobis quibusdam
              similique!
            </p>
            <h3 className={styles.sinopse}>Informações</h3>

            <div className={styles.information}>
              <h4 className={styles.info}>
                Situação <p className={styles.infoAdditional}>2h 30m</p>
              </h4>
              <h4 className={styles.info}>
                Idioma <p className={styles.infoAdditional}>2h 30m</p>
              </h4>
              <h4 className={styles.info}>
                Duração <p className={styles.infoAdditional}>2h 30m</p>
              </h4>
              <h4 className={styles.info}>
                Orçamento <p className={styles.infoAdditional}>2h 30m</p>
              </h4>
              <h4 className={styles.info}>
                Receita <p className={styles.infoAdditional}>2h 30m</p>
              </h4>
              <h4 className={styles.info}>
                Lucro <p className={styles.infoAdditional}>2h 30m</p>
              </h4>
            </div>

            <div className={styles.categoryContainer}>
              <div>
                <span className={styles.category}>Ação</span>
                <span className={styles.category}>Ação</span>
                <span className={styles.category}>Ação</span>
              </div>
              <div>
                <div className={styles.circle}>
                  <span>75%</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.imageMovie}>
            <Image
              src="/transformers_PNG16.png"
              alt="avengers"
              fill={true}
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </body>
  );
}
