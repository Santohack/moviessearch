import { useEffect, useState } from 'react';

import Link from 'next/link';
import MovieCard from '../app/components/MovieCard';
import axios from 'axios';
import { fetchFavoritesFromLocalStorage } from '../app/components/localStorageUtils';

const API_URL = "http://www.omdbapi.com/";
const API_KEY = "7c4098e"; // replace with your OMDB API key

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

const FavMovie: React.FC = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
    const numOfMovies = favoriteMovies.length;
    const gridClass = () => {
        if (numOfMovies === 1) return "grid-cols-1";
        if (numOfMovies === 2) return "grid-cols-2";
        return "grid-cols-3";
    };
    useEffect(() => {
        const fetchFavoriteMovieDetails = async (movieId: string) => {
            try {
                const response = await axios.get(`${API_URL}?i=${movieId}&apikey=${API_KEY}`);
                return response.data;
            } catch (error) {
                console.error('Failed to fetch movie details:', error);
                return null;
            }
        };

        const loadFavorites = async () => {
            const favMovieIds = fetchFavoritesFromLocalStorage();
            const movieDetailsPromises = favMovieIds.map(id => fetchFavoriteMovieDetails(id));
            const movies = await Promise.all(movieDetailsPromises);
            setFavoriteMovies(movies.filter(movie => movie !== null));
        };

        loadFavorites();
    }, []);

    return (
        <>
            <nav className="bg-blue-500 p-4 text-white" style={{width:"86rem",background:'darkgray',borderRadius:'12px'}}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="font-bold text-xl">MovieApp</div>
                    <Link href="/HomePage">Home</Link>
                </div>
            </nav>
            <div  className={`grid ${gridClass()} gap-4 mt-11`}>
                {favoriteMovies.map(movie => (
                    <MovieCard
                        key={movie.imdbID}
                        title={movie.Title}
                        Poster={movie.Poster}
                        year={movie.Year}
                        // For now, we are not enabling the favorite toggle functionality in the favorites page
                        isFavorite={true}
                        toggleFavorite={() => {}}
                    />
                ))}
            </div>
        </>
    );
}

export default FavMovie;
