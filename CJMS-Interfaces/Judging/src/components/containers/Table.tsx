import React, { Component, useRef } from 'react'

import "../../assets/stylesheets/TableDisplay.scss";
import {CSVHelper} from "../Scores/ExportScores";

const DEFAULT_DELAY = 1000;

interface IProps {
  headers:any;
  data:any;
}

interface IState {
  scrollTop:number;
  table_body:any;
  tableData:any;
}

export default class DispTable extends Component<IProps, IState> {
  private csvHelper:CSVHelper = new CSVHelper();
  constructor(props:any) {
    super(props);

    this.state = {
      scrollTop: 0,
      table_body: React.createRef(),
      tableData: []
    }

    this.exportTableButton = this.exportTableButton.bind(this);
  }


  getFormattedData(data:any[]) {
    const content:any[] = [];
    // console.log(data);
    for (const row of data) {
      const columns:any[] = [];
      for (const column of Object.keys(row)) {
        columns.push(<td key={column}>{row[column]}</td>);
      }

      content.push(
        <tr key={row[1]}>
          {columns}
        </tr>
      );
    }

    return(
      content
    );
  }

  exportTableButton() {
    // console.log(this.renderTable());
    // this.csvHelper.exportFromTable(this.getFormattedData(this.props.data), "yes");
    // this.csvHelper.exportFromTable([[2, 2],[2, 2]], "yes");
    this.csvHelper.exportFromArray([["hello", "drew"], ["dembo", "d-d"]]);
  }

  getFormatedHeaders(headers:any[]) {
    const content:any[] = [];
    for (const header of headers) {
      content.push(<th key={header}>{header}</th>);
    }

    return (<tr key={"headers"}>{content}</tr>);
  }

  renderTable() {
    const firstTable = this.getFormattedData(this.props.data);
    const secondTable = this.getFormattedData(this.props.data);
      return(
        <tbody id='table-body' ref={this.state.table_body}>
          {firstTable}
        </tbody>
      );
  }

  render() {
    return (
      <div id='table-wrapper' className='table-wrapper'>
        <table id='table-parent' className='fl-table ui scrollable single line very basic compact table'>
          <thead id='table-head'>
            { this.getFormatedHeaders(this.props.headers) }
          </thead>
          { this.renderTable() }
        </table>
        <button type="submit" onClick={this.exportTableButton}>CLICK ME</button>
      </div>
    );
  }
}