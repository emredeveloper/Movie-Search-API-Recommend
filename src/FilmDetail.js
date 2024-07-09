import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FilmDetail = ({ film, onHide }) => {
  if (!film) return null;

  return (
    <Modal show={true} onHide={onHide} size="sm" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title as="h5">{film.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <div className="d-flex flex-column">
          <img 
            src={film.Poster} 
            alt={film.Title} 
            className="img-fluid mb-3 rounded" 
            style={{ maxHeight: '200px', objectFit: 'contain' }} 
          />
          <div className="small">
            <p className="mb-1"><strong>Yıl:</strong> {film.Year}</p>
            <p className="mb-1"><strong>Tür:</strong> {film.Type}</p>
            <p className="mb-1"><strong>IMDb ID:</strong> {film.imdbID}</p>
            <p className="mb-1"><strong>Skor:</strong> {film.imdbRating || 'N/A'}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="p-2 justify-content-center">
        <Button variant="secondary" size="sm" onClick={onHide}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilmDetail;