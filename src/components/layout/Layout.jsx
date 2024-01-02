import styles from "./layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed By Esirango</p>
      </footer>
    </>
  );
}

export default Layout;
