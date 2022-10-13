import { Component } from "react";
import DispTable from "../containers/Table";

import "../../assets/stylesheets/application.scss";
import "../../assets/stylesheets/loader.scss";

import { CJMS_FETCH_GENERIC_GET } from "@cjms_interfaces/shared/lib/components/Requests/Request";
import { comm_service, request_namespaces } from "@cjms_shared/services";

// import {CSVHelper} from "./ExportScores";

interface IProps {}
interface IState {
  teamData: any, 
  eventData: any,
  rounds: any[],
  gpRounds: any[],
  gpScores: any[];

}

export default class DisplayScores extends Component<IProps, IState> {
  // private csvHelper:CSVHelper = new CSVHelper();
  constructor(props:any) {
    super(props);
    this.state = {
      teamData: [],
      eventData: [],
      rounds: [],
      gpRounds: [],
      gpScores: [],
    }


    comm_service.listeners.onTeamUpdate(async () => {
      const teamData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_teams, true);
      const eventData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_event, true);
      this.setData(teamData, eventData);
    });

    comm_service.listeners.onEventUpdate(async () => {
      const teamData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_teams, true);
      const eventData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_event, true);
      this.setData(teamData, eventData);
    });

    // this.exportTableButton = this.exportTableButton.bind(this);
  }

  setData(teamData:any, eventData:any) {
    this.setState({teamData: teamData.data, eventData:eventData.data});

    const rounds:any[] = [];
    for (var i = 0; i < eventData.data.event_rounds; i++) {
      rounds.push(`Round ${i+1}`);
    }

    const gpRounds:any[] = [];
    for (var i = 0; i < eventData.data.event_rounds; i++) {
      gpRounds.push(`GP ${i+1}`);
    }
    
    this.setState({rounds: rounds});
    this.setState({gpRounds: gpRounds});
  }

  async componentDidMount() {
    const teamData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_teams, true);
    const eventData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_event, true);
    this.setData(teamData, eventData);
  }

  tableHeaders() {
    let headers = ['Rank', 'Team Number', 'Team', 'Round 1', 'GP 1', 'Round 2', 'GP 2', 'Round 3', 'GP 3'];
    return headers;
  }

  // exportTableButton() {
  //   this.csvHelper.exportFromTable(this.tableData, "yes");
  // }

  tableData() {
    const teamData = this.state.teamData;
    const tableRowArray:any[] = [];

    for (const team of Object.keys(teamData)) {
      let tableRow:any[] = [];
      const teamScores:any[] = teamData[team]?.scores;
      const roundScores:any[] = [];
      const gpTotalScores:any[] = teamData[team]?.scores;
      const gpScores: any[] = [];
      
  
      for (let i = 0; i < this.state.rounds.length; i++) {
        let scoreObject:any[] = teamScores.filter(scoreObj => scoreObj?.roundIndex == (i+1));
        if (scoreObject.length == 1) {
          roundScores.push(scoreObject[0]?.score || 0);
        } else if (scoreObject.length > 1) {
          roundScores.push('Conflict');
        } else if (scoreObject.length <= 0) {
          roundScores.push('');
        } else {
          roundScores.push('Unknown');
        }
      }
      
      
      for (let i = 0; i < this.state.gpRounds.length; i++) {
        let gpObject:any[] = gpTotalScores.filter(gpObj => gpObj?.roundIndex == (i+1));
        if (gpObject.length == 1) {
          gpScores.push(gpObject[0]?.gp || 0);
        } else if (gpScores.length > 1) {
          gpScores.push('');
        } else if (gpScores.length <= 0) {
          gpScores.push('');
        } else {
          gpScores.push('');
        }
      }
      // console.log(gpScores);
      
      tableRow.push(teamData[team].ranking, teamData[team].team_number, teamData[team].team_name, roundScores[0], gpScores[0], roundScores[1], gpScores[1], roundScores[2], gpScores[2]);
      // tableRow = tableRow.concat(roundScores, gpScores);
      tableRowArray.push(tableRow);
    }

    return tableRowArray;
  }

  render() {
    if (this.state.teamData && this.state.eventData) {

      return (
        <div id='audience-display-app' className='audience-display-app'>
          <DispTable headers={this.tableHeaders()} data={this.tableData()}/>
          {/* <button type="submit" onClick={this.exportTableButton}>CLICK ME</button> */}
        </div>
      );

    } else {
      return (
        <div className="waiting-message">
          <div className="loader"></div>
          <h2>Waiting For Event Data</h2>
        </div>
      )
    }
  }
}