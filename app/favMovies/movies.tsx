"use client"

import { useEffect, useState } from 'react';

import MovieCard from '../components/MovieCard';
import axios from 'axios';
import client from '../api/httpClient';
import { fetchFavoritesFromLocalStorage } from '../components/localStorageUtils';

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "7c4098e"; // replace with your OMDB API key

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

const FavoritesPage: React.FC = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const numOfMovies = favoriteMovies.length;

    const gridClass = () => {
        if (numOfMovies === 1) return "grid-cols-1";
        if (numOfMovies === 2) return "grid-cols-2";
        return "grid-cols-3";
    };


    const fetchFavoriteMovieDetails = async (movieId: string) => {
        try {
            const response = await client.get(`?i=${movieId}&apikey=${API_KEY}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch movie details:', error);
            return null;
        }
    };


    // Function to load favorite movies from local storage and fetch their details

    const loadFavorites = async () => {
        const favMovieIds = fetchFavoritesFromLocalStorage();
        const movieDetailsPromises = favMovieIds.map(id => fetchFavoriteMovieDetails(id));
        const movies = await Promise.all(movieDetailsPromises);
        setFavoriteMovies(movies.filter(movie => movie !== null));
    };

    useEffect(() => {


        loadFavorites();
    }, []);

    const toggleFavoriteMovie = (movie: Movie) => {
        const favMovieIds = fetchFavoritesFromLocalStorage();

        // Check if movie already exists in favorites
        if (favMovieIds.includes(movie.imdbID)) {
            // Remove from favorites
            const updatedFavs = favMovieIds.filter(id => id !== movie.imdbID);
            localStorage.setItem('favorites', JSON.stringify(updatedFavs));
        } else {
            // Add to favorites
            favMovieIds.push(movie.imdbID);
            localStorage.setItem('favorites', JSON.stringify(favMovieIds));
        }

        // Reload favorites from local storage
        loadFavorites();
    };


    return (
        <div style={{ backgroundColor: "#e6e8e6" }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl justify-center font-bold">Favorite Movies</h1>

            </div>

            <div className={`grid ${gridClass()} gap-4 mt-11`}>
                {favoriteMovies.length === 0
                    ? <p className="text-center text-xl">You have no favorite movies!</p>
                    : favoriteMovies.map(movie => (
                        <MovieCard
                            key={movie.imdbID}
                            title={movie.Title}
                            Poster={movie.Poster}
                            year={movie.Year}
                            isFavorite={true}
                            toggleFavorite={() => toggleFavoriteMovie(movie)}
                        />
                    ))
                }
            </div>
        </div>
    );

}

export default FavoritesPage;
