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

const buttonStyleOner = {
    backgroundColor: '#051728',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '6px',
};

const buttonStyleAra = {
    backgroundColor: '#051728',
    color: '#fff',
    padding: '15px 25px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '5px',
};

const FilmSearch = () => {
    const [search, setSearch] = useState('');
    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [recommendations, setRecommendations] = useState('');

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

    const downloadRecommendations = () => {
        const element = document.createElement('a');
        const file = new Blob([recommendations], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'film_recommendations.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const showFilmDetail = async (film) => {
        setSelectedFilm(film);

        try {
            const omdbResponse = await axios.get(`https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${film.Title}`);
            const omdbData = omdbResponse.data;

            setSelectedFilm((prevFilm) => ({
                ...prevFilm,
                omdbDetails: {
                    type: omdbData.Type,
                    released: omdbData.Released,
                    genre: omdbData.Genre,
                    plot: omdbData.Plot,
                },
            }));
        } catch (error) {
            console.error('Error fetching OMDB details:', error);
        }
    };

    const hideFilmDetail = () => {
        setSelectedFilm(null);
    };

    return (
        <div id="filmSearchContainer" className="mt-4">
            <MyNavbar />

            <div style={{margin: '20px 0'}}></div>
            <Container>
                <h1 className="mb-4">Film Arama</h1>

                <div className="input-group mb-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Film arayın"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={searchFilms} style={buttonStyleAra}>
                            Ara
                        </button>
                    </div>
                </div>

                <div>
                    <label
                        style={{
                            marginRight: '10px',
                            fontWeight: 'bold',
                            color: '#070606',
                            fontSize: '14px',
                        }}
                        htmlFor="filmInput"
                    >
                        Öneri İçin İzlediğiniz Filmin Tam Adını Girin:
                    </label>

                    <input type="text" id="filmInput" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button onClick={getFilmRecommendations} style={buttonStyleOner}>Film Öner!!</button>

                    {recommendations && (
                        <div className="mt-4">
                            <h2>Aramınıza göre ilk 3 film önerisi</h2>
                            <Card>
                                <Card.Body style={{backgroundColor: '#d07de3'}}>
                                    <Card.Body style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                        <Card.Text style={{ fontFamily: 'Georgia', fontSize: '20px', color: '#000000' }}>
                                            {recommendations.split('\n').map((line, index) => (
                                                <React.Fragment key={index}>
                                                    {line.trim() && <span>{line}<br/></span>}
                                                </React.Fragment>
                                            ))}
                                        </Card.Text>
                                    </Card.Body>

                                    <Button
                                        style={{ backgroundColor: '#e8c1c1', color: '#000000', padding: '8px 16px', borderRadius: '15px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', margin: '6px' }}
                                        variant="primary"
                                        onClick={downloadRecommendations}
                                        className="custom-button"
                                    >
                                        Önerileri Bilgisayara İndir!
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )}

                    {selectedFilm && (
                        <div className="mt-4">
                            <h2>{selectedFilm.Title} Detayları</h2>
                            <Card>
                                <Card.Body style={{backgroundColor: '#f2f2f2'}}>
                                    <Card.Text>
                                        <strong>Tür:</strong> {selectedFilm.omdbDetails?.type}<br/>
                                        <strong>Yayın Tarihi:</strong> {selectedFilm.omdbDetails?.released}<br/>
                                        <strong>Tür:</strong> {selectedFilm.omdbDetails?.genre}<br/>
                                        <strong>Plot:</strong> {selectedFilm.omdbDetails?.plot}<br/>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )}

                    <div style={{margin: '20px 0'}}></div>

                    <div className="row">
                        {films.map((film) => (
                            <div key={film.imdbID} className="col-md-4 mb-4">
                                <Card>
                                    <Card.Img variant="top" src={film.Poster} alt={film.Title}/>
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
                </div>

                {selectedFilm && <FilmDetail film={selectedFilm} onHide={hideFilmDetail}/>}
            </Container>

            <div className="social-links text-center">
                <a href="https://www.linkedin.com/in/cihatemrekaratas/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in fa-2x mx-3 social-icon" style={{color: '#0077B5', transition: 'transform 0.9s ease-in-out'}}></i>
                </a>
                <a href="https://github.com/emredeveloper" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github fa-2x mx-3 social-icon" style={{color: '#24292e'}}></i>
                </a>
                <a href="https://www.kaggle.com/emre21" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-kaggle fa-2x mx-3 social-icon" style={{color: '#20BEFF'}}></i>
                </a>
            </div>
        </div>
    );
};

export default FilmSearch;