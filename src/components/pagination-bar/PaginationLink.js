import React from 'react';
import PropTypes from 'prop-types';

function PaginationLink(props) {
  const { current, number } = props;
  const classes = 'pagination-link' + (current ? ' is-current' : '');

  return (
    <li className={classes} aria-label={'Goto page ' + number}>
      {number}
    </li>
  );
}

PaginationLink.propTypes = {
  current: PropTypes.bool,
  number: PropTypes.number
};

export default PaginationLink;
