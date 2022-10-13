//    .--.  .-. .-..-. .-.  .--.  
//   / {} \ |  `| ||  `| | / {} \ 
//  /  /\  \| |\  || |\  |/  /\  \
//  `-'  `-'`-' `-'`-' `-'`-'  `-'

import { CJMS_FETCH_GENERIC_GET } from "@cjms_interfaces/shared/lib/components/Requests/Request";
import { comm_service, request_namespaces } from "@cjms_shared/services";
import { Component } from "react";

import "./assets/stylesheets/application.scss";
import "./assets/stylesheets/loader.scss";

import  DisplayScores  from "./components/Scores/DisplayScores";
// import ExportScores from "./components/Scores/ExportScores";

interface IProps {}

interface IState {
  external_eventData:any;
  external_teamData:any[];

  blink_toggle:boolean;
  loop?:any;
}

export default class Display extends Component<IProps, IState> {
  _removeSubscriptions:any[] = [];
  constructor(props:any) {
    super(props);

    this.state = {
      external_eventData: undefined,
      external_teamData: [],

      blink_toggle:true
    }

    comm_service.listeners.onEventUpdate(async () => {
      const eventData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_event, true);
      const teamData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_teams, true);
      this.setEventData(eventData);
      this.setTeamData(teamData);
    });

    comm_service.listeners.onTeamUpdate(async () => {
      const teamData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_teams, true);
      this.setTeamData(teamData);
    });

    this.blink = this.blink.bind(this);
  }

  blink() {
    if (this.state.blink_toggle) {
      this.setState({blink_toggle: false});
    } else {
      this.setState({blink_toggle: true});
    }
  }

  setEventData(data:any) {
    this.setState({external_eventData:data.data});
  }

  setTeamData(data:any) {
    this.setState({external_teamData:data.data});
  }

  async componentDidMount() {
    const eventData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_event, true);
    const teamData:any = await CJMS_FETCH_GENERIC_GET(request_namespaces.request_fetch_teams, true);
    this.setEventData(eventData);
    this.setTeamData(teamData);

    this.startLoop();
  }

  componentWillUnmount() {
    clearInterval(this.state.loop);
  }

  startLoop() {
    this.setState({loop: setInterval(this.blink, 1000)});
  }

  getContent() {
    return(
      <div className="Judging-Display">
        <h2>Hi Sam, Hi Jaci, Hi Nicole!</h2>
        <DisplayScores></DisplayScores>
        {/* <ExportScores/> */}
      </div>
    );
  }

  render() {
    if (this.state.external_eventData) {
      return this.getContent();
    } else {
      return(
        <div className="waiting-message">
          <div className="loader"></div>
          <h2>Waiting For Event Data</h2>
        </div>
      )
    }
  }
}