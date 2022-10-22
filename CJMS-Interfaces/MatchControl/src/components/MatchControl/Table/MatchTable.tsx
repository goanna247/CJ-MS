import { comm_service } from "@cjms_interfaces/shared";
import { IMatch } from "@cjms_shared/services";
import { Component } from "react";

import "../../../assets/stylesheets/MatchTable.scss";

interface IProps {
  external_matchData:IMatch[];
  setSelectedMatch:Function;
}

interface IState {
  loaded_match:string;
  selected_match:string;
}

export default class MatchTable extends Component<IProps, IState> {
  constructor(props:any) {
    super(props);

    this.state = {
      loaded_match: '',
      selected_match: ''
    }

    comm_service.listeners.onMatchLoaded(async (match:string) => {
      this.setLoadedMatch(match);
    });
  }

  setLoadedMatch(match:string) {
    this.setState({loaded_match: match});
  }

  handleSelectedMatch(match_number:string) {
    this.setState({selected_match: match_number});
    this.props.setSelectedMatch(match_number);
  }

  getTableHeaders() {
    return (
      <tr>
        <th>Match</th>
        <th>Start Time</th>
        <th>On Table</th>
        <th>Team Number</th>
        <th>On Table</th>
        <th>Team Number</th>
      </tr>
    );
  }

  getTable() {
    return (
      this.props.external_matchData.map((match) => (
        <tr
          id={match.match_number}
          key={match.match_number}
          className={`${match.deferred ? 'strikeout' : ''} ${this.state.selected_match == match.match_number ? 'selected' : ''}`}
          onClick={() => this.handleSelectedMatch(match.match_number)}
          style={{
            backgroundColor: `${this.state.loaded_match == match.match_number ? 'orange' : match.deferred ? 'cyan' : match.complete ? 'green' : ''}`,
          }}
        >
          <td>#{match.match_number}</td>
          <td>{match.start_time}</td>
          {/* Team 1 */}
          <td style={{backgroundColor: `${match.complete ? (match.on_table1.score_submitted ? 'green' : 'red') : ''}`}}>{match.on_table1.table}</td>
          <td style={{backgroundColor: `${match.complete ? (match.on_table1.score_submitted ? 'green' : 'red') : ''}`}}>{match.on_table1.team_number}</td>
          {/* Team 2 */}
          <td style={{backgroundColor: `${match.complete ? (match.on_table2.score_submitted ? 'green' : 'red') : ''}`}}>{match.on_table2.table}</td>
          <td style={{backgroundColor: `${match.complete ? (match.on_table2.score_submitted ? 'green' : 'red') : ''}`}}>{match.on_table2.team_number}</td>
        </tr>
      ))
    );
  }

  render() {
    return(
      <table className="mt-table">
        <thead>{this.getTableHeaders()}</thead>
        <tbody>{this.getTable()}</tbody>
      </table>
    );
  }
}