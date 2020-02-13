import React from 'react';

class AlertMessage extends React.Component {
  render() {
    return (
      <article className="message is-danger">
        <div className="message-header">
          <p>{this.props.error.title}</p>
          <button className="delete" aria-label="delete" onClick={this.props.close}></button>
        </div>
        <div className="message-body content">
          <p>{this.props.error.text}</p>
          <p>
            Error message: <br />
            {this.props.error.message}
          </p>
        </div>
      </article>
    );
  }
}

export default AlertMessage;
