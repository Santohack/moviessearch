"use client"

import { FaHeart, FaRegHeart } from 'react-icons/fa';

import Link from 'next/link';
import React from 'react';

interface Props {
    title: string;
    year: string;
    isFavorite: boolean;
    Poster: string;
    toggleFavorite: () => void;
}

/**
 * Movie card component.
 *
 * @param title - The title of the movie.
 * @param year - The year of release of the movie.
 * @param isFavorite - Flag indicating whether the movie is a favorite or not.
 * @param Poster - The URL of the movie poster.
 * @param toggleFavorite - Function to toggle the favorite status of the movie.
 * @returns The JSX element representing the movie card.
 */
const MovieCard: React.FC<Props> = ({ title, year, isFavorite, Poster, toggleFavorite }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
                className="min-w-15rem h-unset p-8 rounded-t-lg"
                src={Poster}
                alt={title}
            />
            <div className="px-5 pb-5">
                <Link href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        Year of release-{year}
                    </span>
                    <div
                        className={`cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center ${isFavorite ? 'text-red-600' : 'text-gray-600'
                            }`}
                        onClick={toggleFavorite}
                    >
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
