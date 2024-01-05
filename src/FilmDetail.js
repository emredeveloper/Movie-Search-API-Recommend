// src/FilmDetail.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FilmDetail = ({ film, onHide }) => {
    return (
        <Modal show={!!film} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{film.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Yıl: {film.Year}</p>
                <p>Tür: {film.Type}</p>
                <p>IMDb ID: {film.imdbID}</p>
                <p>Skor: {film.imdbRating}</p>
                <p>Poster: <img src={film.Poster} alt={film.Title} style={{ maxWidth: '100%' }} /></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Kapat
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FilmDetail;
