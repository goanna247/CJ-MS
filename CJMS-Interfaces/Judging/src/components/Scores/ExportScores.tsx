import { Component } from "react";

export class CSVHelper {

  public exportFromTable(table:any, fileName:any): void {
    // let csv = []
    // let tableRows = table.querySelectorAll("tr")

    
    // for (let i = 0; i< tableRows.length; i++)  {
    //   let row = [],
    //   cols = tableRows[i].querySelectorAll("td, th")
        

    //   for (let j = 0; j < cols.length; j++) {
    //     row.push(cols[i].innerHTML)
    //   }
      
    //   csv.push(row.join(","))
    //   console.log(table);
    // }

    var csv = table.map(function(d:any){
      return d.join();
    }).join('\n');

      this.downloadCsv( csv, fileName);
      // this.downloadCsv( csv.join("\n"), fileName);
  }

  public exportFromArray(tableArray:any) {
    var csv = tableArray.toString();
    this.downloadCsv(csv, "yes");
    // document.write(csv);
  }

  private downloadCsv(csv:any, fileName:any): void {
    let csvFile, 
        downloadLink,
        date = this.currentDate()
    
    csvFile = new Blob([csv], {type: "text/csv"})
    downloadLink = document.createElement("a")
    downloadLink.download = date+'-'+fileName
    downloadLink.href = window.URL.createObjectURL(csvFile)
    document.body.appendChild(downloadLink)
    downloadLink.click()
  }

  private currentDate(): string {
    let dateNow = new Date(Date.now()),
        month = '' + (dateNow.getMonth() + 1),
        day = '' + dateNow.getDate(),
        year = dateNow.getFullYear()

    if (month.length < 2) month= '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }
}


// export default class ExportScores extends Component<IProps, IState> {
//   constructor(props: any) {
//     super(props);
//     this.state = {}
//   }

//   render() {
//     return (
//       <div>
//         <h1>Export here</h1>
//       </div>
//     )
//   }
// }