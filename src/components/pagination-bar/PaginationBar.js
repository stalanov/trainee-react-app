import React from 'react';
import PropTypes from 'prop-types';
import PaginationLink from './PaginationLink';
import PaginationEllipsis from './PaginationEllipsis';
import './PaginationBar.css';

function PaginationBar(props) {
  const { current, total } = props;
  const paginationList = [];
  const isFirstPageCurrent = current === '1';
  const isLastPageCurrent = current === total;
  const previousPage = current - 1;
  const nextPage = current + 1;

  paginationList.push(<PaginationLink number={1} current={isFirstPageCurrent} key="1" />);
  if (previousPage >= 3) paginationList.push(<PaginationEllipsis key="2" />);
  if (previousPage >= 2) paginationList.push(<PaginationLink number={previousPage} key="3" />);
  if (!isFirstPageCurrent && !isLastPageCurrent)
    paginationList.push(<PaginationLink number={current} current="true" key="4" />);
  if (nextPage <= total - 1) paginationList.push(<PaginationLink number={nextPage} key="5" />);
  if (nextPage <= total - 2) paginationList.push(<PaginationEllipsis key="6" />);
  paginationList.push(<PaginationLink number={total} current={isLastPageCurrent} key="7" />);

  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <div className="pagination-previous" disabled={isFirstPageCurrent}>
        Previous
      </div>
      <div className="pagination-next" disabled={isLastPageCurrent}>
        Next page
      </div>
      <ul className="pagination-list">{paginationList}</ul>
    </nav>
  );
}

PaginationBar.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number
};

export default PaginationBar;
