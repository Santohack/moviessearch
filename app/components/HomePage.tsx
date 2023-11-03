"use client";

import {
    addMovieToFavorites,
    fetchFavoritesFromLocalStorage,
    removeMovieFromFavorites
} from './localStorageUtils';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import MovieCard from './MovieCard';
import { NavBar } from './Navbar';
import Pagination from './Pagination';
import axios from 'axios';

const API_URL = "http://www.omdbapi.com/";
const API_KEY = "7c4098e"; // replace with your OMDB API key

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}



const HomePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [lastSearchedQuery, setLastSearchedQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 2; 

    // Function to search movies and handle pagination
    const searchMovies = async (query: string, page: number) => {
        if (!query) return;

        try {
            const response = await axios.get(`${API_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`);
            if (response.data.Search) {
                setMovies(response.data.Search);
                setTotalItems(parseInt(response.data.totalResults));
            }
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }
    };

    // This effect runs once on mount and whenever `lastSearchedQuery` or `currentPage` changes
    useEffect(() => {
        if (lastSearchedQuery) {
            searchMovies(lastSearchedQuery, currentPage);
        }
    }, [lastSearchedQuery, currentPage]);

    // When the component mounts, it will fetch favorites from local storage
    useEffect(() => {
        const favMovies = fetchFavoritesFromLocalStorage();
        setFavorites(favMovies);
    }, []);

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(id)) {
                removeMovieFromFavorites(id); // remove from local storage
                return prevFavorites.filter((favId) => favId !== id);
            } else {
                addMovieToFavorites(id); // add to local storage
                return [...prevFavorites, id];
            }
        });
    }

    const numOfMovies = movies.length;

    const gridClass = () => {
        if (numOfMovies === 1) return "grid-cols-1";
        if (numOfMovies === 2) return "grid-cols-2";
        return "grid-cols-3";
    };
    useEffect(() => {
        const favMovies = fetchFavoritesFromLocalStorage();
        setFavorites(favMovies);
    }, []);
    return (
        <>
            <NavBar onSearch={(query) => {
                setCurrentPage(1); // Reset to first page on new search
                setLastSearchedQuery(query);
            }} />
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
                onPageChange={(pageNumber:any) => setCurrentPage(pageNumber)}
            />
        </>
    );
}

export default HomePage;
