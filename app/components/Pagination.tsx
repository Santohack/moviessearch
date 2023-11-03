'use Client'
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
                <li>
                    <button onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} disabled={currentPage === 1} className={`...`}>
                        Previous
                    </button>
                </li>
                {[...Array(totalPages)].map((_, idx) => (
                    <li key={idx}>
                        <button onClick={() => onPageChange(idx + 1)} className={`... ${currentPage === idx + 1 ? 'active-styles' : ''}`}>
                            {idx + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`...`}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
