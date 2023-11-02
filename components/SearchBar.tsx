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
        <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
}

export default SearchBar;
