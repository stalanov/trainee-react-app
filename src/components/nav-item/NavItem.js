import React from 'react';
import { Link } from 'react-router-dom';
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

export default NavItem;
