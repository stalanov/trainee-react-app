import React from 'react';
import { Link } from 'react-router-dom';
import NavItem from '../nav-item/NavItem';
import './Header.css';

class Header extends React.Component {
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', () => {
      const $navbarBurgers = document.querySelectorAll('.navbar-burger');

      if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
          });
        });
      }
    });
  }

  render() {
    const categories = this.props.categories.map((category, index) => <NavItem key={index} value={category} />);

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <img src="../../banner.png" alt="banner" width="280" />
          </Link>

          <Link to="" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarMain">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div id="navbarMain" className="navbar-menu">
          <div className="navbar-start">{categories}</div>
        </div>
      </nav>
    );
  }
}

export default Header;
