import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavItem.css';

class NavItem extends React.Component {
  render() {
    const category = this.props.value;
    return (
      <Link to={`/${category}`} className="navbar-item">
        {category[0].toUpperCase() + category.slice(1)}
      </Link>
    );
  }
}

NavItem.propTypes = {
  value: PropTypes.string
};

export default NavItem;
