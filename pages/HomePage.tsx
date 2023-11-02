"use client"

import {
    addMovieToFavorites,
    fetchFavoritesFromLocalStorage,
    removeMovieFromFavorites
} from '../components/localStorageUtils';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
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

    const searchMovies = async (query: string) => {
        if (!query) return;

        try {
            const response = await axios.get(`${API_URL}?s=${query}&apikey=${API_KEY}`);
            if (response.data.Search) {
                setMovies(response.data.Search);
            }
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }
    }

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
          <nav className="bg-blue-500 p-4 text-white" style={{width:"86rem",background:'darkgray',borderRadius:'12px'}}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="font-bold text-xl">MovieApp</div>
            <Link href=" ./FavMovie">Fav</Link>    
                <SearchBar onSearch={searchMovies} />
              
            </div>
        </nav>
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
        </>
    );
}

export default HomePage;
