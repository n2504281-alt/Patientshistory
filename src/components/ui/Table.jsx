import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export const Table = ({ children, className = '' }) => {
  return (
    <div className={`table-container ${className}`}>
      <table className="table">{children}</table>
    </div>
  );
};

export const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col, idx) => (
          <th key={idx} style={col.width ? { width: col.width } : undefined}>
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children, onClick, className = '' }) => {
  return (
    <tr onClick={onClick} className={className} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {children}
    </tr>
  );
};

export const TableCell = ({ children, className = '', align = 'left' }) => {
  return <td className={className} style={{ textAlign: align }}>{children}</td>;
};

export const Pagination = ({
  currentPage = 1,
  totalPages = 5,
  totalItems = 50,
  itemsPerPage = 10,
  onPageChange
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-wrapper">
      <span className="text-xs text-muted">
        Showing <strong className="font-semibold text-slate-800">{startItem}-{endItem}</strong> of <strong className="font-semibold text-slate-800">{totalItems}</strong> entries
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          icon={ChevronLeft}
        >
          Previous
        </Button>
        <span className="text-xs font-semibold text-slate-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          iconRight={ChevronRight}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
