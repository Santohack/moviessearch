"use client" // Indicate that this component should only run in the client environment

import React, { useEffect, useState } from 'react';

import { debounce } from 'lodash'; // Import debounce function to limit how often a function can run

// Define the types of props the SearchBar component expects
interface Props {
    onSearch: (query: string) => void; // Callback function when a search is performed
}

/**
 * SearchBar functional component to handle user input for searches.
 * @param {Props} props - Component props
 */
const SearchBar: React.FC<Props> = ({ onSearch }) => {
    // State to hold the current value of the search input
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Debounce the search input handler to improve performance and reduce the number of calls
    const handleSearch = debounce((query: string) => {
        // If the query is not empty, trigger the onSearch callback
        if (query) {
            onSearch(query);
        }
    }, 500); // Wait for 500ms after the user stops typing

    // useEffect hook to invoke the debounced handleSearch whenever searchQuery changes
    useEffect(() => {
        handleSearch(searchQuery);

        // Cleanup function to cancel any debounced calls if the component unmounts or searchQuery changes
        return () => {
            handleSearch.cancel();
        };
    }, [searchQuery]);

    return (
        <div>
            {/* Search input field */}
            <input
                className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                // Update the searchQuery state when the input changes
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchBar; 
