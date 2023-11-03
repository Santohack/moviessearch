import Link from 'next/link';
import React from 'react';

// Define the shape of the props expected by the Pagination component
interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
}

/**
 * Pagination component to navigate through a collection of items.
 *
 * @param {number} currentPage - The current active page number.
 * @param {number} itemsPerPage - The number of items to display per page.
 * @param {number} totalItems - The total number of items in the collection.
 * @param {function} onPageChange - Function to call when a new page is selected.
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange
}) => {
  // Calculate the total number of pages based on the total items and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Define how many page numbers should be shown in the pagination controls
  const maxPageNumbersToShow = 3;

  // Calculate the range of pages to display, handling edge cases where the current page is near the start or end
  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);
  if (endPage < startPage + maxPageNumbersToShow - 1) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }

  // Generate the array of page numbers that will be rendered in the pagination controls
  const pageNumbers = Array.from({ length: (endPage - startPage) + 1 }, (_, idx) => startPage + idx);

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-base h-10">
        {/* Render the 'Previous' button, which decrements the current page */}
        <li>
          <a href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={`px-4 h-10 ml-0 leading-tight ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-700'} bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
            Previous
          </a>
        </li>
        {/* Render the page number buttons */}
        {pageNumbers.map(number => (
          <li key={number}>
            <Link href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(number);
              }}
              className={`px-4 h-10 leading-tight ${currentPage === number ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-500 hover:text-gray-700'} border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
              {number}
            </Link>
          </li>
        ))}
        {/* Render the 'Next' button, which increments the current page */}
        <li>
          <Link href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={`px-4 h-10 leading-tight ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:text-gray-700'} bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
