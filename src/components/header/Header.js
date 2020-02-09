import React from 'react';
import './Header.css';
import HeaderButton from '../header-button/HeaderButton';

class Header extends React.Component {
  render() {
    const buttons = this.props.categories.map(category => <HeaderButton key={category} value={category} />);

    return (
      <div className="row header">
        <h4 className="six columns">StarWars trainee viewer</h4>
        {buttons}
      </div>
    );
  }
}

export default Header;
