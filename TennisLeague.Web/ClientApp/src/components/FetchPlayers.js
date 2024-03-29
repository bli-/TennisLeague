import React, { Component } from 'react';
import { getAllPlayers } from '../api/playerApi';

export class FetchPlayers extends Component {
  static displayName = FetchPlayers.name;

  constructor(props) {
    super(props);
    this.state = { players: [], loading: true, error: null };
  }

  componentDidMount() {
    this.populatePlayers();
  }

  static renderPlayersTable(players) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player =>
            <tr key={player.id.toString()}>
              <td>{player.firstName}</td>
              <td>{player.lastName}</td>
              <td>{player.email}</td>
              <td>{player.phone}</td>
              <td>{player.city}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents;

    if (this.state.loading){
      contents = <p><em>Loading...</em></p>
    } else if (this.state.error != null) {
      contents = <div className="alert alert-danger" role="alert">{this.state.error}</div>
    } else {
      contents = FetchPlayers.renderPlayersTable(this.state.players);
    }

    return (
      <div>
        <h1 id="tabelLabel">Player Roster</h1>
        <p>List of all available players in the league</p>
        {contents}
      </div>
    );
  }

  async populatePlayers() {
    let response;
    try {
      response = await getAllPlayers();
    }
    catch (e) {
      this.setState({error: "Data failed to load. Please try again later.", loading: false})
      return;
    }
    if (response.status >= 400 && response.status < 600) {
      this.setState({error: "Server error. Please try again later.", loading: false})
      return;
    } 

    const data = await response.json();
    this.setState({ players: data, loading: false });
  }
}
