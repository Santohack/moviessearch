import React from 'react';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of pages to display
  const maxPageNumbersToShow = 3;
  let startPage = currentPage - 2;
  if (startPage <= 1) {
    startPage = 1;
  }
  let endPage = startPage + maxPageNumbersToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }

  // Create an array of page numbers to be displayed
  const pageNumbers = Array.from({ length: (endPage - startPage) + 1 }, (_, idx) => startPage + idx);

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-base h-10">
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
        {pageNumbers.map(number => (
          <li key={number}>
            <a href="#"
               onClick={(e) => {
                 e.preventDefault();
                 onPageChange(number);
               }}
               className={`px-4 h-10 leading-tight ${currentPage === number ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
              {number}
            </a>
          </li>
        ))}
        <li>
          <a href="#"
             onClick={(e) => {
               e.preventDefault();
               if (currentPage < totalPages) onPageChange(currentPage + 1);
             }}
             className={`px-4 h-10 leading-tight ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:text-gray-700'} bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
