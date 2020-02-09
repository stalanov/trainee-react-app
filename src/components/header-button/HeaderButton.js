import React from 'react';
import './HeaderButton.css';

class HeaderButton extends React.Component {
  render() {
    return <button>{this.props.value}</button>;
  }
}

export default HeaderButton;
