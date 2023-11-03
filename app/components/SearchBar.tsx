"use client"
import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';


interface Props {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = debounce((query: string) => {
        if(query) {
            onSearch(query);
        }
    }, 500);

    useEffect(() => {
        handleSearch(searchQuery);
        // Cleanup function to cancel the debounced call if searchQuery changes
        return () => {
            handleSearch.cancel();
        };
    }, [searchQuery]);

    return (
       <div>
         <input
         className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
       </div>
    );
}

export default SearchBar;
