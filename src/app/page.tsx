import Movies from "@/components/Movies";
import styles from "./page.module.css";
import Header from "@/components/Header";

export default function Home() {
  return (
    <body className={styles.main}>
      <Header />
      <Movies />
    </body>
  );
}
