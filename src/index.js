import React from 'react';
import ReactDOM from 'react-dom/client';
import FilmSearch from './FilmSearch';

const root = document.getElementById('filmSearchRoot') || document.createElement('div');
const rootContainer = ReactDOM.createRoot(root);
rootContainer.render(
    <React.StrictMode>
        <FilmSearch />
    </React.StrictMode>
);
