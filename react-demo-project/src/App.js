import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


// 4e4f124f

const API_URL = 'http://www.omdbapi.com?apikey=4e4f124f';

const movie = {
    "Title": "Pacific Rim",
    "Year": "2013",
    "imdbID": "tt1663662",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Pacific Rim');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            <>
                                {movies.map((movie) => (
                                    <MovieCard movie={movie} />
                                ))}
                            </>
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No Movies Found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;