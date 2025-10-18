// js/Components/Admin/Pagination.tsx
import React from 'react';
import { router } from '@inertiajs/react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
  from: number;
  to: number;
  total: number;
  currentPage: number;
  lastPage: number;
  filters: any; 
}

export default function Pagination({ 
  links, 
  from, 
  to, 
  total, 
  currentPage, 
  lastPage 
}: PaginationProps) {
  if (links.length <= 3) {
    return null;
  }

  const handlePageClick = (url: string | null) => {
    if (!url) return;
    
    router.get(url, {}, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      only: ['students', 'filters', 'statistics'],
    });
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > lastPage || page === currentPage) return;
    
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('page', page.toString());
    
    router.get(currentUrl.toString(), {}, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      only: ['students', 'filters'],
    });
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        Menampilkan {from} - {to} dari {total} data
      </p>
      
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg border transition ${
            currentPage === 1
              ? 'text-gray-400 border-gray-300 cursor-not-allowed'
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Page Numbers */}
        {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
          let pageNumber;
          
          // Logic untuk menentukan range halaman yang ditampilkan
          if (lastPage <= 5) {
            pageNumber = i + 1;
          } else if (currentPage <= 3) {
            pageNumber = i + 1;
          } else if (currentPage >= lastPage - 2) {
            pageNumber = lastPage - 4 + i;
          } else {
            pageNumber = currentPage - 2 + i;
          }

          if (pageNumber > lastPage) return null;

          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`min-w-[44px] px-3 py-2 rounded-lg border transition ${
                currentPage === pageNumber
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === lastPage}
          className={`px-3 py-2 rounded-lg border transition ${
            currentPage === lastPage
              ? 'text-gray-400 border-gray-300 cursor-not-allowed'
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}