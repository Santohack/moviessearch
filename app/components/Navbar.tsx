"use client"
import SearchBar from './SearchBar';
import Link from 'next/link';
export const NavBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    return (
        <nav className="bg-blue-500 p-4 text-white" style={{ width: "86rem", background: 'darkgray', borderRadius: '12px' }}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="font-bold text-xl">MovieApp</div>
                <Link href="./favMovies">Favorite Movies</Link>
                <SearchBar onSearch={onSearch} />
            </div>
        </nav>
    );
}
