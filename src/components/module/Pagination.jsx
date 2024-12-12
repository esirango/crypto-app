import React from "react";

import styles from "./pagination.module.css";

function Pagination({ page, setPage }) {
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={previousHandler}
        className={page === 1 ? styles.disabled : null}
        disabled={page === 1}
      >
        Previous
      </button>
      <p className={page === 1 ? styles.selected : null}>1</p>
      <p className={page === 2 ? styles.selected : null}>2</p>
      <span>...</span>
      {page > 2 && page < 8 && (
        <>
          <p className={styles.selected}>{page}</p>
          <span>...</span>
        </>
      )}
      <p className={page === 8 ? styles.selected : null}>8</p>
      <p className={page === 9 ? styles.selected : null}>9</p>

      <button
        onClick={nextHandler}
        className={page === 9 ? styles.disabled : null}
        disabled={page === 9}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
