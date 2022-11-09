import { Component } from "react";

function removeEl(array:any, remIdx:any) {
  console.log("remove column");
  return array.map(function(arr:any) {
    return arr.filter(function(el:any,idx:any){return idx !== remIdx});  
  });
 };

 function insertColumnAtRight() {
  
}

export class CSVHelper {

  public exportFromTable(table:any, fileName:any): void {
    var csv = table.map(function(d:any){
        return d.join();
      }).join('\n');

    this.downloadCsv( csv, fileName);
  }

  public exportWithoutNames(table:any, fileName:any): void {
    let newTable = removeEl(table, 2)
    var csv = newTable.map(function(a:any){
      return a.join();
    }).join('\n');

    this.downloadCsv( csv, fileName);
  }

  public  exportFullFormat(table:any, fileName: any): void {
    // let newTable;
    // newTable[0, 0] = table[0, 0];
    //  = removeEl(table, 2)
    // newTable.forEach(function(e){
    //   if (typeof e === "object"){
    //     e["new column"] = ""
    //   }
    // });
    var arr_1 = ["USA","GERMANY","AUSTRIA"];
    console.log("full format");
    

    const mapToNewArray = (arr:any, arrTwo:any) => {
      return arr.map((elem:any, index:any) => { elem.push(arrTwo[index]); return elem; });
    }
  
    let newArray = mapToNewArray(table, arr_1);
    var csv = newArray.map(function(a:any){
      return a.join();  
    }).join('\n');

    this.downloadCsv( csv, fileName);
  }
  

  

  public exportFromArray(tableArray:any) {
    // var csv = tableArray.toString();
    // this.downloadCsv(csv, "yes");
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