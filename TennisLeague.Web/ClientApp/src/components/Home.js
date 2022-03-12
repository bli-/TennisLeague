import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome new players!</h1>
        <p>This site is still under construction</p>
        <p>Look forward to these benefits:</p>
        <ul>
          <li>Player with others at your skill level</li>
          <li>Prize for top finisher</li>
          <li>Building a community of tennis players you can meet up with outside the league</li>
        </ul>
      </div>
    );
  }
}
