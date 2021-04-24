import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  // [1 ... pagesCount].map()
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            role="button"
            className={page === currentPage ? 'page-item active' : 'page-item'}
            key={page}
          >
            <a className="page-link action" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
