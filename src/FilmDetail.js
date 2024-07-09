import React from 'react';
import styles from './FilmDetail.module.css';

const FilmDetail = ({ film, onHide }) => {
  if (!film) return null;

  return (
    <div className={styles.overlay} onClick={onHide}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onHide}>
          &times;
        </button>
        <h2 className={styles.title}>{film.Title}</h2>
        <img src={film.Poster} alt={film.Title} className={styles.poster} />
        <div className={styles.details}>
          <p>
            <strong>Year:</strong> {film.Year}
          </p>
          <p>
            <strong>Type:</strong> {film.Type}
          </p>
          <p>
            <strong>IMDb ID:</strong> {film.imdbID}
          </p>
          <p>
            <strong>Rating:</strong> {film.imdbRating || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
