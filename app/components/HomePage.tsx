
"use client";

import {
    addMovieToFavorites,
    fetchFavoritesFromLocalStorage,
    removeMovieFromFavorites
} from './localStorageUtils';
import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';
import { NavBar } from './Navbar';
import Pagination from './Pagination';
import axios from 'axios';

// Your API details
const API_URL = "https://www.omdbapi.com/";
const API_KEY = "7c4098e"; // Replace with your actual OMDB API key

// Movie interface
interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

// HomePage component
const HomePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [lastSearchedQuery, setLastSearchedQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState<string | null>(null); // Added error state
    const itemsPerPage = 10;


    /**
        * Searches for movies using the given query and page number and updates state accordingly.
        * @param {string} query - The search query for the movies.
        * @param {number} page - The current page number for pagination.
        */
    const searchMovies = async (query: string, page: number) => {
        if (!query) return;

        setError(null);

        try {
            // Make a GET request to the API with the search query, page number, and API key
            const response = await axios.get(`${API_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`);
            const { Search, totalResults } = response.data;

            if (Search) {
                // Set the movies and totalItems state variables
                setMovies(Search);
                setTotalItems(parseInt(totalResults));
            } else {
                // If no movies are found, set the error state variable
                setError('No movies found.');
            }
        } catch (error) {
            // If an error occurs, set the error state variable and log the error
            setError('Failed to fetch movies.');
            console.error('Failed to fetch movies:', error);
        }
    };

    // This effect runs once on mount and whenever `lastSearchedQuery` or `currentPage` changes
    useEffect(() => {
        if (lastSearchedQuery) {
            searchMovies(lastSearchedQuery, currentPage);
        }
    }, [lastSearchedQuery, currentPage]);

    // When the component mounts, fetch favorites from local storage
    useEffect(() => {
        const favMovies = fetchFavoritesFromLocalStorage();
        setFavorites(favMovies);
    }, []);

    // Toggle movie as favorite
    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(id)) {
                removeMovieFromFavorites(id);
                return prevFavorites.filter(favId => favId !== id);
            } else {
                addMovieToFavorites(id);
                return [...prevFavorites, id];
            }
        });
    };

    // Generate grid class based on the number of movies
    const numOfMovies = movies.length;
    const gridClass = () => {
        if (numOfMovies === 1) return "grid-cols-1";
        if (numOfMovies === 2) return "grid-cols-2";
        return "grid-cols-3";
    };

    // Render the component
    return (
        <>
            <NavBar onSearch={(query) => {
                setCurrentPage(1); // Reset to first page on new search
                setLastSearchedQuery(query);
            }} />
            {error && <div className="text-red-600">{error}</div>} {/* Display error message if any */}
            <div className={`grid ${gridClass()} gap-4 mt-11`}>
                {movies.map(movie => (
                    <MovieCard
                        key={movie.imdbID}
                        title={movie.Title}
                        Poster={movie.Poster}
                        year={movie.Year}
                        isFavorite={favorites.includes(movie.imdbID)}
                        toggleFavorite={() => toggleFavorite(movie.imdbID)}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}
            />
        </>
    );
};

export default HomePage;


