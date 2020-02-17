import React from 'react';
import PropTypes from 'prop-types';
import PaginationLink from './PaginationLink';
import PaginationEllipsis from './PaginationEllipsis';
import './PaginationBar.css';

function PaginationBar(props) {
  const { current, total, goToPage } = props;
  const paginationList = [];
  const isFirstPageCurrent = current === 1;
  const isLastPageCurrent = current === total;
  const previousPage = current - 1;
  const nextPage = current + 1;

  const goToNextPage = () => {
    if (!isLastPageCurrent) {
      goToPage(nextPage);
    }
  };

  const goToPreviousPage = () => {
    if (!isFirstPageCurrent) {
      goToPage(previousPage);
    }
  };

  paginationList.push(<PaginationLink number={1} current={isFirstPageCurrent} key="1" goToPage={goToPage} />);
  if (previousPage >= 3) paginationList.push(<PaginationEllipsis key="2" />);
  if (previousPage >= 2) paginationList.push(<PaginationLink number={previousPage} key="3" goToPage={goToPage} />);
  if (!isFirstPageCurrent && !isLastPageCurrent) {
    paginationList.push(<PaginationLink number={current} current={true} key="4" />);
  }
  if (nextPage <= total - 1) paginationList.push(<PaginationLink number={nextPage} key="5" goToPage={goToPage} />);
  if (nextPage <= total - 2) paginationList.push(<PaginationEllipsis key="6" />);
  paginationList.push(<PaginationLink number={total} current={isLastPageCurrent} key="7" goToPage={goToPage} />);

  return (
    <div className="columns is-centered pagination-bar">
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <div className="pagination-previous" disabled={isFirstPageCurrent} onClick={goToPreviousPage}>
          Previous
        </div>
        <div className="pagination-next" disabled={isLastPageCurrent} onClick={goToNextPage}>
          Next page
        </div>
        <ul className="pagination-list">{paginationList}</ul>
      </nav>
    </div>
  );
}

PaginationBar.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  goToPage: PropTypes.func
};

export default PaginationBar;
