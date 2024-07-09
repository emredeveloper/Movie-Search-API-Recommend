import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmDetail from './FilmDetail';
import { generateFilmRecommendations } from './geminiapi';
import './FilmSearch.css';
import './App.css';
import MyNavbar from "./navbar";

const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;

const FilmSearch = () => {
    const [search, setSearch] = useState('');
    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [recommendations, setRecommendations] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const container = document.getElementById('filmSearchContainer');
        container.classList.add('explosion-container');
    }, []);

    const searchFilms = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${search}`);
            if (response.data.Response === 'True') {
                setFilms(response.data.Search || []);
            } else {
                console.error('Film arama hatası:', response.data.Error);
            }
        } catch (error) {
            console.error('Film arama hatası:', error.message);
        }
    };

    const getFilmRecommendations = async () => {
        try {
            const recommendations = await generateFilmRecommendations(search);
            setRecommendations(recommendations);
        } catch (error) {
            console.error('Film önerileri alınırken bir hata oluştu:', error);
        }
    };

    const showFilmDetail = async (film) => {
        try {
            const omdbResponse = await axios.get(`https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${film.Title}`);
            setSelectedFilm({ ...film, omdbDetails: omdbResponse.data });
        } catch (error) {
            console.error('Error fetching OMDB details:', error);
        }
    };

    return (
        <div id="filmSearchContainer" className="mt-4">
            {showAlert && (
                <div className="alert-container">
                    <div className="alert-content">
                        <p>İlk önce film arama kutusuna basıp "Ara" demelisiniz. Daha sonra öneri için "Film Öner!!" tuşuna tıklayabilirsiniz.</p>
                        <input
                            type="text"
                            placeholder="İsminiz"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button onClick={() => setShowAlert(false)}>Onayla</button>
                    </div>
                </div>
            )}

            <MyNavbar />

            <Container>
                <h1 className="mb-4">Film Arama</h1>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Film arayın"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={searchFilms}>Ara</button>
                    <button className="btn btn-secondary" onClick={getFilmRecommendations}>Film Öner!!</button>
                </div>

                {recommendations && (
                    <Card className="mt-4">
                        <Card.Body>
                            <Card.Title>Film Önerileri</Card.Title>
                            <Card.Text>{recommendations}</Card.Text>
                        </Card.Body>
                    </Card>
                )}

                <div className="row mt-4">
                    {films.map((film) => (
                        <div key={film.imdbID} className="col-md-4 mb-4">
                            <Card>
                                <Card.Img variant="top" src={film.Poster} alt={film.Title} />
                                <Card.Body>
                                    <Card.Title>{film.Title}</Card.Title>
                                    <Card.Text>Yıl: {film.Year}</Card.Text>
                                    <Button variant="primary" onClick={() => showFilmDetail(film)}>
                                        Detaylar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>

                {selectedFilm && <FilmDetail film={selectedFilm} onHide={() => setSelectedFilm(null)} />}
            </Container>
        </div>
    );
};

export default FilmSearch;