import React from 'react';
import PropTypes from 'prop-types';

function PaginationLink(props) {
  const { current, number, goToPage } = props;
  const classes = 'pagination-link' + (current ? ' is-current' : '');

  const goToSpecPage = () => {
    if (!current) {
      goToPage(number);
    }
  };

  return (
    <li className={classes} aria-label={'Goto page ' + number} onClick={goToSpecPage}>
      {number}
    </li>
  );
}

PaginationLink.propTypes = {
  current: PropTypes.bool,
  number: PropTypes.number,
  goToPage: PropTypes.func
};

export default PaginationLink;
