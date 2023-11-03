"use client"

import Link from 'next/link';
import React from 'react';
import SearchBar from './SearchBar';

/**
 * NavBar component represents the navigation bar of the application.
 * It includes the application's name, a link to the favorite movies page,
 * and a search bar for searching movies.
 *
 * @param {function} onSearch - A callback function that is invoked whenever a search is performed.
 */
export const NavBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    return (
        // Navigation bar with customized styling
        <nav className="bg-blue-500 p-4 text-white" style={{ width: "86rem", background: 'darkgray', borderRadius: '12px' }}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Branding or application title */}
                <div className="font-bold text-xl">MovieApp</div>

                {/* Link to the favorite movies page */}
                <Link href="/favMovies">
                    Favorite Movies
                </Link>

                {/* Search bar component with onSearch event */}
                <SearchBar onSearch={onSearch} />
            </div>
        </nav>
    );
};
